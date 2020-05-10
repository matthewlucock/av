import * as React from 'react'
import { connect as connectToRedux } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { EmitterContext } from 'av/contexts'

import { State } from 'av/store/state'
import { getMediaPlaybackTime } from 'av/store/selectors'
import { Dispatch } from 'av/store'
import { storeMediaPlaybackTime } from 'av/store/actions'

import { RoundControlButton } from 'av/components/control-button'

interface StateProps {
  readonly playbackTime: number
}

interface DispatchProps {
  readonly storePlaybackTime: (playbackTime: number) => void
}

interface OwnProps {
  readonly time: number
  readonly disabled?: boolean
  readonly children: React.ReactElement
}

type Props = StateProps & DispatchProps & OwnProps

const BaseSkipThrough: React.FC<Props> = props => {
  const emitter = React.useContext(EmitterContext)

  const changePlaybackTime = (playbackTime: number): void => {
    props.storePlaybackTime(playbackTime)
    emitter.emit('playback-time-changed', playbackTime)
  }

  return (
    <RoundControlButton
      disabled={props.disabled}
      onClick={() => changePlaybackTime(props.playbackTime + props.time)}
    >
      {props.children}
    </RoundControlButton>
  )
}

const mapStateToProps = createStructuredSelector<State, StateProps>({
  playbackTime: getMediaPlaybackTime
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => (
  {
    storePlaybackTime: (playbackTime: number): void => {
      dispatch(storeMediaPlaybackTime(playbackTime))
    }
  }
)

export const SkipThrough = connectToRedux(mapStateToProps, mapDispatchToProps)(BaseSkipThrough)
