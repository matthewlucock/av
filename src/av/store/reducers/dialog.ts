import { DialogState, DEFAULT_DIALOG_STATE } from '../state'
import { Action } from '../actions'

export const reducer = (state: DialogState | void, action: Action): DialogState => {
  if (!state) return DEFAULT_DIALOG_STATE

  switch (action.type) {
    case 'dialog/setDialog':
      return {
        ...state,
        show: true,
        message: action.data.message,
        confirm: action.data.confirm,
        result: undefined
      }

    case 'dialog/setShowDialog':
      return { ...state, show: action.data.show }

    case 'dialog/setDialogResult':
      return { ...state, show: false, result: action.data.result }

    default: return state
  }
}
