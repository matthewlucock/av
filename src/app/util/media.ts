import type { MediaType } from '@/globals'

export const makeRateString = (rate: number): string => `${Math.abs(rate)}x`

const getBaseFileType = (file: File): string => file.type.split('/')[0]
export const getMediaType = (file: File): MediaType | null => {
  const type = getBaseFileType(file)

  if (type === 'audio' || type === 'video') {
    return type
  } else {
    return null
  }
}

export const getVideoDimensions = (video: HTMLVideoElement): ElectronWindowDimensions => (
  { width: video.videoWidth, height: video.videoHeight }
)
