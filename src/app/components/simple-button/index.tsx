import * as preact from 'preact'
import clsx from 'clsx'

import styles from './styles.scss'

type Props = preact.JSX.HTMLAttributes<HTMLButtonElement>

export const SimpleButton: preact.FunctionComponent<Props> = props => {
  const { className: classNameProp, ...rest } = props

  return (
    <button className={clsx(styles.button, classNameProp)} {...rest}>
      {props.children}
    </button>
  )
}
