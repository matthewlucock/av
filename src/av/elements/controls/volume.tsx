import * as React from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import useHover from '@react-hook/hover'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeMute, faVolumeDown, faVolumeUp } from '@fortawesome/free-solid-svg-icons'

import { TRANSITION_DURATION } from 'av/globals'

import { useSelector } from 'av/store'
import { mediaSlice } from 'av/store/slices/media'

import { Slider } from 'av/components/slider'
import { Button } from 'av/components/button'

const SLIDER_WIDTH = '3.5em'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const VolumeButton = styled(Button)`
  justify-content: start;
  width: 2.2em;
`

type SlideOverProps = Readonly<{ expanded: boolean }>
// Since the slider thumb overflows the slider itself, this needs to have a set height to stop
// hiding the overflow from cutting off the thumb, also requiring vertical centering.
const SlideOver = styled.div<SlideOverProps>`
  display: flex;
  align-items: center;
  position: relative;
  width: ${props => props.expanded ? SLIDER_WIDTH : '0'};
  height: .5em;
  overflow-x: hidden;
  transition-property: width;
  transition-duration: ${TRANSITION_DURATION};
  transition-timing-function: ease-in;
`

const SliderWrapper = styled.div`
  position: absolute;
  width: ${SLIDER_WIDTH};
  padding: 0 .5em;
`

export const Volume: React.FC = () => {
  const volume = useSelector(({ media }) => media.volume)
  const dispatch = useDispatch()

  const wrapper = React.useRef<HTMLDivElement | null>(null)
  const expanded = useHover(wrapper)

  const lastVolume = React.useRef<number>(1)

  return (
    <Wrapper ref={wrapper}>
      <VolumeButton
        onClick={() => {
          const newVolume = volume > 0 ? 0 : lastVolume.current
          lastVolume.current = volume
          dispatch(mediaSlice.actions.setVolume(newVolume))
        }}
      >
        <FontAwesomeIcon
          icon={volume > 0 ? (volume > 0.3 ? faVolumeUp : faVolumeDown) : faVolumeMute}
        />
      </VolumeButton>

      <SlideOver expanded={expanded}>
        <SliderWrapper>
          <Slider
            value={volume}
            maximum={1}
            changeValue={value => dispatch(mediaSlice.actions.setVolume(value))}
            draggingCallback={dragging => {
              if (dragging) lastVolume.current = volume
            }}
          />
        </SliderWrapper>
      </SlideOver>
    </Wrapper>
  )
}
