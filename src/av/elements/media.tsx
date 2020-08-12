import * as React from 'react'

import { useSelector } from 'av/store'

import { BaseMedia } from 'av/base-media'
import { Controls } from './controls'
import { ShortcutConfirmation } from './shortcut-confirmation'

export const Media: React.FC = () => {
  const name = useSelector(({ media }) => media.name)

  /**
   * Window/document title
   */

  const originalTitle = React.useRef(document.title)

  React.useEffect(() => {
    const clear = (): void => {
      document.title = originalTitle.current
    }

    if (name) {
      document.title = `${originalTitle.current} — ${name}`
    } else {
      clear()
    }

    return clear
  }, [name])

  /**
   * Component
   */

  return (
    <>
      <BaseMedia />
      <Controls />
      <ShortcutConfirmation />
    </>
  )
}
