import { autoEffect, clearEffect } from '@risingstack/react-easy-state'

import mainProcess from '__main_process__'

type DialogInfo = Readonly<{
  message: string
  confirm: boolean
}>

export class DialogStore {
  public info: DialogInfo | null = null
  public show: boolean = false
  public result: boolean | null = null

  public showDialog (info: DialogInfo): void {
    this.info = info
    this.result = null
    this.show = true
  }

  public close (result: boolean): void {
    this.show = false
    this.result = result
  }

  public async confirm (question: string): Promise<boolean> {
    if (__ELECTRON__) {
      return await mainProcess.confirm(question)
    } else {
      this.showDialog({ message: question, confirm: true })

      return await new Promise((resolve): void => {
        const effect = autoEffect((): void => {
          if (typeof this.result === 'boolean') {
            resolve(this.result)
            clearEffect(effect)
          }
        })
      })
    }
  }

  public error (message: string): void {
    if (__ELECTRON__) {
      mainProcess.error(message)
    } else {
      this.showDialog({ message, confirm: false })
    }
  }
}
