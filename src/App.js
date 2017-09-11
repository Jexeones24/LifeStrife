import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar'
import Home from './containers/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import DecisionShow from './containers/DecisionShow'
import DecisionsAdapter from './adapters/DecisionsAdapter'
import OutcomesAdapter from './adapters/OutcomesAdapter'
import OpinionsAdapter from './adapters/OpinionsAdapter'


class App extends Component {
  constructor(){
    super();

    this.state = {
      currentUser: {username: "jexeones", id: 1},
      loggedIn: true,
      decisions: [],
      outcomes: [],
      opinions: []
    }
  }

  componentDidMount(){
    DecisionsAdapter.getDecisions(this.state.currentUser)
      .then(decisions => {
        this.setState({decisions})
      })
  }

  createDecision = (content) => {
    DecisionsAdapter.createDecision(content)
      .then(decision => this.setState({decision})
    )
  }

  editDecision = (content, id) => {
    DecisionsAdapter.editDecision(content, id)
    .then(newDecision => {
      let index = this.state.decisions.findIndex(decision => decision.id === id )
      console.log(index)
      this.setState({
        decisions: [
         ...this.state.decisions.slice(0,index), newDecision,
         ...this.state.decisions.slice(index+1)
       ]
     }, () => {console.log(this.state.decisions)});
    })
  }


  deleteDecision = (id) => {
    DecisionsAdapter.deleteDecision(id)
      .then(newDecisions => {
        this.setState({decisions: newDecisions}, () => {console.log(this.state.decisions)})
      }
    )
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
      <Home history={params.history} decisions={this.state.decisions} createDecision={this.createDecision}/>
    )
  }

  renderDecisionShow = (decision) => {
    return(
      <DecisionShow decisionId={decision.match.params.id} decision={this.state.decision} editDecision={this.editDecision} deleteDecision={this.deleteDecision}
      editOutcome={this.editOutcome}/>
    )
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div >
            <NavBar/>
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
