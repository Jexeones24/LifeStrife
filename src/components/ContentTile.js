import React from 'react'
import {Segment} from 'semantic-ui-react'


const ContentTile = ({content}) => {
  return (
    <Segment as='h3' className="content-tile">
      {content}
    </Segment>
  )
}

export default ContentTile
