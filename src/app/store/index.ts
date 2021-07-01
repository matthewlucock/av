import { createContext } from 'preact'
import { useContext } from 'preact/hooks'
import { store } from '@risingstack/react-easy-state'

import { KeyboardStore } from './keyboard'
import { DialogStore } from './dialog'
import { MediaStore } from './media'
import type { Media } from './media/media'
import { ControlsStore } from './controls'
import { ShortcutStore } from './shortcut'

export class Store {
  public readonly keyboardStore: KeyboardStore = store(new KeyboardStore())
  public readonly dialogStore: DialogStore = store(new DialogStore())
  public readonly mediaStore: MediaStore = store(new MediaStore(this))
  public readonly controlsStore: ControlsStore = store(new ControlsStore(this))
  public readonly shortcutStore: ShortcutStore = store(new ShortcutStore())
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
export const useDialogStore = (): DialogStore => {
  const { dialogStore } = useStore()
  return dialogStore
}
export const useMediaStore = (): MediaStore => {
  const { mediaStore } = useStore()
  return mediaStore
}
export const useMedia = (): Media => {
  const { media } = useMediaStore()
  if (media === null) throw new Error('No media')
  return media
}
export const useControlsStore = (): ControlsStore => {
  const { controlsStore } = useStore()
  return controlsStore
}
export const useShortcutStore = (): ShortcutStore => {
  const { shortcutStore } = useStore()
  return shortcutStore
}
