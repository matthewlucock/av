import * as preact from 'preact'
import { view } from '@risingstack/react-easy-state'

import styles from './styles.scss'

import { PLAY_ICON } from '@/icons'
import { useMedia } from '@/store'

import { Overlay } from '@/components/overlay'

export const AutoplayBlockOverlay: preact.FunctionComponent = view(() => {
  if (__ELECTRON__) return null

  const media = useMedia()

  const onClick = (event: MouseEvent): void => {
    event.stopPropagation()
    media.clearAutoplayBlock()
  }

  return (
    <Overlay visible={media.autoplayBlocked} className={styles.overlay} onClick={onClick}>
      <div className={styles.iconContainer}>
        {PLAY_ICON}
      </div>
    </Overlay>
  )
})
