import * as preact from 'preact'
import { useState } from 'preact/hooks'
import clsx from 'clsx'
import { usePopper } from 'react-popper'

import styles from './styles.scss'

import type { PopperOffset, PopperVirtualElement } from '@/util/popper'

type PopperStyles = Readonly<{
  [key: string]: preact.JSX.CSSProperties
}>

type Props = Readonly<{
  className?: string
  reference: HTMLElement | PopperVirtualElement | null
  offset?: PopperOffset
  visible: boolean
}>

const DEFAULT_OFFSET: PopperOffset = ({ reference }) => [0, reference.height / 3]

export const Popper: preact.FunctionComponent<Props> = props => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const [arrow, setArrow] = useState<HTMLDivElement | null>(null)

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

  return (
    <div
      ref={setContainer}
      className={clsx(styles.popper, props.className, props.visible && styles.visible)}
      style={popperStyles.popper}
    >
      <div ref={setArrow} className={styles.arrow} style={popperStyles.arrow} />
      {props.children}
    </div>
  )
}
