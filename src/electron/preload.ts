import * as electron from 'electron'

import { handleNonFatalPromiseRejection } from './util'

const contextBridge: ElectronMainProcess = {
  resizeWindow: (dimensions: ElectronWindowDimensions | null): void => {
    handleNonFatalPromiseRejection(electron.ipcRenderer.invoke('resize-window', dimensions))
  },
  setWindowResizable: (resizable: boolean): void => {
    handleNonFatalPromiseRejection(electron.ipcRenderer.invoke('set-window-resizable', resizable))
  },

  confirm: async (question: string): Promise<boolean> => {
    const result: boolean = await electron.ipcRenderer.invoke('confirm', question)
    return result
  },
  error: (message: string): void => {
    handleNonFatalPromiseRejection(electron.ipcRenderer.invoke('error', message))
  },

  getAudioMetadata: async (path: string): Promise<AudioMetadata | null> => {
    const metadata: AudioMetadata | null = await electron.ipcRenderer.invoke(
      'get-audio-metadata',
      path
    )
    return metadata
  }
}

electron.contextBridge.exposeInMainWorld('__main_process__', contextBridge)
