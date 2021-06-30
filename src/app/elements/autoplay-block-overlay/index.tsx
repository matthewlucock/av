import * as preact from 'preact'

import styles from './styles.scss'

import { useMedia } from '@/store'
import { PLAY_ICON } from '@/icons'

import { Overlay } from '@/components/overlay'

type Props = Readonly<{
  visible: boolean
}>

export const AutoplayBlockOverlay: preact.FunctionComponent<Props> = props => {
  const media = useMedia()

  const onClick = (event: MouseEvent): void => {
    event.stopPropagation()
    media.clearAutoplayBlock()
  }

  return (
    <Overlay visible={props.visible} className={styles.overlay} onClick={onClick}>
      <div className={styles.iconContainer}>
        {PLAY_ICON}
      </div>
    </Overlay>
  )
}
