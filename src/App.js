import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar'
import Home from './containers/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import DecisionShow from './containers/DecisionShow'
import DecisionForm from './containers/DecisionForm'
import DecisionsAdapter from './adapters/DecisionsAdapter'
import OutcomesAdapter from './adapters/OutcomesAdapter'
import OpinionsAdapter from './adapters/OpinionsAdapter'


class App extends Component {
  constructor(){
    super();

    this.state = {
      currentUser: {username: "smorelli", id: 3},
      loggedIn: true,
      decision: {},
      decisions: [],
      outcomes: [],
      opinions: []
    }
  }

  componentDidMount(){
    DecisionsAdapter.getDecisions(this.state.currentUser)
      .then(decisions => {
        this.setState({decisions}, () => {console.log(this.state.decisions)})
      })
  }

  createDecision = (content) => {
    let id = this.state.currentUser.id
    DecisionsAdapter.createDecision(content, id)
      .then(decision => this.setState({...this.state.decisions, decision})
    )
  }

  editDecision = (content, id) => {
    debugger
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
        this.setState({decisions: newDecisions}, () => {console.log(this.state.decisions)})
      }
    )
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
    console.log(decision)
    return(
      <DecisionShow decisionId={decision.match.params.id}
        decisions={this.state.decisions} editDecision={this.editDecision} deleteDecision={this.deleteDecision}/>
    )
  }

  renderDecisionForm = (params) => {
    return (
      <DecisionForm />
    )
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div >
            <NavBar renderDecisionForm={this.renderDecisionForm}/>
              <div id="content">
                <Route exact path="/" render={this.renderHome}/>
                <Route exact path="/new" render={this.renderDecisionForm}/>
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
