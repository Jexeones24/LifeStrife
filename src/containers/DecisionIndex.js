import React, { Component } from 'react'
import { Statistic, Segment, Grid, Button } from 'semantic-ui-react'

export default class DecisionIndex extends Component {

  render(){
    console.log(this.props.decisions)

    // let times = this.props.decisions.map((d) => d.created_at)
    // let dates = times.map((t) => new Date(t))
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
                <Segment as="a" href={'/decisions/' + decision.id}> <h3>{decision.content.toUpperCase()}</h3>
                </Segment>
                {/* Created on: <h2>{decision.created_at}</h2> */}

              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <h2><header>OUTCOMES</header></h2>
                  <Statistic color='grey' size='mini' label='Total' value={decision.outcomes.length} />
                </Segment>

                <Segment>

                  <h2><header>OPINIONS</header></h2>

                  <div>
                    <Statistic color='green' size='mini' label='Pros' value={decision.pros}/>
                    <Statistic color='red' size='mini' label='Cons' value={decision.cons} />
                  </div>
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
