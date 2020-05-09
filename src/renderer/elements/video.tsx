import * as React from 'react'
import styled from '@emotion/styled'
import { connect as connectToRedux } from 'react-redux'

import { Dispatch } from '../store'
import { randomizeBackgroundColor } from '../store/thunks'

import { Pane } from '../components/pane'

import { Media } from '../media'
import { Controls } from './controls'

const Wrapper = styled.div`
  background: black;
`

const NativeVideo = Pane.withComponent('video')

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
