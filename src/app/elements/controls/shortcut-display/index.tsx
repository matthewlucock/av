import * as preact from 'preact'
import { useEffect } from 'preact/hooks'
import clsx from 'clsx'
import { view } from '@risingstack/react-easy-state'

import styles from './styles.scss'

import type { Shortcut } from '@/globals'
import { useControlsStore } from '@/store'
import { PLAY_ICON, PAUSE_ICON } from '@/icons'

const getShortcutIcon = (name: Shortcut): JSX.Element => {
  if (name === 'play') {
    return PLAY_ICON
  } else if (name === 'pause') {
    return PAUSE_ICON
  } else {
    throw new Error('Invalid shortcut')
  }
}

export const ShortcutDisplay: preact.FunctionComponent = view(() => {
  const { shortcutDisplay } = useControlsStore()

  useEffect(() => {
    return () => {
      shortcutDisplay.reset()
    }
  }, [])

  return (
    <div className={clsx(styles.shortcutDisplay, shortcutDisplay.visible && styles.visible)}>
      {shortcutDisplay.shortcut !== null && getShortcutIcon(shortcutDisplay.shortcut)}
    </div>
  )
})
