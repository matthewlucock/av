declare const __ELECTRON__: boolean

declare interface RawAudioMetadata {
  readonly artist?: string
  readonly title?: string
  readonly picture?: Blob
}

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
