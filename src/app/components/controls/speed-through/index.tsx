import * as preact from 'preact'
import { useRef, useEffect } from 'preact/hooks'
import clsx from 'clsx'
import { view } from '@risingstack/react-easy-state'

import styles from './styles.scss'

import { makeRateString } from '@/util/media'
import { REWIND_ICON, FAST_FORWARD_ICON } from '@/icons'
import { useMedia } from '@/store'

import { ControlButton } from '@/components/controls/control-button'

type Direction = 'backwards' | 'forwards'

type DirectionData = Readonly<{
  icon: JSX.Element
  label: string
  multiplier: number
  positionClass: string
}>
const getDirectionData = (direction: Direction): DirectionData => {
  if (direction === 'backwards') {
    return {
      icon: REWIND_ICON,
      label: 'Rewind',
      multiplier: -1,
      positionClass: styles.left
    }
  } else if (direction === 'forwards') {
    return {
      icon: FAST_FORWARD_ICON,
      label: 'Fast forward',
      multiplier: 1,
      positionClass: styles.right
    }
  } else {
    throw new Error('Invalid direction')
  }
}

type Props = Readonly<{
  direction: Direction
  active: boolean
}>

export const SpeedThrough: preact.FunctionComponent<Props> = view(props => {
  const media = useMedia()
  const lastRate = useRef<number>(0)

  const { icon, label, multiplier, positionClass } = getDirectionData(props.direction)
  const rateLabel = makeRateString(
    media.speedThroughRate !== 0 ? media.speedThroughRate : lastRate.current
  )

  useEffect(() => {
    if (props.active) lastRate.current = media.speedThroughRate
  }, [media.speedThroughRate])

  const rateLabelWrapperClassName = clsx(
    styles.rateLabelWrapper,
    positionClass,
    props.active && styles.active
  )

  return (
    <div className={styles.wrapper}>
      <ControlButton label={label} onClick={(): void => media.toggleSpeedThroughRate(multiplier)}>
        {icon}
      </ControlButton>

      <div className={rateLabelWrapperClassName}>
        <div className={styles.rateLabel}>{rateLabel}</div>
      </div>
    </div>
  )
})

export const SpeedThroughShiftGroup: preact.FunctionComponent<Props> = props => {
  const { positionClass } = getDirectionData(props.direction)

  return (
    <div className={clsx(styles.shiftGroup, positionClass, props.active && styles.active)}>
      {props.children}
    </div>
  )
}
