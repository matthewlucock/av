import * as React from 'react'
import { useDispatch } from 'react-redux'

import { mediaSlice } from 'av/store/slices/media'

import { RoundControlButton } from 'av/components/control-button'

interface Props {
  readonly action: () => void
  readonly disabled?: boolean
  readonly children: React.ReactElement
}

export const MoveThrough: React.FC<Props> = props => {
  const dispatch = useDispatch()

  return (
    <RoundControlButton
      disabled={props.disabled}
      onMouseDown={props.action}
      onMouseUp={() => dispatch(mediaSlice.actions.clearMoveThrough())}
    >
      {props.children}
    </RoundControlButton>
  )
}
