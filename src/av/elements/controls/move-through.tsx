import * as React from 'react'
import { useDispatch } from 'react-redux'
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons'

import { LeftOffsetIcon, RightOffsetIcon } from 'av/util/offset-icons'

import { useSelector } from 'av/store'
import { mediaSlice, getMediaFinished } from 'av/store/slices/media'

import { Button } from 'av/components/button'

export const Rewind: React.FC = () => {
  const playbackTime = useSelector(({ media }) => media.playbackTime)
  const dispatch = useDispatch()

  return (
    <Button
      disabled={!playbackTime}
      onMouseDown={() => dispatch(mediaSlice.actions.setMoveThrough('rewind'))}
      onMouseUp={() => dispatch(mediaSlice.actions.setMoveThrough(null))}
    >
      <RightOffsetIcon icon={faBackward} />
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
      onMouseUp={() => dispatch(mediaSlice.actions.setMoveThrough(null))}
    >
      <LeftOffsetIcon icon={faForward} />
    </Button>
  )
}
