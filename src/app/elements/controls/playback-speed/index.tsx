import * as preact from 'preact'
import { useState } from 'preact/hooks'
import { view } from '@risingstack/react-easy-state'

import { MIN_PLAYBACK_RATE, MAX_PLAYBACK_RATE } from '@/globals'
import { makeRateString } from '@/util/media'
import { PLAYBACK_SPEED_ICON } from '@/icons'
import { useControlsStore, useMedia } from '@/store'

import { ControlButton } from '@/components/controls/control-button'
import { FloatingLabel, floatingLabelContainerClass } from '@/components/floating-label'
import { Popper } from '@/components/popper'
import { NumericToggle } from '@/components/numeric-toggle'

export const PlaybackSpeed: preact.FunctionComponent = view(() => {
  const controlsStore = useControlsStore()
  const media = useMedia()

  const [wrapper, setWrapper] = useState<HTMLDivElement | null>(null)

  const [tooltipIsShowing, setTooltipIsShowing] = useState<boolean>(false)
  const [menuIsShowing, setMenuIsShowing] = useState<boolean>(false)

  const showLabel = !media.normalPlaybackRate && !controlsStore.playbackSpeedOpen

  return (
    <div ref={setWrapper} className={floatingLabelContainerClass}>
      <ControlButton
        label='Change playback speed'
        onClick={(): void => controlsStore.togglePlaybackSpeedOpen()}
        tooltipCurrentlyShowingCallback={setTooltipIsShowing}
        forceHideTooltip={controlsStore.playbackSpeedOpen || menuIsShowing}
      >
        {PLAYBACK_SPEED_ICON}
      </ControlButton>

      <FloatingLabel position='left' visible={showLabel}>
        {makeRateString(media.playbackRate)}
      </FloatingLabel>

      <Popper
        reference={wrapper}
        visible={controlsStore.playbackSpeedOpen && !tooltipIsShowing}
        currentlyShowingCallback={setMenuIsShowing}
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
    </div>
  )
})
