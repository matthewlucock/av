import * as preact from 'preact'

import styles from './styles.scss'

type Props = Readonly<{
  data: AudioMetadata
}>

export const AudioMetadata: preact.FunctionComponent<Props> = props => {
  const { data } = props

  return (
    <div class={styles.wrapper}>
      {data.artSrc !== null && <img class={styles.art} src={data.artSrc} />}
      <div>{data.artist}</div>
      <div>{data.title}</div>
    </div>
  )
}
