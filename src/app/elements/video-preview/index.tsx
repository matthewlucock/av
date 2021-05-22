import * as preact from 'preact'
import { useRef, useEffect } from 'preact/hooks'
import { view } from '@risingstack/react-easy-state'

import styles from './styles.scss'

import type { PopperOffset } from '@/util/popper'
import { useStore, useMedia } from '@/store'

import { Timestamp } from '@/components/timestamp'
import { Popper } from '@/components/popper'

const offset: PopperOffset = [0, 30]

export const VideoPreview: preact.FunctionComponent = view(() => {
  const { controlsStore } = useStore()
  const media = useMedia()

  const video = useRef<HTMLVideoElement>()

  if (media.info.type !== 'video') throw new Error('No video')

  useEffect(() => {
    video.current.currentTime = controlsStore.videoPreview.time
  }, [controlsStore.videoPreview.time])

  return (
    <Popper
      className={styles.wrapper}
      reference={controlsStore.videoPreview.virtualElement}
      offset={offset}
      visible={controlsStore.videoPreview.visible}
    >
      <video ref={video} className={styles.video} src={media.info.src} />

      <Timestamp
        className={styles.time}
        time={controlsStore.videoPreview.time}
        max={media.info.duration}
      />
    </Popper>
  )
})
