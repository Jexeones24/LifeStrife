import React, { Component } from 'react'
import DecisionsAdapter from '../adapters/DecisionsAdapter'
import OutcomesAdapter from '../adapters/OutcomesAdapter'
import DisplayContainer from './DisplayContainer'


export default class DecisionShow extends Component {
  constructor(){
    super();

    this.state = {
      decision: null,
      outcomes: []
    }
  }

  componentDidMount(){
    DecisionsAdapter.showDecision(this.props.decisionId)
      .then( decision => this.setState({decision})
    )
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps)
  }


  render(){
    const {decisions, decisionId} = this.props
    return(
      <div>
        {this.state.decision ?

        <DisplayContainer decision={this.state.decision} decisions={this.props.decisions} outcomes={this.props.outcomes} opinions={this.props.opinions} editDecision={this.props.editDecision} deleteDecision={this.props.deleteDecision} createOutcome={this.props.createOutcome}
        editOutcome={this.props.editOutcome} deleteOutcome={this.props.deleteOutcome} createOpinion={this.props.createOpinion}/> : []}
      </div>
    )
  }
}
