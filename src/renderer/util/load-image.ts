export const loadImage = async (url: string): Promise<HTMLImageElement> => {
  const image = document.createElement('img')

  // Using image.decode() here sometimes causes mysterious crashes.
  const loaded = new Promise(resolve => {
    image.onload = resolve
  })

  image.src = url
  await loaded

  return image
}
