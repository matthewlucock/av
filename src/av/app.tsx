import * as React from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import useResizeObserver from 'use-resize-observer'

import { TRANSITION_DURATION, BACKGROUND_COLOR_TRANSITION_DURATION_MS } from './globals'

import { useSelector } from 'av/store'
import { generalSlice, getBackgroundColor } from 'av/store/slices/general'
import { mediaSlice } from 'av/store/slices/media'
import { randomizeBackgroundColor, openFile } from './store/thunks'

import { Pane } from './components/pane'

import { Audio } from './elements/audio'
import { Video } from './elements/video'
import { File } from './elements/file'
import { BrowserDialog } from './elements/browser-dialog'

const Wrapper = styled(Pane)`
  font-size: 15px;
  font-family: 'Muli', sans-serif;;
  color: white;
  overflow: hidden;
  user-select: none;
  transition: background-color ${BACKGROUND_COLOR_TRANSITION_DURATION_MS}ms;

  &:focus {
    outline: none;
  }

  * {
    line-height: 1;
  }
`

type DragOverlayProps = Readonly<{ dragging: boolean }>
const DragOverlay = styled(Pane)<DragOverlayProps>`
  background: white;
  visibility: ${(props) => props.dragging ? 'visible' : 'hidden'};
  opacity: ${(props) => props.dragging ? 0.5 : 0};
  transition-property: visibility, opacity;
  transition-duration: ${TRANSITION_DURATION};
`

export const App: React.FC = () => {
  const backgroundColor = useSelector(getBackgroundColor)
  const draggingEnabled = useSelector(state => (
    !(state.settings.showSettings || state.browserDialog.show)
  ))
  const mediaType = useSelector(({ media }) => media.type)
  const mediaLoaded = useSelector(({ media }) => media.loaded)
  const dispatch = useDispatch()

  const wrapper = React.useRef<HTMLDivElement | null>(null)
  const [dragging, setDragging] = React.useState(false)

  /**
   * App size tracking
   */
  useResizeObserver({
    ref: wrapper,
    onResize: ({ width, height }) => {
      if (!width || !height) return
      dispatch(generalSlice.actions.setAppSize({ width, height }))
    }
  })

  React.useEffect(() => {
    dispatch(randomizeBackgroundColor())
  }, [])

  const onKeyUp = (event: React.KeyboardEvent): void => {
    if (!mediaLoaded) return

    if (event.key === ' ') dispatch(mediaSlice.actions.playPauseShortcut())
  }

  return (
    <Wrapper
      ref={wrapper}
      style={{ backgroundColor: backgroundColor }}
      onKeyUp={onKeyUp}
      onDragEnter={() => setDragging(draggingEnabled)}
      onContextMenu={event => event.preventDefault()}
      tabIndex={-1}
    >
      {mediaType === 'audio' ? <Audio /> : (mediaType === 'video' ? <Video /> : <File />)}

      {!__ELECTRON__ && <BrowserDialog />}

      <DragOverlay
        dragging={dragging}
        onDragOver={event => event.preventDefault()}
        onDragLeave={() => setDragging(false)}
        onDrop={event => {
          event.preventDefault()
          if (!draggingEnabled) return

          dispatch(openFile(event.dataTransfer.files))
          setDragging(false)
        }}
      />
    </Wrapper>
  )
}
