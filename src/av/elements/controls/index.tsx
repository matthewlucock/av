import * as React from 'react'
import styled from '@emotion/styled'
import { connect as connectToRedux } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUndo,
  faRedo,
  faBackward,
  faForward,
  faCog,
  faStop
} from '@fortawesome/free-solid-svg-icons'

import {
  CONTROLS_VISIBILITY_TIMEOUT,
  TRANSITION_DURATION_MS,
  TRANSITION_DURATION,
  CONTROLS_FOREGROUND_COLOR,
  CONTROLS_BACKGROUND_COLOR,
  CONTROL_HEIGHT,
  CONTROL_ICON_OFFSET
} from 'av/globals'

import { State } from 'av/store/state'
import {
  getShowSettings,
  getSkipBackTime,
  getSkipForwardTime,
  getMediaPlaying,
  getMediaPlaybackTime,
  getMediaFinished,
  getAutoHideMediaControls
} from 'av/store/selectors'
import { Dispatch } from 'av/store'
import { setShowSettings, rewindMedia, fastForwardMedia } from 'av/store/actions'
import { stopMedia } from 'av/store/thunks'

import { RoundControlButton } from 'av/components/control-button'
import { PlayPause } from './play-pause'
import { SkipThrough } from './skip-through'
import { MoveThrough } from './move-through'
import { PlaybackBar } from './playback-bar'
import { Volume } from './volume'
import { PlaybackRate } from './playback-rate'

const BOTTOM_OFFSET = '2vh'
const COLLAPSED_TRANSLATION_LENGTH = `calc(${CONTROL_HEIGHT} + ${BOTTOM_OFFSET})`

const Wrapper = styled.div`
  font-size: 1.2em;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: ${BOTTOM_OFFSET};
  width: 100%;
`

interface BodyProps {
  readonly visible: boolean
  readonly expanded: boolean
}

const Body = styled.div<BodyProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  padding: 2em 5em 0;
  opacity: ${props => props.visible ? 1 : 0};
  transform: ${props => !props.expanded && `translateY(${COLLAPSED_TRANSLATION_LENGTH})`};
  transition: opacity ${TRANSITION_DURATION};

  & > :not(:last-child) {
    margin-bottom: .5em;
  }
`

const EXPAND_KEYFRAMES = [
  { transform: `translateY(${COLLAPSED_TRANSLATION_LENGTH})` },
  { transform: 'translateY(0)' }
]

const Row = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 1em;
  align-items: center;
  background: ${CONTROLS_BACKGROUND_COLOR.string()};
  color: ${CONTROLS_FOREGROUND_COLOR.string()};
`

const SeparatedRow = styled(Row)`
  & > :not(:last-child) {
    margin-right: 1.5em;
  }
`

const RewindIcon = styled(FontAwesomeIcon)`
  position: relative;
  right: ${CONTROL_ICON_OFFSET};
`

const FastForwardIcon = styled(FontAwesomeIcon)`
  position: relative;
  left: ${CONTROL_ICON_OFFSET};
`

interface StateProps {
  readonly showSettings: boolean
  readonly skipBackTime: number
  readonly skipForwardTime: number
  readonly playing: boolean
  readonly playbackTime: number
  readonly finished: boolean
  readonly autoHide: boolean
}

interface DispatchProps {
  readonly setShowSettings: (showSettings: boolean) => void
  readonly rewind: () => void
  readonly fastForward: () => void
  readonly stop: () => void
}

type Props = StateProps & DispatchProps

const BaseControls: React.FC<Props> = props => {
  const body = React.useRef<HTMLDivElement | null>(null)

  const [visible, setVisible] = React.useState<boolean>(true)
  const [expanded, setExpanded] = React.useState<boolean>(!props.autoHide)

  const [initialized, setInitialized] = React.useState<boolean>(false)
  React.useEffect(() => setInitialized(true), [])

  /**
   * Auto-hiding controls
   */

  const showControls = (): void => {
    setVisible(true)
    window.clearTimeout(timeoutId.current)
    timeoutId.current = window.setTimeout(() => setVisible(false), CONTROLS_VISIBILITY_TIMEOUT)
  }

  const timeoutId = React.useRef<number>(0)
  const clearActivityListener = (): void => {
    window.clearTimeout(timeoutId.current)
    document.removeEventListener('mousemove', showControls)
    document.removeEventListener('mousedown', showControls)
  }

  React.useEffect(() => {
    if (props.autoHide) {
      timeoutId.current = window.setTimeout(() => setVisible(false), CONTROLS_VISIBILITY_TIMEOUT)

      document.addEventListener('mousemove', showControls)
      document.addEventListener('mousedown', showControls)
    } else {
      setVisible(true)
      clearActivityListener()
    }

    return clearActivityListener
  }, [props.autoHide])

  // Show controls if media is play/paused by other means.
  React.useEffect(() => {
    if (initialized && props.autoHide) showControls()
  }, [props.playing, props.autoHide])

  /**
   * Component
   */

  return (
    <Wrapper>
      <Body
        ref={body}
        visible={visible}
        expanded={expanded}
        onMouseOver={() => {
          if (!body.current || !props.autoHide) return

          if (expanded) return
          setExpanded(true)
          if (!visible) return

          body.current.animate(EXPAND_KEYFRAMES, {
            duration: TRANSITION_DURATION_MS,
            easing: 'ease-out'
          })
        }}
        onTransitionEnd={() => {
          if (!visible) setExpanded(false)
        }}
      >
        <Row>
          <SkipThrough time={props.skipBackTime} disabled={!props.playbackTime}>
            <FontAwesomeIcon icon={faUndo} />
          </SkipThrough>

          <MoveThrough action={props.rewind} disabled={!props.playbackTime}>
            <RewindIcon icon={faBackward} />
          </MoveThrough>

          <PlayPause />

          <MoveThrough action={props.fastForward} disabled={props.finished}>
            <FastForwardIcon icon={faForward} />
          </MoveThrough>

          <SkipThrough time={props.skipForwardTime} disabled={props.finished}>
            <FontAwesomeIcon icon={faRedo} />
          </SkipThrough>
        </Row>

        <PlaybackBar />

        <SeparatedRow>
          <RoundControlButton
            active={props.showSettings}
            onClick={() => props.setShowSettings(true)}
          >
            <FontAwesomeIcon icon={faCog} />
          </RoundControlButton>

          <Volume />
          <PlaybackRate />

          <RoundControlButton onClick={props.stop}>
            <FontAwesomeIcon icon={faStop} />
          </RoundControlButton>
        </SeparatedRow>
      </Body>
    </Wrapper>
  )
}

const mapStateToProps = createStructuredSelector<State, StateProps>({
  showSettings: getShowSettings,
  skipBackTime: getSkipBackTime,
  skipForwardTime: getSkipForwardTime,
  playing: getMediaPlaying,
  playbackTime: getMediaPlaybackTime,
  finished: getMediaFinished,
  autoHide: getAutoHideMediaControls
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => (
  {
    setShowSettings: (showSettings: boolean): void => {
      dispatch(setShowSettings(showSettings))
    },
    rewind: () => {
      dispatch(rewindMedia())
    },
    fastForward: () => {
      dispatch(fastForwardMedia())
    },
    stop: (): void => {
      dispatch(stopMedia())
    }
  }
)

export const Controls = connectToRedux(mapStateToProps, mapDispatchToProps)(BaseControls)
