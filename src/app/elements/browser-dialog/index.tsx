import * as preact from 'preact'
import { view } from '@risingstack/react-easy-state'

import { useDialogStore } from '@/store'

import { Overlay } from '@/components/overlay'
import { Dialog } from '@/components/dialog'

export const BrowserDialog: preact.FunctionComponent = view(() => {
  const dialogStore = useDialogStore()

  return (
    <Overlay visible={dialogStore.show}>
      <Dialog
        confirm={dialogStore.info?.confirm}
        close={(result?: boolean) => dialogStore.close(result)}
      >
        {dialogStore.info?.message}
      </Dialog>
    </Overlay>
  )
})
