import * as preact from 'preact'
import {
  faPlay,
  faPause,
  faBackward,
  faForward,
  faUndoAlt,
  faRedoAlt,
  faVolumeUp,
  faVolumeDown,
  faVolumeMute,
  faStop,
  faTachometerAlt,
  faExpand,
  faMinus,
  faPlus
} from '@fortawesome/free-solid-svg-icons'

import { Icon } from '@/components/icon'

export const PLAY_ICON = <Icon icon={faPlay} offset='left' />
export const PAUSE_ICON = <Icon icon={faPause} />

export const REWIND_ICON = <Icon icon={faBackward} offset='right' />
export const FAST_FORWARD_ICON = <Icon icon={faForward} offset='left' />
export const SKIP_BACK_ICON = <Icon icon={faUndoAlt} />
export const SKIP_FORWARD_ICON = <Icon icon={faRedoAlt} />

export const VOLUME_UP_ICON = <Icon icon={faVolumeUp} />
export const VOLUME_DOWN_ICON = <Icon icon={faVolumeDown} />
export const VOLUME_MUTED_ICON = <Icon icon={faVolumeMute} />

export const PLAYBACK_SPEED_ICON = <Icon icon={faTachometerAlt} />
export const FULLSCREEN_ICON = <Icon icon={faExpand} />
export const STOP_ICON = <Icon icon={faStop} />

export const SUBTRACT_ICON = <Icon icon={faMinus} />
export const ADD_ICON = <Icon icon={faPlus} />

export const AUDIO_ICON = VOLUME_UP_ICON
