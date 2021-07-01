import { store } from '@risingstack/react-easy-state'

import { CONTROLS_SHOW_DURATION } from '@/globals'
import { AutoHider } from '@/util/auto-hider'
import { makePopperVirtualElement } from '@/util/popper'
import type { PopperVirtualElement, Coordinates } from '@/util/popper'
import type { Store } from '@/store'

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

class Activity extends AutoHider {
  public constructor () {
    super({ showDuration: CONTROLS_SHOW_DURATION })
  }

  public show (): void {
    if (!document.hasFocus()) return
    super.show()
  }
}

export class ControlsStore {
  public videoPreview: VideoPreview = store(new VideoPreview(this.rootStore))
  public activity: Activity = store(new Activity())

  public playbackSpeedOpen: boolean = false

  public constructor (private readonly rootStore: Store) {}

  public get skipAmount (): number {
    return this.rootStore.keyboardStore.shiftMode ? 10 : 30
  }

  public togglePlaybackSpeedOpen (): void {
    this.playbackSpeedOpen = !this.playbackSpeedOpen
  }
}
