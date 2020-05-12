import { GeneralAction } from './general'
import { SettingsAction } from './settings'
import { MediaAction } from './media'
import { DialogAction } from './dialog'

export type Action = GeneralAction | SettingsAction | MediaAction | DialogAction
