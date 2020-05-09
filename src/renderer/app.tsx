import * as React from 'react'
import styled from '@emotion/styled'
import { connect as connectToRedux } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import useResizeObserver from 'use-resize-observer'

import { TRANSITION_DURATION, BACKGROUND_COLOR_TRANSITION_DURATION_MS } from './globals'

import { State } from './store/state'
import {
  getBackgroundColor,
  getDraggingEnabled,
  getMediaIsAudio,
  getMediaIsVideo
} from './store/selectors'
import { Dispatch } from './store'
import { setAppSize } from './store/actions'
import { randomizeBackgroundColor, openFile } from './store/thunks'

import { Pane } from './components/pane'

import { Audio } from './elements/audio'
import { Video } from './elements/video'
import { File } from './elements/file'
import { Settings } from './elements/settings'

const Wrapper = styled(Pane)`
  font-size: 15px;
  font-family: 'Muli', sans-serif;;
  color: white;
  overflow: hidden;
  user-select: none;
  transition: background-color ${BACKGROUND_COLOR_TRANSITION_DURATION_MS}ms;
`

interface DragOverlayProps {
  readonly dragging: boolean
}

const DragOverlay = styled(Pane)<DragOverlayProps>`
  background: white;
  visibility: ${(props) => props.dragging ? 'visible' : 'hidden'};
  opacity: ${(props) => props.dragging ? 0.5 : 0};
  transition-property: visibility, opacity;
  transition-duration: ${TRANSITION_DURATION};
`

interface StateProps {
  readonly backgroundColor: string
  readonly draggingEnabled: boolean
  readonly mediaIsAudio: boolean
  readonly mediaIsVideo: boolean
}

interface DispatchProps {
  readonly setAppSize: (width: number, height: number) => void
  readonly randomizeBackgroundColor: () => void
  readonly openFile: (fileList: FileList) => void
}

type Props = StateProps & DispatchProps

const BaseApp: React.FC<Props> = props => {
  const wrapper = React.useRef<HTMLDivElement | null>(null)
  const [dragging, setDragging] = React.useState(false)

  /**
   * App size tracking
   */
  useResizeObserver({
    ref: wrapper,
    onResize: ({ width, height }) => {
      if (!width || !height) return
      props.setAppSize(width, height)
    }
  })

  React.useEffect(props.randomizeBackgroundColor, [])

  return (
    <Wrapper
      ref={wrapper}
      style={{ backgroundColor: props.backgroundColor }}
      onDragEnter={() => setDragging(props.draggingEnabled)}
    >
      {props.mediaIsAudio ? <Audio /> : (props.mediaIsVideo ? <Video /> : <File />)}

      <DragOverlay
        dragging={dragging}
        onDragOver={event => event.preventDefault()}
        onDragLeave={() => setDragging(false)}
        onDrop={event => {
          event.preventDefault()
          if (!props.draggingEnabled) return

          props.openFile(event.dataTransfer.files)
          setDragging(false)
        }}
      />

      <Settings />
    </Wrapper>
  )
}

const mapStateToProps = createStructuredSelector<State, StateProps>({
  backgroundColor: getBackgroundColor,
  draggingEnabled: getDraggingEnabled,
  mediaIsAudio: getMediaIsAudio,
  mediaIsVideo: getMediaIsVideo
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => (
  {
    setAppSize: (width: number, height: number): void => {
      dispatch(setAppSize(width, height))
    },
    randomizeBackgroundColor: (): void => {
      dispatch(randomizeBackgroundColor())
    },
    openFile: (fileList: FileList): void => {
      dispatch(openFile(fileList))
    }
  }
)

export const App = connectToRedux(mapStateToProps, mapDispatchToProps)(BaseApp)
