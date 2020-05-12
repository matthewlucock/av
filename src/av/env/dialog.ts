import electron from 'electron'

import { store } from 'av/store'
import { getBrowserDialogResult } from 'av/store/selectors'
import { setBrowserDialog } from 'av/store/actions/browser-dialog'

export const confirm = async (question: string): Promise<boolean> => {
  if (__ELECTRON__) {
    return await electron.ipcRenderer.invoke('confirm', question)
  } else {
    store.dispatch(setBrowserDialog(question, { confirm: true }))

    return await new Promise(resolve => {
      const unsubscribe = store.subscribe(() => {
        const state = store.getState()
        const result = getBrowserDialogResult(state)

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
    electron.ipcRenderer.invoke('error', message)
  } else {
    store.dispatch(setBrowserDialog(message))
  }
}
