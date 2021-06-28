import * as preact from 'preact'
import { useRef } from 'preact/hooks'
import useHover from '@react-hook/hover'
import { view } from '@risingstack/react-easy-state'

import type { HorizontalDirection, PlaybackDirection } from '@/globals'
import { useControlsStore, useMedia } from '@/store'
import { SKIP_BACK_ICON, SKIP_FORWARD_ICON } from '@/icons'

import { ControlButton } from '@/components/controls/control-button'
import { FloatingLabel, floatingLabelContainerClass } from '@/components/floating-label'

type DirectionData = Readonly<{
  offset: number
  icon: JSX.Element
  label: string
  labelPosition: HorizontalDirection
}>
const getDirectionData = (direction: PlaybackDirection, skipAmount: number): DirectionData => {
  if (direction === 'backwards') {
    return {
      offset: -1 * skipAmount,
      icon: SKIP_BACK_ICON,
      label: '-' + skipAmount.toString(),
      labelPosition: 'left'
    }
  } else if (direction === 'forwards') {
    return {
      offset: skipAmount,
      icon: SKIP_FORWARD_ICON,
      label: '+' + skipAmount.toString(),
      labelPosition: 'right'
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
    labelPosition
  } = getDirectionData(props.direction, controlsStore.skipAmount)

  return (
    <div className={floatingLabelContainerClass}>
      <ControlButton
        ref_={button}
        onClick={(): void => media.offsetPlaybackTime(offset)}
      >
        {icon}
      </ControlButton>

      <FloatingLabel position={labelPosition} visible={hovering}>
        {label}
      </FloatingLabel>
    </div>
  )
})
