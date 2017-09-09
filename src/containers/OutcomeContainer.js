import React, {Component} from 'react'
import { Grid, Header, Icon, Segment, Form, TextArea, Statistic } from 'semantic-ui-react'
import OutcomeEditForm from './OutcomeEditForm'


export default class OutcomeContainer extends Component {
  constructor(){
    super();

    this.state = {
      content: '',
      editing: false,
      outcomeId: null
    }
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps)
  }

  handleChange = (e) => {
    this.setState({content:e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createOutcome(this.state.content, this.props.decisionId)
    this.setState({content:''})
  }

  handleDelete = (id) => {
    this.props.deleteOutcome(id)
  }

  handleEdit = (e) => {
    this.setState({
      editing:!this.state.editing,
      outcomeId:e
    })
  }

  promptUser = (id) => {
    this.props.promptUser(id)
  }

  viewOpinions = (id) => {
    this.props.outcomeOpinions(id)
  }

  // if click add opinion, hide outcomes opinions

  render(){

    let outcomesToShow = () => {
      return (
        this.props.outcomes &&
        this.props.outcomes.map((outcome, idx) =>

          <div key={idx}>
            <Segment as='h3' className="content-tile" key={idx} id={outcome.id} onClick={this.handleEdit.bind(this)}>
              {outcome.id}: {outcome.content}
              <br />
              <br />
              <button onClick={this.handleDelete.bind(this, outcome.id)}>-</button>
              <button onClick={this.promptUser.bind(this, outcome.id)}>add opinion</button>
              <button onClick={this.viewOpinions.bind(this, outcome.id)}>view opinions</button>
            </Segment>
          </div>)
        )
      }

    return(
        <Grid.Column>
          <Header as='h2'>
            <Icon name='balance' />
            <Header.Content>
              POSSIBLE OUTCOMES
            </Header.Content>
          </Header>

          <Segment as='h3' className="new-outcome-form">
            <Form onSubmit={this.handleSubmit}>
              <TextArea autoHeight placeholder='Add Outcome...' rows={2}
              onChange={this.handleChange} value={this.state.content} required/>
              <br />
              <button>+</button>
            </Form>
          </Segment>

          {this.state.editing ? <OutcomeEditForm outcomes={this.props.outcomes} outcomeId={this.state.outcomeId} editOutcome={this.props.editOutcome} handleDelete={this.handleDelete} promptUser={this.promptUser} viewOpinions={this.viewOpinions}/> : outcomesToShow()}
      </Grid.Column>
    )
  }
}
