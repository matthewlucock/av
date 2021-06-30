import { MIN_PLAYBACK_RATE, MAX_PLAYBACK_RATE } from '@/globals'
import { boundNumber } from '@/util'
import { getVideoDimensions } from '@/util/media'

import mainProcess from '__main_process__'

export type MediaInfo = {
  readonly type: 'audio' | 'video'
  readonly src: string
  readonly name: string
  readonly path: string | null
  duration: number
  readonly audioMetadata?: AudioMetadata
}
export type UnloadedMediaInfo = Omit<MediaInfo, 'duration'>

export class Media {
  public info: MediaInfo
  public loaded: boolean = false
  public playing: boolean = true
  public playbackTime: number = 0
  public playbackTimeNeedsUpdating: boolean = false
  public playbackRate: number = 1
  public speedThroughRate: number = 0
  public volume: number = 1
  public autoplayBlocked: boolean = false

  public constructor (info: UnloadedMediaInfo) {
    this.info = { ...info, duration: 0 }
  }

  public destroy (): void {
    URL.revokeObjectURL(this.info.src)
  }

  /**
   * Computed properties
   */

  public get isAudio (): boolean {
    return this.info.type === 'audio'
  }

  public get isVideo (): boolean {
    return this.info.type === 'video'
  }

  public get notStarted (): boolean {
    return this.playbackTime === 0
  }

  public get finished (): boolean {
    return this.playbackTime === this.info.duration
  }

  public get normalPlaybackRate (): boolean {
    return this.playbackRate === 1
  }

  public get rewinding (): boolean {
    return this.speedThroughRate < 0
  }

  public get fastForwarding (): boolean {
    return this.speedThroughRate > 0
  }

  public get roundedDuration (): number {
    return Math.ceil(this.info.duration)
  }

  public get roundedPlaybackTime (): number {
    return this.finished ? Math.ceil(this.playbackTime) : Math.floor(this.playbackTime)
  }

  /**
   * Media loaded
   */

  public onLoaded (nativeMedia: HTMLMediaElement): void {
    this.info.duration = nativeMedia.duration
    this.loaded = true

    if (__ELECTRON__ && nativeMedia instanceof HTMLVideoElement) {
      mainProcess.resizeWindow(getVideoDimensions(nativeMedia))
    }
  }

  /**
   * Play/pause
   */

  public play (): void {
    this.playing = true
  }

  public pause (): void {
    this.playing = false
    this.clearSpeedThroughRate()
  }

  public playPause (): void {
    if (this.playing) {
      this.pause()
    } else {
      this.play()
    }
  }

  /**
   * Playback time
   */

  public storePlaybackTime (playbackTime: number): void {
    this.playbackTime = boundNumber(0, playbackTime, this.info.duration)

    if (this.playing && this.finished) {
      this.playing = false
    }
  }

  public updatePlaybackTime (playbackTime: number): void {
    this.storePlaybackTime(playbackTime)
    this.playbackTimeNeedsUpdating = true
  }

  public clearPlaybackTimeUpdate (): void {
    this.playbackTimeNeedsUpdating = false
  }

  public offsetPlaybackTime (offset: number): void {
    this.updatePlaybackTime(this.playbackTime + offset)
  }

  /**
   * Playback rate
   */

  public changePlaybackRate (playbackRate: number): void {
    this.playbackRate = boundNumber(MIN_PLAYBACK_RATE, playbackRate, MAX_PLAYBACK_RATE)
  }

  /**
   * Speed through
   */

  public toggleSpeedThroughRate (multiplier: number): void {
    this.speedThroughRate = 2 * multiplier

    if (this.fastForwarding) this.play()
  }

  private clearSpeedThroughRate (): void {
    this.speedThroughRate = 0
  }

  /**
   * Volume
   */

  public setVolume (volume: number): void {
    this.volume = boundNumber(0, volume, 1)
  }

  /**
   * Autoplay
   */

  public applyAutoplayBlock (): void {
    this.pause()
    this.autoplayBlocked = true
  }

  public clearAutoplayBlock (): void {
    this.play()
    this.autoplayBlocked = false
  }
}
