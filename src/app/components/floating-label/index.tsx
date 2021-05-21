import * as preact from 'preact'
import clsx from 'clsx'

import styles from './styles.scss'

import type { HorizontalDirection } from '@/globals'

export const floatingLabelContainerClass = styles.labelContainer

const getPositionClass = (position: HorizontalDirection): string => {
  if (position === 'left') {
    return styles.left
  } else if (position === 'right') {
    return styles.right
  } else {
    throw new Error('Invalid position')
  }
}

type Props = Readonly<{
  position: HorizontalDirection
  visible: boolean
}>

export const FloatingLabel: preact.FunctionComponent<Props> = props => {
  const positionClass = getPositionClass(props.position)

  return (
    <div class={clsx(styles.label, positionClass, props.visible && styles.visible)}>
      {props.children}
    </div>
  )
}
