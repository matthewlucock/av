import { RootState } from '.'

export const getAutoHideMediaControls = (state: RootState): boolean => (
  !state.settings.show && state.media.type === 'video'
)

export const getDraggingEnabled = (state: RootState): boolean => (
  !(state.settings.show || state.browserDialog.show)
)
