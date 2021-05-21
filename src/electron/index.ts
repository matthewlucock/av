import * as path from 'path'
import * as electron from 'electron'

import { handleFatalPromiseRejection, handleNonFatalPromiseRejection } from './util'
import { getAudioMetadata } from './metadata'

const DEFAULT_WINDOW_SIZE = 600
const HTML_PATH = path.resolve('dist/index.html')
const PRELOAD_SCRIPT = path.join(__dirname, 'preload.js')

class App {
  private readonly window: electron.BrowserWindow

  public constructor () {
    this.window = new electron.BrowserWindow({
      useContentSize: true,
      width: DEFAULT_WINDOW_SIZE,
      height: DEFAULT_WINDOW_SIZE,
      minWidth: DEFAULT_WINDOW_SIZE,
      minHeight: DEFAULT_WINDOW_SIZE,

      webPreferences: {
        preload: PRELOAD_SCRIPT
      }
    })

    this.window.setResizable(false)
  }

  public async init (): Promise<void> {
    this.registerIpcHandlers()
    await this.window.loadFile(HTML_PATH)

    this.window.webContents.openDevTools()
  }

  private registerIpcHandlers (): void {
    electron.ipcMain.handle(
      'resize-window',
      (event, dimensions: ElectronWindowDimensions | null): void => this.resizeWindow(dimensions)
    )
    electron.ipcMain.handle(
      'set-window-resizable',
      (event, resizable: boolean): void => this.window.setResizable(resizable)
    )

    electron.ipcMain.handle(
      'confirm',
      async (event, question: string): Promise<boolean> => await this.confirm(question)
    )
    electron.ipcMain.handle('error', (event, message: string): void => this.error(message))

    electron.ipcMain.handle(
      'get-audio-metadata',
      async (event, path: string): Promise<AudioMetadata | null> => await getAudioMetadata(path)
    )
  }

  public resizeWindow (dimensions: ElectronWindowDimensions | null): void {
    if (dimensions !== null) {
      this.window.setContentSize(dimensions.width, dimensions.height)
    } else {
      this.window.setContentSize(DEFAULT_WINDOW_SIZE, DEFAULT_WINDOW_SIZE)
    }
  }

  private async confirm (question: string): Promise<boolean> {
    const { response } = await electron.dialog.showMessageBox(this.window, {
      type: 'question',
      message: question,
      buttons: ['OK', 'Cancel']
    })

    return response === 0
  }

  private error (message: string): void {
    handleNonFatalPromiseRejection(
      electron.dialog.showMessageBox(this.window, { type: 'error', message })
    )
  }
}

let app: App
handleFatalPromiseRejection((async () => {
  await electron.app.whenReady()

  app = new App()
  await app.init()
})())
