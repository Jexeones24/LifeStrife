import React, { Component } from 'react'
import { Card, Statistic, Segment, Grid } from 'semantic-ui-react'

export default class DecisionIndex extends Component {

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
  }

  render(){
    // console.log(this.props.decisions)
    // let times = this.props.decisions.map((d) => d.created_at)
    // console.log(times)
    // let dates = times.map((t) => new Date(t))
    // console.log(dates)
    // "2017-09-09T01:41:52.225Z"
    // new Date("2017-09-09T01:41:52.225Z")
    // => Fri Sep 08 2017 21:41:52 GMT-0400 (EDT)
    return(
      <div>
        {this.props.decisions ?
        this.props.decisions.map((decision, idx) =>
        <Segment key={idx}>
          <Grid columns={2} divided>
            <Grid.Row stretched>
              <Grid.Column>

                <Segment as="a" href={'/decisions/' + decision.id}>{decision.content.toUpperCase()}
                  </Segment>
                  <br />
                  Created on: {decision.created_at}


              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <header>OUTCOMES</header>
                  <Statistic color='grey' size='mini' label='Total' value='6' />
                </Segment>
                <Segment>
                  <header>OPINIONS</header>
                  <Statistic color='green' size='mini' label='Pros' value='2' />
                  <Statistic color='red' size='mini' label='Cons' value='4' />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>) :
        <h1>No Decisions Submitted</h1>}
      </div>
    )
  }
}
