import * as React from 'react'
import styled from '@emotion/styled'
import { createStructuredSelector } from 'reselect'
import { connect as connectToRedux } from 'react-redux'

import { State } from 'av/store/state'
import { getScaleVideo } from 'av/store/selectors'
import { Dispatch } from 'av/store'
import { randomizeBackgroundColor } from 'av/store/thunks'

import { Pane } from 'av/components/pane'

import { Media } from 'av/media'
import { Controls } from './controls'

interface WrapperProps {
  readonly scale: boolean
}

const Wrapper = styled(Pane)<WrapperProps>`
  display: flex;
  justify-content: center;
  background: black;

  & > video {
    width: ${props => props.scale ? '100%' : 'auto'};
  }
`

const NativeVideo = styled.video``

interface StateProps {
  readonly scale: boolean
}

interface DispatchProps {
  readonly randomizeBackgroundColor: () => void
}

type Props = StateProps & DispatchProps

const BaseVideo: React.FC<Props> = props => {
  React.useEffect(() => {
    return props.randomizeBackgroundColor
  }, [])

  return (
    <Wrapper scale={props.scale}>
      <Media nativeMedia={NativeVideo} />
      <Controls />
    </Wrapper>
  )
}

const mapStateToProps = createStructuredSelector<State, StateProps>({
  scale: getScaleVideo
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => (
  {
    randomizeBackgroundColor: () => {
      dispatch(randomizeBackgroundColor())
    }
  }
)

export const Video = connectToRedux(mapStateToProps, mapDispatchToProps)(BaseVideo)
