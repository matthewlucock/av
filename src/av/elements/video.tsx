import * as React from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'

import { useSelector } from 'av/store'
import { randomizeBackgroundColor } from 'av/store/thunks'

import { Pane } from 'av/components/pane'

import { Media } from 'av/media'
import { Controls } from './controls'

type WrapperProps = Readonly<{ scaleVideo: boolean }>
const Wrapper = styled(Pane)<WrapperProps>`
  display: flex;
  justify-content: center;
  background: black;

  & > video {
    width: ${props => props.scaleVideo ? '100%' : 'auto'};
  }
`

const NativeVideo = styled.video``

export const Video: React.FC = () => {
  const scaleVideo = useSelector(({ settings }) => settings.scaleVideo)
  const dispatch = useDispatch()

  React.useEffect(() => () => {
    dispatch(randomizeBackgroundColor())
  }, [])

  return (
    <Wrapper scaleVideo={scaleVideo}>
      <Media nativeMedia={NativeVideo} />
      <Controls />
    </Wrapper>
  )
}
