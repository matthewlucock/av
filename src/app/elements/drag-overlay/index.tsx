import * as preact from 'preact'
import { useState } from 'preact/hooks'
import useEvent from '@react-hook/event'

import { handlePromiseRejection } from '@/util'
import { useMediaStore } from '@/store'

import { Overlay } from '@/components/overlay'

export const DragOverlay: preact.FunctionComponent = () => {
  const mediaStore = useMediaStore()

  const [dragging, setDragging] = useState<boolean>(false)
  useEvent(document, 'dragenter', (): void => setDragging(true))

  const onDrop = (event: DragEvent): void => {
    event.preventDefault()

    if (event.dataTransfer !== null) {
      handlePromiseRejection(mediaStore.open(event.dataTransfer.files))
    }

    setDragging(false)
  }

  return (
    <Overlay
      light
      visible={dragging}
      onDragOver={event => event.preventDefault()}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
    />
  )
}
