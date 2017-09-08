import React, { Component } from 'react'
import DecisionsAdapter from '../adapters/DecisionsAdapter'
import OutcomesAdapter from '../adapters/OutcomesAdapter'
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
    // grabs me one decision
    DecisionsAdapter.showDecision(this.props.decisionId)
      .then( decision => {
        this.setState({decision}, () =>
          // grabs all decision's outcomes
          OutcomesAdapter.showOutcomes(this.props.decisionId)
            .then( outcomes => {
              this.setState({outcomes}, () => {console.log('DecisionShow state:', this.state)})
          })
        )
    })
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps)
  }


  // for each outcome, need the opinions
  render(){

    const {decisions, decisionId} = this.props

    return(
      <div>
        {this.state.decision ?

          <DisplayContainer decision={this.state.decision} decisions={this.props.decisions} outcomes={this.props.outcomes} editDecision={this.props.editDecision} deleteDecision={this.props.deleteDecision} createOutcome={this.props.createOutcome}/> :

         []}
      </div>
    )
  }
}
