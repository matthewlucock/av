import * as preact from 'preact'
import { useEffect } from 'preact/hooks'
import clsx from 'clsx'
import { view } from '@risingstack/react-easy-state'

import styles from './styles.scss'

import { PLAY_ICON, PAUSE_ICON } from '@/icons'
import { useShortcutStore } from '@/store'
import type { ShortcutName } from '@/store/shortcut'

const getShortcutIcon = (name: ShortcutName | null): JSX.Element | null => {
  if (name === null) {
    return null
  } else if (name === 'play') {
    return PLAY_ICON
  } else if (name === 'pause') {
    return PAUSE_ICON
  } else {
    throw new Error('Invalid shortcut')
  }
}

export const Shortcut: preact.FunctionComponent = view(() => {
  const shortcutStore = useShortcutStore()

  useEffect(() => {
    return () => {
      shortcutStore.clearTimeout()
    }
  }, [])

  const className = clsx(
    styles.shortcut,
    shortcutStore.showing && styles.visible
  )

  return (
    <div className={className}>
      {getShortcutIcon(shortcutStore.shortcutName)}
    </div>
  )
})
