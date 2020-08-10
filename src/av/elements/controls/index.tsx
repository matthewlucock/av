import * as React from 'react'
import styled from '@emotion/styled'

import { transitionStyles, CONTROLS_VISIBILITY_TIMEOUT } from 'av/globals'

import { useSelector } from 'av/store'

import { PlayPause } from './play-pause'
import { SkipBack, SkipForward } from './skip-through'
import { Rewind, FastForward } from './move-through'
import { PlaybackBar } from './playback-bar'
import { Volume } from './volume'
import { PlaybackTime } from './playback-time'
import { Settings } from './settings'
import { Stop } from './stop'

type WrapperProps = Readonly<{ visible: boolean }>
const Wrapper = styled.div<WrapperProps>`
  font-size: 1.5em;
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, .75);
  opacity: ${props => props.visible ? 1 : 0};
  box-shadow: 0 0 2em black;
  backdrop-filter: blur(10px);
  transition-property: opacity;
  ${transitionStyles}
`

const Body = styled.div`
  display: flex;
  justify-content: center;
`

const Group = styled.div`
  display: flex;
`

const LeftGroup = styled(Group)`
  position: absolute;
  left: .75em;
`

const RightGroup = styled(Group)`
  position: absolute;
  right: .75em;
`

export const Controls: React.FC = () => {
  const playing = useSelector(({ media }) => media.playing)
  const autoHide = useSelector(state => (
    state.media.type === 'video' && !state.settings.showSettings
  ))

  const [visible, setVisible] = React.useState<boolean>(true)

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
    if (autoHide) {
      timeoutId.current = window.setTimeout(() => setVisible(false), CONTROLS_VISIBILITY_TIMEOUT)

      document.addEventListener('mousemove', showControls)
      document.addEventListener('mousedown', showControls)
    } else {
      setVisible(true)
      clearActivityListener()
    }

    return clearActivityListener
  }, [autoHide])

  // Show controls if media is play/paused by other means.
  React.useEffect(() => {
    if (initialized && autoHide) showControls()
  }, [playing, autoHide])

  /**
   * Component
   */

  return (
    <Wrapper visible={visible}>
      <PlaybackBar />

      <Body>
        <LeftGroup>
          <Volume />
          <PlaybackTime />
        </LeftGroup>

        <Group>
          <SkipBack />
          <Rewind />
          <PlayPause />
          <FastForward />
          <SkipForward />
        </Group>

        <RightGroup>
          <Settings />
          <Stop />
        </RightGroup>
      </Body>
    </Wrapper>
  )
}
