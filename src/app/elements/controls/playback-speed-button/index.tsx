import * as preact from 'preact'
import { useEffect } from 'preact/hooks'
import { view } from '@risingstack/react-easy-state'

import { makeRateString } from '@/util/media'
import { useControlsStore, useMedia } from '@/store'
import { PLAYBACK_SPEED_ICON } from '@/icons'

import { ControlButton } from '@/components/controls/control-button'
import { FloatingLabel, floatingLabelContainerClass } from '@/components/floating-label'

export const PlaybackSpeedButton: preact.FunctionComponent = view(() => {
  const controlsStore = useControlsStore()
  const media = useMedia()

  const showLabel = !media.normalPlaybackRate && !controlsStore.playbackSpeed.open

  useEffect(() => {
    return (): void => controlsStore.playbackSpeed.clearButton()
  }, [])

  return (
    <div className={floatingLabelContainerClass}>
      <ControlButton
        ref_={(button): void => {
          if (button !== null) controlsStore.playbackSpeed.storeButton(button)
        }}
        onClick={(): void => controlsStore.playbackSpeed.toggle()}
      >
        {PLAYBACK_SPEED_ICON}
      </ControlButton>

      <FloatingLabel position='left' visible={showLabel}>
        {makeRateString(media.playbackRate)}
      </FloatingLabel>
    </div>
  )
})
