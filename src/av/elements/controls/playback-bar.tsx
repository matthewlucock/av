import * as React from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'

import { CONTROL_HEIGHT, CONTROLS_FOREGROUND_COLOR, CONTROLS_BACKGROUND_COLOR } from 'av/globals'
import { EmitterContext } from 'av/contexts'

import { useSelector } from 'av/store'
import { mediaSlice, getMediaFinished } from 'av/store/slices/media'

import { Slider } from 'av/components/slider'
import { Timestamp } from 'av/components/timestamp'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${CONTROL_HEIGHT};
  padding: .5em;
  border-radius: 1em;
  background: ${CONTROLS_BACKGROUND_COLOR.string()};
  color: ${CONTROLS_FOREGROUND_COLOR.string()};
`

export const PlaybackBar: React.FC = () => {
  const duration = useSelector(state => state.media.duration)
  const playing = useSelector(state => state.media.playing)
  const playbackTime = useSelector(state => state.media.playbackTime)
  const finished = useSelector(getMediaFinished)
  const dispatch = useDispatch()

  const wasPlaying = React.useRef<boolean>(false)
  const emitter = React.useContext(EmitterContext)

  const roundedDuration = Math.ceil(duration)
  const roundedPlaybackTime = finished ? Math.ceil(playbackTime) : Math.floor(playbackTime)
  const roundedRemainingTime = finished ? 0 : Math.ceil(duration - roundedPlaybackTime)

  const changePlaybackTime = (playbackTime: number): void => {
    dispatch(mediaSlice.actions.storePlaybackTime(playbackTime))
    emitter.emit('playback-time-changed', playbackTime)
  }

  return (
    <Wrapper>
      <Timestamp time={roundedPlaybackTime} maximumTime={roundedDuration} />

      <Slider
        value={playbackTime}
        maximum={duration}
        changeValue={changePlaybackTime}
        draggingCallback={(dragging: boolean): void => {
          if (dragging) {
            wasPlaying.current = playing
            dispatch(mediaSlice.actions.setPlaying(false))
          } else if (!finished) {
            dispatch(mediaSlice.actions.setPlaying(wasPlaying.current))
          }
        }}
      />

      <Timestamp time={roundedRemainingTime} maximumTime={roundedDuration} />
    </Wrapper>
  )
}
