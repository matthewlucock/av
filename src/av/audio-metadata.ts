import parseAudioMetadata from 'parse-audio-metadata'

import { AUDIO_METADATA_BACKGROUND_COLOR_LIGHTNESS_MODIFIER } from './globals'
import { getBaseFileType } from './util/get-base-file-type'
import { getImageColorFromUrl } from './util/get-image-color-from-url'

export interface ProcessedAudioMetadata {
  readonly artist: string
  readonly title: string
  readonly coverArtUrl: string
  readonly color: string
}

const getMetadataColorFromImageUrl = async (url: string): Promise<string> => {
  let color = await getImageColorFromUrl(url)

  let lightnessModifier = AUDIO_METADATA_BACKGROUND_COLOR_LIGHTNESS_MODIFIER
  if (color.isLight()) lightnessModifier *= -1

  color = color.lightness(color.lightness() + lightnessModifier)
  return color.string()
}

export const retrieveAudioMetadata = async (
  file: File
): Promise<ProcessedAudioMetadata | undefined> => {
  if (getBaseFileType(file) !== 'audio') {
    throw new Error('retrieveAudioMetadata can only be called on audio files')
  }

  let metadata: RawAudioMetadata

  try {
    metadata = await parseAudioMetadata(file)
  } catch (error) {
    return
  }

  const { artist = '', title = '' } = metadata
  const coverArtUrl = metadata.picture?.size ? URL.createObjectURL(metadata.picture) : ''
  const color = coverArtUrl ? await getMetadataColorFromImageUrl(coverArtUrl) : ''

  return { artist, title, coverArtUrl, color }
}
