import * as preact from 'preact'
import { useRef, useEffect, useLayoutEffect } from 'preact/hooks'
import { view } from '@risingstack/react-easy-state'

import { handlePromiseRejection, errorIsNotAllowedError } from '@/util'
import { useMedia } from '@/store'

export const NativeMedia: preact.FunctionComponent = view(() => {
  const media = useMedia()
  const nativeMedia = useRef<HTMLMediaElement>()

  const playbackFrameRequestId = useRef<number>(0)
  const playbackFrame = (): void => {
    media.storePlaybackTime(nativeMedia.current.currentTime)
    playbackFrameRequestId.current = requestAnimationFrame(playbackFrame)
  }

  const play = async (): Promise<void> => {
    try {
      await nativeMedia.current.play()
    } catch (error) {
      if (errorIsNotAllowedError(error)) {
        media.applyAutoplayBlock()
      } else {
        throw error
      }

      return
    }

    playbackFrameRequestId.current = requestAnimationFrame(playbackFrame)
  }

  useLayoutEffect(() => {
    if (!media.loaded) return

    if (media.playing) {
      handlePromiseRejection(play())
    } else {
      nativeMedia.current.pause()
      cancelAnimationFrame(playbackFrameRequestId.current)
    }

    return (): void => cancelAnimationFrame(playbackFrameRequestId.current)
  }, [media.playing, media.loaded])

  useLayoutEffect(() => {
    if (media.playbackTimeNeedsUpdating) {
      nativeMedia.current.currentTime = media.playbackTime
      media.clearPlaybackTimeUpdate()
    }
  }, [media.playbackTimeNeedsUpdating])

  useEffect(() => {
    nativeMedia.current.playbackRate = media.playbackRate
  }, [media.playbackRate])

  const rewindFrameRequestId = useRef<number>(0)
  const lastRewindFrameTime = useRef<number>(0)
  const rewindFrame = (time: number): void => {
    const frameTimeDelta = time - lastRewindFrameTime.current
    lastRewindFrameTime.current = time

    const playbackTimeDelta = frameTimeDelta / 1000 * media.speedThroughRate
    const newPlaybackTime = nativeMedia.current.currentTime + playbackTimeDelta

    nativeMedia.current.currentTime = newPlaybackTime
    media.storePlaybackTime(newPlaybackTime)

    rewindFrameRequestId.current = requestAnimationFrame(rewindFrame)
  }

  useEffect(() => {
    if (media.rewinding) {
      nativeMedia.current.pause()
      lastRewindFrameTime.current = window.performance.now()
      rewindFrameRequestId.current = requestAnimationFrame(rewindFrame)
    } else {
      cancelAnimationFrame(rewindFrameRequestId.current)

      if (media.fastForwarding) {
        nativeMedia.current.playbackRate = media.speedThroughRate
      } else {
        nativeMedia.current.playbackRate = 1
      }
    }

    return (): void => cancelAnimationFrame(rewindFrameRequestId.current)
  }, [media.speedThroughRate])

  // This being a layout effect means that volume change happens during the callback of the user's
  // interaction to change the volume, ensuring that the change will be allowed by browser autoplay
  // restrictions.
  useLayoutEffect(() => {
    nativeMedia.current.volume = media.volume
  }, [media.volume])

  useEffect(() => {

  })

  const onLoadedData = (): void => {
    media.onLoaded(nativeMedia.current)
  }

  if (media.isVideo) {
    return (
      <video
        ref={node => {
          if (node !== null) nativeMedia.current = node
        }}
        src={media.info.src}
        onLoadedData={onLoadedData}
      />
    )
  } else if (media.isAudio) {
    return (
      <audio
        ref={nativeMedia}
        src={media.info.src}
        onLoadedData={onLoadedData}
      />
    )
  } else {
    throw new Error('Invalid media type')
  }
})
