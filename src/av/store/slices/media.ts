import { createSlice, createSelector } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { MINIMUM_PLAYBACK_RATE, MAXIMUM_PLAYBACK_RATE } from 'av/globals'
import type { Nullable } from 'av/util/nullable'
import { boundValue } from 'av/util/bound-value'
import type { ProcessedAudioMetadata } from 'av/audio-metadata'

/**
 * State
 */

type MediaDetails = Readonly<{
  type: 'audio' | 'video'
  url: string
  name: string
  electronPath: string
}>

type LoadedData = Readonly<{ duration: number }>

type SliceState = Nullable<MediaDetails> & Nullable<LoadedData> & Readonly<{
  audioMetadata: ProcessedAudioMetadata
  loaded: boolean
  playing: boolean
  playbackTime: number
  playbackTimeNeedsUpdating: boolean
  playbackRate: number
  volume: number
  moveThrough: 'rewind' | 'fastForward' | null
  shortcut: 'play' | 'pause' | null
}>

const initialState: SliceState = {
  type: null,
  url: null,
  name: null,
  electronPath: null,
  audioMetadata: { artist: null, title: null, coverArtUrl: null, color: null },
  loaded: false,
  duration: null,
  playing: true,
  playbackTime: 0,
  playbackTimeNeedsUpdating: false,
  playbackRate: 1,
  volume: 1,
  moveThrough: null,
  shortcut: null
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
      if (state.duration === null) throw new Error('playbackTime stored without a duration')

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
  media.playing && media.audioMetadata.color === null
)
export const getMediaStopConfirmText = ({ media }: SliceRootState): string => (
  media.type !== null ? `Are you sure you want to stop this ${media.type}?` : ''
)
