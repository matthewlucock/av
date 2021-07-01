import * as preact from 'preact'
import { useLayoutEffect } from 'preact/hooks'
import useEvent from '@react-hook/event'
import clsx from 'clsx'
import { view } from '@risingstack/react-easy-state'

import styles from './styles.scss'

import { useMediaStore, useMedia, useControlsStore } from '@/store'
import mainProcess from '__main_process__'

import { NativeMedia } from './native'
import { Controls } from '@/elements/controls'
import { Shortcut } from '@/elements/shortcut'
import { AutoplayBlockOverlay } from '@/elements/autoplay-block-overlay'
import { AudioContent } from './audio-content'

export const Media: preact.FunctionComponent = view(() => {
  const mediaStore = useMediaStore()
  const media = useMedia()
  const controlsStore = useControlsStore()
  const { activity } = controlsStore

  useEvent(document, 'keypress', (key): void => {
    if (key.code === 'Space') mediaStore.playPauseShortcut()
  })

  if (__ELECTRON__ && media.isVideo) {
    useLayoutEffect(() => {
      mainProcess.setWindowResizable(true)
      return (): void => mainProcess.setWindowResizable(false)
    }, [])
  }

  const className = clsx(
    styles.wrapper,
    media.isVideo && styles.video,
    !activity.showing && styles.controlsHidden
  )

  return (
    <div className={className} onClick={(): void => mediaStore.playPauseShortcut()}>
      <NativeMedia />

      {media.loaded && <Controls />}
      <Shortcut />
      <AutoplayBlockOverlay />

      {media.isAudio && <AudioContent />}
    </div>
  )
})
