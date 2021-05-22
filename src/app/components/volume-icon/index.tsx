import * as preact from 'preact'
import { view } from '@risingstack/react-easy-state'

import styles from './styles.scss'

import { useMedia } from '@/store'
import { VOLUME_UP_ICON, VOLUME_DOWN_ICON, VOLUME_MUTED_ICON } from '@/icons'

const getVolumeIcon = (volume: number): JSX.Element => {
  if (volume > 0.4) {
    return VOLUME_UP_ICON
  } else if (volume > 0) {
    return VOLUME_DOWN_ICON
  } else {
    return VOLUME_MUTED_ICON
  }
}

export const VolumeIcon: preact.FunctionComponent = view(props => {
  const media = useMedia()

  return (
    <div className={styles.wrapper}>{getVolumeIcon(media.volume)}</div>
  )
})
