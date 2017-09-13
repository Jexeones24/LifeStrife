import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { Redirect } from 'react-router'
import './App.css';
import NavBar from './components/NavBar'
import Home from './containers/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import DecisionShow from './containers/DecisionShow'
import DecisionForm from './containers/DecisionForm'
import DecisionsAdapter from './adapters/DecisionsAdapter'


class App extends Component {
  constructor(){
    super();

    this.state = {
      currentUser: {username: "jexeones", id: 1},
      loggedIn: true,
      decision: {},
      decisions: [],
      outcomes: [],
      opinions: []
    }
    this.createDecision = this.createDecision.bind(this)
  }

  componentDidMount(){
    DecisionsAdapter.getDecisions(this.state.currentUser)
      .then(decisions => {
        this.setState({decisions})
      })
  }

  createDecision(content){
    let id = this.state.currentUser.id
    DecisionsAdapter.createDecision(content, id)
      .then(decision => this.setState({...this.state.decisions, decision}, () => this.props.history.push(`/decisions/${decision.id}`))
    )
  }

  editDecision = (content, id) => {
    DecisionsAdapter.editDecision(content, id)
    .then(newDecision => {
      let index = this.state.decisions.findIndex(decision => {
        return decision.id === id
      })
      this.setState({
      //   decisions: [
      //    ...this.state.decisions.slice(0,index), newDecision,
      //    ...this.state.decisions.slice(index+1)
      //  ]
      decision: newDecision
     });
    })
  }


  deleteDecision = (id) => {
    DecisionsAdapter.deleteDecision(id)
      .then(newDecisions => {
        this.setState({decisions: newDecisions}, () => this.props.history.push('/'))
      }
    )
  }

  newOutcome = (outcome) => {
    console.log(outcome)
    this.setState({outcomes: [...this.state.outcomes, outcome]})
  }

  incrementCounter = (outcomeId, value, decisionId) => {
    let decision = this.state.decisions.filter((d) => d.id === decisionId)
    let outcome = decision[0].outcomes.filter((o) => o.id === outcomeId)
    // find the outcome, update it's pros and cons??? how can i do that??? setState somehow

  }


  renderSignup = () => {
    return(
      <Signup />
    )
  }

  renderLogin = () => {
    return(
      <Login />
    )
  }

  renderHome = (params) => {
    return(
      <Home history={params.history} decisions={this.state.decisions}
      outcomes={this.state.outcomes} createDecision={this.createDecision}/>
    )
  }

  renderDecisionShow = (decision) => {
    return(
      <DecisionShow decisionId={decision.match.params.id} decision={this.state.decision}
        decisions={this.state.decisions} editDecision={this.editDecision} deleteDecision={this.deleteDecision}
        newOutcome={this.newOutcome} incrementCounter={this.incrementCounter}
      />
    )
  }

  renderDecisionForm = (params) => {
    return (
      <DecisionForm createDecision={this.createDecision}/>
    )
  }

  render() {
    return (
      <div className="App">
          <div >
            <NavBar renderDecisionForm={this.renderDecisionForm}/>
            <div id="content">
              <Route exact path="/" render={this.renderHome}/>
              <Route exact path="/new" render={this.renderDecisionForm}/>
              <Route exact path="/login" render={this.renderLogin}/>
              <Route exact path="/signup" render={this.renderSignup}/>
              <Route exact path="/decisions/:id" render={this.renderDecisionShow}/>
            </div>
          </div>
      </div>
    );
  }
}

export default withRouter(App);
