type ConstructorOptions = Readonly<{
  showDuration: number
}>

export class AutoHider {
  public showing: boolean = false
  private readonly showDuration: number = 0
  private timeoutId: number = 0

  public constructor ({ showDuration }: ConstructorOptions) {
    this.showDuration = showDuration
  }

  private startTimeout (): void {
    this.timeoutId = window.setTimeout(() => this.hide(), this.showDuration)
  }

  public clearTimeout (): void {
    window.clearTimeout(this.timeoutId)
  }

  public show (): void {
    this.clearTimeout()
    this.showing = true
    this.startTimeout()
  }

  public hide (): void {
    this.clearTimeout()
    this.showing = false
  }
}
