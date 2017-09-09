import React, {Component} from 'react'
import { Grid, Header, Icon, Segment, Form, TextArea } from 'semantic-ui-react'
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
    console.log("delete me", id)
    this.props.deleteOutcome(id)
  }

  handleEdit = (content, e) => {
    console.log("edit me", e)
    this.setState({
      editing:!this.state.editing,
      // outcomeId:id
    })
    // this.props.editOutcome(this.state.content, id)
    // makes edit form appear
  }

  promptUser = (id) => {
    this.props.promptUser(id)
  }

  viewOpinions = (id) => {
    console.log("view opinions of outcome", id)
    // need to give this to display container
    this.props.outcomeOpinions(id)
  }

  render(){
    console.log(this.props.opinions)
    // loop through each outcome and then make a loop through opinions to find which ones are theirs
    // need to round up all opinions / each outcome
    // each outcome needs to also display a corresponding opinion container


    let outcomesToShow = () => {

      return (
        this.props.outcomes &&
        this.props.outcomes.map((outcome, idx) =>
          <div key={idx}>
            <Segment as='h3' className="content-tile" key={idx} id={outcome.id}>

              {outcome.id}: {outcome.content}
              <br />
              <br />

              <button value={outcome.id} onClick={this.handleEdit.bind(this, outcome.id)}>e</button>
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

          <Form onSubmit={this.handleSubmit}>
            <TextArea autoHeight placeholder='Add Outcome...' rows={2}
            onChange={this.handleChange} value={this.state.content} required/>
            <button>+</button>
          </Form>


          {this.state.editing ? <OutcomeEditForm outcomeId={this.state.outcomeId} editOutcome={this.props.editOutcome}/> : outcomesToShow()}

      </Grid.Column>
    )
  }
}
