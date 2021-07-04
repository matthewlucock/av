import * as preact from 'preact'
import clsx from 'clsx'

import styles from './styles.scss'

type Props = preact.JSX.HTMLAttributes<HTMLButtonElement> & Readonly<{
  light?: boolean
}>

export const SimpleButton: preact.FunctionComponent<Props> = props => {
  const { className: classNameProp, light, ...rest } = props

  const className = clsx(
    styles.button,
    light === true && styles.light,
    classNameProp
  )

  return (
    <button className={className} {...rest}>
      {props.children}
    </button>
  )
}
