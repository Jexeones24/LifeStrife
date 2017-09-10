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
      .then( decision => this.setState({decision})
    )
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


  render(){
    
    return(
      <div>
        {this.state.decision ?
        <DisplayContainer decision={this.state.decision} decisions={this.props.decisions} outcomes={this.props.outcomes} opinions={this.props.opinions} editDecision={this.props.editDecision} deleteDecision={this.props.deleteDecision} createOutcome={this.props.createOutcome}
        editOutcome={this.props.editOutcome} deleteOutcome={this.props.deleteOutcome} createOpinion={this.props.createOpinion}/> : []}
      </div>
    )
  }
}
