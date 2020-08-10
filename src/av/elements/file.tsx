import * as React from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic, faVideo } from '@fortawesome/free-solid-svg-icons'

import { transitionStyles } from 'av/globals'
import { browseForFile } from 'av/util/browse-for-file'
import { electronResizeWindow, electronSetWindowResizable } from 'av/env/electron-window'

import { openFile } from 'av/store/thunks'

import { Pane } from 'av/components/pane'

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

const BrowseButton = styled.div`
  display: inline-block;
  padding: .2em .6em;
  border-radius: 1em;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition-property: background-color;
  ${transitionStyles}

  &:hover, &:focus {
    background-color: rgba(0, 0, 0, 0.6);
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
          <BrowseButton onClick={() => browseForFile(fileList => dispatch(openFile(fileList)))}>
            browse
          </BrowseButton>{' '}
          for one
        </div>
      </Body>
    </Wrapper>
  )
}
