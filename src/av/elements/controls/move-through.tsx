import * as React from 'react'
import { connect as connectToRedux } from 'react-redux'

import { Dispatch } from 'av/store'
import { clearMediaMoveThrough } from 'av/store/actions'

import { RoundControlButton } from 'av/components/control-button'

interface DispatchProps {
  readonly clearMoveThrough: () => void
}

interface OwnProps {
  readonly action: () => void
  readonly disabled?: boolean
  readonly children: React.ReactElement
}

type Props = DispatchProps & OwnProps

const BaseMoveThrough: React.FC<Props> = props => (
  <RoundControlButton
    disabled={props.disabled}
    onMouseDown={props.action}
    onMouseUp={props.clearMoveThrough}
  >
    {props.children}
  </RoundControlButton>
)

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => (
  {
    clearMoveThrough: (): void => {
      dispatch(clearMediaMoveThrough())
    }
  }
)

export const MoveThrough = connectToRedux(null, mapDispatchToProps)(BaseMoveThrough)
