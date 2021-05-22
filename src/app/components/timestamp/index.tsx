import * as preact from 'preact'
import { useState, useLayoutEffect } from 'preact/hooks'
import clsx from 'clsx'

import { getTimestamp } from '@/util/time'

import styles from './styles.scss'

type Props = Readonly<{
  readonly className?: string
  readonly time: number
  readonly max: number
}>

export const Timestamp: preact.FunctionComponent<Props> = props => {
  const [length, setLength] = useState<number>(0)
  useLayoutEffect(() => {
    setLength(getTimestamp(Math.round(props.max)).length)
  }, [props.max])

  /**
   * Component
   */

  return (
    <div className={clsx(styles.timestamp, props.className)} style={{ width: `${length + 1}ch` }}>
      {getTimestamp(props.time, props.max)}
    </div>
  )
}
