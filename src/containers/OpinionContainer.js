import React, {Component} from 'react'
import { Grid, Header, Icon, Form, TextArea, Segment } from 'semantic-ui-react'


export default class OpinionContainer extends Component {
  constructor(){
    super();

    this.state = {
      content: '',
      formVisible: false
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
    this.props.hideOpinionForm()
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

        {this.state.formVisible &&

        <Form onSubmit={this.handleSubmit}>
          <TextArea autoHeight placeholder='Add Opinion...' rows={2}
          onChange={this.handleChange} value={this.state.content} required/>
          <button>+</button>
        </Form>

        }


        {/* how do i display all opinions that belong to an outcome as a group??? */}
        {this.props.opinions ?
        this.props.opinions.map((o, idx) => <p key={idx}>content: {o.content} value: {o.value} outcome: {o.outcome_id}</p>) : null}


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
