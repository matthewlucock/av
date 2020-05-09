import { Action as BaseAction } from 'redux'

import { ProcessedAudioMetadata } from '../audio-metadata'

/**
 * general
 */

interface SetAppSizeAction extends BaseAction<'general/setAppSize'> {
  readonly data: {
    readonly width: number
    readonly height: number
  }
}
export const setAppSize = (width: number, height: number): SetAppSizeAction => (
  { type: 'general/setAppSize', data: { width, height } }
)

interface SetBackgroundHueAction extends BaseAction<'general/setBackgroundHue'> {
  readonly data: {
    readonly backgroundHue: number
  }
}
export const setBackgroundHue = (backgroundHue: number): SetBackgroundHueAction => (
  { type: 'general/setBackgroundHue', data: { backgroundHue } }
)

type GeneralAction = SetAppSizeAction | SetBackgroundHueAction

/**
 * settings
 */

interface SetShowSettingsAction extends BaseAction<'settings/setShowSettings'> {
  readonly data: {
    readonly showSettings: boolean
  }
}
export const setShowSettings = (showSettings: boolean): SetShowSettingsAction => (
  { type: 'settings/setShowSettings', data: { showSettings } }
)

interface SetSkipBackTimeAction extends BaseAction<'settings/setSkipBackTime'> {
  readonly data: {
    readonly skipBackTime: number
  }
}
export const setSkipBackTime = (skipBackTime: number): SetSkipBackTimeAction => (
  { type: 'settings/setSkipBackTime', data: { skipBackTime } }
)

interface SetSkipForwardTimeAction extends BaseAction<'settings/setSkipForwardTime'> {
  readonly data: {
    readonly skipForwardTime: number
  }
}
export const setSkipForwardTime = (skipForwardTime: number): SetSkipForwardTimeAction => (
  { type: 'settings/setSkipForwardTime', data: { skipForwardTime } }
)

type SettingsAction = SetShowSettingsAction | SetSkipBackTimeAction | SetSkipForwardTimeAction

/**
 * media
 */

interface SetMediaAction extends BaseAction<'media/setMedia'> {
  readonly data: {
    readonly path: string
    readonly type: string
  }
}
export const setMedia = (path: string, type: string): SetMediaAction => (
  { type: 'media/setMedia', data: { path, type } }
)

interface SetAudioMetadataAction extends BaseAction<'media/setAudioMetadata'> {
  readonly data: ProcessedAudioMetadata
}
export const setAudioMetadata = (metadata: ProcessedAudioMetadata): SetAudioMetadataAction => (
  { type: 'media/setAudioMetadata', data: metadata }
)

interface MediaLoadedAction extends BaseAction<'media/mediaLoaded'> {
  readonly data: {
    readonly duration: number
  }
}
export const mediaLoaded = (duration: number): MediaLoadedAction => (
  { type: 'media/mediaLoaded', data: { duration } }
)

interface SetMediaPlayingAction extends BaseAction<'media/setMediaPlaying'> {
  readonly data: {
    readonly playing: boolean
  }
}
export const setMediaPlaying = (playing: boolean): SetMediaPlayingAction => (
  { type: 'media/setMediaPlaying', data: { playing } }
)

interface StoreMediaPlaybackTimeAction extends BaseAction<'media/storeMediaPlaybackTime'> {
  readonly data: {
    readonly playbackTime: number
  }
}
export const storeMediaPlaybackTime = (playbackTime: number): StoreMediaPlaybackTimeAction => (
  { type: 'media/storeMediaPlaybackTime', data: { playbackTime } }
)

interface SetMediaPlaybackRateAction extends BaseAction<'media/setMediaPlaybackRate'> {
  readonly data: {
    readonly playbackRate: number
  }
}
export const setMediaPlaybackRate = (playbackRate: number): SetMediaPlaybackRateAction => (
  { type: 'media/setMediaPlaybackRate', data: { playbackRate } }
)

interface SetMediaVolumeAction extends BaseAction<'media/setMediaVolume'> {
  readonly data: {
    readonly volume: number
  }
}
export const setMediaVolume = (volume: number): SetMediaVolumeAction => (
  { type: 'media/setMediaVolume', data: { volume } }
)

type RewindMediaAction = BaseAction<'media/rewindMedia'>
export const rewindMedia = (): RewindMediaAction => ({ type: 'media/rewindMedia' })

type FastForwardMediaAction = BaseAction<'media/fastForwardMedia'>
export const fastForwardMedia = (): FastForwardMediaAction => ({ type: 'media/fastForwardMedia' })

type ClearMediaMoveThroughAction = BaseAction<'media/clearMediaMoveThrough'>
export const clearMediaMoveThrough = (): ClearMediaMoveThroughAction => (
  { type: 'media/clearMediaMoveThrough' }
)

type ClearMediaAction = BaseAction<'media/clearMedia'>
export const clearMedia = (): ClearMediaAction => ({ type: 'media/clearMedia' })

type MediaAction = (
  SetMediaAction |
  SetAudioMetadataAction |
  MediaLoadedAction |
  SetMediaPlayingAction |
  StoreMediaPlaybackTimeAction |
  SetMediaPlaybackRateAction |
  SetMediaVolumeAction |
  RewindMediaAction |
  FastForwardMediaAction |
  ClearMediaMoveThroughAction |
  ClearMediaAction
)

export type Action = GeneralAction | SettingsAction | MediaAction
