import * as React from 'react'
import styled from '@emotion/styled'
import { connect as connectToRedux } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

import { CONTROL_ICON_OFFSET } from 'av/globals'

import { State } from 'av/store/state'
import { getMediaPlaying } from 'av/store/selectors'
import { Dispatch } from 'av/store'
import { playPauseMedia } from 'av/store/thunks'

import { RoundControlButton } from 'av/components/control-button'

const PlayIcon = styled(FontAwesomeIcon)`
  position: relative;
  left: ${CONTROL_ICON_OFFSET};
`

interface StateProps {
  readonly playing: boolean
}

interface DispatchProps {
  readonly playPause: () => void
}

type Props = StateProps & DispatchProps

const BasePlayPause: React.FC<Props> = props => {
  /**
   * Keyboard control
   */

  const keyupListener = React.useRef<(event: KeyboardEvent) => void>()

  React.useEffect(() => {
    keyupListener.current = (event: KeyboardEvent): void => {
      if (event.code === 'Space') props.playPause()
    }

    document.addEventListener('keyup', keyupListener.current)

    return () => {
      if (keyupListener.current) {
        document.removeEventListener('keyup', keyupListener.current)
      }
    }
  }, [])

  /**
   * Component
   */

  return (
    <RoundControlButton primary onClick={props.playPause}>
      {props.playing ? <FontAwesomeIcon icon={faPause} /> : <PlayIcon icon={faPlay} />}
    </RoundControlButton>
  )
}

const mapStateToProps = createStructuredSelector<State, StateProps>({
  playing: getMediaPlaying
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => (
  {
    playPause: (): void => {
      dispatch(playPauseMedia())
    }
  }
)

export const PlayPause = connectToRedux(mapStateToProps, mapDispatchToProps)(BasePlayPause)
