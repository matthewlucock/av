import * as preact from 'preact'
import { useEffect } from 'preact/hooks'
import useEvent from '@react-hook/event'

import { useKeyboardStore } from '@/store'
import { isModifierKey } from '@/store/keyboard'

import { Main } from '@/main'
import { DragOverlay } from '@/elements/drag-overlay'
import { BrowserDialog } from '@/elements/browser-dialog'

const useModifierKeyListeners = (): void => {
  const keyboardStore = useKeyboardStore()

  useEvent(document, 'keydown', (key): void => {
    if (isModifierKey(key)) keyboardStore.modifierKeyDown(key)
  })
  useEvent(document, 'keyup', (key): void => {
    if (isModifierKey(key)) keyboardStore.modifierKeyUp(key)
  })

  useEffect(() => {
    return (): void => keyboardStore.clearModifierKeys()
  }, [])
}

export const App: preact.FunctionComponent = () => {
  useModifierKeyListeners()

  return (
    <>
      <Main />
      <DragOverlay />
      <BrowserDialog />
    </>
  )
}
