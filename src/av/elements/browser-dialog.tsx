import * as React from 'react'
import { useDispatch } from 'react-redux'

import { useSelector } from 'av/store'
import { browserDialogSlice } from 'av/store/slices/browser-dialog'

import { Modal, ModalButtons } from 'av/components/modal'
import { StandaloneButton } from 'av/components/button'

export const BrowserDialog: React.FC = () => {
  const show = useSelector(({ browserDialog }) => browserDialog.show)
  const message = useSelector(({ browserDialog }) => browserDialog.message)
  const confirm = useSelector(({ browserDialog }) => browserDialog.confirm)
  const dispatch = useDispatch()

  return (
    <Modal show={show}>
      {message}

      <ModalButtons>
        {confirm && (
          <StandaloneButton
            onClick={() => {
              dispatch(browserDialogSlice.actions.storeResult(false))
              dispatch(browserDialogSlice.actions.setShow(false))
            }}
          >
            Cancel
          </StandaloneButton>
        )}

        <StandaloneButton
          onClick={() => {
            if (confirm) dispatch(browserDialogSlice.actions.storeResult(true))
            dispatch(browserDialogSlice.actions.setShow(false))
          }}
        >
          OK
        </StandaloneButton>
      </ModalButtons>
    </Modal>
  )
}
