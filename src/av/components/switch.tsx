import * as React from 'react'
import styled from '@emotion/styled'

import { TRANSITION_DURATION } from 'av/globals'

const THUMB_SIZE_EM = 1.5

type ElementProps = Readonly<{ isOn: boolean }>

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: ${THUMB_SIZE_EM * 2}em;
  cursor: pointer;
`

const Bar = styled.div<ElementProps>`
  position: absolute;
  width: 100%;
  height: 1em;
  border-radius: 1em;
  background: hsla(0, 0%, 100%, ${props => props.isOn ? 0.5 : 0.25});
  transition-property: background;
  transition-duration: ${TRANSITION_DURATION};
`

const Thumb = styled.div<ElementProps>`
  width: ${THUMB_SIZE_EM}em;
  height: ${THUMB_SIZE_EM}em;
  border-radius: 100%;
  background: hsl(0, 0%, ${props => props.isOn ? 100 : 60}%);
  transform: translateX(${props => props.isOn ? '100%' : '0'});
  transition-property: background, transform;
  transition-duration: ${TRANSITION_DURATION};
`

// `isOn` needs to be used here instead of simply `on`, as `on` is an attribute that React passes
// through to the DOM.

type Props = Readonly<{ isOn: boolean, setIsOn: (on: boolean) => void }>

export const Switch: React.FC<Props> = props => (
  <Wrapper onClick={() => props.setIsOn(!props.isOn)}>
    <Bar isOn={props.isOn} />
    <Thumb isOn={props.isOn} />
  </Wrapper>
)
