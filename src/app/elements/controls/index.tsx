import * as preact from 'preact'
import clsx from 'clsx'
import { view } from '@risingstack/react-easy-state'

import styles from './styles.scss'

import { handlePromiseRejection } from '@/util'
import { useStore, useMedia } from '@/store'
import { PLAY_ICON, PAUSE_ICON, STOP_ICON, FULLSCREEN_ICON } from '@/icons'

import { ControlButton } from '@/components/controls/control-button'
import { SpeedThrough, SpeedThroughShiftGroup } from '@/components/controls/speed-through'
import { Skip } from '@/components/controls/skip'
import { Volume } from '@/elements/controls/volume'
import { PlaybackBar } from '@/elements/controls/playback-bar'
import { PlaybackSpeedButton } from '@/elements/controls/playback-speed-button'
import { PlaybackSpeedMenu } from '@/elements/controls/playback-speed-menu'

type Props = Readonly<{
  translucent?: boolean
}>

export const Controls: preact.FunctionComponent<Props> = view(props => {
  const { mediaStore } = useStore()
  const media = useMedia()

  return (
    <>
      <div
        className={clsx(styles.wrapper, props.translucent === true && styles.translucent)}
        onClick={(event): void => event.stopPropagation()}
      >
        <div className={styles.buttons}>
          <div className={styles.leftButtons}>
            <Volume />
          </div>

          <SpeedThroughShiftGroup direction='backwards' active={media.rewinding}>
            <Skip direction='backwards' />
          </SpeedThroughShiftGroup>
          <SpeedThrough direction='backwards' active={media.rewinding} />

          <ControlButton primary onClick={(): void => media.playPause()}>
            {media.playing ? PAUSE_ICON : PLAY_ICON}
          </ControlButton>

          <SpeedThrough direction='forwards' active={media.fastForwarding} />
          <SpeedThroughShiftGroup direction='forwards' active={media.fastForwarding}>
            <Skip direction='forwards' />
          </SpeedThroughShiftGroup>

          <div className={styles.rightButtons}>
            <PlaybackSpeedButton />

            <ControlButton onClick={() => {}}>
              {FULLSCREEN_ICON}
            </ControlButton>

            <ControlButton onClick={(): void => handlePromiseRejection(mediaStore.stop())}>
              {STOP_ICON}
            </ControlButton>
          </div>
        </div>

        <PlaybackBar />
      </div>

      <PlaybackSpeedMenu />
    </>
  )
})
