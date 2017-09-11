import React, {Component} from 'react'
import { Grid, Header, Icon, Form, TextArea, Segment, Statistic, Card } from 'semantic-ui-react'


export default class OpinionContainer extends Component {
  constructor(){
    super();
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps)
  }

  render(){
    console.log("this.props.opinions", this.props.opinions)
    return(
      <div className="opinion-container">
        <Segment as='h3' className="outcome-opinions">
          <Statistic>
            {this.props.outcome ?
            <Statistic.Label>Outcome: {this.props.outcome[0].content}</Statistic.Label> : null }
          </Statistic>

          {this.props.opinions && this.props.opinions.length > 0 ?
          this.props.opinions.map((o, idx) => <Tile key={idx} content={o.content} color={o.value}/>) : 'No opinions submitted'}
        </Segment>
      </div>
    )
  }
}



const Tile = ({color, content , idx}) => {
  let outline = null;
  if(color === true) {
    outline = 'green'
  } else {
    outline = 'red'
  }

  return (
    <Card fluid color={outline} header={content} key={idx}/>
  )
}
