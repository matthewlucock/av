import * as preact from 'preact'
import { useRef, useLayoutEffect } from 'preact/hooks'
import useEvent from '@react-hook/event'
import clsx from 'clsx'
import { view } from '@risingstack/react-easy-state'

import styles from './styles.scss'

import type { MediaType } from '@/globals'
import { handlePromiseRejection } from '@/util'
import { useStore } from '@/store'
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
  const { mediaStore } = useStore()

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

type UseActive = Readonly<{
  setActive: (active: boolean) => void
}>
const useActive = (mediaType: MediaType): UseActive => {
  const audio = mediaType === 'audio'
  const { controlsStore } = useStore()
  const timeoutId = useRef<number>(0)

  const setActive = (active: boolean): void => {
    if (audio) return

    if (document.hasFocus() && active) {
      controlsStore.show()
    } else {
      controlsStore.hide()
    }

    window.clearTimeout(timeoutId.current)

    if (active) {
      timeoutId.current = window.setTimeout(() => controlsStore.hide(), 3000)
    }
  }

  if (!audio) {
    useEvent(document, 'mousemove', (): void => setActive(true))
    useEvent(document, 'mouseleave', (): void => setActive(false))
    useEvent(window, 'focus', (): void => setActive(true))
    useEvent(window, 'blur', (): void => setActive(false))

    useLayoutEffect(() => {
      setActive(true)
    }, [])
  }

  return { setActive }
}

type Props = Readonly<{
  mediaType: MediaType
  visible: boolean
}>

export const Controls: preact.FunctionComponent<Props> = view(props => {
  const { setActive } = useActive(props.mediaType)

  const onClick = (event: MouseEvent): void => {
    setActive(true)
    event.stopPropagation()
  }

  const className = clsx(
    styles.wrapper,
    props.mediaType === 'video' && styles.video,
    props.visible && styles.visible
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
