import * as preact from 'preact'
import { view } from '@risingstack/react-easy-state'

import { MIN_PLAYBACK_RATE, MAX_PLAYBACK_RATE } from '@/globals'
import { makeRateString } from '@/util/media'
import type { PopperOffset } from '@/util/popper'
import { useControlsStore, useMedia } from '@/store'

import { NumericToggle } from '@/components/numeric-toggle'
import { Popper } from '@/components/popper'

const offset: PopperOffset = ({ reference }) => [0, reference.height / 3]

export const PlaybackSpeedMenu: preact.FunctionComponent = view(() => {
  const controlsStore = useControlsStore()
  const media = useMedia()

  return (
    <Popper
      reference={controlsStore.playbackSpeed.button}
      offset={offset}
      visible={controlsStore.playbackSpeed.open}
    >
      <NumericToggle
        value={media.playbackRate}
        setValue={(newRate): void => media.changePlaybackRate(newRate)}
        modifier={0.25}
        min={MIN_PLAYBACK_RATE}
        max={MAX_PLAYBACK_RATE}
        makeLabel={makeRateString}
      />
    </Popper>
  )
})
