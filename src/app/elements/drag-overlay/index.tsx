import * as preact from 'preact'
import clsx from 'clsx'

import styles from './styles.scss'

type Props = Readonly<{
  dragging: boolean
  setDragging: (dragging: boolean) => void
  callback: (files: FileList) => void
}>

export const DragOverlay: preact.FunctionComponent<Props> = props => {
  return (
    <div
      className={clsx(styles.draggingOverlay, props.dragging && styles.dragging)}
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
