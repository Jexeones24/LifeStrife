import React, {Component} from 'react'
import { Statistic, Card } from 'semantic-ui-react'

export default class OpinionContainer extends Component {
  constructor(){
    super();

    this.state = {
      value: '',
      outcomeId: null
    }
  }

  handleClick = (id) => {
    this.props.deleteOpinion(id, this.props.outcomeId)
  }

  render(){

    let outcomeId = this.props.outcomeId
    return(
      <div className="opinion-container">
          {/* <Statistic>
            {this.props.outcome ?
            <Statistic.Label>Outcome: {this.props.outcome[0].content}</Statistic.Label> : null }
          </Statistic> */}

          {this.props.opinions && this.props.opinions.length > 0 ?
          this.props.opinions.map((o, idx) => <Tile key={idx} content={o.content} color={o.value} handleClick={this.handleClick.bind(this, o.id)}/>) : []}
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
