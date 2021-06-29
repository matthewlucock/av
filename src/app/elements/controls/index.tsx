import * as preact from 'preact'
import { useEffect, useLayoutEffect } from 'preact/hooks'
import useEvent from '@react-hook/event'
import clsx from 'clsx'
import { view } from '@risingstack/react-easy-state'
import { throttle } from 'throttle-debounce'

import styles from './styles.scss'

import { handlePromiseRejection } from '@/util'
import { useMediaStore, useControlsStore, useMedia } from '@/store'
import { STOP_ICON, FULLSCREEN_ICON } from '@/icons'

import { ControlButton } from '@/components/controls/control-button'
import { PlaybackControls } from '@/elements/controls/playback-controls'
import { Volume } from '@/elements/controls/volume'
import { PlaybackBar } from '@/elements/controls/playback-bar'
import { PlaybackSpeed } from '@/elements/controls/playback-speed'
import { ShortcutDisplay } from '@/elements/controls/shortcut-display'

const LeftControls: preact.FunctionComponent = () => {
  return (
    <div className={styles.leftButtons}>
      <Volume />
    </div>
  )
}

const RightControls: preact.FunctionComponent = () => {
  const mediaStore = useMediaStore()

  return (
    <div className={styles.rightButtons}>
      <PlaybackSpeed />

      <ControlButton onClick={() => {}}>
        {FULLSCREEN_ICON}
      </ControlButton>

      <ControlButton
        onClick={(): void => handlePromiseRejection(mediaStore.stop())}
        end='right'
      >
        {STOP_ICON}
      </ControlButton>
    </div>
  )
}

const ACTIVITY_MOUSEMOVE_THROTTLE_DURATION = 100
const useActive = (): void => {
  const controlsStore = useControlsStore()
  const { activity } = controlsStore
  const media = useMedia()

  if (media.info.type === 'audio') return

  useLayoutEffect(() => {
    activity.show()
  }, [])
  useEffect(() => {
    return () => {
      activity.clearTimeout()
    }
  })

  useEvent(
    document,
    'mousemove',
    throttle(ACTIVITY_MOUSEMOVE_THROTTLE_DURATION, true, (): void => activity.show())
  )
  useEvent(document, 'mouseleave', (): void => activity.hide())
  useEvent(window, 'focus', (): void => activity.show())
  useEvent(window, 'blur', (): void => activity.hide())
}

export const Controls: preact.FunctionComponent = view(() => {
  const controlsStore = useControlsStore()
  const { activity } = controlsStore
  const media = useMedia()
  useActive()

  const onClick = (event: MouseEvent): void => {
    activity.show()
    event.stopPropagation()
  }

  const visible = media.info.type === 'audio' || activity.showing

  const className = clsx(
    styles.wrapper,
    media.info.type === 'video' && styles.video,
    visible && styles.visible
  )

  return (
    <>
      <div className={className} onClick={onClick}>
        <div className={styles.buttons}>
          <LeftControls />
          <PlaybackControls />
          <RightControls />
        </div>

        <PlaybackBar />
      </div>

      <ShortcutDisplay />
    </>
  )
})
