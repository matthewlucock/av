import * as React from 'react'
import styled from '@emotion/styled'
import useResizeObserver from 'use-resize-observer'

const Wrapper = styled.div`
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
`

const Bar = styled.div`
  width: 100%;
  height: .15em;
  border-radius: 1em;
  background: hsl(0, 0%, 75%);
  cursor: pointer;
`

const ValueBar = styled(Bar)`
  position: absolute;
  background: hsl(0, 0%, 90%);
`

const Thumb = styled.div`
  position: absolute;
  width: .5em;
  height: .5em;
  border-radius: 100%;
  background: hsl(0, 0%, 100%);
`

type Props = Readonly<{
  value: number
  maximum: number
  changeValue: (newValue: number) => void
  draggingCallback?: (dragging: boolean) => void
}>

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
    if (mouseMoveListener.current !== undefined) {
      document.removeEventListener('mousemove', mouseMoveListener.current)
    }
    if (mouseUpListener.current !== undefined) {
      document.removeEventListener('mouseup', mouseUpListener.current)
    }
  }

  const changeValueWithOffset = (newOffset: number): void => {
    props.changeValue(newOffset / usableBarWidth * props.maximum)
  }

  React.useEffect((): () => void => {
    if (dragging) {
      mouseMoveListener.current = (event: MouseEvent) => {
        if (bar.current === null) return

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
      if (props.draggingCallback !== undefined) props.draggingCallback(true)
    } else {
      unbindMouseListeners()
      if (props.draggingCallback !== undefined) props.draggingCallback(false)
    }

    return unbindMouseListeners
  }, [dragging])

  return (
    <Wrapper
      onClick={(event) => {
        if (bar.current === null) return

        const { left } = bar.current.getBoundingClientRect()
        changeValueWithOffset(Math.min(
          Math.max(0, event.clientX - left),
          barWidth - thumbWidth
        ))
      }}
    >
      <Bar ref={bar} />
      <ValueBar style={{ width: `${offset}px` }} />

      <Thumb
        ref={thumb}
        onMouseDown={() => setDragging(true)}
        style={{ left: `${offset}px` }}
      />
    </Wrapper>
  )
}
