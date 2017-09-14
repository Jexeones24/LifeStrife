import React, {Component} from 'react'
import {Card} from 'semantic-ui-react'

export default class OpinionContainer extends Component {
  constructor(){
    super();

    this.state = {
      value: ''
    }
  }

  handleClick = (o) => {
    let id = o.id
    let value = o.value
    this.props.deleteOpinion(id, this.props.outcomeId, value)
  }

  render(){
    return(
      <div className="opinion-container">
          {this.props.opinions && this.props.opinions.length > 0 ?
          this.props.opinions.map((o, idx) => <Tile key={idx} content={o.content} color={o.value} handleClick={this.handleClick.bind(this, o)}/>) : []}
      </div>
    )
  }
}

const Tile = ({color, content , idx, handleClick}) => {
  let outline = null;
  if(color === true) {
    outline = 'green'
  } else {
    outline = 'red'
  }

  return (
    <Card fluid color={outline} header={content} key={idx} onClick={handleClick}/>
  )
}
