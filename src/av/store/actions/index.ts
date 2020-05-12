import { GeneralAction } from './general'
import { SettingsAction } from './settings'
import { MediaAction } from './media'
import { BrowserDialogAction } from './browser-dialog'

export type Action = GeneralAction | SettingsAction | MediaAction | BrowserDialogAction
