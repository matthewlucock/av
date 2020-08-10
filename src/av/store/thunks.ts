import type { Action, ThunkAction } from '@reduxjs/toolkit'

import { getBaseFileType } from 'av/util/get-base-file-type'
import { isFileFromElectron } from 'av/util/is-file-from-electron'
import { confirm, error } from 'av/env/dialog'
import { retrieveAudioMetadata } from 'av/audio-metadata'

import type { RootState } from '.'
import { generalSlice } from './slices/general'
import { mediaSlice, getMediaFinished, getMediaStopConfirmText } from './slices/media'

type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export const randomizeBackgroundColor = (): AppThunk => (dispatch, getState) => {
  const state = getState()

  let newHue = 0

  do {
    newHue = Math.floor(Math.random() * 360)
  } while (Math.abs(newHue - state.general.backgroundHue) < 0.3 * 360)

  dispatch(generalSlice.actions.setBackgroundHue(newHue))
}

export const openFile = (fileList: FileList): AppThunk => async (dispatch, getState) => {
  const state = getState()

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
    if (electronPath === state.media.electronPath && type === state.media.type) return
  }

  // TODO: Check the file format somehow

  await dispatch(stopMedia())

  // Only play new media if old media (if there was any) was stopped.
  if (getState().media.url) return

  if (type === 'audio') {
    const metadata = await retrieveAudioMetadata(file)
    if (metadata) dispatch(mediaSlice.actions.setAudioMetadata(metadata))
  }

  dispatch(
    mediaSlice.actions.setMedia({
      url: URL.createObjectURL(file),
      type,
      name: file.name,
      electronPath
    })
  )
}

export const stopMedia = (): AppThunk => async (dispatch, getState) => {
  const state = getState()
  const finished = getMediaFinished(state)
  const confirmText = getMediaStopConfirmText(state)

  if (!state.media.playbackTime || finished) {
    dispatch(mediaSlice.actions.clear())
    return
  }

  dispatch(mediaSlice.actions.setPlaying(false))

  if (await confirm(confirmText)) {
    dispatch(mediaSlice.actions.clear())
    URL.revokeObjectURL(state.media.url)
  } else {
    // Play media again if it was previously playing
    dispatch(mediaSlice.actions.setPlaying(state.media.playing))
  }
}
