import React, { Component } from 'react'
import { Button, Comment, Form, Header, Container } from 'semantic-ui-react'


export default class DecisionForm extends Component {



  render(){
      return (
        <div className="decision-form">
          <Comment.Group>
            <Header as='h1' dividing>MAKE A DECISION</Header>
            <Comment>
              <Comment.Avatar src='https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?dpr=2&auto=format&fit=crop&w=1199&h=1493&q=80&cs=tinysrgb&crop=' />
              <Comment.Content>
                <Comment.Author as='a'><h3>{this.props.currentUser}</h3></Comment.Author>
                <Comment.Metadata>
                  <div>5 days ago</div>
                </Comment.Metadata>
                <Comment.Text as='h2'>

                 <h3>Give a brief description of what's weighing on your mind...</h3>

                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action></Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>

          <Form reply>
            <Form.TextArea type="text" placeholder="Decision" name="content" required/>
            <Button content='Submit Decision' labelPosition='left' icon='edit' primary />
          </Form>
        </Comment.Group>
      </div>
    )
  }
}
