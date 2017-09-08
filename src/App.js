import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header'
import Home from './containers/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import DecisionShow from './containers/DecisionShow'
import DecisionIndex from './containers/DecisionIndex'
import DecisionsAdapter from './adapters/DecisionsAdapter'
import OutcomesAdapter from './adapters/OutcomesAdapter'



class App extends Component {
  constructor(){
    super();

    this.state = {
      currentUser: {id: 1, username: "jexeones"},
      loggedIn: true,
      decisions: [],
      outcomes: [],
      opinions: []
    }

  }

  componentDidMount(){
    DecisionsAdapter.getDecisions(this.state.currentUser)
      .then(decisions => {
        console.log(decisions)
        this.setState({decisions})
    })
  }

  createDecision = (content) => {
    DecisionsAdapter.createDecision(content)
      .then(decision => this.setState({decision}, () => {console.log(this.state.decision)})
    )
  }

  createOutcome = (content, decisionId) => {
    OutcomesAdapter.createOutcome(content, decisionId)
      .then(outcome => this.setState({outcomes:[...this.state.outcomes, outcome]}, () => {console.log(this.state.outcomes)})
    )
  }

  renderSignup = () => {
    return(
      null
    )
  }

  renderLogin = () => {
    return(
      null
    )
  }


  renderHome = (params) => {
    return(
      <Home history={params.history} decisions={this.state.decisions} createDecision={this.createDecision}/>
    )
  }

  renderDecisionShow = (decision) => {
    return(
      <DecisionShow decisionId={decision.match.params.id} createOutcome={this.createOutcome} outcomes={this.state.outcomes}/>
    )
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Header/>
              <div id="content">
                <Route exact path="/" render={this.renderHome}/>
                <Route exact path="/login" render={this.renderLogin}/>
                <Route exact path="/signup" render={this.renderSignup}/>
                <Route exact path="/decisions/:id" render={this.renderDecisionShow}/>
              </div>
            {/* <Footer /> */}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
