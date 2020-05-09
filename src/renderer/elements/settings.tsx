import * as React from 'react'
import styled from '@emotion/styled'
import { connect as connectToRedux } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { TRANSITION_DURATION, CONTROLS_BACKGROUND_COLOR } from '../globals'

import { State } from '../store/state'
import {
  getShowSettings,
  getSkipBackTime,
  getSkipForwardTime,
  getMediaIsAudio,
  getMediaPlaying
} from '../store/selectors'
import { Dispatch } from '../store'
import {
  setShowSettings,
  setSkipBackTime,
  setSkipForwardTime,
  setMediaPlaying
} from '../store/actions'

import { Pane } from '../components/pane'
import { ControlButton } from '../components/control-button'
import { NumericInput } from '../components/numeric-input'

interface WrapperProps {
  readonly visible: boolean
}

const Wrapper = styled(Pane)<WrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .5);
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  opacity: ${props => props.visible ? 1 : 0};
  backdrop-filter: blur(.2em);
  transition-property: visibility, opacity;
  transition-duration: ${TRANSITION_DURATION};
`

const Body = styled.div`
  font-size: 1.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  padding: 1em 2em;
  border-radius: 1em;
  background-color: ${CONTROLS_BACKGROUND_COLOR.string()};
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const CloseButton = styled(ControlButton)`
  margin-top: .5em;
`

interface StateProps {
  readonly showSettings: boolean
  readonly skipBackTime: number
  readonly skipForwardTime: number
  readonly mediaIsAudio: boolean
  readonly mediaPlaying: boolean
}

interface DispatchProps {
  readonly setShowSettings: (showSettings: boolean) => void
  readonly setSkipBackTime: (skipBackTime: number) => void
  readonly setSkipForwardTime: (skipForwardTime: number) => void
  readonly setMediaPlaying: (mediaPlaying: boolean) => void
}

type Props = StateProps & DispatchProps

const BaseSettings: React.FC<Props> = props => {
  /**
   * Automatic play-pausing
   */

  const wasPlaying = React.useRef<boolean>(false)

  React.useEffect(() => {
    // Dont play-pause if the media is audio.
    if (props.mediaIsAudio) {
      wasPlaying.current = false
      return
    }

    if (props.showSettings && props.mediaPlaying) {
      props.setMediaPlaying(false)
      wasPlaying.current = true
    } else if (!props.showSettings && wasPlaying.current) {
      props.setMediaPlaying(true)
      wasPlaying.current = false
    }
  }, [props.showSettings, props.mediaIsAudio])

  /**
   * Component
   */

  return (
    <Wrapper visible={props.showSettings}>
      <Body>
        <Row>
          <span>Skip forward</span>
          <NumericInput
            value={props.skipForwardTime}
            setValue={props.setSkipForwardTime}
            suffix=' seconds'
          />
        </Row>

        <Row>
          <span>Skip back</span>
          <NumericInput
            value={Math.abs(props.skipBackTime)}
            setValue={skipBackTime => props.setSkipBackTime(-skipBackTime)}
            suffix=' seconds'
          />
        </Row>

        <CloseButton onClick={() => props.setShowSettings(false)}>Close</CloseButton>
      </Body>
    </Wrapper>
  )
}
const mapStateToProps = createStructuredSelector<State, StateProps>({
  showSettings: getShowSettings,
  skipBackTime: getSkipBackTime,
  skipForwardTime: getSkipForwardTime,
  mediaIsAudio: getMediaIsAudio,
  mediaPlaying: getMediaPlaying
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => (
  {
    setShowSettings: (showSettings: boolean): void => {
      dispatch(setShowSettings(showSettings))
    },
    setSkipBackTime: (skipBackTime: number): void => {
      dispatch(setSkipBackTime(skipBackTime))
    },
    setSkipForwardTime: (skipForwardTime: number): void => {
      dispatch(setSkipForwardTime(skipForwardTime))
    },
    setMediaPlaying: (mediaPlaying: boolean): void => {
      dispatch(setMediaPlaying(mediaPlaying))
    }
  }
)

export const Settings = connectToRedux(mapStateToProps, mapDispatchToProps)(BaseSettings)
