import { Action } from 'redux'

import { ProcessedAudioMetadata } from 'av/audio-metadata'

interface SetMediaAction extends Action<'media/setMedia'> {
  readonly data: {
    readonly url: string
    readonly type: string
    readonly electronPath: string
  }
}
export const setMedia = (url: string, type: string, electronPath: string): SetMediaAction => (
  { type: 'media/setMedia', data: { url, type, electronPath } }
)

interface SetAudioMetadataAction extends Action<'media/setAudioMetadata'> {
  readonly data: ProcessedAudioMetadata
}
export const setAudioMetadata = (metadata: ProcessedAudioMetadata): SetAudioMetadataAction => (
  { type: 'media/setAudioMetadata', data: metadata }
)

interface MediaLoadedAction extends Action<'media/mediaLoaded'> {
  readonly data: {
    readonly duration: number
  }
}
export const mediaLoaded = (duration: number): MediaLoadedAction => (
  { type: 'media/mediaLoaded', data: { duration } }
)

interface SetMediaPlayingAction extends Action<'media/setMediaPlaying'> {
  readonly data: {
    readonly playing: boolean
  }
}
export const setMediaPlaying = (playing: boolean): SetMediaPlayingAction => (
  { type: 'media/setMediaPlaying', data: { playing } }
)

interface StoreMediaPlaybackTimeAction extends Action<'media/storeMediaPlaybackTime'> {
  readonly data: {
    readonly playbackTime: number
  }
}
export const storeMediaPlaybackTime = (playbackTime: number): StoreMediaPlaybackTimeAction => (
  { type: 'media/storeMediaPlaybackTime', data: { playbackTime } }
)

interface SetMediaPlaybackRateAction extends Action<'media/setMediaPlaybackRate'> {
  readonly data: {
    readonly playbackRate: number
  }
}
export const setMediaPlaybackRate = (playbackRate: number): SetMediaPlaybackRateAction => (
  { type: 'media/setMediaPlaybackRate', data: { playbackRate } }
)

interface SetMediaVolumeAction extends Action<'media/setMediaVolume'> {
  readonly data: {
    readonly volume: number
  }
}
export const setMediaVolume = (volume: number): SetMediaVolumeAction => (
  { type: 'media/setMediaVolume', data: { volume } }
)

type RewindMediaAction = Action<'media/rewindMedia'>
export const rewindMedia = (): RewindMediaAction => ({ type: 'media/rewindMedia' })

type FastForwardMediaAction = Action<'media/fastForwardMedia'>
export const fastForwardMedia = (): FastForwardMediaAction => ({ type: 'media/fastForwardMedia' })

type ClearMediaMoveThroughAction = Action<'media/clearMediaMoveThrough'>
export const clearMediaMoveThrough = (): ClearMediaMoveThroughAction => (
  { type: 'media/clearMediaMoveThrough' }
)

type ClearMediaAction = Action<'media/clearMedia'>
export const clearMedia = (): ClearMediaAction => ({ type: 'media/clearMedia' })

export type MediaAction = (
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
