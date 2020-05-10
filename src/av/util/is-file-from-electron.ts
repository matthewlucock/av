interface ElectronFile extends File {
  readonly path: string
}

export const isFileFromElectron = (file: File): file is ElectronFile => (
  !!(file as ElectronFile).path
)
