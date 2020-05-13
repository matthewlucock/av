import { SettingsState, DEFAULT_SETTINGS_STATE } from '../state'
import { Action } from '../actions'

import { MINIMUM_SKIP_TIME, MAXIMUM_SKIP_TIME } from 'av/globals'
import { boundValue } from 'av/util/bound-value'

export const reducer = (state: SettingsState | void, action: Action): SettingsState => {
  if (!state) state = DEFAULT_SETTINGS_STATE

  switch (action.type) {
    case 'settings/setShowSettings':
      return { ...state, show: action.data.showSettings }

    case 'settings/setSkipBackTime':
      return {
        ...state,
        skipBackTime: boundValue(-MAXIMUM_SKIP_TIME, action.data.skipBackTime, -MINIMUM_SKIP_TIME)
      }

    case 'settings/setSkipForwardTime':
      return {
        ...state,
        skipForwardTime: (
          boundValue(MINIMUM_SKIP_TIME, action.data.skipForwardTime, MAXIMUM_SKIP_TIME)
        )
      }

    case 'settings/setScaleVideo':
      return { ...state, scaleVideo: action.data.scaleVideo }

    default: return state
  }
}
