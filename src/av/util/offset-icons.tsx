import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ICON_OFFSET = '.05em'

export const LeftOffsetIcon = styled(FontAwesomeIcon)`
  position: relative;
  left: ${ICON_OFFSET};
`

export const RightOffsetIcon = styled(FontAwesomeIcon)`
  position: relative;
  right: ${ICON_OFFSET}
`
