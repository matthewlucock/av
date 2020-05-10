import { css } from '@emotion/core'
import styled from '@emotion/styled'

import {
  TRANSITION_DURATION,
  CONTROL_HEIGHT,
  CONTROLS_SECONDARY_FOREGROUND_COLOR,
  CONTROLS_FADED_FOREGROUND_COLOR,
  CONTROLS_SECONDARY_BACKGROUND_COLOR
} from '../globals'

interface BaseControlButtonProps {
  readonly primary?: boolean
  readonly disabled?: boolean
  readonly active?: boolean
}

const activeStyles = css`
  background-color: ${CONTROLS_SECONDARY_BACKGROUND_COLOR.string()};
  color: inherit;
`

const BaseControlButton = styled.div<BaseControlButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${CONTROL_HEIGHT};
  color: ${props => (
    props.disabled
      ? CONTROLS_FADED_FOREGROUND_COLOR.string()
      : props.primary ? 'inherit' : CONTROLS_SECONDARY_FOREGROUND_COLOR.string()
  )};
  transition-property: background-color, color;
  transition-duration: ${TRANSITION_DURATION};

  ${props => !props.disabled && css`
    cursor: pointer;
    ${props.active ? activeStyles : css`&:hover, &:focus { ${activeStyles} }`}
  `}
`

export const ControlButton = styled(BaseControlButton)`
  padding: .25em .5em;
  border-radius: 1em;
`

export const RoundControlButton = styled(BaseControlButton)`
  width: ${CONTROL_HEIGHT};
  border-radius: 100%;

  & > * {
    width: ${CONTROL_HEIGHT} !important;
  }
`
