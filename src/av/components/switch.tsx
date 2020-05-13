import * as React from 'react'
import styled from '@emotion/styled'

import {
  TRANSITION_DURATION,
  CONTROLS_FOREGROUND_COLOR,
  CONTROLS_SECONDARY_BACKGROUND_COLOR,
  CONTROLS_FADED_BACKGROUND_COLOR
} from 'av/globals'

interface ElementProps {
  readonly on: boolean
}

const Wrapper = styled.div<ElementProps>`
  width: 3em;
  border-radius: 1em;
  background: ${props => props.on
    ? CONTROLS_SECONDARY_BACKGROUND_COLOR.string()
    : CONTROLS_FADED_BACKGROUND_COLOR.string()
  };
  cursor: pointer;
  transition: background ${TRANSITION_DURATION};
`

const Thumb = styled.div<ElementProps>`
  height: 1.5em;
  width: 1.5em;
  border-radius: 100%;
  background: ${CONTROLS_FOREGROUND_COLOR.string()};
  transform: translateX(${props => props.on ? '100%' : '0'});
  transition: transform ${TRANSITION_DURATION};
`

interface Props {
  readonly on: boolean
  readonly setOn: (on: boolean) => void
}

export const Switch: React.FC<Props> = props => (
  <Wrapper on={props.on} onClick={() => props.setOn(!props.on)}>
    <Thumb on={props.on} />
  </Wrapper>
)
