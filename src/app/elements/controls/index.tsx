import * as preact from 'preact'
import clsx from 'clsx'
import { view } from '@risingstack/react-easy-state'

import styles from './styles.scss'

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

type Props = Readonly<{
  translucent?: boolean
}>

export const Controls: preact.FunctionComponent<Props> = view(props => {
  return (
    <>
      <div
        className={clsx(styles.wrapper, props.translucent === true && styles.translucent)}
        onClick={(event): void => event.stopPropagation()}
      >
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
