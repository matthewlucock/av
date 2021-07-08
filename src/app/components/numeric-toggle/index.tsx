import * as preact from 'preact'
import { useState, useLayoutEffect } from 'preact/hooks'

import styles from './styles.scss'

import { boundNumber } from '@/util'
import { SUBTRACT_ICON, ADD_ICON } from '@/icons'

import { ControlButton } from '@/components/controls/control-button'

type Props = Readonly<{
  value: number
  setValue: (value: number) => void
  modifier: number
  min: number
  max: number
  makeLabel?: (value: number) => string
}>

export const NumericToggle: React.FC<Props> = props => {
  const makeLabel = props.makeLabel ?? ((value: number): string => value.toString())
  const [length, setLength] = useState<number>(0)

  useLayoutEffect(() => {
    // For float values, the modifier may be longer than the maximum value
    const newLength = Math.max(makeLabel(props.modifier).length, makeLabel(props.max).length)
    setLength(newLength)
  }, [props.modifier, props.max, props.makeLabel])

  const modifyValue = (multiplier: number): void => {
    let newValue = props.value + props.modifier * multiplier

    // Mitigate floating point errors
    const roundingValue = 1 / props.modifier
    newValue = Math.round(newValue * roundingValue) / roundingValue

    props.setValue(boundNumber(props.min, newValue, props.max))
  }

  return (
    <div className={styles.wrapper}>
      <ControlButton label='Decrement' onClick={() => modifyValue(-1)} forceHideTooltip>
        {SUBTRACT_ICON}
      </ControlButton>

      <div className={styles.value} style={{ width: `${length + 1}ch` }}>
        {makeLabel(props.value)}
      </div>

      <ControlButton label='Increment' onClick={() => modifyValue(1)} forceHideTooltip>
        {ADD_ICON}
      </ControlButton>
    </div>
  )
}
