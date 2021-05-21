import * as preact from 'preact'

import styles from './styles.scss'

type Props = Readonly<{
  onClick: () => void
}>

export const SimpleButton: preact.FunctionComponent<Props> = props => {
  return (
    <button class={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  )
}
