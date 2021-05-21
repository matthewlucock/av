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
export const useStore = (): Store => {
  const store = useContext(StoreContext)
  if (store === null) throw new Error('No store')
  return store
}

export const useMedia = (): Media => {
  const { mediaStore } = useStore()
  const { media } = mediaStore
  if (media === null) throw new Error('No media')
  return media
}
