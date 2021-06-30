import * as preact from 'preact'
import clsx from 'clsx'
import type { IconDefinition } from '@fortawesome/fontawesome-common-types'

import styles from './styles.scss'

type Props = Readonly<{
  icon: IconDefinition
  offset?: 'left' | 'right'
}>

export const Icon: preact.FunctionComponent<Props> = props => {
  const { icon } = props.icon
  const viewBoxWidth = icon[0]
  const viewBoxHeight = icon[1]
  const path = icon[4] as string

  const className = clsx(
    styles.icon,
    props.offset === 'left' && styles.left,
    props.offset === 'right' && styles.right
  )

  return (
    <svg className={className} viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
      <path d={path} />
    </svg>
  )
}
