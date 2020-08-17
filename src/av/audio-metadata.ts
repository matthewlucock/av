import parseAudioMetadata from 'parse-audio-metadata'

import { getBaseFileType } from './util/get-base-file-type'
import { getImageColorFromUrl } from './util/get-image-color-from-url'

const COLOR_LIGHTNESS_MODIFIER = 10

export type ProcessedAudioMetadata = Readonly<{
  artist: string | null
  title: string | null
  coverArtUrl: string | null
  color: string | null
}>

const getMetadataColorFromImageUrl = async (url: string): Promise<string> => {
  let color = await getImageColorFromUrl(url)

  let lightnessModifier = COLOR_LIGHTNESS_MODIFIER
  if (color.isLight()) lightnessModifier *= -1

  color = color.lightness(color.lightness() + lightnessModifier)
  return color.string()
}

export const retrieveAudioMetadata = async (file: File): Promise<ProcessedAudioMetadata | null> => {
  if (getBaseFileType(file) !== 'audio') {
    throw new Error('retrieveAudioMetadata can only be called on audio files')
  }

  let metadata: RawAudioMetadata

  try {
    metadata = await parseAudioMetadata(file)
  } catch (error) {
    return null
  }

  const { artist = null, title = null, picture = null } = metadata
  const coverArtUrl = picture !== null ? URL.createObjectURL(picture) : null
  const color = coverArtUrl !== null ? await getMetadataColorFromImageUrl(coverArtUrl) : null

  return { artist, title, coverArtUrl, color }
}
