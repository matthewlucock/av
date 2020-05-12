import electron from 'electron'

import { store } from 'av/store'
import { getDialogResult } from 'av/store/selectors'
import { setDialog } from 'av/store/actions/dialog'

export const confirm = async (question: string): Promise<boolean> => {
  if (__ELECTRON__) {
    return await electron.ipcRenderer.invoke('confirm', question)
  } else {
    store.dispatch(setDialog(question, { confirm: true }))

    return await new Promise(resolve => {
      const unsubscribe = store.subscribe(() => {
        const state = store.getState()
        const result = getDialogResult(state)

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
    store.dispatch(setDialog(message))
  }
}
