import * as React from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

import { useSelector } from 'av/store'
import type { RootState } from 'av/store'
import { mediaSlice } from 'av/store/slices/media'

type Shortcut = RootState['media']['shortcut']

const ICONS: { [key in Exclude<Shortcut, ''>]: React.ReactElement } = {
  play: <FontAwesomeIcon icon={faPlay} />,
  pause: <FontAwesomeIcon icon={faPause} />
}

type DisplayProps = Readonly<{ visible: boolean }>
const Display = styled.div<DisplayProps>`
  font-size: 4em;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 2em;
  height: 2em;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.75);
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  opacity: ${props => props.visible ? 1 : 0};
  backdrop-filter: blur(10px);
  transition-property: visibility, opacity;
  transition-duration: .25s;
  transition-timing-function: cubic-bezier(0, .5, .5, 1);
`

export const ShortcutConfirmation: React.FC = () => {
  const providedShortcut = useSelector(({ media }) => media.shortcut)
  const dispatch = useDispatch()

  const [visible, setVisible] = React.useState<boolean>(false)
  const [currentShortcut, setCurrentShortcut] = React.useState<Shortcut>('')
  const hideTimeoutId = React.useRef<number>(0)

  React.useEffect(() => {
    if (providedShortcut) {
      setVisible(true)
      setCurrentShortcut(providedShortcut)

      clearTimeout(hideTimeoutId.current)
      hideTimeoutId.current = window.setTimeout(() => setVisible(false), 500)

      dispatch(mediaSlice.actions.setShortcut(''))
    }
  }, [providedShortcut])

  return (
    <Display visible={visible}>
      {currentShortcut && ICONS[currentShortcut]}
    </Display>
  )
}
