import * as React from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

import { CONTROL_ICON_OFFSET } from 'av/globals'

import { useSelector } from 'av/store'
import { mediaSlice } from 'av/store/slices/media'

import { RoundControlButton } from 'av/components/control-button'

const PlayIcon = styled(FontAwesomeIcon)`
  position: relative;
  left: ${CONTROL_ICON_OFFSET};
`

export const PlayPause: React.FC = () => {
  const playing = useSelector(state => state.media.playing)
  const dispatch = useDispatch()

  /**
   * Keyboard control
   */

  const keyupListener = React.useRef<(event: KeyboardEvent) => void>()

  React.useEffect(() => {
    keyupListener.current = (event: KeyboardEvent): void => {
      if (event.code === 'Space') dispatch(mediaSlice.actions.playPause())
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
    <RoundControlButton primary onClick={() => dispatch(mediaSlice.actions.playPause())}>
      {playing ? <FontAwesomeIcon icon={faPause} /> : <PlayIcon icon={faPlay} />}
    </RoundControlButton>
  )
}
