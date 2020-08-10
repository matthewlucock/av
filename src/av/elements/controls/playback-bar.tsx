import * as React from 'react'
import { useDispatch } from 'react-redux'

import { useSelector } from 'av/store'
import { mediaSlice, getMediaFinished } from 'av/store/slices/media'

import { Slider } from 'av/components/slider'

export const PlaybackBar: React.FC = () => {
  const duration = useSelector(({ media }) => media.duration)
  const playing = useSelector(({ media }) => media.playing)
  const playbackTime = useSelector(({ media }) => media.playbackTime)
  const finished = useSelector(getMediaFinished)
  const dispatch = useDispatch()

  const wasPlaying = React.useRef<boolean>(false)

  return (
    <Slider
      value={playbackTime}
      maximum={duration}
      changeValue={playbackTime => {
        dispatch(mediaSlice.actions.storePlaybackTime(playbackTime))
        dispatch(mediaSlice.actions.setPlaybackTimeNeedsUpdating(true))
      }}
      draggingCallback={dragging => {
        if (dragging) {
          wasPlaying.current = playing
          dispatch(mediaSlice.actions.setPlaying(false))
        } else if (!finished) {
          dispatch(mediaSlice.actions.setPlaying(wasPlaying.current))
        }
      }}
    />
  )
}
