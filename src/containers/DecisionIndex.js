import React, { Component } from 'react'
import Button from '../components/Button'
import { Grid, Image } from 'semantic-ui-react'


export default class DecisionIndex extends Component {

  render(){
    return(
      <div>
        <h1>INDEX</h1>
        {this.props.decisions.map((decision, idx) =>

          <Grid divided='vertically'>
            <Grid.Row columns={2}>
              <Grid.Column>

                <Image src='https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?dpr=2&auto=format&fit=crop&w=1199&h=1799&q=80&cs=tinysrgb&crop=' />

              </Grid.Column>

              <Grid.Column>
                <h3 key={idx}>{decision.content}</h3>
              </Grid.Column>
            </Grid.Row>
          </Grid>

        )}
      </div>
    )
  }
}
