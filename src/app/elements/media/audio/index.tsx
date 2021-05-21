import * as preact from 'preact'

import styles from './styles.scss'

import { useMedia } from '@/store'

import { MediaWrapper } from '@/elements/media/wrapper'
import { Controls } from '@/elements/controls'
import { VolumeIcon } from '@/components/volume-icon'
import { AudioMetadata } from '@/elements/media/audio-metadata'

export const Audio: preact.FunctionComponent = () => {
  const media = useMedia()

  if (media.info.type !== 'audio') throw new Error('No audio')

  return (
    <MediaWrapper controls={<Controls />}>
      {((): JSX.Element => {
        if (media.info.audioMetadata !== undefined) {
          return <AudioMetadata data={media.info.audioMetadata} />
        }

        return (
          <div class={styles.audioIconContainer}>
            <VolumeIcon />
          </div>
        )
      })()}
    </MediaWrapper>
  )
}
