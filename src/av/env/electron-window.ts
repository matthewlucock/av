import electron from 'electron'

export const electronResizeWindow = (width?: number, height?: number): void => {
  if (!__ELECTRON__) return
  void electron.ipcRenderer.invoke('resize-window', width, height)
}

export const electronSetWindowResizable = (resizable: boolean): void => {
  if (!__ELECTRON__) return
  void electron.ipcRenderer.invoke('set-window-resizable', resizable)
}
