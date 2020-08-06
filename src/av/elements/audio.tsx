import * as React from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

import {
  BACKGROUND_COLOR_TRANSITION_DURATION_MS,
  BACKGROUND_COLOR_TRANSITION_HUE_INCREMENT
} from '../globals'

import { useSelector } from 'av/store'
import { generalSlice } from 'av/store/slices/general'
import { getAudioHasMetadata, getAnimateAudioBackgroundColor } from 'av/store/slices/media'
import { randomizeBackgroundColor } from 'av/store/thunks'

import { Pane } from 'av/components/pane'

import { Media } from 'av/media'
import { Controls } from './controls'

const Wrapper = styled(Pane)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Icon = styled(FontAwesomeIcon)`
  font-size: 9em;
  color: white;
`

const Metadata = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CoverArt = styled.img`
  max-width: 50%;
`

const NativeAudio = styled.audio``

export const Audio: React.FC = () => {
  const backgroundHue = useSelector(state => state.general.backgroundHue)
  const metadata = useSelector(state => state.media.audioMetadata)
  const hasMetadata = useSelector(getAudioHasMetadata)
  const animateBackgroundColor = useSelector(getAnimateAudioBackgroundColor)
  const dispatch = useDispatch()

  /**
   * Animate background color
   */

  const lastBackgroundHue = React.useRef<number>(backgroundHue)
  React.useEffect(() => {
    lastBackgroundHue.current = backgroundHue
  }, [backgroundHue])

  const intervalId = React.useRef<number>(0)

  React.useEffect(() => {
    if (animateBackgroundColor) {
      intervalId.current = window.setInterval(
        () => {
          const nextHue = lastBackgroundHue.current + BACKGROUND_COLOR_TRANSITION_HUE_INCREMENT
          dispatch(generalSlice.actions.setBackgroundHue(nextHue))
        },
        BACKGROUND_COLOR_TRANSITION_DURATION_MS
      )
    } else {
      window.clearInterval(intervalId.current)
    }

    return () => window.clearInterval(intervalId.current)
  }, [animateBackgroundColor])

  /**
   * Randomize background color if the audio had its own
   */

  React.useEffect(() => {
    return () => {
      if (metadata.backgroundColor) dispatch(randomizeBackgroundColor())
    }
  }, [])

  /**
   * Component
   */

  const metadataUi = (
    <Metadata>
      {metadata.coverArtUrl && (
        <CoverArt
          src={metadata.coverArtUrl}
          onLoad={() => URL.revokeObjectURL(metadata.coverArtUrl)}
        />
      )}

      {metadata.artist && <p>{metadata.artist}</p>}
      {metadata.title && <p>{metadata.title}</p>}
    </Metadata>
  )

  return (
    <Wrapper style={{ backgroundColor: metadata.backgroundColor }}>
      {hasMetadata ? metadataUi : <Icon icon={faMusic} />}
      <Media nativeMedia={NativeAudio} />
      <Controls />
    </Wrapper>
  )
}
