import { store } from '@risingstack/react-easy-state'

type ModifierKeyCode = 'ShiftLeft' | 'ShiftRight'
const MODIFIER_KEY_CODES: readonly ModifierKeyCode[] = ['ShiftLeft', 'ShiftRight']

type ModifierKey = KeyboardEvent & Readonly<{ code: ModifierKeyCode }>
type ModifierKeys = Record<ModifierKeyCode, boolean>

const makeDefaultModifierKeys = (): ModifierKeys => {
  return store({ ShiftLeft: false, ShiftRight: false })
}

export const isModifierKey = (key: KeyboardEvent): key is ModifierKey => {
  return MODIFIER_KEY_CODES.includes(key.code as ModifierKeyCode)
}

export class KeyboardStore {
  public modifierKeys: ModifierKeys = makeDefaultModifierKeys()

  public get shiftMode (): boolean {
    return this.modifierKeys.ShiftLeft || this.modifierKeys.ShiftRight
  }

  public modifierKeyDown (key: ModifierKey): void {
    this.modifierKeys[key.code] = true
  }

  public modifierKeyUp (key: ModifierKey): void {
    this.modifierKeys[key.code] = false
  }

  public clearModifierKeys (): void {
    this.modifierKeys = makeDefaultModifierKeys()
  }
}
