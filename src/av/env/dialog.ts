import electron from 'electron'

import { store } from 'av/store'
import { browserDialogSlice } from 'av/store/slices/browser-dialog'

export const confirm = async (question: string): Promise<boolean> => {
  if (__ELECTRON__) {
    return await electron.ipcRenderer.invoke('confirm', question)
  } else {
    store.dispatch(browserDialogSlice.actions.setDialog({ message: question, confirm: true }))

    return await new Promise(resolve => {
      const unsubscribe = store.subscribe(() => {
        const state = store.getState()
        const { result } = state.browserDialog

        if (result === true || result === false) {
          unsubscribe()
          resolve(result)
        }
      })
    })
  }
}

export const error = (message: string): void => {
  if (__ELECTRON__) {
    void electron.ipcRenderer.invoke('error', message)
  } else {
    store.dispatch(browserDialogSlice.actions.setDialog({ message }))
  }
}
