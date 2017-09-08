import React, {Component} from 'react'
import { Grid, Header, Icon, Form, TextArea } from 'semantic-ui-react'
import ContentTile from '../components/ContentTile'


export default class OpinionContainer extends Component {
  constructor(){
    super();

    this.state = {
      content: ''
    }
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps)
  }

  handleChange = (e) => {
    this.setState({content:e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createOpinion(this.state.content, this.props.outcomeId)
    this.setState({content:''})
  }

  render(){
    return(
      <Form onSubmit={this.handleSubmit}>
        <TextArea autoHeight placeholder='Add Opinion...' rows={2}
        onChange={this.handleChange} value={this.state.content} required/>
        <button>+</button>
      </Form>
    )
  }
}
