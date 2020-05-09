import * as React from 'react'
import { connect as connectToRedux } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog as fasCog } from '@fortawesome/free-solid-svg-icons'

import { State } from '../../store/state'
import { getShowSettings } from '../../store/selectors'
import { Dispatch } from '../../store'
import { setShowSettings } from '../../store/actions'

import { RoundControlButton } from '../../components/control-button'

interface StateProps {
  readonly showSettings: boolean
}

interface DispatchProps {
  readonly setShowSettings: (showSettings: boolean) => void
}

type Props = StateProps & DispatchProps

const BaseSettingsControl: React.FC<Props> = props => (
  <RoundControlButton active={props.showSettings} onClick={() => props.setShowSettings(true)}>
    <FontAwesomeIcon icon={fasCog} />
  </RoundControlButton>
)

const mapStateToProps = createStructuredSelector<State, StateProps>({
  showSettings: getShowSettings
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => (
  {
    setShowSettings: (showSettings: boolean): void => {
      dispatch(setShowSettings(showSettings))
    }
  }
)

export const SettingsControl = connectToRedux(mapStateToProps, mapDispatchToProps)(
  BaseSettingsControl
)
