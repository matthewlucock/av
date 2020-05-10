import * as React from 'react'
import styled from '@emotion/styled'
import { connect as connectToRedux } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { CONTROL_HEIGHT, CONTROLS_FOREGROUND_COLOR, CONTROLS_BACKGROUND_COLOR } from 'av/globals'
import { EmitterContext } from 'av/contexts'

import { State } from 'av/store/state'
import {
  getMediaDuration,
  getMediaPlaying,
  getMediaPlaybackTime,
  getMediaFinished
} from 'av/store/selectors'
import { Dispatch } from 'av/store'
import { setMediaPlaying, storeMediaPlaybackTime } from 'av/store/actions'

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

interface StateProps {
  readonly duration: number
  readonly playing: boolean
  readonly playbackTime: number
  readonly finished: boolean
}

interface DispatchProps {
  readonly setPlaying: (playing: boolean) => void
  readonly storePlaybackTime: (playbackTime: number) => void
}

type Props = StateProps & DispatchProps

const BasePlaybackBar: React.FC<Props> = props => {
  const wasPlaying = React.useRef<boolean>(false)
  const emitter = React.useContext(EmitterContext)

  const roundedDuration = Math.ceil(props.duration)
  const roundedPlaybackTime = (
    props.finished ? Math.ceil(props.playbackTime) : Math.floor(props.playbackTime)
  )
  const roundedRemainingTime = props.finished ? 0 : Math.ceil(props.duration - roundedPlaybackTime)

  const changePlaybackTime = (playbackTime: number): void => {
    props.storePlaybackTime(playbackTime)
    emitter.emit('playback-time-changed', playbackTime)
  }

  return (
    <Wrapper>
      <Timestamp time={roundedPlaybackTime} maximumTime={roundedDuration} />

      <Slider
        value={props.playbackTime}
        maximum={props.duration}
        changeValue={changePlaybackTime}
        draggingCallback={(dragging: boolean): void => {
          if (dragging) {
            wasPlaying.current = props.playing
            props.setPlaying(false)
          } else if (!props.finished) {
            props.setPlaying(wasPlaying.current)
          }
        }}
      />

      <Timestamp time={roundedRemainingTime} maximumTime={roundedDuration} />
    </Wrapper>
  )
}

const mapStateToProps = createStructuredSelector<State, StateProps>({
  duration: getMediaDuration,
  playing: getMediaPlaying,
  playbackTime: getMediaPlaybackTime,
  finished: getMediaFinished
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => (
  {
    setPlaying: (playing: boolean): void => {
      dispatch(setMediaPlaying(playing))
    },
    storePlaybackTime: (playbackTime: number): void => {
      dispatch(storeMediaPlaybackTime(playbackTime))
    }
  }
)

export const PlaybackBar = connectToRedux(mapStateToProps, mapDispatchToProps)(BasePlaybackBar)
