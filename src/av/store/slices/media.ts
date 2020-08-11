import { createSlice, createSelector } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { MINIMUM_PLAYBACK_RATE, MAXIMUM_PLAYBACK_RATE } from 'av/globals'
import { boundValue } from 'av/util/bound-value'
import type { ProcessedAudioMetadata } from 'av/audio-metadata'

/**
 * State
 */

type MediaDetails = Readonly<{
  type: 'audio' | 'video' | ''
  url: string
  name: string
  electronPath: string
}>
type LoadedData = Readonly<{ duration: number }>

type SliceState = MediaDetails & LoadedData & Readonly<{
  audioMetadata: ProcessedAudioMetadata
  loaded: boolean
  playing: boolean
  playbackTime: number
  playbackTimeNeedsUpdating: boolean
  playbackRate: number
  volume: number
  moveThrough: 'rewind' | 'fastForward' | ''
  shortcut: 'play' | 'pause' | ''
}>

const initialState: SliceState = {
  type: '',
  url: '',
  name: '',
  electronPath: '',
  audioMetadata: { artist: '', title: '', coverArtUrl: '', color: '' },
  loaded: false,
  duration: 0,
  playing: true,
  playbackTime: 0,
  playbackTimeNeedsUpdating: false,
  playbackRate: 1,
  volume: 1,
  moveThrough: '',
  shortcut: ''
}

type SliceRootState = Readonly<{ media: SliceState }>

/**
 * Slice
 */

export const mediaSlice = createSlice({
  name: 'media',
  initialState,

  reducers: {
    setMedia: (state, { payload }: PayloadAction<MediaDetails>) => {
      state.type = payload.type
      state.url = payload.url
      state.name = payload.name
      state.electronPath = payload.electronPath
    },

    setAudioMetadata: (state, { payload }: PayloadAction<ProcessedAudioMetadata>) => {
      state.audioMetadata = payload
    },

    loaded: (state, { payload }: PayloadAction<LoadedData>) => {
      state.duration = payload.duration
      state.loaded = true
    },

    setPlaying: (state, { payload }: PayloadAction<boolean>) => {
      state.playing = payload
    },

    playPause: state => {
      state.playing = !state.playing
    },

    playPauseShortcut: state => {
      const willBePlaying = !state.playing
      state.playing = willBePlaying
      state.shortcut = willBePlaying ? 'play' : 'pause'
    },

    storePlaybackTime: (state, { payload }: PayloadAction<number>) => {
      state.playbackTime = boundValue(0, payload, state.duration)

      // Pause media upon it finishing.
      if (state.playing && payload === state.duration) {
        state.playing = false
        console.log(payload, state.duration)
      }
    },

    setPlaybackTimeNeedsUpdating: (state, { payload }: PayloadAction<boolean>) => {
      state.playbackTimeNeedsUpdating = payload
    },

    setPlaybackRate: (state, { payload }: PayloadAction<number>) => {
      state.playbackRate = boundValue(MINIMUM_PLAYBACK_RATE, payload, MAXIMUM_PLAYBACK_RATE)
    },

    setVolume: (state, { payload }: PayloadAction<number>) => {
      state.volume = boundValue(0, payload, 1)
    },

    setMoveThrough: (state, { payload }: PayloadAction<SliceState['moveThrough']>) => {
      state.moveThrough = payload
    },

    setShortcut: (state, { payload }: PayloadAction<SliceState['shortcut']>) => {
      state.shortcut = payload
    },

    clear: state => {
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
  media.playing && !media.audioMetadata.color
)
export const getMediaStopConfirmText = ({ media }: SliceRootState): string => (
  `Are you sure you want to stop this ${media.type}?`
)
