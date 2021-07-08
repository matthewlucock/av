import * as preact from 'preact'
import { useRef, useState, useEffect } from 'preact/hooks'
import useHover from '@react-hook/hover'
import clsx from 'clsx'

import styles from './styles.scss'

import { Popper } from '@/components/popper'

type Props = Readonly<{
  className?: string
  primary?: boolean
  label: string
  onClick: () => void
  hoveringCallback?: (hovering: boolean) => void
  tooltipCurrentlyShowingCallback?: (tooltipShowing: boolean) => void
  forceHideTooltip?: boolean
  end?: 'left' | 'right'
}>

export const ControlButton: preact.FunctionComponent<Props> = props => {
  const [button, setButton] = useState<HTMLButtonElement | null>(null)
  const hovering = useHover(button)
  const [tooltipShowing, setTooltipShowing] = useState<boolean>(false)
  const timeoutId = useRef<number>(0)

  const forceHideTooltip = props.forceHideTooltip ?? false

  useEffect(() => {
    if (props.hoveringCallback !== undefined) props.hoveringCallback(hovering)

    if (hovering) {
      timeoutId.current = window.setTimeout(() => setTooltipShowing(!forceHideTooltip), 1000)
    } else {
      clearTimeout(timeoutId.current)
      setTooltipShowing(false)
    }

    return () => {
      clearTimeout(timeoutId.current)
    }
  }, [hovering])

  useEffect(() => {
    if (forceHideTooltip) setTooltipShowing(false)
  }, [forceHideTooltip])

  const className = clsx(
    styles.button,
    props.primary === true && styles.primary,
    props.end === 'left' && styles.leftEnd,
    props.end === 'right' && styles.rightEnd,
    props.className
  )

  return (
    <>
      <button
        ref={setButton}
        className={className}
        onClick={props.onClick}
        aria-label={props.label}
      >
        {props.children}
      </button>

      <Popper
        compact
        reference={button}
        visible={tooltipShowing}
        currentlyShowingCallback={props.tooltipCurrentlyShowingCallback}
      >
        {props.label}
      </Popper>
    </>
  )
}
