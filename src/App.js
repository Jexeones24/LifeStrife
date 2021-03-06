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

  deleteDecision = (id) => {
    DecisionsAdapter.deleteDecision(id)
      .then(newDecisions => {
        this.setState({decisions: newDecisions}, () => this.props.history.push('/'))
      }
    )
  }

  newOutcome = (outcome) => {
    this.setState({outcomes: [...this.state.outcomes, outcome]})
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
      <DecisionShow decisionId={decision.match.params.id}     decision={this.state.decision}
      decisions={this.state.decisions} deleteDecision={this.deleteDecision}
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
