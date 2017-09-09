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

        {this.props.opinions ?
        this.props.opinions.map((o, idx) => <p key={idx}>content: {o.content} value: {o.value.toString()} outcome: {o.outcome_id}</p>) : null}


          <Segment as='h3' className="outcome-opinions">
            <Statistic>
              <Statistic.Value text>
                Outcome id:{this.props.outcomeId}
              </Statistic.Value>
              <Statistic.Label>Opinions</Statistic.Label>
            </Statistic>


            <Card fluid color='green' header='I am pros' />
            <Card fluid color='red' header='I am cons' />



          </Segment>


        Container per outcome
          tiles for each opinion

      </div>
    )
  }
}
