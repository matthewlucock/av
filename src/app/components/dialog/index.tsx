import * as preact from 'preact'

import styles from './styles.scss'

import { SimpleButton } from '@/components/simple-button'

type Props = Readonly<{
  confirm?: boolean
  close: (result?: boolean) => void
}>

export const Dialog: preact.FunctionComponent<Props> = props => {
  const confirmButtons = (
    <>
      <SimpleButton light onClick={() => props.close(false)}>Cancel</SimpleButton>
      <SimpleButton light onClick={() => props.close(true)}>OK</SimpleButton>
    </>
  )

  const alertButtons = (
    <>
      <SimpleButton light onClick={() => props.close()}>Close</SimpleButton>
    </>
  )

  return (
    <div className={styles.dialog}>
      <p>{props.children}</p>

      <div className={styles.buttons}>
        {props.confirm === true ? confirmButtons : alertButtons}
      </div>
    </div>
  )
}
