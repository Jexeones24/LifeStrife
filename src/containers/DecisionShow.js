import React, { Component } from 'react'
import DecisionsAdapter from '../adapters/DecisionsAdapter'
import OutcomesAdapter from '../adapters/OutcomesAdapter'
import DisplayContainer from './DisplayContainer'
import { Menu, Icon } from 'semantic-ui-react'



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
        console.log("Decisons from Decision Show", decision)
        this.setState({decision: decision, outcomes: decision.outcomes})
      })
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps)
    // let newOutcome = nextProps.outcomes[0]
    // console.log(newOutcome)
    // if(this.state.outcomes !== nextProps.outcomes){
    //   return this.setState({outcomes: newOutcome}, () => {console.log(this.state.outcomes)})
    // } else {
    //   return null
    // }
  }


  createOutcome = (content, decisionId) => {
    OutcomesAdapter.createOutcome(content, decisionId)
      .then(outcome => {
        this.setState({outcomes: [...this.state.outcomes, outcome]}, () => {
          console.log("State after outcome created", this.state)
        })
      }
    )
  }


  render(){
    console.log("Re rendering", this.state.outcomes)
    return(
      <div>
        {this.state.decision ?
        <DisplayContainer decision={this.state.decision} decisions={this.props.decisions} outcomes={this.state.outcomes} opinions={this.props.opinions} editDecision={this.props.editDecision} deleteDecision={this.props.deleteDecision} createOutcome={this.createOutcome}
        editOutcome={this.props.editOutcome} deleteOutcome={this.props.deleteOutcome} createOpinion={this.props.createOpinion}/> : []}
      </div>
    )
  }
}
