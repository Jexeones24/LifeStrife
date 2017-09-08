import React, { Component } from 'react'
import DecisionIndex from './DecisionIndex'
import DecisionForm from './DecisionForm'
import { Container } from 'semantic-ui-react'



export default class Home extends Component {
  render(){
    return(
      <div className="home-container">
        <Container text>

          {this.props.decisions ?
            <DecisionIndex decisions={this.props.decisions} label={'Add'}/> :
            <DecisionForm createDecision={this.props.createDecision} label={'All'} history={this.props.history}/>
          }

        </Container>
      </div>
    )
  }
}
