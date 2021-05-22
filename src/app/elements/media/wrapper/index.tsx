import * as preact from 'preact'
import clsx from 'clsx'
import { view } from '@risingstack/react-easy-state'

import styles from './styles.scss'

import { useMedia } from '@/store'

import { NativeMedia } from '@/elements/media/native'

type Props = Readonly<{
  className?: string
  controls: JSX.Element
}>

export const MediaWrapper: preact.FunctionComponent<Props> = view(props => {
  const media = useMedia()

  return (
    <div
      className={clsx(styles.wrapper, props.className)}
      onClick={(): void => media.playPause()}
    >
      <NativeMedia />
      {media.loaded && props.controls}
      {props.children}
    </div>
  )
})
