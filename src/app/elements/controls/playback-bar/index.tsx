import * as preact from 'preact'
import { view } from '@risingstack/react-easy-state'

import styles from './styles.scss'

import { useStore, useMedia } from '@/store'

import { Slider } from '@/components/slider'
import { Timestamp } from '@/components/timestamp'

export const PlaybackBar: preact.FunctionComponent = view(() => {
  const { controlsStore } = useStore()
  const media = useMedia()

  const roundedDuration = Math.ceil(media.info.duration)
  const roundedPlaybackTime = (
    media.finished ? Math.ceil(media.playbackTime) : Math.floor(media.playbackTime)
  )

  return (
    <div className={styles.wrapper}>
      <Timestamp time={roundedPlaybackTime} max={roundedDuration} />

      <Slider
        value={media.playbackTime}
        max={media.info.duration}
        changeValue={(newTime: number): void => media.updatePlaybackTime(newTime)}
        onMouseMove={(...args): void => controlsStore.videoPreview.update(...args)}
        onMouseOut={() => controlsStore.videoPreview.clear()}
      />

      <Timestamp time={roundedDuration} max={roundedDuration} />
    </div>
  )
})
