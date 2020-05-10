import { ThunkAction as BaseThunkAction } from 'redux-thunk'

import { getBaseFileType } from 'av/util/get-base-file-type'
import { isFileFromElectron } from 'av/util/is-file-from-electron'
import { confirm, error } from 'av/dialog'
import { retrieveAudioMetadata } from 'av/audio-metadata'

import { State } from './state'
import {
  getBackgroundHue,
  getMediaUrl,
  getMediaType,
  getMediaElectronPath,
  getMediaPlaying,
  getMediaPlaybackTime,
  getMediaFinished,
  getMediaStopConfirmText
} from './selectors'
import {
  Action,
  setBackgroundHue,
  setMedia,
  setAudioMetadata,
  setMediaPlaying,
  clearMedia
} from './actions'

type ThunkAction = BaseThunkAction<void, State, void, Action>

export const randomizeBackgroundColor = (): ThunkAction => (dispatch, getState) => {
  const state = getState()
  const currentHue = getBackgroundHue(state)

  let newHue = 0
  do { newHue = Math.floor(Math.random() * 360) } while (Math.abs(newHue - currentHue) < 0.3 * 360)

  dispatch(setBackgroundHue(newHue))
}

export const openFile = (fileList: FileList): ThunkAction => async (dispatch, getState) => {
  const state = getState()
  const currentType = getMediaType(state)
  const currentElectronPath = getMediaElectronPath(state)

  if (!fileList.length) return

  if (fileList.length > 1) {
    error('av can only open a single file at a time.')
    return
  }

  const file = fileList[0]
  const type = getBaseFileType(file)
  let electronPath = ''

  if (type !== 'video' && type !== 'audio') {
    error('av can only open audio or videos.')
    return
  }

  if (isFileFromElectron(file)) {
    electronPath = file.path
    // Check if media is already open
    if (electronPath === currentElectronPath && currentType === type) return
  }

  // TODO: Check the file format somehow

  await dispatch(stopMedia())

  // Only play new media if old media (if there was any) was stopped.
  if (getMediaUrl(getState())) return

  if (type === 'audio') {
    const metadata = await retrieveAudioMetadata(file)
    if (metadata) dispatch(setAudioMetadata(metadata))
  }

  dispatch(setMedia(URL.createObjectURL(file), type, electronPath))
}

export const playPauseMedia = (): ThunkAction => async (dispatch, getState) => {
  const state = getState()
  const playing = getMediaPlaying(state)
  dispatch(setMediaPlaying(!playing))
}

export const stopMedia = (): ThunkAction => async (dispatch, getState) => {
  const state = getState()
  const url = getMediaUrl(state)
  const wasPlaying = getMediaPlaying(state)
  const playbackTime = getMediaPlaybackTime(state)
  const finished = getMediaFinished(state)
  const confirmText = getMediaStopConfirmText(state)

  if (!playbackTime || finished) {
    dispatch(clearMedia())
    return
  }

  dispatch(setMediaPlaying(false))

  if (await confirm(confirmText)) {
    dispatch(clearMedia())
    URL.revokeObjectURL(url)
  } else {
    dispatch(setMediaPlaying(wasPlaying))
  }
}
