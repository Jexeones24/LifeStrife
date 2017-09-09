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

  // handleChange = (e) => {
  //   this.setState({content:e.target.value})
  // }
  //
  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   let content = this.state.content
  //   let outcomeId = this.props.outcomeId
  //   let value = this.state.value
  //
  //   this.props.createOpinion(content, outcomeId, value)
  //   this.setState({content:''})
  //   this.props.hideOpinionForm()
  // }
  //
  // handleEdit = () => {
  //   console.log('handling edit')
  // }
  //
  // handleDelete = () => {
  //   console.log('handling delete')
  // }

  render(){
    console.log("opinion container, outcomeId", this.props.outcomeId, "opinions", this.props.opinions)
    return(
      <div className="opinion-container">

        {/* how do i display all opinions that belong to an outcome as a group??? */}

        {this.props.opinions ?
        this.props.opinions.map((o, idx) => <p key={idx}>content: {o.content} value: {o.value.toString()} outcome: {o.outcome_id}</p>) : null}

      </div>
    )
  }
}
