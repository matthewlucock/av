import { AutoHider } from '@/util/auto-hider'

const SHOW_DURATION = 500
export type ShortcutName = 'play' | 'pause'

export class ShortcutStore extends AutoHider {
  public shortcutName: ShortcutName | null = null

  public constructor () {
    super({ showDuration: SHOW_DURATION })
  }

  public displayShortcut (shortcutName: ShortcutName): void {
    this.shortcutName = shortcutName
    super.show()
  }
}
