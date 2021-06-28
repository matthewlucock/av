import * as preact from 'preact'
import { view } from '@risingstack/react-easy-state'

import { useMedia } from '@/store'
import { PLAY_ICON, PAUSE_ICON } from '@/icons'

import { ControlButton } from '@/components/controls/control-button'
import { SpeedThrough, SpeedThroughShiftGroup } from '@/components/controls/speed-through'
import { Skip } from '@/components/controls/skip'

export const PlaybackControls: preact.FunctionComponent = view(() => {
  const media = useMedia()

  return (
    <>
      <SpeedThroughShiftGroup direction='backwards' active={media.rewinding}>
        <Skip direction='backwards' />
      </SpeedThroughShiftGroup>
      <SpeedThrough direction='backwards' active={media.rewinding} />

      <ControlButton primary onClick={(): void => media.playPause()}>
        {media.playing ? PAUSE_ICON : PLAY_ICON}
      </ControlButton>

      <SpeedThrough direction='forwards' active={media.fastForwarding} />
      <SpeedThroughShiftGroup direction='forwards' active={media.fastForwarding}>
        <Skip direction='forwards' />
      </SpeedThroughShiftGroup>
    </>
  )
})
