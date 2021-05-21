export const handlePromiseRejection = (promise: Promise<unknown>): void => {
  promise.catch(error => {
    // eslint-disable-next-line no-console
    console.error(error)
  })
}

export const boundNumber = (min: number, value: number, max: number): number => {
  if (value < min) return min
  if (value > max) return max
  return value
}

export const browseForFiles = async (): Promise<FileList> => {
  return await new Promise(resolve => {
    const input = document.createElement('input')
    input.type = 'file'

    input.oninput = () => {
      if (input.files !== null) resolve(input.files)
    }

    input.click()
  })
}
