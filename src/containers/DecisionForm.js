import React, { Component } from 'react'
import { Button, Comment, Form, Header, Grid, Segment } from 'semantic-ui-react'

export default class DecisionForm extends Component {
  constructor(){
    super();

    this.state = {
      content: ''
    }
  }

  handleChange = (e) => {
    this.setState({content:e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createDecision(this.state.content)
    this.setState({content: ''})
  }

  render(){
      return (
        <div className="decision-form">
          <Grid columns='equal'>
            <Grid.Row stretched>
              <Grid.Column>
              </Grid.Column>
              <Grid.Column width={6}>
                <Segment>
                  <Comment.Group>
                    <Header as='h1' dividing>MAKE A DECISION</Header>
                    <Comment>
                      <Comment.Content>
                        <Comment.Author as='a'><h3>{this.props.currentUser}</h3></Comment.Author>
                        <Comment.Text>

                         <h3>Give a brief description of what's weighing on your mind...</h3>

                        </Comment.Text>
                        <Comment.Actions>
                          <Comment.Action></Comment.Action>
                        </Comment.Actions>
                      </Comment.Content>
                    </Comment>

                  <Form onSubmit={this.handleSubmit} reply>
                    <Form.TextArea type="text" placeholder="Decision" name="content" value={this.state.content} onChange={this.handleChange} required/>
                    <Button content='Submit Decision' labelPosition='left' icon='edit' primary />
                  </Form>
                </Comment.Group>
              </Segment>
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
            </Grid.Column>
            <Grid.Column width={6}>
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
