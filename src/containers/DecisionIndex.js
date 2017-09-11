import React, { Component } from 'react'
import { Grid, Image, Card, Statistic, Segment } from 'semantic-ui-react'

export default class DecisionIndex extends Component {

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
  }

  render(){
    console.log(this.props.decisions)
    let times = this.props.decisions.map((d) => d.created_at)
    console.log(times)
    let dates = times.map((t) => new Date(t))
    console.log(dates)
    // "2017-09-09T01:41:52.225Z"
    // new Date("2017-09-09T01:41:52.225Z")
    // => Fri Sep 08 2017 21:41:52 GMT-0400 (EDT)
    return(
      <div>
        <button onClick={this.props.renderDecisionForm}></button>

        {this.props.decisions ?
          this.props.decisions.map((decision, idx) =>
            <Segment float="right">
                <Card.Group>
                  <Card key={idx}>
                    <Card.Content>
                      <a href={'/decisions/' + decision.id}><Card.Header>DECISION TITLE</Card.Header></a>
                      <Card.Description>Created on: {decision.created_at}</Card.Description>
                      <Card.Description>{decision.content}</Card.Description>
                    </Card.Content>
                  </Card>

                  <Card >
                    <Card.Content>
                      <Segment float="right">
                        <h3>OUTCOMES</h3>
                        <Statistic color='grey' size='mini' label='Total' value='6' />
                      </Segment>
                    </Card.Content>
                  </Card>

                  <Card >
                    <Card.Content>
                      <Segment float="right">
                        <h3>OPINIONS</h3>
                        <Statistic color='green' size='mini' label='Pros' value='2' />
                        <Statistic color='red' size='mini' label='Cons' value='4' />
                      </Segment>
                    </Card.Content>
                  </Card>
                </Card.Group>
              </Segment>) :
            <h1>No Decisions Submitted</h1>
          }
      </div>
    )
  }
}
