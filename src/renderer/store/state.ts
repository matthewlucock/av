import { ProcessedAudioMetadata } from 'av/audio-metadata'

export interface GeneralState {
  readonly appWidth: number
  readonly appHeight: number
  readonly backgroundHue: number
}

export const DEFAULT_GENERAL_STATE: GeneralState = {
  appWidth: 0,
  appHeight: 0,
  backgroundHue: 0
}

export interface SettingsState {
  readonly show: boolean
  readonly skipBackTime: number
  readonly skipForwardTime: number
}

export const DEFAULT_SETTINGS_STATE: SettingsState = {
  show: false,
  skipBackTime: -30,
  skipForwardTime: 30
}

export type MediaMoveThrough = 'rewind' | 'fastForward' | ''
export interface MediaState {
  readonly path: string
  readonly type: string
  readonly audioMetadata: ProcessedAudioMetadata
  readonly loaded: boolean
  readonly duration: number
  readonly playing: boolean
  readonly playbackTime: number
  readonly playbackRate: number
  readonly volume: number
  readonly moveThrough: MediaMoveThrough
}

export const DEFAULT_MEDIA_STATE: MediaState = {
  path: '',
  type: '',
  audioMetadata: { artist: '', title: '', coverArtUrl: '', backgroundColor: '' },
  loaded: false,
  duration: 0,
  playing: false,
  playbackTime: 0,
  playbackRate: 1,
  volume: 1,
  moveThrough: ''
}

export interface State {
  readonly general: GeneralState
  readonly settings: SettingsState
  readonly media: MediaState
}

export const DEFAULT_STATE: State = {
  general: DEFAULT_GENERAL_STATE,
  settings: DEFAULT_SETTINGS_STATE,
  media: DEFAULT_MEDIA_STATE
}
