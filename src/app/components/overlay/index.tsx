import * as preact from 'preact'
import clsx from 'clsx'

import styles from './styles.scss'

type Props = preact.JSX.HTMLAttributes<HTMLElement> & Readonly<{
  light?: boolean
  visible: boolean
}>

export const Overlay: preact.FunctionComponent<Props> = props => {
  const { className: classNameProp, light, visible, ...rest } = props

  const className = clsx(
    styles.overlay,
    light === true && styles.light,
    visible && styles.visible,
    classNameProp
  )

  return (
    <div className={className} {...rest} />
  )
}
