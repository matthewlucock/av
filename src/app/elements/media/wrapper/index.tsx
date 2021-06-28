import * as preact from 'preact'
import clsx from 'clsx'
import { view } from '@risingstack/react-easy-state'

import styles from './styles.scss'

import { useStore, useMedia } from '@/store'

import { NativeMedia } from '@/elements/media/native'
import { Controls } from '@/elements/controls'

type Props = Readonly<{
  className?: string
}>

export const MediaWrapper: preact.FunctionComponent<Props> = view(props => {
  const { controlsStore } = useStore()
  const media = useMedia()

  const className = clsx(
    styles.wrapper,
    !controlsStore.visible && styles.controlsHidden,
    props.className
  )

  return (
    <div className={className} onClick={(): void => media.playPause()}>
      <NativeMedia />
      {media.loaded && (
        <Controls mediaType={media.info.type} visible={controlsStore.visible} />
      )}
      {props.children}
    </div>
  )
})
