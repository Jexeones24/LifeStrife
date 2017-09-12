import React, { Component } from 'react'
import { Statistic, Segment, Grid, Button } from 'semantic-ui-react'

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
    console.log(this.props.decisions) // why doesn't this have created_at??
    return(

      <div>
        {this.props.decisions ?
        this.props.decisions.map((decision, idx) =>
        <Segment key={idx}>
          <Grid columns={2} divided>
            <Grid.Row stretched>
              <Grid.Column>
                <Segment as="a" href={'/decisions/' + decision.id}> <h3>{decision.content.toUpperCase()}</h3>
                </Segment>
                {/* Created on: <h2>{decision.created_at}</h2> */}

              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <header>OUTCOMES</header>
                  <Statistic color='grey' size='mini' label='Total' value={decision.outcomes.length} />
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
