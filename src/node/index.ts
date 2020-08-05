import { app, BrowserWindow, ipcMain, dialog } from 'electron'

const DEFAULT_WINDOW_SIZE = 550

let window: BrowserWindow

const handleFatalPromiseRejection = (promise: Promise<any>): void => {
  promise.catch(error => {
    console.error(error)
    process.exit(1)
  })
}

const init = async (): Promise<void> => {
  window = new BrowserWindow({
    useContentSize: true,
    width: DEFAULT_WINDOW_SIZE,
    height: DEFAULT_WINDOW_SIZE,
    minWidth: DEFAULT_WINDOW_SIZE,
    minHeight: DEFAULT_WINDOW_SIZE,
    webPreferences: { nodeIntegration: true }
  })

  await window.loadFile('../dist/index.html')
  window.webContents.openDevTools()
  void window.webContents.executeJavaScript('electron = require(\'electron\')')
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) handleFatalPromiseRejection(init())
})

ipcMain.handle('resize-window', (event, width, height) => {
  if (!width || !height) width = height = DEFAULT_WINDOW_SIZE
  // TODO: Make it so that the window does not go bigger than the display
  window.setContentSize(width, height)
})

ipcMain.handle('set-window-resizable', (event, resizable) => {
  window.setResizable(resizable)
})

ipcMain.handle('confirm', async (event, question) => {
  const { response } = await dialog.showMessageBox(window, {
    type: 'question',
    message: question,
    buttons: ['OK', 'Cancel']
  })

  return response === 0
})

ipcMain.handle('error', (event, message) => {
  dialog.showMessageBox(window, { type: 'error', message })
})

handleFatalPromiseRejection((async () => {
  await app.whenReady()
  await init()
})())
