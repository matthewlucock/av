import * as React from 'react'
import styled from '@emotion/styled'
import { connect as connectToRedux } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { State } from 'av/store/state'
import {
  getShowSettings,
  getSkipBackTime,
  getSkipForwardTime,
  getMediaIsAudio,
  getMediaPlaying
} from 'av/store/selectors'
import { Dispatch } from 'av/store'
import { setShowSettings, setSkipBackTime, setSkipForwardTime } from 'av/store/actions/settings'
import { setMediaPlaying } from 'av/store/actions/media'

import { Modal, ModalButtons } from 'av/components/modal'
import { ControlButton } from 'av/components/control-button'
import { NumericInput } from 'av/components/numeric-input'

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
    <Modal show={props.showSettings}>
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

      <ModalButtons>
        <ControlButton onClick={() => props.setShowSettings(false)}>Close</ControlButton>
      </ModalButtons>
    </Modal>
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
