import * as React from 'react'
import styled from '@emotion/styled'

import { useSelector } from 'av/store'

const Metadata = styled.div`
  font-size: 2em;
  display: flex;
  align-items: center;
`

const CoverArt = styled.img`
  height: 10em;
  margin-right: 1.5em;
`

const Information = styled.div`
  display: flex;
  flex-direction: column;
`

const InformationLine = styled.div`
  &:not(:last-child) {
    margin-bottom: 1em;
  }
`

export const AudioMetadata: React.FC = () => {
  const { coverArtUrl, artist, title } = useSelector(({ media }) => media.audioMetadata)

  return (
    <Metadata>
      {coverArtUrl && (
        <CoverArt src={coverArtUrl} onLoad={() => URL.revokeObjectURL(coverArtUrl)} />
      )}

      <Information>
        {artist && <InformationLine>{artist}</InformationLine>}
        {title && <InformationLine>{title}</InformationLine>}
      </Information>
    </Metadata>
  )
}
