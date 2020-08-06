import * as React from 'react'
import { useDispatch } from 'react-redux'

import { EmitterContext } from 'av/contexts'

import { useSelector } from 'av/store'
import { mediaSlice } from 'av/store/slices/media'

import { RoundControlButton } from 'av/components/control-button'

interface Props {
  readonly time: number
  readonly disabled?: boolean
  readonly children: React.ReactElement
}

export const SkipThrough: React.FC<Props> = props => {
  const playbackTime = useSelector(state => state.media.playbackTime)
  const dispatch = useDispatch()

  const emitter = React.useContext(EmitterContext)

  const changePlaybackTime = (playbackTime: number): void => {
    dispatch(mediaSlice.actions.storePlaybackTime(playbackTime))
    emitter.emit('playback-time-changed', playbackTime)
  }

  return (
    <RoundControlButton
      disabled={props.disabled}
      onClick={() => changePlaybackTime(playbackTime + props.time)}
    >
      {props.children}
    </RoundControlButton>
  )
}
