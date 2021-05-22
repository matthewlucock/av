import * as preact from 'preact'
import { useLayoutEffect } from 'preact/hooks'

import mainProcess from '__main_process__'

import styles from './styles.scss'

import { useMedia } from '@/store'

import { MediaWrapper } from '@/elements/media/wrapper'
import { Controls } from '@/elements/controls'
import { VideoPreview } from '@/elements/video-preview'

export const Video: preact.FunctionComponent = () => {
  const media = useMedia()

  if (media.info.type !== 'video') throw new Error('No video')

  if (__ELECTRON__) {
    useLayoutEffect(() => {
      mainProcess.setWindowResizable(true)
      return (): void => mainProcess.setWindowResizable(false)
    }, [])
  }

  return (
    <MediaWrapper
      className={styles.videoWrapper}
      controls={<Controls translucent />}
    >
      <VideoPreview />
    </MediaWrapper>
  )
}
