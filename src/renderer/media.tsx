import electron from 'electron'
import * as React from 'react'
import { connect as connectToRedux } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { MOVE_THROUGH_RATE } from './globals'
import { EmitterContext } from './contexts'

import { State } from './store/state'
import {
  getMediaUrl,
  getMediaPlaying,
  getMediaPlaybackRate,
  getMediaVolume,
  getMediaRewinding,
  getMediaFastForwarding
} from './store/selectors'
import { Dispatch } from './store'
import { mediaLoaded, setMediaPlaying, storeMediaPlaybackTime } from './store/actions'

interface StateProps {
  readonly url: string
  readonly playing: boolean
  readonly playbackRate: number
  readonly volume: number
  readonly rewinding: boolean
  readonly fastForwarding: boolean
}

interface DispatchProps {
  readonly mediaLoaded: (duration: number) => void
  readonly setPlaying: (playing: boolean) => void
  readonly storePlaybackTime: (playbackTime: number) => void
}

interface OwnProps {
  readonly nativeMedia: React.ElementType
}

type Props = StateProps & DispatchProps & OwnProps

const BaseMedia: React.FC<Props> = props => {
  const nativeMedia = React.useRef<HTMLMediaElement | null>(null)
  const wasPlaying = React.useRef<boolean>(false)

  const emitter = React.useContext(EmitterContext)

  /**
   * Playback
   */

  const playbackFrameRequestId = React.useRef<number>(0)

  const playbackFrame = (): void => {
    if (!nativeMedia.current) return
    props.storePlaybackTime(nativeMedia.current.currentTime)
    playbackFrameRequestId.current = requestAnimationFrame(playbackFrame)
  }

  React.useEffect(() => {
    if (!nativeMedia.current) return

    if (props.playing) {
      nativeMedia.current.play()
      playbackFrameRequestId.current = requestAnimationFrame(playbackFrame)
    } else {
      nativeMedia.current.pause()
      cancelAnimationFrame(playbackFrameRequestId.current)
    }

    return () => {
      cancelAnimationFrame(playbackFrameRequestId.current)
    }
  }, [props.playing])

  /**
   * Playback time changed
   */

  const playbackTimeChangedListener = React.useRef<(playbackTime: number) => void>()

  React.useEffect(() => {
    playbackTimeChangedListener.current = (playbackTime: number) => {
      if (nativeMedia.current) nativeMedia.current.currentTime = playbackTime
    }

    emitter.on('playback-time-changed', playbackTimeChangedListener.current)

    return () => {
      if (playbackTimeChangedListener.current) {
        emitter.off('playback-time-changed', playbackTimeChangedListener.current)
      }
    }
  }, [])

  /**
   * Playback rate changed
   */

  React.useEffect(() => {
    if (!nativeMedia.current) return
    nativeMedia.current.playbackRate = props.playbackRate
  }, [props.playbackRate])

  /**
   * Volume changed
   */

  React.useEffect(() => {
    if (!nativeMedia.current) return
    nativeMedia.current.volume = props.volume
  }, [props.volume])

  /**
   * Move through (rewinding and fast-forwarding while paused)
   */

  const moveThroughFrameRequestId = React.useRef<number>(0)
  const lastMoveThroughFrameTime = React.useRef<number>(0)

  const moveThroughFrame = (time: number): void => {
    if (!nativeMedia.current) return

    const frameTimeDelta = time - lastMoveThroughFrameTime.current
    lastMoveThroughFrameTime.current = time

    let playbackTimeDelta = frameTimeDelta / 1000 * MOVE_THROUGH_RATE * props.playbackRate
    if (props.rewinding) playbackTimeDelta *= -1

    nativeMedia.current.currentTime += playbackTimeDelta
    props.storePlaybackTime(nativeMedia.current.currentTime)

    moveThroughFrameRequestId.current = requestAnimationFrame(moveThroughFrame)
  }

  React.useEffect(() => {
    if (props.rewinding || (props.fastForwarding && !props.playing)) {
      wasPlaying.current = props.playing
      props.setPlaying(false)

      lastMoveThroughFrameTime.current = performance.now()
      moveThroughFrameRequestId.current = requestAnimationFrame(moveThroughFrame)
    } else {
      cancelAnimationFrame(moveThroughFrameRequestId.current)
      if (wasPlaying.current) props.setPlaying(true)
    }

    return () => {
      cancelAnimationFrame(moveThroughFrameRequestId.current)
    }
  }, [props.rewinding, props.fastForwarding])

  /**
   * Fast-forwarding while playing
   */

  const lastPlaybackRate = React.useRef<number>(props.playbackRate)

  React.useEffect(() => {
    if (!nativeMedia.current) return

    if (props.playing) {
      if (props.fastForwarding) {
        lastPlaybackRate.current = nativeMedia.current.playbackRate
        nativeMedia.current.playbackRate = MOVE_THROUGH_RATE
      } else {
        nativeMedia.current.playbackRate = lastPlaybackRate.current
      }
    } else {
      // Ensure playback rate is reset when fast-forwarding through the end.
      nativeMedia.current.playbackRate = props.playbackRate
    }
  }, [props.fastForwarding])

  /**
   * Component
   */

  return (
    <props.nativeMedia
      ref={nativeMedia}
      src={props.url}
      onLoadedData={() => {
        if (!nativeMedia.current) return
        props.mediaLoaded(nativeMedia.current.duration)

        if (nativeMedia.current instanceof HTMLVideoElement) {
          electron.ipcRenderer.invoke(
            'resize-window',
            nativeMedia.current.videoWidth,
            nativeMedia.current.videoHeight
          )
        } else {
          electron.ipcRenderer.invoke('resize-window')
        }
      }}
    />
  )
}

const mapStateToProps = createStructuredSelector<State, StateProps>({
  url: getMediaUrl,
  playing: getMediaPlaying,
  playbackRate: getMediaPlaybackRate,
  volume: getMediaVolume,
  rewinding: getMediaRewinding,
  fastForwarding: getMediaFastForwarding
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => (
  {
    mediaLoaded: (duration: number): void => {
      dispatch(mediaLoaded(duration))
    },
    setPlaying: (playing: boolean): void => {
      dispatch(setMediaPlaying(playing))
    },
    storePlaybackTime: (playbackTime: number): void => {
      dispatch(storeMediaPlaybackTime(playbackTime))
    }
  }
)

export const Media = connectToRedux(mapStateToProps, mapDispatchToProps)(BaseMedia)
