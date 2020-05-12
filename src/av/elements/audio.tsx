import * as React from 'react'
import styled from '@emotion/styled'
import { connect as connectToRedux } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

import {
  BACKGROUND_COLOR_TRANSITION_DURATION_MS,
  BACKGROUND_COLOR_TRANSITION_HUE_INCREMENT
} from '../globals'
import { ProcessedAudioMetadata } from 'av/audio-metadata'

import { State } from 'av/store/state'
import {
  getBackgroundHue,
  getAudioMetadata,
  getAudioHasMetadata,
  getAnimateAudioBackgroundColor
} from 'av/store/selectors'
import { Dispatch } from 'av/store'
import { setBackgroundHue } from 'av/store/actions'
import { randomizeBackgroundColor } from 'av/store/thunks'

import { Pane } from 'av/components/pane'

import { Media } from 'av/media'
import { Controls } from './controls'

const Wrapper = styled(Pane)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Icon = styled(FontAwesomeIcon)`
  font-size: 9em;
  color: white;
`

const Metadata = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CoverArt = styled.img`
  max-width: 50%;
`

const NativeAudio = styled.audio``

interface StateProps {
  readonly backgroundHue: number
  readonly metadata: ProcessedAudioMetadata
  readonly hasMetadata: boolean
  readonly animateBackgroundColor: boolean
}

interface DispatchProps {
  readonly setBackgroundHue: (hue: number) => void
  readonly randomizeBackgroundColor: () => void
}

type Props = StateProps & DispatchProps

const BaseAudio: React.FC<Props> = props => {
  /**
   * Animate background color
   */

  /**React.useEffect(() => {
    if (!wrapper.current) return
    if (props.metadata.backgroundColor) {
      wrapper.current.animate(
        [{ backgroundColor: 'transparent' }, { backgroundColor: props.metadata.backgroundColor }],
        { duration: 250 }
      )
    }
  }, [])*/

  const lastBackgroundHue = React.useRef<number>(props.backgroundHue)
  React.useEffect(() => {
    lastBackgroundHue.current = props.backgroundHue
  }, [props.backgroundHue])

  const intervalId = React.useRef<number>(0)

  React.useEffect(() => {
    if (props.animateBackgroundColor) {
      intervalId.current = window.setInterval(
        () => {
          props.setBackgroundHue(
            lastBackgroundHue.current + BACKGROUND_COLOR_TRANSITION_HUE_INCREMENT
          )
        },
        BACKGROUND_COLOR_TRANSITION_DURATION_MS
      )
    } else {
      window.clearInterval(intervalId.current)
    }

    return () => window.clearInterval(intervalId.current)
  }, [props.animateBackgroundColor])

  /**
   * Randomize background color if the audio had its own
   */

  React.useEffect(() => {
    return () => {
      if (props.metadata.backgroundColor) props.randomizeBackgroundColor()
    }
  }, [])

  /**
   * Component
   */

  return (
    <Wrapper style={{ backgroundColor: props.metadata.backgroundColor }}>
      {props.hasMetadata
        ? (
          <Metadata>
            {props.metadata.coverArtUrl && (
              <CoverArt
                src={props.metadata.coverArtUrl}
                onLoad={() => URL.revokeObjectURL(props.metadata.coverArtUrl)}
              />
            )}

            {props.metadata.artist && <p>{props.metadata.artist}</p>}
            {props.metadata.title && <p>{props.metadata.title}</p>}
          </Metadata>
        )
        : <Icon icon={faMusic} />
      }

      <Media nativeMedia={NativeAudio} />
      <Controls />
    </Wrapper>
  )
}

const mapStateToProps = createStructuredSelector<State, StateProps>({
  backgroundHue: getBackgroundHue,
  metadata: getAudioMetadata,
  hasMetadata: getAudioHasMetadata,
  animateBackgroundColor: getAnimateAudioBackgroundColor
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => (
  {
    setBackgroundHue: (hue: number): void => {
      dispatch(setBackgroundHue(hue))
    },
    randomizeBackgroundColor: () => {
      dispatch(randomizeBackgroundColor())
    }
  }
)

export const Audio = connectToRedux(mapStateToProps, mapDispatchToProps)(BaseAudio)
