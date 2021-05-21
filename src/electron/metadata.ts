import * as mm from 'music-metadata'

import { makeBase64String } from './util'

const getDescription = (common: mm.ICommonTagsResult): string | null => {
  const { comment } = common
  if (comment === undefined) return null

  const description = comment.join('\n\n')
  return description.length > 0 ? description : null
}

const getArtSrc = (common: mm.ICommonTagsResult): string | null => {
  const { picture } = common
  if (picture === undefined || picture.length === 0) return null

  const art = picture[0]
  return makeBase64String(art.format, art.data)
}

export const getAudioMetadata = async (path: string): Promise<AudioMetadata | null> => {
  const { common } = await mm.parseFile(path)

  const metadata: AudioMetadata = {
    artist: common.artist ?? null,
    title: common.title ?? null,
    description: getDescription(common),
    artSrc: getArtSrc(common)
  }
  const hasMetadata = Object.values(metadata).some(value => value !== null)

  return hasMetadata ? metadata : null
}
