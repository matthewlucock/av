import * as React from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

import {
  TRANSITION_DURATION,
  MINIMUM_PLAYBACK_RATE,
  MAXIMUM_PLAYBACK_RATE,
  MINIMUM_SKIP_TIME,
  MAXIMUM_SKIP_TIME
} from 'av/globals'

import { useSelector } from 'av/store'
import { settingsSlice } from 'av/store/slices/settings'
import { mediaSlice } from 'av/store/slices/media'

import { Button } from 'av/components/button'
import { Switch } from 'av/components/switch'
import { NumericInput } from 'av/components/numeric-input'

const Wrapper = styled.div`
  position: relative;
`

const SettingsIconWrapper = styled.div<Readonly<{ showSettings: boolean }>>`
  line-height: 1;
  transform: rotate(${props => props.showSettings ? '-30deg' : 0});
  transition-property: transform;
  transition-duration: ${TRANSITION_DURATION};
  transition-timing-function: ease-in;
`

const Menu = styled.div<Readonly<{ show: boolean }>>`
  font-size: .75em;
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: calc(100% + .5em);
  right: 0;
  width: 22em;
  padding: 1em;
  background: rgba(0, 0, 0, .75);
  backdrop-filter: blur(10px);
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  opacity: ${props => props.show ? 1 : 0};
  transition-property: visibility, opacity;
  transition-duration: ${TRANSITION_DURATION};
`

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2em;
`

export const Settings: React.FC = () => {
  const show = useSelector(({ settings }) => settings.showSettings)
  const skipBackTime = useSelector(({ settings }) => settings.skipBackTime)
  const skipForwardTime = useSelector(({ settings }) => settings.skipForwardTime)
  const scaleVideo = useSelector(({ settings }) => settings.scaleVideo)
  const mediaType = useSelector(({ media }) => media.type)
  const playbackRate = useSelector(({ media }) => media.playbackRate)
  const dispatch = useDispatch()

  return (
    <Wrapper>
      <Button onClick={() => dispatch(settingsSlice.actions.toggleShowSettings())}>
        <SettingsIconWrapper showSettings={show}>
          <FontAwesomeIcon icon={faCog} />
        </SettingsIconWrapper>
      </Button>

      <Menu show={show}>
        {mediaType === 'video' && (
          <MenuItem>
            <span>Scale video</span>

            <Switch
              isOn={scaleVideo}
              setIsOn={on => dispatch(settingsSlice.actions.setScaleVideo(on))}
            />
          </MenuItem>
        )}

        <MenuItem>
          <span>Skip back time</span>

          <NumericInput
            value={Math.abs(skipBackTime)}
            setValue={value => dispatch(settingsSlice.actions.setSkipBackTime(value))}
            minimumValue={MINIMUM_SKIP_TIME}
            maximumValue={MAXIMUM_SKIP_TIME}
            suffix=' seconds'
          />
        </MenuItem>

        <MenuItem>
          <span>Skip forward time</span>

          <NumericInput
            value={skipForwardTime}
            setValue={value => dispatch(settingsSlice.actions.setSkipForwardTime(value))}
            minimumValue={MINIMUM_SKIP_TIME}
            maximumValue={MAXIMUM_SKIP_TIME}
            suffix=' seconds'
          />
        </MenuItem>

        <MenuItem>
          <span>Playback speed</span>

          <NumericInput
            value={playbackRate}
            setValue={value => dispatch(mediaSlice.actions.setPlaybackRate(value))}
            modifier={0.1}
            minimumValue={MINIMUM_PLAYBACK_RATE}
            maximumValue={MAXIMUM_PLAYBACK_RATE}
            suffix='x'
          />
        </MenuItem>
      </Menu>
    </Wrapper>
  )
}
