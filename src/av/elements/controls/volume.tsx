import * as React from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeMute, faVolumeDown, faVolumeUp } from '@fortawesome/free-solid-svg-icons'

import { useSelector } from 'av/store'
import { mediaSlice } from 'av/store/slices/media'

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

export const Volume: React.FC = () => {
  const volume = useSelector(state => state.media.volume)
  const dispatch = useDispatch()

  return (
    <Wrapper>
      <RoundControlButton
        onClick={() => dispatch(mediaSlice.actions.setVolume(0))}
        disabled={volume === 0}
      >
        {volume ? <FontAwesomeIcon icon={faVolumeDown} /> : <MutedIcon icon={faVolumeMute} />}
      </RoundControlButton>

      <Slider
        value={volume}
        maximum={1}
        changeValue={value => dispatch(mediaSlice.actions.setVolume(value))}
      />

      <RoundControlButton onClick={() => dispatch(mediaSlice.actions.setVolume(1))}>
        <FontAwesomeIcon icon={faVolumeUp} />
      </RoundControlButton>
    </Wrapper>
  )
}
