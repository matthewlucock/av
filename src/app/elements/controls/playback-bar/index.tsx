import * as preact from 'preact'
import { view } from '@risingstack/react-easy-state'

import styles from './styles.scss'

import { useStore, useMedia } from '@/store'

import { Slider } from '@/components/slider'
import { Timestamp } from '@/components/timestamp'

export const PlaybackBar: preact.FunctionComponent = view(() => {
  const { controlsStore } = useStore()
  const media = useMedia()

  return (
    <div className={styles.wrapper}>
      <Timestamp time={media.roundedPlaybackTime} max={media.roundedDuration} />

      <Slider
        value={media.playbackTime}
        max={media.info.duration}
        changeValue={(newTime: number): void => media.updatePlaybackTime(newTime)}
        onMouseMove={(...args): void => controlsStore.videoPreview.update(...args)}
        onMouseOut={() => controlsStore.videoPreview.clear()}
      />

      <Timestamp
        className={styles.duration}
        time={media.roundedDuration}
        max={media.roundedDuration}
      />
    </div>
  )
})
