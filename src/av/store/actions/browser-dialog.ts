import { Action } from 'redux'

interface SetBrowserDialogOptions {
  readonly confirm?: boolean
}
interface SetBrowserDialogAction extends Action<'dialog/setBrowserDialog'> {
  readonly data: {
    readonly message: string
    readonly confirm: boolean
  }
}
export const setBrowserDialog = (
  message: string,
  options?: SetBrowserDialogOptions
): SetBrowserDialogAction => (
  { type: 'dialog/setBrowserDialog', data: { message, confirm: !!(options && options.confirm) } }
)

interface SetShowBrowserDialogAction extends Action<'dialog/setShowBrowserDialog'> {
  readonly data: {
    readonly show: boolean
  }
}
export const setShowBrowserDialog = (show: boolean): SetShowBrowserDialogAction => (
  { type: 'dialog/setShowBrowserDialog', data: { show } }
)

interface SetBrowserDialogResultAction extends Action<'dialog/setBrowserDialogResult'> {
  readonly data: {
    readonly result: boolean
  }
}
export const setBrowserDialogResult = (result: boolean): SetBrowserDialogResultAction => (
  { type: 'dialog/setBrowserDialogResult', data: { result } }
)

export type BrowserDialogAction = (
  SetBrowserDialogAction |
  SetShowBrowserDialogAction |
  SetBrowserDialogResultAction
)
