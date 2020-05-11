import { ProcessedAudioMetadata } from 'av/audio-metadata'

/**
 * General
 */

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

/**
 * Settings
 */

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

/**
 * Media
 */

export type MediaMoveThrough = 'rewind' | 'fastForward' | ''

export interface MediaState {
  readonly url: string
  readonly type: string
  readonly electronPath: string
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

/**
 * Dialog
 */

export interface DialogState {
  readonly show: boolean
  readonly message: string
  readonly confirm: boolean
  readonly result: void | boolean
}

export const DEFAULT_DIALOG_STATE: DialogState = {
  show: false,
  message: '',
  confirm: false,
  result: undefined
}

/**
 * State
 */

export interface State {
  readonly general: GeneralState
  readonly settings: SettingsState
  readonly media: MediaState
  readonly dialog: DialogState
}

export const DEFAULT_STATE: State = {
  general: DEFAULT_GENERAL_STATE,
  settings: DEFAULT_SETTINGS_STATE,
  media: DEFAULT_MEDIA_STATE,
  dialog: DEFAULT_DIALOG_STATE
}
