import Color from 'color'
import ColorThief from 'colorthief'

import { loadImage } from './load-image'

const colorThief = new ColorThief()

export const getImageColorFromUrl = async (url: string): Promise<Color> => {
  const image = await loadImage(url)
  return Color(colorThief.getColor(image))
}
