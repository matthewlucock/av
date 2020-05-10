import { createSelector } from 'reselect'
import Color from 'color'

import { BACKGROUND_COLOR_SATURATION, BACKGROUND_COLOR_LIGHTNESS } from 'av/globals'
import { ProcessedAudioMetadata } from 'av/audio-metadata'

import { State, MediaMoveThrough } from './state'

/**
 * general
 */

export const getAppWidth = (state: State): number => state.general.appWidth
export const getAppHeight = (state: State): number => state.general.appHeight

export const getBackgroundHue = (state: State): number => state.general.backgroundHue
export const getBackgroundColor = createSelector<State, number, string>(
  getBackgroundHue,
  hue => Color({ h: hue, s: BACKGROUND_COLOR_SATURATION, l: BACKGROUND_COLOR_LIGHTNESS }).string()
)

/**
 * settings
 */

export const getShowSettings = (state: State): boolean => state.settings.show
export const getSkipBackTime = (state: State): number => state.settings.skipBackTime
export const getSkipForwardTime = (state: State): number => state.settings.skipForwardTime

export const getDraggingEnabled = createSelector<State, boolean, boolean>(
  getShowSettings,
  showSettings => !showSettings
)

/**
 * media
 */

export const getMediaUrl = (state: State): string => state.media.url

export const getMediaType = (state: State): string => state.media.type
export const getMediaIsAudio = createSelector<State, string, boolean>(
  getMediaType,
  mediaType => mediaType === 'audio'
)
export const getMediaIsVideo = createSelector<State, string, boolean>(
  getMediaType,
  mediaType => mediaType === 'video'
)

export const getMediaElectronPath = (state: State): string => state.media.electronPath
export const getAudioMetadata = (state: State): ProcessedAudioMetadata => state.media.audioMetadata
export const getAudioHasMetadata = createSelector<State, ProcessedAudioMetadata, boolean>(
  getAudioMetadata,
  metadata => Object.values(metadata).some(value => value)
)
export const getMediaLoaded = (state: State): boolean => state.media.loaded
export const getMediaDuration = (state: State): number => state.media.duration
export const getMediaPlaying = (state: State): boolean => state.media.playing
export const getMediaPlaybackTime = (state: State): number => state.media.playbackTime
export const getMediaFinished = createSelector<State, number, number, boolean>(
  [getMediaDuration, getMediaPlaybackTime],
  (duration, playbackTime) => duration === playbackTime
)
export const getMediaPlaybackRate = (state: State): number => state.media.playbackRate
export const getMediaVolume = (state: State): number => state.media.volume

const getMediaMoveThrough = (state: State): MediaMoveThrough => state.media.moveThrough
export const getMediaRewinding = createSelector<State, MediaMoveThrough, boolean>(
  getMediaMoveThrough,
  moveThrough => moveThrough === 'rewind'
)
export const getMediaFastForwarding = createSelector<State, MediaMoveThrough, boolean>(
  getMediaMoveThrough,
  moveThrough => moveThrough === 'fastForward'
)

export const getAutoHideMediaControls = createSelector<State, boolean, boolean, boolean>(
  [getShowSettings, getMediaIsVideo],
  (showSettings, mediaIsVideo) => !showSettings && mediaIsVideo
)
export const getAnimateAudioBackgroundColor = createSelector<
State,
boolean,
ProcessedAudioMetadata,
boolean
>(
  [getMediaPlaying, getAudioMetadata],
  (mediaPlaying, metadata) => mediaPlaying && !metadata.backgroundColor
)
export const getMediaStopConfirmText = createSelector<State, string, string>(
  getMediaType,
  (mediaType) => `Are you sure you want to stop this ${mediaType}?`
)
