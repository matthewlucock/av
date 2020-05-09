import * as React from 'react'
import styled from '@emotion/styled'

import { getTimestamp } from '../util/time'

const Wrapper = styled.div`
  font-size: .85em;
  text-align: center;
`

interface Props {
  readonly time: number
  readonly maximumTime: number
}

export const Timestamp: React.FC<Props> = props => {
  const [length, setLength] = React.useState<number>(0)

  React.useEffect(() => {
    setLength(getTimestamp(props.maximumTime).length)
  }, [props.maximumTime])

  return (
    <Wrapper
      style={{ width: `${length + 1}ch` }}
    >
      {getTimestamp(props.time, props.maximumTime)}
    </Wrapper>
  )
}
