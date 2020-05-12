import { Action } from 'redux'

interface SetAppSizeAction extends Action<'general/setAppSize'> {
  readonly data: {
    readonly width: number
    readonly height: number
  }
}
export const setAppSize = (width: number, height: number): SetAppSizeAction => (
  { type: 'general/setAppSize', data: { width, height } }
)

interface SetBackgroundHueAction extends Action<'general/setBackgroundHue'> {
  readonly data: {
    readonly backgroundHue: number
  }
}
export const setBackgroundHue = (backgroundHue: number): SetBackgroundHueAction => (
  { type: 'general/setBackgroundHue', data: { backgroundHue } }
)

export type GeneralAction = SetAppSizeAction | SetBackgroundHueAction
