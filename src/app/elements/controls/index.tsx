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
import { PlaybackSpeedButton } from '@/elements/controls/playback-speed-button'
import { PlaybackSpeedMenu } from '@/elements/controls/playback-speed-menu'

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
      <PlaybackSpeedButton />

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

  if (media.info.type === 'audio') {
    useLayoutEffect(() => {
      activity.show()
    }, [])
    return
  }

  useLayoutEffect(() => {
    activity.active()
  }, [])
  useEffect(() => {
    return () => {
      activity.reset()
    }
  })

  useEvent(
    document,
    'mousemove',
    throttle(ACTIVITY_MOUSEMOVE_THROTTLE_DURATION, true, (): void => activity.active())
  )
  useEvent(document, 'mouseleave', (): void => activity.inactive())
  useEvent(window, 'focus', (): void => activity.active())
  useEvent(window, 'blur', (): void => activity.inactive())
}

export const Controls: preact.FunctionComponent = view(() => {
  const controlsStore = useControlsStore()
  const { activity } = controlsStore
  const media = useMedia()
  useActive()

  const onClick = (event: MouseEvent): void => {
    activity.active()
    event.stopPropagation()
  }

  const className = clsx(
    styles.wrapper,
    media.info.type === 'video' && styles.video,
    activity.visible && styles.visible
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

      <PlaybackSpeedMenu />
    </>
  )
})
