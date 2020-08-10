import * as React from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import useEvent from '@react-hook/event'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

import { CONTROL_ICON_OFFSET } from 'av/globals'

import { useSelector } from 'av/store'
import { mediaSlice } from 'av/store/slices/media'

import { Button } from 'av/components/button'

const PlayIcon = styled(FontAwesomeIcon)`
  position: relative;
  left: ${CONTROL_ICON_OFFSET};
`

export const PlayPause: React.FC = () => {
  const playing = useSelector(({ media }) => media.playing)
  const dispatch = useDispatch()

  /**
   * Keyboard control
   */

  useEvent(document, 'keyup', event => {
    if (event.code === 'Space') dispatch(mediaSlice.actions.playPause())
  })

  /**
   * Component
   */

  return (
    <Button primary onClick={() => dispatch(mediaSlice.actions.playPause())}>
      {playing ? <FontAwesomeIcon icon={faPause} /> : <PlayIcon icon={faPlay} />}
    </Button>
  )
}
