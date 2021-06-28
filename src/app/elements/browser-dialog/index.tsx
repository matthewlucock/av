import * as preact from 'preact'
import { useEffect } from 'preact/hooks'
import { view } from '@risingstack/react-easy-state'

import { useDialogStore } from '@/store'

export const BrowserDialog: preact.FunctionComponent = view(() => {
  const dialogStore = useDialogStore()

  useEffect(() => {
    if (dialogStore.show && dialogStore.info !== null) {
      if (dialogStore.info.confirm) {
        const result = window.confirm(dialogStore.info.message)
        dialogStore.close(result)
      } else {
        window.alert(dialogStore.info.message)
        dialogStore.show = false
      }
    }
  }, [dialogStore.show])

  return null
})
