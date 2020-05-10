import { MediaState, DEFAULT_MEDIA_STATE } from '../state'
import { Action } from '../actions'

import {
  MINIMUM_PLAYBACK_RATE,
  MAXIMUM_PLAYBACK_RATE,
  PLAYBACK_RATE_INCREMENT_VALUE
} from 'av/globals'
import { boundValue } from 'av/util/bound-value'

export const reducer = (state: MediaState | void, action: Action): MediaState => {
  if (!state) state = DEFAULT_MEDIA_STATE

  switch (action.type) {
    case 'media/setMedia':
      return {
        ...state,
        url: action.data.url,
        type: action.data.type,
        electronPath: action.data.electronPath
      }

    case 'media/setAudioMetadata':
      return { ...state, audioMetadata: action.data }

    case 'media/mediaLoaded':
      return {
        ...state,
        loaded: true,
        duration: action.data.duration,
        // Play media immediately.
        playing: true
      }

    case 'media/setMediaPlaying':
      return { ...state, playing: action.data.playing }

    case 'media/storeMediaPlaybackTime': {
      // Pause media upon it finishing.
      const playing = (
        state.playing && action.data.playbackTime === state.duration
          ? false
          : state.playing
      )

      return {
        ...state,
        playing,
        playbackTime: boundValue(0, action.data.playbackTime, state.duration)
      }
    }

    case 'media/setMediaPlaybackRate': {
      const roundingValue = 1 / PLAYBACK_RATE_INCREMENT_VALUE

      return {
        ...state,
        playbackRate: boundValue(
          MINIMUM_PLAYBACK_RATE,
          // Mitigate floating point errors.
          Math.round(action.data.playbackRate * roundingValue) / roundingValue,
          MAXIMUM_PLAYBACK_RATE
        )
      }
    }

    case 'media/setMediaVolume':
      return { ...state, volume: boundValue(0, action.data.volume, 1) }

    case 'media/rewindMedia':
      return { ...state, moveThrough: 'rewind' }

    case 'media/fastForwardMedia':
      return { ...state, moveThrough: 'fastForward' }

    case 'media/clearMediaMoveThrough':
      return { ...state, moveThrough: DEFAULT_MEDIA_STATE.moveThrough }

    case 'media/clearMedia':
      return { ...DEFAULT_MEDIA_STATE, volume: state.volume }

    default:
      return state
  }
}
