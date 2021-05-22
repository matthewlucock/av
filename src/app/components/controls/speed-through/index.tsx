import * as preact from 'preact'
import { useRef, useEffect } from 'preact/hooks'
import clsx from 'clsx'
import { view } from '@risingstack/react-easy-state'

import styles from './styles.scss'

import { makeRateString } from '@/util/media'
import { useMedia } from '@/store'
import { REWIND_ICON, FAST_FORWARD_ICON } from '@/icons'

import { ControlButton } from '@/components/controls/control-button'

type Direction = 'backwards' | 'forwards'

type DirectionData = Readonly<{
  icon: JSX.Element
  multiplier: number
  positionClass: string
}>
const getDirectionData = (direction: Direction): DirectionData => {
  if (direction === 'backwards') {
    return {
      icon: REWIND_ICON,
      multiplier: -1,
      positionClass: styles.left
    }
  } else if (direction === 'forwards') {
    return {
      icon: FAST_FORWARD_ICON,
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

  const { icon, multiplier, positionClass } = getDirectionData(props.direction)
  const label = makeRateString(
    media.speedThroughRate !== 0 ? media.speedThroughRate : lastRate.current
  )

  useEffect(() => {
    if (props.active) lastRate.current = media.speedThroughRate
  }, [media.speedThroughRate])

  return (
    <div className={styles.wrapper}>
      <ControlButton onClick={(): void => media.toggleSpeedThroughRate(multiplier)}>
        {icon}
      </ControlButton>

      <div className={clsx(styles.labelWrapper, positionClass, props.active && styles.active)}>
        <div className={styles.label}>{label}</div>
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
