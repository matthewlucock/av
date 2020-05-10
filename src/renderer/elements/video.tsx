import * as React from 'react'
import styled from '@emotion/styled'
import { connect as connectToRedux } from 'react-redux'

import { Dispatch } from 'av/store'
import { randomizeBackgroundColor } from 'av/store/thunks'

import { Pane } from 'av/components/pane'

import { Media } from 'av/media'
import { Controls } from './controls'

const Wrapper = styled(Pane)`
  display: flex;
  background: black;
`

const NativeVideo = styled.video`
  width: 100%;
`

interface DispatchProps {
  readonly randomizeBackgroundColor: () => void
}

type Props = DispatchProps

const BaseVideo: React.FC<Props> = props => {
  React.useEffect(() => {
    return props.randomizeBackgroundColor
  }, [])

  return (
    <Wrapper>
      <Media nativeMedia={NativeVideo} />
      <Controls />
    </Wrapper>
  )
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => (
  {
    randomizeBackgroundColor: () => {
      dispatch(randomizeBackgroundColor())
    }
  }
)

export const Video = connectToRedux(null, mapDispatchToProps)(BaseVideo)
