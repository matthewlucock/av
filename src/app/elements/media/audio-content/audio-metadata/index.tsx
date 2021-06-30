import * as preact from 'preact'
import { view } from '@risingstack/react-easy-state'

import styles from './styles.scss'

import { useMedia } from '@/store'

export const AudioMetadata: preact.FunctionComponent = view(() => {
  const media = useMedia()
  const { audioMetadata: metadata } = media.info

  if (metadata === undefined) throw new Error('No audio metadata')

  return (
    <div className={styles.wrapper}>
      {metadata.artSrc !== null && (
        <img className={styles.art} src={metadata.artSrc} />
      )}

      <div>{metadata.artist}</div>
      <div>{metadata.title}</div>
    </div>
  )
})
