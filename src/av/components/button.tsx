import { css } from '@emotion/core'
import styled from '@emotion/styled'

import {
  TRANSITION_DURATION,
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
    props.disabled === true
      ? CONTROLS_FADED_FOREGROUND_COLOR.string()
      : props.primary === true ? 'inherit' : CONTROLS_SECONDARY_FOREGROUND_COLOR.string()
  )};
  transition-property: background, color;
  transition-duration: ${TRANSITION_DURATION};

  ${props => props.disabled !== true && css`
    cursor: pointer;
    &:hover, &:focus {
      color: inherit;
      background: rgba(255, 255, 255, 0.25);
    }
  `}
`

export const StandaloneButton = styled(Button)`
  border-radius: 1em;
`
