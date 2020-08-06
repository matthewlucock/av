import * as React from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'

import { useSelector } from 'av/store'
import { settingsSlice } from 'av/store/slices/settings'
import { mediaSlice } from 'av/store/slices/media'

import { Modal, ModalButtons } from 'av/components/modal'
import { ControlButton } from 'av/components/control-button'
import { NumericInput } from 'av/components/numeric-input'
import { Switch } from 'av/components/switch'

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const Settings: React.FC = () => {
  const show = useSelector(state => state.settings.show)
  const skipBackTime = useSelector(state => state.settings.skipBackTime)
  const skipForwardTime = useSelector(state => state.settings.skipForwardTime)
  const scaleVideo = useSelector(state => state.settings.scaleVideo)
  const mediaType = useSelector(state => state.media.type)
  const mediaPlaying = useSelector(state => state.media.playing)
  const dispatch = useDispatch()

  /**
   * Automatic play-pausing
   */

  const wasPlaying = React.useRef<boolean>(false)

  React.useEffect(() => {
    // Dont play-pause if the media is audio.
    if (mediaType === 'audio') {
      wasPlaying.current = false
      return
    }

    if (show && mediaPlaying) {
      dispatch(mediaSlice.actions.setPlaying(false))
      wasPlaying.current = true
    } else if (!show && wasPlaying.current) {
      dispatch(mediaSlice.actions.setPlaying(false))
      wasPlaying.current = false
    }
  }, [show, mediaType])

  /**
   * Component
   */

  return (
    <Modal show={show}>
      <Row>
        <span>Skip forward</span>
        <NumericInput
          value={skipForwardTime}
          setValue={value => dispatch(settingsSlice.actions.setSkipForwardTime(value))}
          suffix=' seconds'
        />
      </Row>

      <Row>
        <span>Skip back</span>
        <NumericInput
          value={Math.abs(skipBackTime)}
          setValue={value => dispatch(settingsSlice.actions.setSkipForwardTime(value))}
          suffix=' seconds'
        />
      </Row>

      <Row>
        <span>Scale video</span>
        <Switch
          isOn={scaleVideo}
          setIsOn={on => dispatch(settingsSlice.actions.setScaleVideo(on))}
        />
      </Row>

      <ModalButtons>
        <ControlButton onClick={() => dispatch(settingsSlice.actions.setShow(false))}>
          Close
        </ControlButton>
      </ModalButtons>
    </Modal>
  )
}
