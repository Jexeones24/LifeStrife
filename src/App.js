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
      currentUser: {username: "smorelli", id: 3},
      loggedIn: true,
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
      .then(decision => this.setState({decision})
    )
  }

  editDecision = (content, id) => {
    debugger
    DecisionsAdapter.editDecision(content, id)
    .then(newDecision => {
      let index = this.state.decisions.findIndex(decision => decision.id === id )
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

  createOutcome = (content, decisionId) => {
    OutcomesAdapter.createOutcome(content, decisionId)
      .then(outcome => {
        this.setState({outcomes: [...this.state.outcomes, outcome]})
      }
    )
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


  createOpinion = (content, value, outcomeId) => {
    console.log("creating opinion in decision show", content, value, outcomeId)
    OpinionsAdapter.createOpinion(content, value, outcomeId)
      .then(opinion => {
        console.log("Created Opinion", opinion)
        console.log("State in create opinon", this.state)
        this.setState({opinions:[...this.state.opinions, opinion]}, () => {console.log(this.state.opinions)})
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
      <DecisionShow decisionId={decision.match.params.id}
        decisions={this.state.decisions} decision={this.state.decision} editDecision={this.editDecision} deleteDecision={this.deleteDecision}
        createOutcome={this.createOutcome}
        deleteOutcome={this.deleteOutcome}
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
