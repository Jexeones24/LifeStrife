import React, { Component } from 'react'
import DecisionsAdapter from '../adapters/DecisionsAdapter'
import OutcomesAdapter from '../adapters/OutcomesAdapter'
import OpinionsAdapter from '../adapters/OpinionsAdapter'
import DisplayContainer from './DisplayContainer'

export default class DecisionShow extends Component {
  constructor(){
    super();

    this.state = {
      decision: null,
      outcomes: [],
      opinions: []
    }
  }

  componentDidMount(){
    DecisionsAdapter.showDecision(this.props.decisionId)
      .then( decision => {
        console.log("Decisions from Decision Show", decision)
        this.setState({decision: decision, outcomes: decision.outcomes}, () => {
          console.log("state in decision show", this.state)
        })
      })
  }

  componentWillReceiveProps = (nextProps) => {
    console.log("decision show next props", nextProps)
  }

  createOutcome = (content, decisionId) => {
    OutcomesAdapter.createOutcome(content, decisionId)
      .then(outcome => {
        this.setState({outcomes: [...this.state.outcomes, outcome]})
      }
    )
  }

  deleteOutcome = (id) => {
    OutcomesAdapter.deleteOutcome(id)
      .then(newOutcomes => {
        let outcomes = this.state.outcomes.filter((o) => o.id !== id)
        this.setState({outcomes}, () => {console.log(this.state.outcomes)})
      })
  }


  editOutcome = (content, id) => {
    OutcomesAdapter.editOutcome(content, id)
      .then(newOutcome => {
        let index = this.state.outcomes.findIndex(outcome => outcome.id === id )
        this.setState({
          outcomes: [
           ...this.state.outcomes.slice(0,index), newOutcome,
           ...this.state.outcomes.slice(index+1)
         ]
       }, () => {console.log(this.state.outcomes)});
    })
  }


  createOpinion = (content, value, outcomeId) => {
    OpinionsAdapter.createOpinion(content, value, outcomeId)
      .then(opinion => {
        console.log("Created Opinion", opinion)
        console.log("State in create opinon", this.state)
        this.setState({opinions:[...this.state.opinions, opinion]}, () => {console.log(this.state.opinions)})
      })
  }


  render(){
    console.log("Re rendering", this.state)
    return(
      <div>
        {this.state.decision ?
        <DisplayContainer
        decision={this.state.decision} decisions={this.props.decisions}
        editDecision={this.props.editDecision} deleteDecision={this.props.deleteDecision} outcomes={this.state.outcomes} opinions={this.state.opinions}  createOutcome={this.createOutcome}
        editOutcome={this.editOutcome}
        getOutcomeId={this.getOutcomeId} deleteOutcome={this.deleteOutcome} createOpinion={this.createOpinion}/> : []}
      </div>
    )
  }
}
