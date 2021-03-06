import * as preact from 'preact'
import { useRef } from 'preact/hooks'
import useHover from '@react-hook/hover'
import { view } from '@risingstack/react-easy-state'

import type { HorizontalDirection, PlaybackDirection } from '@/globals'
import { SKIP_BACK_ICON, SKIP_FORWARD_ICON } from '@/icons'
import { useControlsStore, useMedia } from '@/store'

import { ControlButton } from '@/components/controls/control-button'
import { FloatingLabel, floatingLabelContainerClass } from '@/components/floating-label'

type DirectionData = Readonly<{
  offset: number
  icon: JSX.Element
  label: string
  amountLabel: string
  amountLabelPosition: HorizontalDirection
}>
const getDirectionData = (direction: PlaybackDirection, skipAmount: number): DirectionData => {
  if (direction === 'backwards') {
    return {
      offset: -1 * skipAmount,
      icon: SKIP_BACK_ICON,
      label: 'Skip back',
      amountLabel: '-' + skipAmount.toString(),
      amountLabelPosition: 'left'
    }
  } else if (direction === 'forwards') {
    return {
      offset: skipAmount,
      icon: SKIP_FORWARD_ICON,
      label: 'Skip forward',
      amountLabel: '+' + skipAmount.toString(),
      amountLabelPosition: 'right'
    }
  } else {
    throw new Error('Invalid direction')
  }
}

type Props = Readonly<{
  direction: PlaybackDirection
}>

export const Skip: preact.FunctionComponent<Props> = view(props => {
  const controlsStore = useControlsStore()
  const media = useMedia()

  const button = useRef<HTMLButtonElement>()
  const hovering = useHover(button)

  const {
    offset,
    icon,
    label,
    amountLabel,
    amountLabelPosition
  } = getDirectionData(props.direction, controlsStore.skipAmount)

  return (
    <div className={floatingLabelContainerClass}>
      <ControlButton label={label} onClick={(): void => media.offsetPlaybackTime(offset)}>
        {icon}
      </ControlButton>

      <FloatingLabel position={amountLabelPosition} visible={hovering}>
        {amountLabel}
      </FloatingLabel>
    </div>
  )
})
