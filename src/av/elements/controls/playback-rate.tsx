import * as React from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

import { PLAYBACK_RATE_INCREMENT_VALUE } from 'av/globals'

import { useSelector } from 'av/store'
import { mediaSlice } from 'av/store/slices/media'

import { RoundControlButton } from 'av/components/control-button'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const Rate = styled.div`
  font-size: .85em;
  margin: 0 .75em;
  text-align: center;
`

const TimesIcon = styled(FontAwesomeIcon)`
  font-size: .75em;
`

export const PlaybackRate: React.FC = () => {
  const rate = useSelector(state => state.media.playbackRate)
  const dispatch = useDispatch()

  const decrement = (): void => {
    dispatch(mediaSlice.actions.setPlaybackRate(rate - PLAYBACK_RATE_INCREMENT_VALUE))
  }

  const increment = (): void => {
    dispatch(mediaSlice.actions.setPlaybackRate(rate + PLAYBACK_RATE_INCREMENT_VALUE))
  }

  return (
    <Wrapper>
      <RoundControlButton onClick={decrement}>
        <FontAwesomeIcon icon={faMinus} />
      </RoundControlButton>

      <Rate style={{ width: `${PLAYBACK_RATE_INCREMENT_VALUE.toString().length + 1}ch` }}>
        {rate}
        <TimesIcon icon={faTimes} />
      </Rate>

      <RoundControlButton onClick={increment}>
        <FontAwesomeIcon icon={faPlus} />
      </RoundControlButton>
    </Wrapper>
  )
}
