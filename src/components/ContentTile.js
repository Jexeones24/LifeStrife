import React from 'react'
import {Segment} from 'semantic-ui-react'


const ContentTile = ({content, id}) => {
  return (
    <Segment as='h3' className="content-tile" key={id}>
      {content}
    </Segment>
  )
}

export default ContentTile
