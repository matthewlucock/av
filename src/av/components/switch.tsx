import * as React from 'react'
import styled from '@emotion/styled'

import {
  TRANSITION_DURATION,
  CONTROLS_FOREGROUND_COLOR,
  CONTROLS_SECONDARY_BACKGROUND_COLOR,
  CONTROLS_FADED_BACKGROUND_COLOR
} from 'av/globals'

const THUMB_SIZE_EM = 1.5

interface ElementProps {
  readonly isOn: boolean
}

const Wrapper = styled.div<ElementProps>`
  width: ${THUMB_SIZE_EM * 2}em;
  border-radius: 1em;
  background: ${props => props.isOn
    ? CONTROLS_SECONDARY_BACKGROUND_COLOR.string()
    : CONTROLS_FADED_BACKGROUND_COLOR.string()
  };
  cursor: pointer;
  transition: background ${TRANSITION_DURATION};
`

const Thumb = styled.div<ElementProps>`
  width: ${THUMB_SIZE_EM}em;
  height: ${THUMB_SIZE_EM}em;
  border-radius: 100%;
  background: ${CONTROLS_FOREGROUND_COLOR.string()};
  transform: translateX(${props => props.isOn ? '100%' : '0'});
  transition: transform ${TRANSITION_DURATION};
`

interface Props {
  readonly isOn: boolean
  readonly setIsOn: (isOn: boolean) => void
}

export const Switch: React.FC<Props> = props => (
  <Wrapper isOn={props.isOn} onClick={() => props.setIsOn(!props.isOn)}>
    <Thumb isOn={props.isOn} />
  </Wrapper>
)
