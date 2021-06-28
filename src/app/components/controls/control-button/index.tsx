import * as preact from 'preact'
import clsx from 'clsx'

import styles from './styles.scss'

type Props = Readonly<{
  ref_?: preact.Ref<HTMLButtonElement>
  className?: string
  onClick: () => void
  primary?: boolean
  end?: 'left' | 'right'
}>

export const ControlButton: preact.FunctionComponent<Props> = props => {
  const className = clsx(
    styles.button,
    props.primary === true && styles.primary,
    props.end === 'left' && styles.leftEnd,
    props.end === 'right' && styles.rightEnd,
    props.className
  )

  return (
    <button ref={props.ref_} className={className} onClick={props.onClick}>
      {props.children}
    </button>
  )
}
