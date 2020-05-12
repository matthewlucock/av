import { BrowserDialogState, DEFAULT_BROWSER_DIALOG_STATE } from '../state'
import { Action } from '../actions'

export const reducer = (state: BrowserDialogState | void, action: Action): BrowserDialogState => {
  if (!state) return DEFAULT_BROWSER_DIALOG_STATE

  switch (action.type) {
    case 'dialog/setBrowserDialog':
      return {
        ...state,
        show: true,
        message: action.data.message,
        confirm: action.data.confirm,
        result: undefined
      }

    case 'dialog/setShowBrowserDialog':
      return { ...state, show: action.data.show }

    case 'dialog/setBrowserDialogResult':
      return { ...state, show: false, result: action.data.result }

    default: return state
  }
}
