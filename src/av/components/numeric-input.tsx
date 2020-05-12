import * as React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

import { RoundControlButton } from './control-button'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const Value = styled.div`
  font-size: .85em;
  margin: 0 .75em;
  text-align: center;
`

interface Props {
  readonly value: number
  readonly setValue: (value: number) => void
  readonly incrementModifier?: number
  readonly suffix?: string
}

export const NumericInput: React.FC<Props> = props => {
  const incrementModifier = props.incrementModifier || 1

  return (
    <Wrapper>
      <RoundControlButton onClick={() => props.setValue(props.value - incrementModifier)}>
        <FontAwesomeIcon icon={faMinus} />
      </RoundControlButton>

      <Value>{props.value}{props.suffix}</Value>

      <RoundControlButton onClick={() => props.setValue(props.value + incrementModifier)}>
        <FontAwesomeIcon icon={faPlus} />
      </RoundControlButton>
    </Wrapper>
  )
}
