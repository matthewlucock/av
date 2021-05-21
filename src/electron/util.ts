export const handleFatalPromiseRejection = (promise: Promise<unknown>): void => {
  promise.catch(error => {
    // eslint-disable-next-line no-console
    console.error(error)
    process.exit(1)
  })
}

export const handleNonFatalPromiseRejection = (promise: Promise<unknown>): void => {
  promise.catch(error => {
    // eslint-disable-next-line no-console
    console.error(error)
  })
}

export const makeBase64String = (format: string, data: Buffer): string => {
  return `data:${format};base64,${data.toString('base64')}`
}
