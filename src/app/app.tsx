import * as preact from 'preact'
import { useState, useEffect } from 'preact/hooks'
import useEvent from '@react-hook/event'

import { handlePromiseRejection } from '@/util'
import { useKeyboardStore, useMediaStore } from '@/store'
import { isModifierKey } from '@/store/keyboard-store'

import { Main } from '@/main'
import { DragOverlay } from '@/elements/drag-overlay'
import { BrowserDialog } from '@/elements/browser-dialog'

export const App: preact.FunctionComponent = () => {
  const keyboardStore = useKeyboardStore()
  const mediaStore = useMediaStore()

  useEvent(document, 'keydown', (key): void => {
    if (isModifierKey(key)) keyboardStore.modifierKeyDown(key)
  })
  useEvent(document, 'keyup', (key): void => {
    if (isModifierKey(key)) keyboardStore.modifierKeyUp(key)
  })
  useEffect(() => {
    return (): void => keyboardStore.clearModifierKeys()
  }, [])

  const [dragging, setDragging] = useState<boolean>(false)
  useEvent(document, 'dragenter', (): void => setDragging(true))

  return (
    <>
      <Main />

      <DragOverlay
        dragging={dragging}
        setDragging={setDragging}
        callback={files => handlePromiseRejection(mediaStore.open(files))}
      />

      <BrowserDialog />
    </>
  )
}
