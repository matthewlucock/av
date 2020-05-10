const getTimeParts = (time: number): number[] => {
  const seconds = time % 60
  let minutes = (time - seconds) / 60
  const hours = Math.floor(minutes / 60)
  minutes -= hours * 60

  return [seconds, minutes, hours]
}

export const getTimestamp = (time: number, maximumTime?: number): string => {
  let timeParts = getTimeParts(time)
  if (maximumTime) timeParts = timeParts.slice(0, getTimeParts(maximumTime).filter(x => x).length)

  let timestamp = timeParts.map(x => x < 10 ? `0${x}` : x).reverse().join(':')
  if (timeParts.length === 1) timestamp = `:${timestamp}`

  return timestamp
}
