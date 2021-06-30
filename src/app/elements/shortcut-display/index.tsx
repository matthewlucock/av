import * as preact from 'preact'
import { useEffect } from 'preact/hooks'
import clsx from 'clsx'
import { view } from '@risingstack/react-easy-state'

import styles from './styles.scss'

import type { Shortcut } from '@/globals'
import { PLAY_ICON, PAUSE_ICON } from '@/icons'
import { useControlsStore } from '@/store'

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
      shortcutDisplay.clearTimeout()
    }
  }, [])

  const className = clsx(
    styles.shortcutDisplay,
    shortcutDisplay.showing && styles.visible
  )

  return (
    <div className={className}>
      {shortcutDisplay.shortcut !== null && getShortcutIcon(shortcutDisplay.shortcut)}
    </div>
  )
})
