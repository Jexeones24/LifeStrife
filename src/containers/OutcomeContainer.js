import React, {Component} from 'react'
import { Grid, Header, Icon, Segment, Form, TextArea, Statistic, Button } from 'semantic-ui-react'
import OutcomeEditForm from './OutcomeEditForm'

export default class OutcomeContainer extends Component {
  constructor(){
    super();

    this.state = {
      content: '',
      editing: false,
      outcomeId: null,
      opinions:[],
      message: ''
    }
  }

  handleChange = (e) => {
    this.setState({content:e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createOutcome(this.state.content, this.props.decisionId)
    this.setState({content:''})
  }

  handleDelete = (id, e) => {
    this.props.deleteOutcome(id)
  }

  handleEdit = (id) => {
    this.setState({
      editing:!this.state.editing,
      outcomeId:id
    })
  }

  handleAddOpinion = (id) => {
    this.props.getOutcomeId(id)
    // should increment counter here
  }

  viewOpinions = (id) => {
    this.props.getOpinions(id)
  }

  setMessage = (content, outcomeId) => {
    let message = content
    this.setState({
      editing:!this.state.editing,
      message: content,
      outcomeId:outcomeId
    })
  }

  render(){

    let outcomesToShow = () => {
      return (
        this.props.outcomes &&
        this.props.outcomes.map((outcome, idx) =>

          <div key={idx}>
            <Segment color='grey' className="content-tile" key={idx} id={outcome.id}>
              <h2 onClick={this.setMessage.bind(this, outcome.content, outcome.id)}>{outcome.id}: {outcome.content}</h2>
              <Segment>
                <Statistic color='green' size='mini' value='4' label='pro'/>
                <Statistic color='red' size='mini' value='3' label='con' />
              </Segment>
              <Segment>
                <Button basic size="mini" color='black' onClick={this.handleDelete.bind(this, outcome.id)}>Delete</Button>
                <Button basic size="mini" color='black' onClick={this.handleAddOpinion.bind(this, outcome.id)}>+ opinion</Button>
                <Button basic size="mini" color='black' onClick={this.viewOpinions.bind(this, outcome.id)}>view opinions</Button>
              </Segment>
            </Segment>
            <br/>
          </div>)
        )
      }

    return(
        <Grid.Column >
          <Segment>
            <Header as='h2'>
              <Icon name='balance' />
              <Header.Content>
                POSSIBLE OUTCOMES
              </Header.Content>
            </Header>

            {/* Adding new outcome */}
            <Segment as='h3' className="new-outcome-form">
              <Form onSubmit={this.handleSubmit}>
                <TextArea autoHeight placeholder='Add Outcome...' rows={2}
                onChange={this.handleChange} value={this.state.content} required/>
                <br />
                <Button basic size="mini" color='black'>+</Button>
              </Form>
            </Segment>
          </Segment>

          {/* editing outcome */}
          {this.state.editing ?
            <OutcomeEditForm outcomes={this.props.outcomes}
              promptUser={this.props.promptUser}
              outcomeId={this.state.outcomeId} editOutcome={this.props.editOutcome} handleDelete={this.handleDelete}
              handleAddOpinion={this.handleAddOpinion} viewOpinions={this.viewOpinions}/>
          : outcomesToShow()}
      </Grid.Column>
    )
  }
}
