import * as React from 'react'
import styled from '@emotion/styled'
import { connect as connectToRedux } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { State } from 'av/store/state'
import { getShowDialog, getDialogMessage, getDialogIsConfirm } from 'av/store/selectors'
import { Dispatch } from 'av/store'
import { setShowDialog, setDialogResult } from 'av/store/actions'

import { Modal, ModalButtons } from 'av/components/modal'
import { ControlButton } from 'av/components/control-button'

const DialogButtons = styled(ModalButtons)`
  & > * {
    width: 5em;
    &:not(:last-child) { margin-right: 1em; }
  }
`

interface StateProps {
  readonly show: boolean
  readonly message: string
  readonly confirm: boolean
}

interface DispatchProps {
  readonly setShow: (show: boolean) => void
  readonly setResult: (result: boolean) => void
}

type Props = StateProps & DispatchProps

const BaseDialog: React.FC<Props> = props => (
  <Modal show={props.show}>
    {props.message}

    <DialogButtons>
      {props.confirm
        ? (
          <>
            <ControlButton onClick={() => props.setResult(false)}>Cancel</ControlButton>
            <ControlButton onClick={() => props.setResult(true)}>OK</ControlButton>
          </>
        )
        : <ControlButton onClick={() => props.setShow(false)}>OK</ControlButton>
      }
    </DialogButtons>
  </Modal>
)

const mapStateToProps = createStructuredSelector<State, StateProps>({
  show: getShowDialog,
  message: getDialogMessage,
  confirm: getDialogIsConfirm
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => (
  {
    setShow: (show: boolean): void => {
      dispatch(setShowDialog(show))
    },
    setResult: (result: boolean): void => {
      dispatch(setDialogResult(result))
    }
  }
)

export const Dialog = connectToRedux(mapStateToProps, mapDispatchToProps)(BaseDialog)
