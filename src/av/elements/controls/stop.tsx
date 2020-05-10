import * as React from 'react'
import { connect as connectToRedux } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStop as fasStop } from '@fortawesome/free-solid-svg-icons'

import { Dispatch } from 'av/store'
import { stopMedia } from 'av/store/thunks'

import { RoundControlButton } from 'av/components/control-button'

interface DispatchProps {
  readonly stop: () => void
}

type Props = DispatchProps

const BaseStop: React.FC<Props> = props => (
  <RoundControlButton onClick={props.stop}>
    <FontAwesomeIcon icon={fasStop} />
  </RoundControlButton>
)

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => (
  {
    stop: (): void => {
      dispatch(stopMedia())
    }
  }
)

export const Stop = connectToRedux(null, mapDispatchToProps)(BaseStop)
