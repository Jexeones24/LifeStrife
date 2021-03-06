import React, { Component } from 'react'
import DecisionsAdapter from '../adapters/DecisionsAdapter'
import OutcomesAdapter from '../adapters/OutcomesAdapter'
import OpinionsAdapter from '../adapters/OpinionsAdapter'
import DisplayContainer from './DisplayContainer'

export default class DecisionShow extends Component {
  constructor(){
    super();

    this.state = {
      decision: {
        content: "",
        outcomes: [
          { content: "",
            opinions: [
              {content: ""}
            ]
          }
        ]
      }
    }
    this.deleteOutcome = this.deleteOutcome.bind(this)
  }

  componentDidMount(){
    DecisionsAdapter.showDecision(this.props.decisionId)
      .then( decision => {
        this.setState({decision: decision, outcomes: decision.outcomes})
      })
  }

  editDecision = (content, id) => {
    DecisionsAdapter.editDecision(content, id)
    .then(newDecision => {
      let index = this.props.decisions.findIndex(decision => {
        return decision.id === id
      })
      const newDecisionObject = Object.assign({}, this.state.decision, {content:newDecision.content})
      this.setState({decision:newDecisionObject})
    })
  }

  createOutcome = (content, decisionId) => {
    OutcomesAdapter.createOutcome(content, decisionId)
      .then(newOutcome => {
        const newDecision = Object.assign({}, this.state.decision, { outcomes: [newOutcome, ...this.state.decision.outcomes]})
        this.setState({decision: newDecision})

      }
    )
  }

  deleteOutcome = (id) => {
    OutcomesAdapter.deleteOutcome(id)
      .then(newOutcomes => {
        let outcomes = newOutcomes.filter((o) => o.decision_id === this.state.decision.id)
        const newDecision = Object.assign({}, this.state.decision, { outcomes})
        this.setState({decision: newDecision})
      })
  }


  editOutcome = (content, id) => {
    OutcomesAdapter.editOutcome(content, id)
      .then(newOutcome => {
        let index = this.state.outcomes.findIndex(outcome => outcome.id === id )
        this.setState({
          outcomes: [
           ...this.state.outcomes.slice(0,index), newOutcome,
           ...this.state.outcomes.slice(index+1)]
       });
    })
  }

  createOpinion = (content, outcomeId, value) => {
    OpinionsAdapter.createOpinion(content, outcomeId, value)
      .then(newOpinion => {
        const outcomeIndex = this.state.decision.outcomes.findIndex((e) => e.id == outcomeId )
        const old_outcome = Object.assign({}, this.state.decision.outcomes[outcomeIndex])
        const pro_or_con = newOpinion.value ? { pros: old_outcome.pros + 1 } : { cons: old_outcome.cons + 1 }
        const new_outcome = Object.assign({}, old_outcome, { opinions: [newOpinion, ...old_outcome.opinions]}, pro_or_con)
        const new_outcomes_array = [...this.state.decision.outcomes.slice(0, outcomeIndex),new_outcome, ...this.state.decision.outcomes.slice(outcomeIndex+1)]
        const newDecision = Object.assign({}, this.state.decision, { outcomes: new_outcomes_array})
        this.setState({
          decision: newDecision
        })
      })
  }



  deleteOpinion = (id, outcomeId, value) => {
    OpinionsAdapter.deleteOpinion(id)
      .then(newOpinions => {
        const outcomeIndex = this.state.decision.outcomes.findIndex((e) => e.id == outcomeId )
        const opinions = newOpinions.filter((o) => o.outcome_id === outcomeId)
        const old_outcome = Object.assign({}, this.state.decision.outcomes[outcomeIndex])
        const pro_or_con = value ? { pros: old_outcome.pros - 1 } : { cons: old_outcome.cons - 1 }
        const new_outcome = Object.assign({}, old_outcome, {opinions: opinions}, pro_or_con)
        const new_outcomes_array = [...this.state.decision.outcomes.slice(0, outcomeIndex),new_outcome, ...this.state.decision.outcomes.slice(outcomeIndex+1)]
        const newDecision = Object.assign({}, this.state.decision, { outcomes: new_outcomes_array})
        this.setState({decision:newDecision})
      })
  }

  highestRanking = () => {
    let outcomes = this.state.decision.outcomes
    let highestScore = Math.max.apply(Math, outcomes.map((o)=> o.score))
    return outcomes.filter((o) => o.score === highestScore)
  }


  render(){
    const opinions = this.state.decision.outcomes.map((outcome) => outcome.opinions).reduce((a, b) => a.concat(b), [])

    const highestRanking = this.highestRanking()

    return(

      <div>
        {this.state.decision ?
        <DisplayContainer
        decision={this.state.decision} decisions={this.props.decisions}
        editDecision={this.editDecision} deleteDecision={this.props.deleteDecision} outcomes={this.state.decision.outcomes} opinions={opinions}  createOutcome={this.createOutcome}
        editOutcome={this.editOutcome}
        getOutcomeId={this.getOutcomeId} deleteOutcome={this.deleteOutcome} createOpinion={this.createOpinion} deleteOpinion={this.deleteOpinion}
        highestRanking={highestRanking}
        /> : []}
      </div>
    )
  }
}
