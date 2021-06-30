import * as preact from 'preact'

import styles from './styles.scss'

import { useMedia } from '@/store'

import { MediaWrapper } from '@/elements/media/wrapper'
import { VolumeIcon } from '@/components/volume-icon'
import { AudioMetadata } from '@/elements/media/audio-metadata'

export const Audio: preact.FunctionComponent = () => {
  const media = useMedia()

  if (!media.isAudio) throw new Error('No audio')

  return (
    <MediaWrapper>
      {((): JSX.Element => {
        if (media.info.audioMetadata !== undefined) {
          return <AudioMetadata data={media.info.audioMetadata} />
        }

        return (
          <div className={styles.audioIconContainer}>
            <VolumeIcon />
          </div>
        )
      })()}
    </MediaWrapper>
  )
}
