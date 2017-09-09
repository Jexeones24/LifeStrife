import React, {Component} from 'react'
import { Grid, Header, Icon, Form, TextArea, Segment, Statistic, Card } from 'semantic-ui-react'


export default class OpinionContainer extends Component {
  constructor(){
    super();

    this.state = {
      content: '',
      formVisible: false
    }
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps)
  }

  // handleChange = (e) => {
  //   this.setState({content:e.target.value})
  // }
  //
  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   let content = this.state.content
  //   let outcomeId = this.props.outcomeId
  //   let value = this.state.value
  //
  // handleEdit = () => {
  //   console.log('handling edit')
  // }
  //
  // handleDelete = () => {
  //   console.log('handling delete')
  // }

  render(){

    let outcomeOpinions = this.props.opinions.filter((opinion) => {
      return opinion.outcome_id === this.props.outcomeId
    })

    console.log(outcomeOpinions)

    return(
      <div className="opinion-container">




        <Segment as='h3' className="outcome-opinions">
          <Statistic>
            <Statistic.Value text>
              Outcome id:{this.props.outcomeId}
            </Statistic.Value>
            <Statistic.Label>Opinions</Statistic.Label>
          </Statistic>

          {this.props.opinions ?
          outcomeOpinions.map((o, idx) => <Tile key={idx} content={o.content} color={o.value}/>) : <Tile />}

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
