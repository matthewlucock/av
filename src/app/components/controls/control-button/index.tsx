import * as preact from 'preact'
import clsx from 'clsx'

import styles from './styles.scss'

type Props = Readonly<{
  ref_?: preact.Ref<HTMLButtonElement>
  className?: string
  onClick: () => void
  primary?: boolean
}>

export const ControlButton: preact.FunctionComponent<Props> = props => {
  return (
    <button
      ref={props.ref_}
      className={clsx(styles.button, props.primary === true && styles.primary, props.className)}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
