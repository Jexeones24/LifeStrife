import React, { Component } from 'react'
import { Grid, Segment, Form, TextArea, Statistic, Button } from 'semantic-ui-react'
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
      outcomes:[],
      opinions:[],
      content: '',
      value: '',
      message: '',
      isEditing: false,
      outcomeId: null,
      promptVisible: false,
      opinionFormVisible: false,
      placeholder: ''
    }
  }

  handleChange = (e) => {
    this.setState({content:e.target.value})
  }

  handleSubmit = () => {
    this.props.editDecision(this.state.content, this.props.decision.id)
    this.setState({isEditing:false})
  }

  // showEditForm = () => {
  //   this.setState({isEditing:true})
  // }

  handleDelete = (e) => {
    e.preventDefault();
    this.props.deleteDecision(this.props.decision.id)
    this.setState({content:''})
    // have to redirect and destroy all outcomes/opinions associated
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
    console.log("prompting user, outcome id:", id)
    this.setState({
      outcomeId:id,
      promptVisible:!this.state.promptVisible
    })
    // callback from decision show to createOpinion
    //this should also show opinions

  }

  getOpinions = (id) => {
    OutcomesAdapter.showOpinions(id)
      .then(outcome => {this.setState({
        opinions: outcome.opinions}, () => {console.log(this.state.opinions)})
    })
  }

  createOpinion = (content, value, outcomeId) => {
    console.log("creating opinion in decision show", content, value, outcomeId)
    OpinionsAdapter.createOpinion(content, value, outcomeId)
      .then(opinion => {
        console.log("Created Opinion", opinion)
        console.log("State in create opinon", this.state)
        this.setState({opinions:[...this.state.opinions, opinion]}, () => {console.log(this.state.opinions)})
      })
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

  render(){
    let showOpinionForm = () => {
      return (
        this.state.opinionFormVisible ? <OpinionForm
        value={this.state.value} outcomeId={this.state.outcomeId} createOpinion={this.createOpinion} placeholder={this.state.placeholder}/> : null
      )
    }

    return(

      <div className="decision-display-container">
        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column>
              <Segment className="decision-show-title" >
                <Statistic>
                  <Statistic.Value text>
                    CURRENT DECISION
                  </Statistic.Value>
                  <Statistic.Label></Statistic.Label>
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
                  {this.props.decision.content.toUpperCase()}
                </Segment>}

                <Button basic size="mini" color='black' onClick={this.handleDelete.bind(this)}>Delete</Button>
              </Segment>
              <Stats />

              <Segment>
                <Button basic size="mini" color='black'>CHOOSE OTHER</Button>
                <Button inverted size="mini" color='red'>SAVE</Button>
              </Segment>

            </Grid.Column>

            <OutcomeContainer outcomes={this.props.outcomes} decisionId={this.props.decision.id} opinions={this.state.opinions} createOutcome={this.props.createOutcome} deleteOutcome={this.props.deleteOutcome} editOutcome={this.props.editOutcome} getOutcomeId={this.getOutcomeId} getOpinions={this.getOpinions}/>

            {/* pro & con column */}
            <Grid.Column >
              <h1>PROS & CONS</h1>
              {this.state.promptVisible ? <Prompt handleProForm={this.handleProForm} handleConForm={this.handleConForm}/> : showOpinionForm()}

              <OpinionContainer opinions={this.state.opinions} createOpinion={this.createOpinion} hideOpinionForm={this.hideOpinionForm} outcomeId={this.state.outcomeId}/>

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
      <Button basic size="mini" value="true" color='green' onClick={handleProForm}>PRO</Button>
      <Button basic size="mini" value="false" color='red' onClick={handleConForm}>CON</Button>
    </div>
  )
}
