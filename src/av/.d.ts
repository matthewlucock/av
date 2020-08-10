declare const __ELECTRON__: boolean

declare type RawAudioMetadata = Readonly<{
  artist?: string
  title?: string
  picture?: Blob
}>

declare module 'parse-audio-metadata' {
  const parseAudioMetadata: (blob: Blob) => RawAudioMetadata
  export default parseAudioMetadata
}

declare module 'colorthief' {
  class ColorThief {
    constructor ()
    getColor (image: HTMLImageElement, quality?: number): number[]
  }

  export default ColorThief
}
