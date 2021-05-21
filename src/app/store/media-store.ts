import { store } from '@risingstack/react-easy-state'

import { getMediaType } from '@/util/media'
import { Media } from './media'
import type { UnloadedMediaInfo } from './media'
import type { Store } from '.'

import mainProcess from '__main_process__'

const getStopConfirmMessage = (media: Media): string => (
  `Are you sure you want to stop this ${media.info.type}?`
)

export class MediaStore {
  public media: Media | null = null

  public constructor (private readonly root: Store) {}

  public setMedia (info: UnloadedMediaInfo): void {
    this.media = store(new Media(info))
  }

  clear (): void {
    if (this.media === null) throw new Error('No media to clear')

    this.media.destroy()
    this.media = null
  }

  public async stop (): Promise<boolean> {
    if (this.media === null) throw new Error('No media to stop')

    if (this.media.notStarted || this.media.finished) {
      this.clear()
      return true
    }

    const wasPlaying = this.media.playing
    if (wasPlaying) this.media.pause()

    const stopConfirmMessage = getStopConfirmMessage(this.media)
    if (await this.root.dialogStore.confirm(stopConfirmMessage)) {
      this.clear()
      return true
    } else {
      if (wasPlaying) this.media.play()
      return false
    }
  }

  public async open (files: FileList): Promise<void> {
    if (files.length !== 1) {
      this.root.dialogStore.error('av can only open a single file at a time')
      return
    }

    const file = files[0]
    const type = getMediaType(file)
    const path = __ELECTRON__ ? file.path : null

    if (type === null) {
      this.root.dialogStore.error('av can only open audio or videos')
      return
    }

    if (this.media !== null) {
      if (path !== null && path === this.media.info.path) return

      const stopped = await this.stop()
      if (!stopped) return
    }

    const audioMetadata: AudioMetadata | undefined = await (async () => {
      if (type === 'audio' && __ELECTRON__ && path !== null) {
        const metadata = await mainProcess.getAudioMetadata(path)
        if (metadata !== null) return metadata
      }
    })()

    this.setMedia({
      type,
      src: URL.createObjectURL(file),
      name: file.name,
      path,
      audioMetadata
    })
  }
}
