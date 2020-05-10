import electron from 'electron'

const DEFAULT_WINDOW_SIZE = 550

let window: electron.BrowserWindow

const init = async (): Promise<void> => {
  window = new electron.BrowserWindow({
    useContentSize: true,
    width: DEFAULT_WINDOW_SIZE,
    height: DEFAULT_WINDOW_SIZE,
    minWidth: DEFAULT_WINDOW_SIZE,
    minHeight: DEFAULT_WINDOW_SIZE,
    webPreferences: { nodeIntegration: true }
  })

  await window.loadFile('../dist/index.html')
  window.webContents.openDevTools()
  window.webContents.executeJavaScript('electron = require(\'electron\')')
}

electron.app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') electron.app.quit()
})

electron.app.on('activate', () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) init()
})

electron.ipcMain.handle('resize-window', (event, width, height) => {
  if (!width || !height) width = height = DEFAULT_WINDOW_SIZE
  // TODO: Make it so that the window does not go bigger than the display
  window.setContentSize(width, height)
})

electron.ipcMain.handle('set-window-resizable', (event, resizable) => {
  window.setResizable(resizable)
})

electron.ipcMain.handle('confirm', async (event, question) => {
  const { response } = await electron.dialog.showMessageBox(window, {
    type: 'question',
    message: question,
    buttons: ['OK', 'Cancel']
  })

  return response === 0
})

electron.ipcMain.handle('error', (event, message) => {
  electron.dialog.showMessageBox(window, { type: 'error', message })
})

;(async () => {
  await electron.app.whenReady()
  await init()
})().catch(error => {
  console.error(error)
  process.exit(1)
})
