import * as preact from 'preact'
import { useLayoutEffect } from 'preact/hooks'
import useEvent from '@react-hook/event'
import { view } from '@risingstack/react-easy-state'

import { useMediaStore, useMedia } from '@/store'
import mainProcess from '__main_process__'

import { MediaWrapper } from './wrapper'
import { AudioContent } from './audio-content'

export const Media: preact.FunctionComponent = view(() => {
  const mediaStore = useMediaStore()
  const media = useMedia()

  useEvent(document, 'keypress', (key): void => {
    if (key.code === 'Space') mediaStore.playPauseShortcut()
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
