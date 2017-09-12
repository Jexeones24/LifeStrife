import React, {Component} from 'react'
import { Form, TextArea, Button } from 'semantic-ui-react'


export default class OpinionForm extends Component {
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
    let content = this.state.content
    let outcomeId = this.props.outcomeId
    let value = this.props.value
    this.props.createOpinion(content, outcomeId, value)
    this.setState({content:''})
  }

  render(){
    return (

      <Form onSubmit={this.handleSubmit}>
        <TextArea autoHeight placeholder={this.props.placeholder} rows={2}
        onChange={this.handleChange} value={this.state.content} required/>
        <Button basic size="mini" color='black'>+</Button>
      </Form>
    )
  }
}
