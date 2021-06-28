import { createContext } from 'preact'
import { useContext } from 'preact/hooks'
import { store } from '@risingstack/react-easy-state'

import { KeyboardStore } from './keyboard-store'
import { MediaStore } from './media-store'
import { ControlsStore } from './controls-store'
import { DialogStore } from './dialog-store'
import type { Media } from './media'

export class Store {
  public readonly keyboardStore: KeyboardStore = store(new KeyboardStore())
  public readonly mediaStore: MediaStore = store(new MediaStore(this))
  public readonly controlsStore: ControlsStore = store(new ControlsStore(this))
  public readonly dialogStore: DialogStore = store(new DialogStore())
}

export const StoreContext = createContext<Store | null>(null)
const useStore = (): Store => {
  const store = useContext(StoreContext)
  if (store === null) throw new Error('No store')
  return store
}

export const useKeyboardStore = (): KeyboardStore => {
  const { keyboardStore } = useStore()
  return keyboardStore
}
export const useMediaStore = (): MediaStore => {
  const { mediaStore } = useStore()
  return mediaStore
}
export const useControlsStore = (): ControlsStore => {
  const { controlsStore } = useStore()
  return controlsStore
}
export const useDialogStore = (): DialogStore => {
  const { dialogStore } = useStore()
  return dialogStore
}

export const useMedia = (): Media => {
  const { media } = useMediaStore()
  if (media === null) throw new Error('No media')
  return media
}
