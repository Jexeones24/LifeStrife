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
    console.log(this.props, this.props.outcomeId) // outcomeId is null
    debugger
    e.preventDefault();
    let content = this.state.content
    let outcomeId = this.props.outcomeId
    this.props.editOutcome(content, outcomeId)
    this.setState({content:''})
  }

  render (){

    let chosenOutcome = this.props.outcomes.filter((o) => o.id === this.props.outcomeId)

    return (
      <div>
        <Segment>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <TextArea autoHeight rows={2} placeholder={chosenOutcome.content} value={this.state.content} onChange={this.handleChange}
              required/><button type="submit">+</button>
          </Form>
        </Segment>

        {this.props.outcomes.map((outcome, idx) =>

            <Segment as='h3' className="content-tile" key={idx} id={outcome.id}>
              {outcome.id}: {outcome.content}
              <br />
              <br />
              <button onClick={this.props.handleDelete.bind(this, outcome.id)}>-</button>
              <button onClick={this.props.promptUser.bind(this, outcome.id)}>add opinion</button>
              <button onClick={this.props.viewOpinions.bind(this, outcome.id)}>view opinions</button>
            </Segment>)}

      </div>
    )
  }
}
