import React, { Component } from 'react'
import DecisionsAdapter from '../adapters/DecisionsAdapter'
import OutcomesAdapter from '../adapters/OutcomesAdapter'
import OpinionsAdapter from '../adapters/OpinionsAdapter'
import DisplayContainer from './DisplayContainer'

export default class DecisionShow extends Component {
  constructor(){
    super();

    this.state = {
      // decision: null,
      // outcomes: [],
      // opinions: []

      decision: {
        id: 100,
        content: "decison_content",
        outcomes: [
          {
            id: 101,
            content: "outcome_content",
            pros:1,
            cons:0,
            opinions: [
              {
                id: 102,
                content: "opinion_content",
                value: true
              }
            ]
          },
          {
            id: 102,
            content: "outcome_content_2",
            pros: 0,
            cons: 1,
            opinions: [
              {
                id: 103,
                content: "opinion_content_2",
                value: false
              }
            ]
          }
        ]
      }


    }
  }

  componentDidMount(){
    DecisionsAdapter.showDecision(this.props.decisionId)
      .then( decision => {
        this.setState({decision: decision, outcomes: decision.outcomes})
      })
  }

  createOutcome = (content, decisionId) => {
    const newOutcome = {
      id: 1004,
      content: content
    }



    const newDecision = Object.assign({}, this.state.decision, { outcomes: [...this.state.decision.outcomes, newOutcome]})
    this.setState({
      decision: newDecision
    })


    //TODO: COME BACK TO THIS
    // OutcomesAdapter.createOutcome(content, decisionId)
    //   .then(newOutcome => {
    //     const newDecision = Object.assign({}, this.state.decision, { outcomes: [...this.state.decision.outcomes, newOutcome]})
    //     this.setState({decision: newDecision})
    //
    //   }
    // )
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

  // increment pros and cons here...somehow
  createOpinion = (content, outcomeId, value) => {
    OpinionsAdapter.createOpinion(content, outcomeId, value)
      .then(newOpinion => {

        console.log(newOpinion, outcomeId)
        const outcomeIndex = this.state.decision.outcomes.findIndex((e) => e.id == outcomeId )
        const old_outcome = Object.assign({}, this.state.decision.outcomes[outcomeIndex])
        const pro_or_con = newOpinion.value ? { pros: old_outcome.pros + 1 } : { cons: old_outcome.cons + 1 }
        const new_outcome = Object.assign({}, old_outcome, { opinions: [...old_outcome.opinions, newOpinion]}, pro_or_con)
        const new_outcomes_array = [...this.state.decision.outcomes.slice(0, outcomeIndex),new_outcome, ...this.state.decision.outcomes.slice(outcomeIndex+1)]
        const newDecision = Object.assign({}, this.state.decision, { outcomes: new_outcomes_array})
        this.setState({
          decision: newDecision
        }, () => {
          console.log(this.state.decision)
        })

        // this.setState({opinions:[...this.state.opinions, opinion]})
      })
  }


  render(){

    const opinions = this.state.decision.outcomes.map((outcome) => outcome.opinions).reduce((a, b) => a.concat(b), [])
    console.log(opinions)
    return(
      <div>
        {this.state.decision ?
        <DisplayContainer
        decision={this.state.decision} decisions={this.props.decisions}
        editDecision={this.props.editDecision} deleteDecision={this.props.deleteDecision} outcomes={this.state.decision.outcomes} opinions={opinions}  createOutcome={this.createOutcome}
        editOutcome={this.editOutcome}
        getOutcomeId={this.getOutcomeId} deleteOutcome={this.deleteOutcome} createOpinion={this.createOpinion} incrementCounter={this.props.incre}
        /> : []}
      </div>
    )
  }
}
