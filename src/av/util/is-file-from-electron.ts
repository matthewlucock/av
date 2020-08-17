type ElectronFile = File & Readonly<{ path: string }>

export const isFileFromElectron = (file: File): file is ElectronFile => (
  typeof file.path === 'string'
)
