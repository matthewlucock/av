import * as React from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons'

import { CONTROL_ICON_OFFSET } from 'av/globals'

import { useSelector } from 'av/store'
import { mediaSlice, getMediaFinished } from 'av/store/slices/media'

import { Button } from 'av/components/button'

const RewindIcon = styled(FontAwesomeIcon)`
  position: relative;
  right: ${CONTROL_ICON_OFFSET};
`

const FastForwardIcon = styled(FontAwesomeIcon)`
  position: relative;
  left: ${CONTROL_ICON_OFFSET};
`

export const Rewind: React.FC = () => {
  const playbackTime = useSelector(({ media }) => media.playbackTime)
  const dispatch = useDispatch()

  return (
    <Button
      disabled={!playbackTime}
      onMouseDown={() => dispatch(mediaSlice.actions.setMoveThrough('rewind'))}
      onMouseUp={() => dispatch(mediaSlice.actions.setMoveThrough(''))}
    >
      <RewindIcon icon={faBackward} />
    </Button>
  )
}

export const FastForward: React.FC = () => {
  const finished = useSelector(getMediaFinished)
  const dispatch = useDispatch()

  return (
    <Button
      disabled={finished}
      onMouseDown={() => dispatch(mediaSlice.actions.setMoveThrough('fastForward'))}
      onMouseUp={() => dispatch(mediaSlice.actions.setMoveThrough(''))}
    >
      <FastForwardIcon icon={faForward} />
    </Button>
  )
}
