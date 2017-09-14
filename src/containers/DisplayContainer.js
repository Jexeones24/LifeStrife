import React, { Component } from 'react'
import { Grid, Segment, Statistic, Button } from 'semantic-ui-react'
import OutcomeContainer from './OutcomeContainer'
import OpinionContainer from './OpinionContainer'
import OpinionForm from './OpinionForm'
import Stats from '../components/Stats'
import OutcomesAdapter from '../adapters/OutcomesAdapter'
import OpinionsAdapter from '../adapters/OpinionsAdapter'
import InlineEdit from 'react-edit-inline';


export default class DisplayContainer extends Component {
  constructor(){
    super();

    this.state = {
      // decisionContent: "",
      // outcomes:[],
      // opinions:[],
      content: '',
      value: '',
      message: '',
      isEditing: false,
      outcomeId: null,
      promptVisible: false,
      opinionFormVisible: false,
      placeholder: '',
      selectedOutcome: 0
    }
  }

  handleChange = (e) => {
    this.setState({content:e.target.value})
  }

  handleSubmit = () => {
    this.props.editDecision(this.state.content, this.props.decision.id)
    this.setState({isEditing:false})
  }

  handleDelete = (e) => {
    e.preventDefault();
    this.props.deleteDecision(this.props.decision.id)
    this.setState({content:''})
  }


  handleProForm = (e) => {
    this.setState({
      opinionFormVisible:true,
      promptVisible:false,
      value:e.target.value,
      placeholder:'Add pro...'
    })
  }

  handleConForm = (e) => {
    this.setState({
      opinionFormVisible:true,
      promptVisible:false,
      value:e.target.value,
      placeholder:'Add con...'
    })
  }

  getOutcomeId = (id) => {
    this.setState({
      outcomeId:id,
      promptVisible:!this.state.promptVisible
    })
  }

  getOpinions = (id) => {
    this.setState({selectedOutcome: id})
  }

  createOpinion = (content, value, outcomeId) => {
    this.props.createOpinion(content, value, outcomeId)
  }

  deleteOpinion = (id, outcomeId, value) => {
    this.props.deleteOpinion(id, outcomeId, value)
  }

  setMessage = () => {
    this.setState({
      message: this.props.decision.content.toUpperCase(),
      isEditing:!this.state.isEditing
    })
  }

  dataChanged = (data) => {
    let content = data.message
    this.setState({
      isEditing:!this.state.isEditing,
      content:content
    })
      this.props.editDecision(content, this.props.decision.id)
  }

  customValidateText = (text) => {
    return (text.length > 0 && text.length < 150);
  }



  handleSave = () => {
    console.log("handling save")
    console.log("decision id", this.props.decision.id)
    // make post and set pending to false
    // need outcomeId and decision id
    // redirect to '/'
  }

  render(){
    let showOpinionForm = () => {
      return (
        this.state.opinionFormVisible ? <OpinionForm
        value={this.state.value} outcomeId={this.state.outcomeId} createOpinion={this.createOpinion} placeholder={this.state.placeholder}/> : null
      )
    }

    const outcomeFilter = this.props.decision.outcomes.filter((outcome) => {
      return outcome.id == this.state.selectedOutcome
    })

    let outcome = outcomeFilter.length != 0 ? outcomeFilter[0] : {opinions:[]}

    return(
      <div className="decision-display-container">
        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column>
              <Segment className="decision-show-title" raised>
                <Statistic>
                  <Statistic.Value text>
                    <br /> Decision
                  </Statistic.Value>
                  <Statistic.Label>click to edit</Statistic.Label>
                </Statistic>

                {this.state.isEditing ?
                <div>
                  <Segment>
                    <InlineEdit
                     validate={this.customValidateText}
                     activeClassName="editing"
                     text={this.state.message.toUpperCase()}
                     paramName="message"
                     change={this.dataChanged}
                     style={{
                       backgroundColor: 'white',
                       minWidth: 200,
                       display: 'inline-block',
                       margin: 0,
                       padding: 0,
                       fontSize: 15,
                       outline: 0,
                       border: 10
                     }}/></Segment>
                 </div>
                :

                <Segment as='h3' className="content-tile" onClick={this.setMessage} id={this.props.decision.id}>
                  <h3>{this.props.decision.content.toUpperCase()}</h3>
                </Segment>}

                <Button basic size="mini" color='black' onClick={this.handleDelete.bind(this)}>Delete</Button>
              </Segment>

              <Stats handleSave={this.handleSave} highestRanking={this.props.highestRanking}/>

            </Grid.Column>
            <OutcomeContainer outcomes={this.props.outcomes} decisionId={this.props.decision.id} createOutcome={this.props.createOutcome} deleteOutcome={this.props.deleteOutcome} editOutcome={this.props.editOutcome} getOutcomeId={this.getOutcomeId} getOpinions={this.getOpinions}
            />

            {/* pro & con column */}
            <Grid.Column >
              <Statistic>
                <Statistic.Value text>
                  <br /> PROS vs. CONS
                </Statistic.Value>
                <Statistic.Label>click to delete</Statistic.Label>
              </Statistic>
              {this.state.promptVisible ? <Prompt handleProForm={this.handleProForm} handleConForm={this.handleConForm}/> : showOpinionForm()}

              <OpinionContainer opinions={outcome.opinions}
              outcome={outcome}
              createOpinion={this.createOpinion}
              deleteOpinion={this.deleteOpinion} hideOpinionForm={this.hideOpinionForm}
              outcomeId={this.state.selectedOutcome}
              />

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
      <Segment>
        <Button basic size="mini" value="true" color='green' onClick={handleProForm}>PRO</Button>
        <Button basic size="mini" value="false" color='red' onClick={handleConForm}>CON</Button>
      </Segment>
    </div>
  )
}
