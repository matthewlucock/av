import * as React from 'react'
import styled from '@emotion/styled'
import { connect as connectToRedux } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeMute, faVolumeDown, faVolumeUp } from '@fortawesome/free-solid-svg-icons'

import { State } from 'av/store/state'
import { getMediaVolume } from 'av/store/selectors'
import { Dispatch } from 'av/store'
import { setMediaVolume } from 'av/store/actions/media'

import { Slider } from 'av/components/slider'
import { RoundControlButton } from 'av/components/control-button'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 8em;
`

const MutedIcon = styled(FontAwesomeIcon)`
  position: relative;
  left: .165em;
`

interface StateProps {
  readonly volume: number
}

interface DispatchProps {
  readonly setVolume: (volume: number) => void
}

type Props = StateProps & DispatchProps

const BaseVolume: React.FC<Props> = props => (
  <Wrapper>
    <RoundControlButton onClick={() => props.setVolume(0)} disabled={props.volume === 0}>
      {(props.volume
        ? <FontAwesomeIcon icon={faVolumeDown} />
        : <MutedIcon icon={faVolumeMute} />
      )}
    </RoundControlButton>

    <Slider value={props.volume} maximum={1} changeValue={props.setVolume} />

    <RoundControlButton onClick={() => props.setVolume(1)}>
      <FontAwesomeIcon icon={faVolumeUp} />
    </RoundControlButton>
  </Wrapper>
)

const mapStateToProps = createStructuredSelector<State, StateProps>({
  volume: getMediaVolume
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => (
  {
    setVolume: (volume: number): void => {
      dispatch(setMediaVolume(volume))
    }
  }
)

export const Volume = connectToRedux(mapStateToProps, mapDispatchToProps)(BaseVolume)
