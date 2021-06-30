import * as preact from 'preact'
import useEvent from '@react-hook/event'
import { view } from '@risingstack/react-easy-state'

import { useControlsStore, useMedia } from '@/store'

import { Audio } from '@/elements/media/audio'
import { Video } from '@/elements/media/video'

export const Media: preact.FunctionComponent = view(() => {
  const { shortcutDisplay } = useControlsStore()
  const media = useMedia()

  useEvent(document, 'keypress', (key): void => {
    if (key.code === 'Space') {
      if (media.playing) {
        media.pause()
        shortcutDisplay.displayShortcut('pause')
      } else {
        media.play()
        shortcutDisplay.displayShortcut('play')
      }
    }
  })

  if (media.isAudio) {
    return <Audio />
  } else if (media.isVideo) {
    return <Video />
  } else {
    throw new Error('Invalid media type')
  }
})
