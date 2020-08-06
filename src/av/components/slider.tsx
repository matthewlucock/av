import * as React from 'react'
import styled from '@emotion/styled'
import useResizeObserver from 'use-resize-observer'

import { CONTROLS_TINTED_FOREGROUND_COLOR, CONTROLS_SECONDARY_BACKGROUND_COLOR } from 'av/globals'

const Wrapper = styled.div`
  width: 100%;
  padding: .5em;
  cursor: pointer;
`

const Body = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
`

const Bar = styled.div`
  width: 100%;
  height: .15em;
  border-radius: 1em;
  background: ${CONTROLS_SECONDARY_BACKGROUND_COLOR.string()};
  cursor: pointer;
`

const ValueBar = styled(Bar)`
  position: absolute;
  background: ${CONTROLS_TINTED_FOREGROUND_COLOR.string()};
`

const Thumb = styled.div`
  position: absolute;
  height: .5em;
  width: .5em;
  border-radius: 100%;
  background: currentColor;
`

interface Props {
  readonly value: number
  readonly maximum: number
  readonly changeValue: (newValue: number) => void
  readonly draggingCallback?: (dragging: boolean) => void
}

export const Slider: React.FC<Props> = props => {
  const bar = React.useRef<HTMLDivElement | null>(null)
  const barWidth = useResizeObserver({ ref: bar }).width ?? 0
  const thumb = React.useRef<HTMLDivElement | null>(null)
  const thumbWidth = useResizeObserver({ ref: thumb }).width ?? 0

  const mouseMoveListener = React.useRef<(event: MouseEvent) => void>()
  const mouseUpListener = React.useRef<() => void>()

  const [dragging, setDragging] = React.useState<boolean>(false)

  const usableBarWidth = barWidth - thumbWidth
  const offset = props.value / props.maximum * usableBarWidth

  const unbindMouseListeners = (): void => {
    if (mouseMoveListener.current) {
      document.removeEventListener('mousemove', mouseMoveListener.current)
    }
    if (mouseUpListener.current) {
      document.removeEventListener('mouseup', mouseUpListener.current)
    }
  }

  const changeValueWithOffset = (newOffset: number): void => {
    if (!bar.current) return
    if (barWidth) props.changeValue(newOffset / usableBarWidth * props.maximum)
  }

  React.useEffect((): () => void => {
    if (dragging) {
      mouseMoveListener.current = (event: MouseEvent) => {
        if (!bar.current) return

        const { left, right } = bar.current.getBoundingClientRect()

        if (event.clientX < left) {
          changeValueWithOffset(0)
        } else if (event.clientX > right - thumbWidth) {
          changeValueWithOffset(barWidth)
        } else {
          changeValueWithOffset(event.clientX - left)
        }
      }

      mouseUpListener.current = () => setDragging(false)

      document.addEventListener('mousemove', mouseMoveListener.current)
      document.addEventListener('mouseup', mouseUpListener.current)
      if (props.draggingCallback) props.draggingCallback(true)
    } else {
      unbindMouseListeners()
      if (props.draggingCallback) props.draggingCallback(false)
    }

    return unbindMouseListeners
  }, [dragging])

  return (
    <Wrapper
      onClick={(event) => {
        if (!bar.current) return

        const { left } = bar.current.getBoundingClientRect()
        changeValueWithOffset(Math.min(
          Math.max(0, event.clientX - left),
          barWidth - thumbWidth
        ))
      }}
    >
      <Body>
        <Bar ref={bar} />
        <ValueBar style={{ width: `${offset}px` }} />

        <Thumb
          ref={thumb}
          onMouseDown={() => setDragging(true)}
          style={{ left: `${offset}px` }}
        />
      </Body>
    </Wrapper>
  )
}
