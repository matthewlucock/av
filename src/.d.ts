declare module '*.scss' {
  const data: Readonly<{ [className: string]: string }>
  export default data
}

declare const __ELECTRON__: boolean

declare type ElectronWindowDimensions = Readonly<{
  width: number
  height: number
}>
declare type AudioMetadata = Readonly<{
  artist: string | null
  title: string | null
  description: string | null
  artSrc: string | null
}>

declare type ElectronMainProcess = Readonly<{
  resizeWindow: (dimensions: ElectronWindowDimensions | null) => void
  setWindowResizable: (resizable: boolean) => void
  confirm: (prompt: string) => Promise<boolean>
  error: (message: string) => void
  getAudioMetadata: (path: string) => Promise<AudioMetadata | null>
}>
declare module '__main_process__' {
  const mainProcess: ElectronMainProcess
  export default mainProcess
}
