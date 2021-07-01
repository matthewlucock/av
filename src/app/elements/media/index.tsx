import * as preact from 'preact'
import { useLayoutEffect } from 'preact/hooks'
import useEvent from '@react-hook/event'
import { view } from '@risingstack/react-easy-state'

import { useMedia, useShortcutStore } from '@/store'
import mainProcess from '__main_process__'

import { MediaWrapper } from './wrapper'
import { AudioContent } from './audio-content'

export const Media: preact.FunctionComponent = view(() => {
  const media = useMedia()
  const shortcutStore = useShortcutStore()

  useEvent(document, 'keypress', (key): void => {
    if (key.code === 'Space') {
      if (media.playing) {
        media.pause()
        shortcutStore.displayShortcut('pause')
      } else {
        media.play()
        shortcutStore.displayShortcut('play')
      }
    }
  })

  if (__ELECTRON__ && media.isVideo) {
    useLayoutEffect(() => {
      mainProcess.setWindowResizable(true)
      return (): void => mainProcess.setWindowResizable(false)
    }, [])
  }

  return (
    <MediaWrapper>
      {media.isAudio && <AudioContent />}
    </MediaWrapper>
  )
})
