import * as React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

import { boundValue } from 'av/util/bound-value'

import { Button } from './button'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const ModifierButton = styled(Button)`
  font-size: .9em;
  width: 2em;
  height: 2em;
  border-radius: 100%;
`

const Value = styled.div`
  margin: 0 .5em;
  text-align: center;
`

type Props = Readonly<{
  value: number
  setValue: (value: number) => void
  modifier?: number
  minimumValue: number
  maximumValue: number
  suffix?: string
}>

export const NumericInput: React.FC<Props> = props => {
  const modifier = props.modifier ?? 1

  /**
   * Length
   */

  const [length, setLength] = React.useState<number>(0)

  React.useEffect(() => {
    // For float values, the modifier may be longer than the maximum value
    let newLength = Math.max(props.maximumValue.toString().length, modifier.toString().length)

    if (typeof props.suffix === 'string') newLength += props.suffix.length

    setLength(newLength)
  }, [props.modifier, props.maximumValue, props.suffix])

  /**
   * Component
   */

  const modifyValue = (multiplier: number): void => {
    let newValue = props.value + modifier * multiplier

    // Mitigate floating point errors
    const roundingValue = 1 / modifier
    newValue = Math.round(newValue * roundingValue) / roundingValue

    props.setValue(boundValue(props.minimumValue, newValue, props.maximumValue))
  }

  return (
    <Wrapper>
      <ModifierButton onClick={() => modifyValue(-1)}>
        <FontAwesomeIcon icon={faMinus} />
      </ModifierButton>

      <Value style={{ width: `${length + 1}ch` }}>{props.value}{props.suffix}</Value>

      <ModifierButton onClick={() => modifyValue(1)}>
        <FontAwesomeIcon icon={faPlus} />
      </ModifierButton>
    </Wrapper>
  )
}
