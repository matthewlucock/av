import * as React from 'react'
import styled from '@emotion/styled'
import { connect as connectToRedux } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes as fasTimes,
  faMinus as fasMinus,
  faPlus as fasPlus
} from '@fortawesome/free-solid-svg-icons'

import { PLAYBACK_RATE_INCREMENT_VALUE } from 'av/globals'

import { State } from 'av/store/state'
import { getMediaPlaybackRate } from 'av/store/selectors'
import { Dispatch } from 'av/store'
import { setMediaPlaybackRate } from 'av/store/actions'

import { RoundControlButton } from 'av/components/control-button'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const Rate = styled.div`
  font-size: .85em;
  margin: 0 .75em;
  text-align: center;
`

const TimesIcon = styled(FontAwesomeIcon)`
  font-size: .75em;
`

interface StateProps {
  readonly playbackRate: number
}

interface DispatchProps {
  readonly setPlaybackRate: (playbackRate: number) => void
}

type Props = StateProps & DispatchProps

const BasePlaybackRate: React.FC<Props> = props => {
  const decrement = (): void => {
    props.setPlaybackRate(props.playbackRate - PLAYBACK_RATE_INCREMENT_VALUE)
  }

  const increment = (): void => {
    props.setPlaybackRate(props.playbackRate + PLAYBACK_RATE_INCREMENT_VALUE)
  }

  return (
    <Wrapper>
      <RoundControlButton onClick={decrement}>
        <FontAwesomeIcon icon={fasMinus} />
      </RoundControlButton>

      <Rate style={{ width: `${PLAYBACK_RATE_INCREMENT_VALUE.toString().length + 1}ch` }}>
        {props.playbackRate}
        <TimesIcon icon={fasTimes} />
      </Rate>

      <RoundControlButton onClick={increment}>
        <FontAwesomeIcon icon={fasPlus} />
      </RoundControlButton>
    </Wrapper>
  )
}

const mapStateToProps = createStructuredSelector<State, StateProps>({
  playbackRate: getMediaPlaybackRate
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => (
  {
    setPlaybackRate: (playbackRate: number): void => {
      dispatch(setMediaPlaybackRate(playbackRate))
    }
  }
)

export const PlaybackRate = connectToRedux(mapStateToProps, mapDispatchToProps)(BasePlaybackRate)
