import React, { Component } from 'react'
import { Statistic, Segment, Grid, Button, Label } from 'semantic-ui-react'

export default class DecisionIndex extends Component {

  render(){
    return(
      <div>
        {this.props.decisions ?
        this.props.decisions.map((decision, idx) =>
        <Segment key={idx}>
          <Grid columns={2} divided><Label as='a' color='green' ribbon>Overview</Label>
            <Grid.Row stretched>
              <Grid.Column>
                <Segment raised>
                  <br />
                  <a href={'/decisions/' + decision.id}>
                    <h2>{decision.content.toUpperCase()}</h2>
                  </a>
                </Segment>

                <h4>Created on {decision.date_time}</h4>

              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <h3><header>OUTCOMES</header></h3>
                  <Statistic color='grey' size='mini' label='Total' value={decision.outcomes.length} />
                </Segment>

                <Segment>

                  <h3><header>OPINIONS</header></h3>

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
