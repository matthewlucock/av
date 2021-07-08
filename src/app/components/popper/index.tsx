import * as preact from 'preact'
import { useState, useEffect } from 'preact/hooks'
import clsx from 'clsx'
import { usePopper } from 'react-popper'

import styles from './styles.scss'

import type { PopperOffset, PopperVirtualElement } from '@/util/popper'

type PopperStyles = Readonly<{
  [key: string]: preact.JSX.CSSProperties
}>

type Props = Readonly<{
  className?: string
  compact?: boolean
  reference: HTMLElement | PopperVirtualElement | null
  offset?: PopperOffset
  visible: boolean
  currentlyShowingCallback?: (isShowing: boolean) => void
}>

const DEFAULT_OFFSET: PopperOffset = ({ reference }) => [0, reference.height / 3]

export const Popper: preact.FunctionComponent<Props> = props => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const [arrow, setArrow] = useState<HTMLDivElement | null>(null)

  const compact = props.compact ?? false
  const offset = props.offset ?? DEFAULT_OFFSET

  const popperData = usePopper(props.reference, container, {
    placement: 'top',
    modifiers: [
      { name: 'offset', options: { offset } },
      { name: 'preventOverflow', options: { padding: 0 } },
      { name: 'arrow', options: { element: arrow } }
    ]
  })
  const popperStyles = popperData.styles as PopperStyles

  useEffect(() => {
    if (props.visible) {
      if (props.currentlyShowingCallback !== undefined) props.currentlyShowingCallback(true)
    }
  }, [props.visible])

  const onTransitionEnd = (event: TransitionEvent): void => {
    if (event.propertyName === 'visibility' && !props.visible) {
      if (props.currentlyShowingCallback !== undefined) props.currentlyShowingCallback(false)
    }
  }

  const className = clsx(
    styles.popper,
    compact && styles.compact,
    props.visible && styles.visible,
    props.className
  )

  return (
    <div
      ref={setContainer}
      className={className}
      style={popperStyles.popper}
      onTransitionEnd={onTransitionEnd}
    >
      <div ref={setArrow} className={styles.arrow} style={popperStyles.arrow} />
      {props.children}
    </div>
  )
}
