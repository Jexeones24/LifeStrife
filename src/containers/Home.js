import React, { Component } from 'react'
import DecisionIndex from './DecisionIndex'
import DecisionForm from './DecisionForm'
import { Container } from 'semantic-ui-react'

export default class Home extends Component {
  constructor(){
    super();

    this.state = {
      formVisible:false
    }
  }

  renderDecisionForm = () => {
    console.log("here and this is janky")
    this.setState({formVisible:true})
  }

  render(){
    return(
      <div className="home-container">
        <Container text>

          {/* {this.state.formVisible ?


            <DecisionForm createDecision={this.props.createDecision} history={this.props.history}/> : */}


            <DecisionIndex decisions={this.props.decisions} renderDecisionForm={this.renderDecisionForm}/>
          {/* } */}

        </Container>
      </div>
    )
  }
}
