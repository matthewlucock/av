import * as React from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStop } from '@fortawesome/free-solid-svg-icons'

import { stopMedia } from 'av/store/thunks'

import { Button } from 'av/components/button'

export const Stop: React.FC = () => {
  const dispatch = useDispatch()

  return (
    <Button onClick={() => dispatch(stopMedia())}>
      <FontAwesomeIcon icon={faStop} />
    </Button>
  )
}
