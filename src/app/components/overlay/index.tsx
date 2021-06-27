import * as preact from 'preact'
import clsx from 'clsx'

import styles from './styles.scss'

type Props = preact.JSX.HTMLAttributes<HTMLElement> & Readonly<{
  visible: boolean
}>

export const Overlay: preact.FunctionComponent<Props> = props => {
  const { className, visible, ...rest } = props

  return (
    <div className={clsx(styles.overlay, visible && styles.visible, className)} {...rest} />
  )
}
