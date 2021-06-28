import { store } from '@risingstack/react-easy-state'

import type { Shortcut } from '@/globals'
import { PopperVirtualElement, Coordinates, makePopperVirtualElement } from '@/util/popper'
import type { Store } from '.'

const ACTIVITY_TIMEOUT_DURATION = 3000

class PlaybackSpeed {
  public button: HTMLButtonElement | null = null
  public open: boolean = false

  public storeButton (button: HTMLButtonElement): void {
    this.button = button
  }

  public clearButton (): void {
    this.button = null
  }

  public toggle (): void {
    this.open = !this.open
  }
}

class VideoPreview {
  public virtualElement: PopperVirtualElement | null = null
  public time: number = 0

  public get visible (): boolean {
    return this.virtualElement !== null && this.rootStore.keyboardStore.shiftMode
  }

  public constructor (private readonly rootStore: Store) {}

  public update (coordinates: Coordinates, time: number): void {
    this.virtualElement = makePopperVirtualElement(coordinates)
    this.time = Math.round(time)
  }

  public clear (): void {
    this.virtualElement = null
  }
}

class Activity {
  public visible: boolean = false
  private timeoutId: number = 0

  public show (): void {
    this.visible = true
  }

  public hide (): void {
    this.visible = false
  }

  public reset (): void {
    window.clearTimeout(this.timeoutId)
  }

  public active (): void {
    if (!document.hasFocus()) return

    this.reset()
    this.show()
    this.timeoutId = window.setTimeout(() => this.hide(), ACTIVITY_TIMEOUT_DURATION)
  }

  public inactive (): void {
    this.reset()
    this.hide()
  }
}

class ShortcutDisplay {
  public visible: boolean = false
  public shortcut: Shortcut | null = null
  private timeoutId: number = 0

  private show (): void {
    this.visible = true
  }

  private hide (): void {
    this.visible = false
  }

  public reset (): void {
    window.clearTimeout(this.timeoutId)
  }

  public display (shortcut: Shortcut): void {
    this.reset()
    this.shortcut = shortcut
    this.show()
    this.timeoutId = window.setTimeout(() => this.hide(), 500)
  }
}

export class ControlsStore {
  public playbackSpeed: PlaybackSpeed = store(new PlaybackSpeed())
  public videoPreview: VideoPreview = store(new VideoPreview(this.rootStore))
  public activity: Activity = store(new Activity())
  public shortcutDisplay: ShortcutDisplay = store(new ShortcutDisplay())

  public constructor (private readonly rootStore: Store) {}

  public get skipAmount (): number {
    return this.rootStore.keyboardStore.shiftMode ? 10 : 30
  }
}
