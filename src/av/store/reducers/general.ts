import { GeneralState, DEFAULT_GENERAL_STATE } from '../state'
import { Action } from '../actions'

export const reducer = (state: GeneralState | void, action: Action): GeneralState => {
  if (!state) state = DEFAULT_GENERAL_STATE

  switch (action.type) {
    case 'general/setAppSize':
      return { ...state, appWidth: action.data.width, appHeight: action.data.height }

    case 'general/setBackgroundHue':
      return { ...state, backgroundHue: action.data.backgroundHue % 360 }

    default: return state
  }
}
