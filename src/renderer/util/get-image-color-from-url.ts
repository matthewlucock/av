import Color from 'color'
import ColorThief from 'colorthief'

const colorThief = new ColorThief()

export const getImageColorFromUrl = async (url: string): Promise<Color> => {
  const image = document.createElement('img')
  image.src = url
  await image.decode()
  return Color(colorThief.getColor(image))
}
