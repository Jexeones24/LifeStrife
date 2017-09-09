import React, { Component } from 'react'
import { Grid, Header, Icon, Segment, Form, TextArea } from 'semantic-ui-react'
import OutcomeContainer from './OutcomeContainer'
import OpinionContainer from './OpinionContainer'
import OpinionForm from './OpinionForm'
import Stats from '../components/Stats'
import OutcomesAdapter from '../adapters/OutcomesAdapter'
import OpinionsAdapter from '../adapters/OpinionsAdapter'



export default class DisplayContainer extends Component {
  constructor(){
    super();

    this.state = {
      outcomes:[],
      chosenOutcome: null,
      opinions:[],
      content: '',
      value: '',
      isEditing: false,
      outcomeId: null,
      promptVisible: false,
      opinionFormVisible: false
    }
  }

  componentDidMount(){
    OutcomesAdapter.showOutcomes(this.props.decision.id)
      .then(outcomes => this.setState({outcomes})
    )
      OpinionsAdapter.getOpinions()
        .then(opinions => this.setState({opinions})
      )
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps)
  }

  handleChange = (e) => {
    this.setState({content:e.target.value})
  }

  handleSubmit = () => {
    this.props.editDecision(this.state.content, this.props.decision.id)
    this.setState({isEditing:false})
  }

  showEditForm = () => {
    this.setState({isEditing:true})
  }

  handleDelete = (e) => {
    e.preventDefault();
    this.props.deleteDecision(this.props.decision.id)
    this.setState({content:''})
    // have to redirect and destroy all outcomes/opinions associated
  }


  promptUser = (outcomeId) => {
    this.setState({
      promptVisible:!this.state.promptVisible,
      outcomeId:outcomeId
    })
  }

  handleProForm = (e) => {
    this.setState({
      opinionFormVisible:true,
      promptVisible:false,
      value:e.target.value
    })
  }

  handleConForm = (e) => {
    this.setState({
      opinionFormVisible:true,
      promptVisible:false,
      value:e.target.value
    })
  }

  outcomeOpinions = (outcomeId) => {
    let chosenOutcome = this.state.outcomes.filter((o) => o.id === outcomeId)
    this.setState({outcomeId, chosenOutcome}, () => {console.log(this.state.chosenOutcome)})
  }


  render(){
    let showOpinionForm = () => {
      return (
        this.state.opinionFormVisible ? <OpinionForm
          value={this.state.value} outcomeId={this.state.outcomeId} createOpinion={this.props.createOpinion}/> : null
      )
    }

    return(
      <div className="decision-display-container">

        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column>
              <Header as='h2'>
                <Icon/>
                <Header.Content>
                  CURRENT DECISION
                </Header.Content>
              </Header>

              {/* decision display/show decision edit form */}
              <Segment className="decision-show-title" onClick={this.showEditForm}>

                  {this.state.isEditing ?
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                      <TextArea autoHeight placeholder={this.props.decision.content.toUpperCase()} rows={2}
                        onChange={this.handleChange} value={this.state.content}
                        required/><button type="submit">+</button>
                    </Form> :

                    <Segment as='h3' className="content-tile" id={this.props.decision.id}>
                      {this.props.decision.content.toUpperCase()}
                    </Segment>}
                    <button onClick={this.handleDelete.bind(this)}>-</button>

                </Segment>


                <Stats />
            </Grid.Column>


            <OutcomeContainer outcomes={this.state.outcomes} decisionId={this.props.decision.id} opinions={this.state.opinions} createOutcome={this.props.createOutcome} deleteOutcome={this.props.deleteOutcome} editOutcome={this.props.editOutcome} promptUser={this.promptUser} outcomeOpinions={this.outcomeOpinions}/>


            <Grid.Column>
              <Header as='h2'>
                <Icon name='plus'/>
                <Header.Content>
                  Pros & Cons
                </Header.Content>
              </Header>

              {this.state.promptVisible ? <Prompt handleProForm={this.handleProForm} handleConForm={this.handleConForm}/> : showOpinionForm()}

              {<OpinionContainer opinions={this.state.opinions} createOpinion={this.props.createOpinion} hideOpinionForm={this.hideOpinionForm} outcomeId={this.state.outcomeId} outcome={this.state.chosenOutcome}/>}


            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const Prompt = ({handleProForm, handleConForm}) => {
  return (
    <div>
      <h1>"Dafuq kind o' opinion you got 'bout 'dis?"</h1>
      <button value="true" onClick={handleProForm}>PRO</button>
      <button value="false" onClick={handleConForm}>CON</button>
    </div>
  )
}
