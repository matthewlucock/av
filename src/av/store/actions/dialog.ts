import { Action } from 'redux'

interface SetDialogOptions {
  readonly confirm?: boolean
}
interface SetDialogAction extends Action<'dialog/setDialog'> {
  readonly data: {
    readonly message: string
    readonly confirm: boolean
  }
}
export const setDialog = (message: string, options?: SetDialogOptions): SetDialogAction => (
  { type: 'dialog/setDialog', data: { message, confirm: !!(options && options.confirm) } }
)

interface SetShowDialogAction extends Action<'dialog/setShowDialog'> {
  readonly data: {
    readonly show: boolean
  }
}
export const setShowDialog = (show: boolean): SetShowDialogAction => (
  { type: 'dialog/setShowDialog', data: { show } }
)

interface SetDialogResultAction extends Action<'dialog/setDialogResult'> {
  readonly data: {
    readonly result: boolean
  }
}
export const setDialogResult = (result: boolean): SetDialogResultAction => (
  { type: 'dialog/setDialogResult', data: { result } }
)

export type DialogAction = SetDialogAction | SetShowDialogAction | SetDialogResultAction
