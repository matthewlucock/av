import * as React from 'react'
import styled from '@emotion/styled'

import { useSelector } from 'av/store'
import { getMediaFinished } from 'av/store/slices/media'

import { Timestamp } from 'av/components/timestamp'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

export const PlaybackTime: React.FC = () => {
  const duration = useSelector(({ media }) => media.duration)
  const playbackTime = useSelector(({ media }) => media.playbackTime)
  const finished = useSelector(getMediaFinished)

  const roundedDuration = Math.ceil(duration)
  const roundedPlaybackTime = finished ? Math.ceil(playbackTime) : Math.floor(playbackTime)

  return (
    <Wrapper>
      <Timestamp time={roundedPlaybackTime} maximumTime={roundedDuration} />
      {' '}/{' '}
      <Timestamp time={roundedDuration} maximumTime={roundedDuration} />
    </Wrapper>
  )
}
