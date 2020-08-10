import * as React from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo, faRedo } from '@fortawesome/free-solid-svg-icons'

import { useSelector } from 'av/store'
import { mediaSlice, getMediaFinished } from 'av/store/slices/media'

import { Button } from 'av/components/button'

export const SkipBack: React.FC = () => {
  const skipBackTime = useSelector(({ settings }) => settings.skipBackTime)
  const playbackTime = useSelector(({ media }) => media.playbackTime)
  const dispatch = useDispatch()

  return (
    <Button
      disabled={!playbackTime}
      onClick={() => {
        dispatch(mediaSlice.actions.storePlaybackTime(playbackTime + skipBackTime))
        dispatch(mediaSlice.actions.setPlaybackTimeNeedsUpdating(true))
      }}
    >
      <FontAwesomeIcon icon={faUndo} />
    </Button>
  )
}

export const SkipForward: React.FC = () => {
  const skipForwardTime = useSelector(({ settings }) => settings.skipForwardTime)
  const playbackTime = useSelector(({ media }) => media.playbackTime)
  const finished = useSelector(getMediaFinished)
  const dispatch = useDispatch()

  return (
    <Button
      disabled={finished}
      onClick={() => {
        dispatch(mediaSlice.actions.storePlaybackTime(playbackTime + skipForwardTime))
        dispatch(mediaSlice.actions.setPlaybackTimeNeedsUpdating(true))
      }}
    >
      <FontAwesomeIcon icon={faRedo} />
    </Button>
  )
}
