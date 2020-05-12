import * as React from 'react'
import styled from '@emotion/styled'
import { connect as connectToRedux } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic, faVideo } from '@fortawesome/free-solid-svg-icons'

import { browseForFile } from 'av/util/browse-for-file'
import { electronResizeWindow, electronSetWindowResizable } from 'av/env/electron-window'

import { Dispatch } from 'av/store'
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

interface DispatchProps {
  readonly openFile: (fileList: FileList) => void
}

type Props = DispatchProps

const BaseFile: React.FC<Props> = props => {
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
          <TranslucentButton onClick={() => browseForFile(props.openFile)}>
            browse
          </TranslucentButton>{' '}
          for one
        </div>
      </Body>
    </Wrapper>
  )
}

const mapDisaptchToProps = (dispatch: Dispatch): DispatchProps => (
  {
    openFile: (fileList: FileList): void => {
      dispatch(openFile(fileList))
    }
  }
)

export const File = connectToRedux(null, mapDisaptchToProps)(BaseFile)
