import * as React from 'react'
import { useDispatch } from 'react-redux'
import useEvent from '@react-hook/event'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

import { LeftOffsetIcon } from 'av/util/offset-icons'

import { useSelector } from 'av/store'
import { mediaSlice } from 'av/store/slices/media'

import { Button } from 'av/components/button'

export const PlayPause: React.FC = () => {
  const playing = useSelector(({ media }) => media.playing)
  const dispatch = useDispatch()

  /**
   * Keyboard control
   */

  useEvent(document, 'keyup', event => {
    if (event.code === 'Space') dispatch(mediaSlice.actions.playPauseShortcut())
  })

  /**
   * Component
   */

  return (
    <Button primary onClick={() => dispatch(mediaSlice.actions.playPause())}>
      {playing ? <FontAwesomeIcon icon={faPause} /> : <LeftOffsetIcon icon={faPlay} />}
    </Button>
  )
}
