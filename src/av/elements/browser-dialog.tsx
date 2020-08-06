import * as React from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'

import { useSelector } from 'av/store'
import { browserDialogSlice } from 'av/store/slices/browser-dialog'

import { Modal, ModalButtons } from 'av/components/modal'
import { ControlButton } from 'av/components/control-button'

const DialogButtons = styled(ModalButtons)`
  & > * {
    width: 5em;
    &:not(:last-child) { margin-right: 1em; }
  }
`

export const BrowserDialog: React.FC = () => {
  const show = useSelector(state => state.browserDialog.show)
  const message = useSelector(state => state.browserDialog.message)
  const confirm = useSelector(state => state.browserDialog.confirm)
  const dispatch = useDispatch()

  const confirmButtons = (
    <>
      <ControlButton onClick={() => dispatch(browserDialogSlice.actions.setResult(false))}>
        Cancel
      </ControlButton>
      <ControlButton onClick={() => dispatch(browserDialogSlice.actions.setResult(true))}>
        OK
      </ControlButton>
    </>
  )

  const alertButtons = (
    <>
      <ControlButton onClick={() => dispatch(browserDialogSlice.actions.setShow(false))}>
        OK
      </ControlButton>
    </>
  )

  return (
    <Modal show={show}>
      {message}
      <DialogButtons>{confirm ? confirmButtons : alertButtons}</DialogButtons>
    </Modal>
  )
}
