import React, { Component } from 'react'
import { Grid, Header, Icon, Segment } from 'semantic-ui-react'
import ContentTile from '../components/ContentTile'
import OutcomeContainer from './OutcomeContainer'


export default class DisplayContainer extends Component {
  constructor(){
    super();


  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps)
  }


  render(){
    return(
      <div className="decision-display-container">

        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column>
              <Header as='h2'>
                <Icon/>
                <Header.Content>
                  CURRENT DECISION
                </Header.Content>
              </Header>
              <ContentTile content={this.props.decision.content.toUpperCase()}/>
            </Grid.Column>

            <OutcomeContainer outcomes={this.props.outcomes} decisionId={this.props.decision.id} createOutcome={this.props.createOutcome}/>

            <Grid.Column>
              <Header as='h2'>
                <Icon name='plus'/>
                <Header.Content>
                  Pros & Cons
                </Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
