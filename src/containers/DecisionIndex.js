import React, { Component } from 'react'
import { Grid, Image, Card } from 'semantic-ui-react'

export default class DecisionIndex extends Component {

  render(){
    return(
      <div>
        {/* take me to DecisionForm */}
        <a href={'/'}>{this.props.label}</a>

        {this.props.decisions.map((decision, idx) =>

          <Grid divided='vertically'>
            <Grid.Row columns={2}>
              <Grid.Column>

                <Image src='https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?dpr=2&auto=format&fit=crop&w=1199&h=1799&q=80&cs=tinysrgb&crop=' />

              </Grid.Column>

              <Grid.Column>
                <Card.Group>
                  <Card key={idx}>
                    <Card.Content>
                      <a href={'/decisions/' + decision.id}><Card.Header>Decision TITLE</Card.Header></a>
                      <Card.Description>{decision.content}</Card.Description>
                    </Card.Content>
                  </Card>

                  {/* each outcome has own opinions */}
                  {/* maybe outcome cards?? they contain opinion cards */}
                  <Card >
                    <Card.Content>
                      <Card.Header>Outcomes</Card.Header>
                      <Card.Description>content</Card.Description>
                    </Card.Content>
                  </Card>

                  {/* each opinion belongs to an outcome */}
                  <Card>
                    <Card.Content>
                      <Card.Header>Opinions</Card.Header>
                      <Card.Description>content</Card.Description>
                    </Card.Content>
                  </Card>

                </Card.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>


        )}
      </div>
    )
  }
}
