import { css } from '@emotion/core'
import styled from '@emotion/styled'

import {
  transitionStyles,
  CONTROLS_SECONDARY_FOREGROUND_COLOR,
  CONTROLS_FADED_FOREGROUND_COLOR
} from '../globals'

type Props = Readonly<{ primary?: boolean, disabled?: boolean }>
export const Button = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .5em;
  color: ${props => (
    props.disabled
      ? CONTROLS_FADED_FOREGROUND_COLOR.string()
      : props.primary ? 'inherit' : CONTROLS_SECONDARY_FOREGROUND_COLOR.string()
  )};
  transition-property: background-color, color;
  ${transitionStyles}

  ${props => !props.disabled && css`
    cursor: pointer;
    &:hover, &:focus {
      color: inherit;
      background: rgba(255, 255, 255, 0.25);
    }
  `}
`
