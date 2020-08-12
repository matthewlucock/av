import * as React from 'react'
import { useDispatch } from 'react-redux'

import { MOVE_THROUGH_RATE } from './globals'
import { electronResizeWindow } from 'av/env/electron-window'

import { store, useSelector } from 'av/store'
import { mediaSlice } from 'av/store/slices/media'

export const BaseMedia: React.FC = () => {
  const type = useSelector(({ media }) => media.type)
  const url = useSelector(({ media }) => media.url)
  const loaded = useSelector(({ media }) => media.loaded)
  const playing = useSelector(({ media }) => media.playing)
  const playbackTimeNeedsUpdating = useSelector(({ media }) => media.playbackTimeNeedsUpdating)
  const playbackRate = useSelector(({ media }) => media.playbackRate)
  const volume = useSelector(({ media }) => media.volume)
  const moveThrough = useSelector(({ media }) => media.moveThrough)
  const dispatch = useDispatch()

  const nativeMedia = React.useRef<HTMLMediaElement | null>(null)
  const wasPlaying = React.useRef<boolean>(false)

  /**
   * Playback
   */

  const playbackFrameRequestId = React.useRef<number>(0)

  const playbackFrame = (): void => {
    if (!nativeMedia.current) return
    dispatch(mediaSlice.actions.storePlaybackTime(nativeMedia.current.currentTime))
    playbackFrameRequestId.current = requestAnimationFrame(playbackFrame)
  }

  React.useEffect(() => {
    if (!nativeMedia.current || !loaded) return

    if (playing) {
      nativeMedia.current.play()
      playbackFrameRequestId.current = requestAnimationFrame(playbackFrame)
    } else {
      nativeMedia.current.pause()
      cancelAnimationFrame(playbackFrameRequestId.current)
    }

    return () => cancelAnimationFrame(playbackFrameRequestId.current)
  }, [loaded, playing])

  /**
   * Playback time changed
   */

  React.useEffect(() => {
    if (nativeMedia.current && playbackTimeNeedsUpdating) {
      nativeMedia.current.currentTime = store.getState().media.playbackTime
      dispatch(mediaSlice.actions.setPlaybackTimeNeedsUpdating(false))
    }
  }, [playbackTimeNeedsUpdating])

  /**
   * Playback rate changed
   */

  React.useEffect(() => {
    if (!nativeMedia.current) return
    nativeMedia.current.playbackRate = playbackRate
  }, [playbackRate])

  /**
   * Volume changed
   */

  React.useEffect(() => {
    if (!nativeMedia.current) return
    nativeMedia.current.volume = volume
  }, [volume])

  /**
   * Move through (rewinding and fast-forwarding while paused)
   */

  const moveThroughFrameRequestId = React.useRef<number>(0)
  const lastMoveThroughFrameTime = React.useRef<number>(0)

  const moveThroughFrame = (time: number): void => {
    if (!nativeMedia.current) return

    const frameTimeDelta = time - lastMoveThroughFrameTime.current
    lastMoveThroughFrameTime.current = time

    let playbackTimeDelta = frameTimeDelta / 1000 * MOVE_THROUGH_RATE * playbackRate
    if (moveThrough === 'rewind') playbackTimeDelta *= -1

    nativeMedia.current.currentTime += playbackTimeDelta
    dispatch(mediaSlice.actions.storePlaybackTime(nativeMedia.current.currentTime))

    moveThroughFrameRequestId.current = requestAnimationFrame(moveThroughFrame)
  }

  React.useEffect(() => {
    if (moveThrough === 'rewind' || (moveThrough === 'fastForward' && !playing)) {
      wasPlaying.current = playing
      dispatch(mediaSlice.actions.setPlaying(false))

      lastMoveThroughFrameTime.current = performance.now()
      moveThroughFrameRequestId.current = requestAnimationFrame(moveThroughFrame)
    } else {
      cancelAnimationFrame(moveThroughFrameRequestId.current)
      if (wasPlaying.current) dispatch(mediaSlice.actions.setPlaying(true))
    }

    return () => {
      cancelAnimationFrame(moveThroughFrameRequestId.current)
    }
  }, [moveThrough])

  /**
   * Fast-forwarding while playing
   */

  const lastPlaybackRate = React.useRef<number>(playbackRate)

  React.useEffect(() => {
    if (!nativeMedia.current) return

    if (playing) {
      if (moveThrough === 'fastForward') {
        lastPlaybackRate.current = nativeMedia.current.playbackRate
        nativeMedia.current.playbackRate = MOVE_THROUGH_RATE
      } else {
        nativeMedia.current.playbackRate = lastPlaybackRate.current
      }
    } else {
      // Ensure playback rate is reset when fast-forwarding through the end.
      nativeMedia.current.playbackRate = playbackRate
    }
  }, [moveThrough])

  /**
   * Component
   */

  if (!url) throw new Error('<BaseMedia /> rendered without a source URL')

  const onLoadedData = (): void => {
    if (!nativeMedia.current) return
    dispatch(mediaSlice.actions.loaded({ duration: nativeMedia.current.duration }))

    // Type guard is necessary to reference video-only properties as opposed to simply evaluating
    // `type === 'video'`.
    if (nativeMedia.current instanceof HTMLVideoElement) {
      electronResizeWindow(nativeMedia.current.videoWidth, nativeMedia.current.videoHeight)
    } else {
      electronResizeWindow()
    }
  }

  // If there is a good, simple way to create a DOM element of a dynamic name with JSX, then I don't
  // know what it is.

  if (type === 'audio') {
    return <audio ref={nativeMedia} src={url} onLoadedData={onLoadedData} />
  } else if (type === 'video') {
    // Because `HTMLVideoElement` is an extension of `HTMLMediaElement`, `HTMLVideoElement`
    // satisfies `HTMLMediaElement`. However, the converse is untrue, so a ref with value of type
    // `HTMLMediaElement` does not satisfy a ref prop with value of type `HTMLVideoElement`.
    // The same holds for a ref with value of type `HTMLAudioElement | HTMLVideoElement`.
    // Providing the DOM node to the ref directly, rather than providing the ref to the DOM node,
    // solves this issue and ensures correct typing.
    // Interestingly, `HTMLMediaElement` satisfies `HTMLAudioElement`, rendering this only
    // necessary for `HTMLVideoElement`.
    return (
      <video
        ref={node => {
          nativeMedia.current = node
        }}
        src={url}
        onLoadedData={onLoadedData}
      />
    )
  } else {
    return null
  }
}
