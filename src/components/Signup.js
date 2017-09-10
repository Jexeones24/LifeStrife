import React, { Component } from 'react'
import { Container, Header, Grid, Segment, Button, Form } from 'semantic-ui-react'


export default class Signup extends Component {
  render(){
    return(
      <div>
        <Container className="signup-container" text>
          <Header as='h1'>SIGNUP</Header>
          <Grid columns={1} divided>
            <Grid.Row stretched>
              <Grid.Column>
                <Segment>
                  <Segment>
                    <Segment>
                      <Form size='huge'>
                        <Form.Group widths='equal'>
                          <Form.Field control='input' placeholder='FIRST NAME' />
                          <Form.Field control='input' placeholder='LAST NAME' />
                        </Form.Group>
                      </Form>
                    </Segment>
                    <Form size='huge'>
                      <Form.Group widths='equal'>
                        <Form.Field control='input' placeholder='USERNAME' />
                      </Form.Group>
                    </Form>
                    <Form size='huge'>
                      <Form.Group widths='equal'>
                        <Form.Field control='input' placeholder='EMAIL' />
                      </Form.Group>
                    </Form>
                    <Form size='huge'>
                      <Form.Group widths='equal'>
                        <Form.Field control='input' placeholder='PASSWORD' />
                      </Form.Group>
                    </Form>
                    <Form size='huge'>
                      <Form.Group widths='equal'>
                        <Form.Field control='input' placeholder='PASSWORD CONFIRMATION' />
                      </Form.Group>
                      <Button color='teal'>SIGNUP</Button>
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
