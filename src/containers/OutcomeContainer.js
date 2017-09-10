import React, {Component} from 'react'
import { Grid, Header, Icon, Segment, Form, TextArea, Statistic } from 'semantic-ui-react'
import OutcomeEditForm from './OutcomeEditForm'
import InlineEdit from 'react-edit-inline';


export default class OutcomeContainer extends Component {
  constructor(){
    super();

    this.state = {
      content: '',
      editing: false,
      outcomeId: null,
      message: 'Hi'
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

  handleDelete = (id, e) => {
    this.props.deleteOutcome(id)
  }

  handleEdit = (id) => {
    this.setState({
      editing:!this.state.editing,
      outcomeId:id
    })
  }

  promptUser = (id, e) => {
    this.props.promptUser(id)
  }

  viewOpinions = (id) => {
    this.props.outcomeOpinions(id)
  }


  dataChanged = (data) => {
    // data = { description: "New validated text comes here" }
    // Update your model from here
    console.log(data)
    this.setState({...data})
  }

  customValidateText = (text) => {
    return (text.length > 0 && text.length < 64);
  }

  render(){

    let outcomesToShow = () => {
      return (
        this.props.outcomes &&
        this.props.outcomes.map((outcome, idx) =>

          <div key={idx}>
            <Segment color='grey' className="content-tile" key={idx} id={outcome.id} onClick={this.handleEdit.bind(this, outcome.id)}>
              <h2>{outcome.id}: {outcome.content}</h2>
              <Segment>
                <Statistic color='green' size='mini' value='4' label='pro' />
                <Statistic color='red' size='mini' value='3' label='con' />
              </Segment>
              <Segment>
                <button onClick={this.handleDelete.bind(this, outcome.id)}>-</button>
                <button onClick={this.promptUser.bind(this, outcome.id)}>add opinion</button>
                <button onClick={this.viewOpinions.bind(this, outcome.id)}>view opinions</button>
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



            <h2>{this.state.message}</h2>
             <span>Edit me: </span>
             <InlineEdit
               validate={this.customValidateText}
               activeClassName="editing"
               text={this.state.message}
               paramName="message"
               change={this.dataChanged}
               style={{
                 backgroundColor: 'grey',
                 minWidth: 150,
                 display: 'inline-block',
                 margin: 0,
                 padding: 0,
                 fontSize: 15,
                 outline: 0,
                 border: 0
               }}
             />



            {/* Adding new outcome */}
            <Segment as='h3' className="new-outcome-form">
              <Form onSubmit={this.handleSubmit}>
                <TextArea autoHeight placeholder='Add Outcome...' rows={2}
                onChange={this.handleChange} value={this.state.content} required/>
                <br />
                <button>+</button>
              </Form>
            </Segment>
          </Segment>

          {/* editing outcome */}
          {this.state.editing ? <OutcomeEditForm outcomes={this.props.outcomes} outcomeId={this.state.outcomeId} editOutcome={this.props.editOutcome} handleDelete={this.handleDelete} promptUser={this.promptUser} viewOpinions={this.viewOpinions}/> : outcomesToShow()}
      </Grid.Column>
    )
  }
}
