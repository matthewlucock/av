import * as React from 'react'
import styled from '@emotion/styled'

import { TRANSITION_DURATION } from 'av/globals'

import { Pane } from './pane'

type WrapperProps = Readonly<{ show: boolean }>
const Wrapper = styled(Pane)<WrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .75);
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  opacity: ${props => props.show ? 1 : 0};
  backdrop-filter: blur(10px);
  transition-property: visibility, opacity;
  transition-duration: ${TRANSITION_DURATION};
`

const Body = styled.div`
  font-size: 1.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`

type Props = Readonly<{ show: boolean, children: ReadonlyArray<React.ReactElement | string> }>

export const Modal: React.FC<Props> = props => (
  <Wrapper show={props.show}>
    <Body>{props.children}</Body>
  </Wrapper>
)

export const ModalButtons = styled.div`
  display: flex;
  margin-top: 1em;

  & > * {
    width: 5em;
    &:not(:last-child) { margin-right: 1em; }
  }
`
