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


  render(){
    console.log("Re rendering", this.state)
    return(
      <div>
        {this.state.decision ?
        <DisplayContainer
        decision={this.state.decision} decisions={this.props.decisions}
        editDecision={this.props.editDecision} deleteDecision={this.props.deleteDecision} outcomes={this.state.outcomes} opinions={this.state.opinions}  createOutcome={this.props.createOutcome}
        editOutcome={this.props.editOutcome}
        getOutcomeId={this.getOutcomeId} deleteOutcome={this.props.deleteOutcome} createOpinion={this.props.createOpinion}/> : []}
      </div>
    )
  }
}
