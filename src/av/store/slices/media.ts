import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'

import {
  MINIMUM_PLAYBACK_RATE,
  MAXIMUM_PLAYBACK_RATE,
  PLAYBACK_RATE_INCREMENT_VALUE
} from 'av/globals'
import { boundValue } from 'av/util/bound-value'
import { ProcessedAudioMetadata } from 'av/audio-metadata'

/**
 * State
 */

interface MediaDetails {
  readonly url: string
  readonly type: 'audio' | 'video' | ''
  readonly electronPath: string
}

interface SliceState extends MediaDetails {
  readonly audioMetadata: ProcessedAudioMetadata
  readonly loaded: boolean
  readonly duration: number
  readonly playing: boolean
  readonly playbackTime: number
  readonly playbackRate: number
  readonly volume: number
  readonly moveThrough: 'rewind' | 'fastForward' | ''
}

const initialState: SliceState = {
  url: '',
  type: '',
  electronPath: '',
  audioMetadata: { artist: '', title: '', coverArtUrl: '', backgroundColor: '' },
  loaded: false,
  duration: 0,
  playing: false,
  playbackTime: 0,
  playbackRate: 1,
  volume: 1,
  moveThrough: ''
}

interface SliceRootState {
  readonly media: SliceState
}

/**
 * Slice
 */

export const mediaSlice = createSlice({
  name: 'media',
  initialState,

  reducers: {
    setMedia (state, action: PayloadAction<MediaDetails>) {
      state.url = action.payload.url
      state.type = action.payload.type
      state.electronPath = action.payload.electronPath
    },

    setAudioMetadata (state, action: PayloadAction<ProcessedAudioMetadata>) {
      state.audioMetadata = action.payload
    },

    loaded (state, action: PayloadAction<{ readonly duration: number }>) {
      state.duration = action.payload.duration
    },

    setPlaying (state, action: PayloadAction<boolean>) {
      state.playing = action.payload
    },

    playPause (state) {
      state.playing = !state.playing
    },

    storePlaybackTime (state, action: PayloadAction<number>) {
      state.playbackTime = boundValue(0, action.payload, state.duration)

      // Pause media upon it finishing.
      if (state.playing && action.payload === state.duration) state.playing = false
    },

    setPlaybackRate (state, action: PayloadAction<number>) {
      const roundingValue = 1 / PLAYBACK_RATE_INCREMENT_VALUE

      state.playbackRate = boundValue(
        MINIMUM_PLAYBACK_RATE,
        Math.round(action.payload * roundingValue) / roundingValue,
        MAXIMUM_PLAYBACK_RATE
      )
    },

    setVolume (state, action: PayloadAction<number>) {
      state.volume = boundValue(0, action.payload, 1)
    },

    rewind (state) {
      state.moveThrough = 'rewind'
    },

    fastForward (state) {
      state.moveThrough = 'fastForward'
    },

    clearMoveThrough (state) {
      state.moveThrough = ''
    },

    clear (state) {
      Object.assign(state, initialState, { volume: state.volume })
    }
  }
})

/**
 * Selectors
 */

export const getMediaFinished = ({ media }: SliceRootState): boolean => (
  media.duration === media.playbackTime
)
export const getAudioHasMetadata = createSelector<SliceRootState, ProcessedAudioMetadata, boolean>(
  ({ media }) => media.audioMetadata,
  metadata => Object.values(metadata).some(value => value)
)
export const getAnimateAudioBackgroundColor = ({ media }: SliceRootState): boolean => (
  media.playing && !media.audioMetadata.backgroundColor
)
export const getMediaStopConfirmText = ({ media }: SliceRootState): string => (
  `Are you sure you want to stop this ${media.type}?`
)
