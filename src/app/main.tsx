import * as preact from 'preact'
import { view } from '@risingstack/react-easy-state'

import { useMediaStore } from '@/store'
import { Media } from '@/elements/media'
import { Home } from '@/elements/home'

export const Main: preact.FunctionComponent = view(() => {
  const mediaStore = useMediaStore()

  if (mediaStore.media !== null) {
    return <Media />
  } else {
    return <Home />
  }
})
