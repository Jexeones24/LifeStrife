import React, { Component } from 'react'
import { Container, Header, Grid, Segment, Button, Form } from 'semantic-ui-react'


export default class Login extends Component {
  render(){
    return(
      <div>

        <Container className="signup-container" text>
          <Header as='h1'>LOGIN</Header>
          <Grid columns={1} divided>
            <Grid.Row stretched>
              <Grid.Column>
                <Segment>
                  <Segment>
                    <Form size='huge'>
                      <Form.Group widths='equal'>
                        <Form.Field control='input' placeholder='USERNAME' />
                        <Form.Field control='input' placeholder='EMAIL' />
                      </Form.Group>
                    </Form>
                  </Segment>
                  <Segment>
                    <Form size='huge'>
                      <Form.Group widths='equal'>
                        <Form.Field control='input' placeholder='PASSWORD' />
                      </Form.Group>
                    </Form>
                    <Form size='huge'>
                      <Form.Group widths='equal'>
                        <Form.Field control='input' placeholder='PASSWORD CONFIRMATION' />
                      </Form.Group>
                      <Button size='huge' color='teal'>LOGIN</Button>
                    </Form>
                  </Segment>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    )
  }
}
