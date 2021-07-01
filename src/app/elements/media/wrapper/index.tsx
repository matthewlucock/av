import * as preact from 'preact'
import clsx from 'clsx'
import { view } from '@risingstack/react-easy-state'

import styles from './styles.scss'

import { useControlsStore, useMedia } from '@/store'

import { NativeMedia } from '@/elements/media/native'
import { Controls } from '@/elements/controls'
import { Shortcut } from '@/elements/shortcut'
import { AutoplayBlockOverlay } from '@/elements/autoplay-block-overlay'

type Props = Readonly<{
  className?: string
}>

export const MediaWrapper: preact.FunctionComponent<Props> = view(props => {
  const controlsStore = useControlsStore()
  const { activity } = controlsStore
  const media = useMedia()

  const className = clsx(
    styles.wrapper,
    media.isVideo && styles.video,
    !activity.showing && styles.controlsHidden,
    props.className
  )

  return (
    <div className={className} onClick={(): void => media.playPause()}>
      <NativeMedia />

      {media.loaded && <Controls />}
      <Shortcut />
      <AutoplayBlockOverlay />

      {props.children}
    </div>
  )
})
