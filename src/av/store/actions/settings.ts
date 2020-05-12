import { Action } from 'redux'

interface SetShowSettingsAction extends Action<'settings/setShowSettings'> {
  readonly data: {
    readonly showSettings: boolean
  }
}
export const setShowSettings = (showSettings: boolean): SetShowSettingsAction => (
  { type: 'settings/setShowSettings', data: { showSettings } }
)

interface SetSkipBackTimeAction extends Action<'settings/setSkipBackTime'> {
  readonly data: {
    readonly skipBackTime: number
  }
}
export const setSkipBackTime = (skipBackTime: number): SetSkipBackTimeAction => (
  { type: 'settings/setSkipBackTime', data: { skipBackTime } }
)

interface SetSkipForwardTimeAction extends Action<'settings/setSkipForwardTime'> {
  readonly data: {
    readonly skipForwardTime: number
  }
}
export const setSkipForwardTime = (skipForwardTime: number): SetSkipForwardTimeAction => (
  { type: 'settings/setSkipForwardTime', data: { skipForwardTime } }
)

export type SettingsAction = (
  SetShowSettingsAction |
  SetSkipBackTimeAction |
  SetSkipForwardTimeAction
)
