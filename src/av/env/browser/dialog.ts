import { store } from 'av/store'
import { getDialogResult } from 'av/store/selectors'
import { setDialog } from 'av/store/actions'

export const confirm = async (question: string): Promise<boolean> => {
  store.dispatch(setDialog(question, { confirm: true }))

  return new Promise(resolve => {
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

export const error = (message: string): void => {
  store.dispatch(setDialog(message))
}
