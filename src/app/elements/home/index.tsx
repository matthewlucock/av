import * as preact from 'preact'

import styles from './styles.scss'

import { handlePromiseRejection, browseForFiles as baseBrowseForFiles } from '@/util'
import { useStore } from '@/store'

import { SimpleButton } from '@/components/simple-button'

export const Home: preact.FunctionComponent = () => {
  const { mediaStore } = useStore()

  const browseForFiles = async (): Promise<void> => {
    const file = await baseBrowseForFiles()
    await mediaStore.open(file)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>av</div>
      <p>
        Drag an audio/video file here or{' '}
        <SimpleButton onClick={() => handlePromiseRejection(browseForFiles())}>
          Browse
        </SimpleButton>{' '}
        for one.
      </p>
    </div>
  )
}
