import React, {Component} from 'react'
import { Form, TextArea } from 'semantic-ui-react'


export default class OpinionForm extends Component {
  constructor(){
    super();

    this.state = {
      content: ''
    }
  }

  render(){
    return (

      <Form onSubmit={this.handleSubmit}>
        <TextArea autoHeight placeholder='Add Opinion...' rows={2}
        onChange={this.handleChange} value={this.state.content} required/>
        <button>+</button>
      </Form>
    )
  }
}
