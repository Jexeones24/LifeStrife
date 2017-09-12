import React, { Component } from 'react'
import DecisionIndex from './DecisionIndex'
import { Container } from 'semantic-ui-react'

export default class Home extends Component {
  constructor(){
    super();

    this.state = {
      formVisible:false
    }
  }

  renderDecisionForm = () => {
    this.setState({formVisible:true})
  }

  render(){
    return(
      <div className="home-container">
        <Container text>
          <DecisionIndex decisions={this.props.decisions} outcomes={this.props.outcomes} renderDecisionForm={this.renderDecisionForm}/>
        </Container>
      </div>
    )
  }
}
