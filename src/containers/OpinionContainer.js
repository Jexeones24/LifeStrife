import React, {Component} from 'react'
import { Grid, Header, Icon, Form, TextArea, Segment } from 'semantic-ui-react'
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
    let content = this.state.content
    let outcomeId = this.props.outcomeId
    let value = this.state.value
    this.props.createOpinion(content, outcomeId, value)
    this.setState({content:''})
  }

  handleEdit = () => {
    console.log('handling edit')
  }

  handleDelete = () => {
    console.log('handling delete')
  }

  render(){
    return(
      <div className="opinion-container">

        <Form onSubmit={this.handleSubmit}>
          <TextArea autoHeight placeholder='Add Opinion...' rows={2}
          onChange={this.handleChange} value={this.state.content} required/>
          <button>+</button>
        </Form>

        {this.props.opinions ?

        this.props.opinions.map((o, idx) => <p key={idx}>content: {o.content} value: {o.value} outcome: {o.outcome_id}</p>) : <p>no</p>}


        {/* // this.props.opinions.map((opinion, idx) =>
        //   <div key={idx}>
        //     <Segment as='h3' className="content-tile" key={idx} id={opinion.id}>
        //       {opinion.content}
        //       <button onClick={this.handleEdit}>e</button>
        //       <button onClick={this.handleDelete}>-</button>
        //     </Segment>
          </div>)} */}

      </div>
    )
  }
}
