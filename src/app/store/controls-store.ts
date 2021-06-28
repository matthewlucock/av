import { store } from '@risingstack/react-easy-state'

import { PopperVirtualElement, Coordinates, makePopperVirtualElement } from '@/util/popper'
import type { Store } from '.'

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

export class ControlsStore {
  public playbackSpeed: PlaybackSpeed = store(new PlaybackSpeed())
  public videoPreview: VideoPreview = store(new VideoPreview(this.rootStore))
  public visible: boolean = false

  public constructor (private readonly rootStore: Store) {}

  public get skipAmount (): number {
    return this.rootStore.keyboardStore.shiftMode ? 10 : 30
  }

  public show (): void {
    this.visible = true
  }

  public hide (): void {
    this.visible = false
  }
}
