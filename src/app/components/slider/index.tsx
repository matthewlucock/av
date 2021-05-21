import * as preact from 'preact'
import { useRef, useState, useEffect, useCallback } from 'preact/hooks'
import useResizeObserver from 'use-resize-observer'

import styles from './styles.scss'

type Props = Readonly<{
  value: number
  max: number
  changeValue: (newValue: number) => void
  draggingCallback?: (dragging: boolean) => void
  onMouseMove?: (position: [number, number], value: number) => void
  onMouseOut?: () => void
}>

export const Slider: preact.FunctionComponent<Props> = props => {
  const bar = useRef<HTMLDivElement>()
  const barWidth = useResizeObserver({ ref: bar }).width ?? 0
  const thumb = useRef<HTMLDivElement>()
  const thumbWidth = useResizeObserver({ ref: thumb }).width ?? 0

  const usableWidth = barWidth - thumbWidth
  const valueWidth = Math.round(props.value / props.max * usableWidth)

  const [dragging, setDragging] = useState<boolean>(false)

  const getOffsetFromMouseEvent = useCallback(({ clientX }: MouseEvent): number => {
    const { left } = bar.current.getBoundingClientRect()
    return Math.min(
      Math.max(0, clientX - left),
      barWidth - thumbWidth
    )
  }, [barWidth, thumbWidth])

  const getValueFromOffset = useCallback((offset: number): number => {
    return offset / usableWidth * props.max
  }, [usableWidth, props.max])

  const changeValueFromMouseEvent = useCallback((event: MouseEvent): void => {
    props.changeValue(getValueFromOffset(getOffsetFromMouseEvent(event)))
  }, [props.changeValue, getOffsetFromMouseEvent, getValueFromOffset])

  const stopDragging = useCallback(() => setDragging(false), [])

  const bindMouseListeners = useCallback((): void => {
    document.addEventListener('mousemove', changeValueFromMouseEvent)
    document.addEventListener('mouseup', stopDragging)
  }, [changeValueFromMouseEvent, stopDragging])

  const unbindMouseListeners = useCallback((): void => {
    document.removeEventListener('mousemove', changeValueFromMouseEvent)
    document.removeEventListener('mouseup', stopDragging)
  }, [changeValueFromMouseEvent, stopDragging])

  useEffect((): () => void => {
    if (dragging) {
      bindMouseListeners()
      if (props.draggingCallback !== undefined) props.draggingCallback(true)
    } else {
      unbindMouseListeners()
      if (props.draggingCallback !== undefined) props.draggingCallback(false)
    }

    return unbindMouseListeners
  }, [dragging, bindMouseListeners, unbindMouseListeners])

  const onMouseMove = useCallback((event: MouseEvent): void => {
    if (props.onMouseMove !== undefined) {
      const { top, left } = bar.current.getBoundingClientRect()
      const offset = getOffsetFromMouseEvent(event)
      const value = getValueFromOffset(offset)
      props.onMouseMove([left + offset, top], value)
    }
  }, [props.onMouseMove, getOffsetFromMouseEvent, getValueFromOffset])

  return (
    <div
      class={styles.wrapper}
      onMouseDown={changeValueFromMouseEvent}
      onMouseMove={onMouseMove}
      onMouseOut={props.onMouseOut}
    >
      <div ref={bar} class={styles.bar} />
      <div class={styles.value} style={{ width: `${valueWidth}px` }} />

      <div
        ref={thumb}
        class={styles.thumb}
        style={{ left: `${valueWidth}px` }}
        onMouseDown={(): void => setDragging(true)}
      />
    </div>
  )
}
