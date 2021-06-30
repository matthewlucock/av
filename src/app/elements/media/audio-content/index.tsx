import * as preact from 'preact'

import styles from './styles.scss'

import { useMedia } from '@/store'

import { VolumeIcon } from '@/components/volume-icon'
import { AudioMetadata } from './audio-metadata'

export const AudioContent: preact.FunctionComponent = () => {
  const media = useMedia()

  if (media.hasAudioMetadata) {
    return <AudioMetadata />
  } else {
    return (
      <div className={styles.audioIconContainer}>
        <VolumeIcon />
      </div>
    )
  }
}
