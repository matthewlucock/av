import styled from '@emotion/styled'

import { TRANSITION_DURATION } from '../globals'

export const TranslucentButton = styled.div`
  display: inline-block;
  padding: .2em .6em;
  border-radius: 1em;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background-color ${TRANSITION_DURATION};

  &:hover, &:focus {
    background-color: rgba(0, 0, 0, 0.6);
  }
`
