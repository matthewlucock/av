import * as preact from 'preact'
import { useRef, useState, useEffect } from 'preact/hooks'
import useHover from '@react-hook/hover'
import clsx from 'clsx'
import { view } from '@risingstack/react-easy-state'

import styles from './styles.scss'

import { useMedia } from '@/store'

import { ControlButton } from '@/components/controls/control-button'
import { VolumeIcon } from '@/components/volume-icon'
import { Slider } from '@/components/slider'

export const Volume: preact.FunctionComponent = view(() => {
  const media = useMedia()

  const wrapper = useRef<HTMLDivElement>()
  const button = useRef<HTMLButtonElement>()
  const hoveringWrapper = useHover(wrapper)
  const hoveringButton = useHover(button)

  const [expanded, setExpanded] = useState<boolean>(false)
  useEffect(() => {
    if (!expanded && hoveringButton) {
      setExpanded(true)
    } else if (expanded && !hoveringWrapper) {
      setExpanded(false)
    }
  }, [hoveringWrapper, hoveringButton])

  const lastVolume = useRef<number>(1)
  const toggleVolume = (): void => {
    const newVolume = media.volume > 0 ? 0 : lastVolume.current
    lastVolume.current = media.volume
    media.setVolume(newVolume)
  }

  return (
    <div ref={wrapper} className={clsx(styles.wrapper, expanded && styles.expanded)}>
      <ControlButton ref_={button} onClick={toggleVolume} end='left'>
        <VolumeIcon />
      </ControlButton>

      <div className={styles.sliderContainer}>
        <Slider
          value={media.volume}
          max={1}
          changeValue={(newVolume: number): void => media.setVolume(newVolume)}
        />
      </div>
    </div>
  )
})
