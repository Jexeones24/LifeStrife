import React, {Component} from 'react'
import { Segment, Form, TextArea } from 'semantic-ui-react'


export default class OutcomeEditForm extends Component {
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
    debugger
    e.preventDefault();
    let content = this.state.content
    let outcomeId = this.props.outcomeId
    this.props.editOutcome(content, outcomeId)
    this.setState({content:''})
  }

  render (){
    return (
      <div>
        <Segment>
          <Form onSubmit={this.handleSubmit}>
            <TextArea autoHeight rows={2} value={this.state.content} onChange={this.handleChange}
              required/><button type="submit">+</button>
          </Form>
        </Segment>
        <p>Render other outcomes</p>
      </div>
    )
  }
}
