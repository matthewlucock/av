import * as preact from 'preact'

import styles from './styles.scss'

import { Overlay } from '@/components/overlay'

type Props = Readonly<{
  dragging: boolean
  setDragging: (dragging: boolean) => void
  callback: (files: FileList) => void
}>

export const DragOverlay: preact.FunctionComponent<Props> = props => {
  return (
    <Overlay
      className={styles.dragOverlay}
      visible={props.dragging}
      onDragOver={event => event.preventDefault()}
      onDragLeave={() => props.setDragging(false)}
      onDrop={event => {
        event.preventDefault()

        if (event.dataTransfer !== null) props.callback(event.dataTransfer.files)
        props.setDragging(false)
      }}
    />
  )
}
