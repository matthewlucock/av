import parseAudioMetadata from 'parse-audio-metadata'

import { AUDIO_METADATA_BACKGROUND_COLOR_LIGHTNESS_MODIFIER } from './globals'
import { getBaseFileType } from './util/get-base-file-type'
import { getImageColorFromUrl } from './util/get-image-color-from-url'

export interface ProcessedAudioMetadata {
  readonly artist: string
  readonly title: string
  readonly coverArtUrl: string
  readonly backgroundColor: string
}

const getBackgroundColorFromImageUrl = async (url: string): Promise<string> => {
  let backgroundColor = await getImageColorFromUrl(url)

  let lightnessModifier = AUDIO_METADATA_BACKGROUND_COLOR_LIGHTNESS_MODIFIER
  if (backgroundColor.isLight()) lightnessModifier *= -1

  backgroundColor = backgroundColor.lightness(backgroundColor.lightness() + lightnessModifier)
  return backgroundColor.string()
}

export const retrieveAudioMetadata = async (file: File): Promise<ProcessedAudioMetadata | void> => {
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
  const coverArtUrl = (
    // I don't know whether the file is defined if there is no cover art, so I'm just being safe.
    metadata.picture && metadata.picture.size
      ? URL.createObjectURL(metadata.picture)
      : ''
  )
  const backgroundColor = coverArtUrl ? await getBackgroundColorFromImageUrl(coverArtUrl) : ''

  return { artist, title, coverArtUrl, backgroundColor }
}
