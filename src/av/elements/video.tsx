import * as React from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'

import { useSelector } from 'av/store'
import { mediaSlice } from 'av/store/slices/media'
import { randomizeBackgroundColor } from 'av/store/thunks'

import { Pane } from 'av/components/pane'

import { Media } from './media'

type WrapperProps = Readonly<{ scaleVideo: boolean }>
const Wrapper = styled(Pane)<WrapperProps>`
  display: flex;
  justify-content: center;
  background: black;

  & > video {
    width: ${props => props.scaleVideo ? '100%' : 'auto'};
  }
`

export const Video: React.FC = () => {
  const scaleVideo = useSelector(({ settings }) => settings.scaleVideo)
  const dispatch = useDispatch()

  React.useEffect(() => () => {
    dispatch(randomizeBackgroundColor())
  }, [])

  return (
    <Wrapper
      scaleVideo={scaleVideo}
      onClick={() => dispatch(mediaSlice.actions.playPauseShortcut())}
    >
      <Media />
    </Wrapper>
  )
}
