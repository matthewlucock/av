import * as React from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic, faVideo } from '@fortawesome/free-solid-svg-icons'

import { browseForFile } from 'av/util/browse-for-file'
import { electronResizeWindow, electronSetWindowResizable } from 'av/env/electron-window'

import { openFile } from 'av/store/thunks'

import { Pane } from 'av/components/pane'
import { TranslucentButton } from 'av/components/translucent-button'

const Wrapper = styled(Pane)`
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const Body = styled.div``

const MediaIcons = styled.div`
  font-size: 6em;
  margin-bottom: 0.25em;

  & > :not(:last-child) {
    margin-right: 0.5em;
  }
`

export const File: React.FC = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    electronResizeWindow()
    electronSetWindowResizable(false)

    return () => electronSetWindowResizable(true)
  }, [])

  return (
    <Wrapper>
      <Body>
        <MediaIcons>
          <FontAwesomeIcon icon={faMusic} />
          <FontAwesomeIcon icon={faVideo} />
        </MediaIcons>

        <div>
          Drag a file here or{' '}
          <TranslucentButton
            onClick={() => browseForFile(fileList => dispatch(openFile(fileList)))}
          >
            browse
          </TranslucentButton>{' '}
          for one
        </div>
      </Body>
    </Wrapper>
  )
}
