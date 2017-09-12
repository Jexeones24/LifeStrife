import React, {Component} from 'react'
import { Segment, Form, TextArea, Statistic } from 'semantic-ui-react'
import InlineEdit from 'react-edit-inline';


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
    e.preventDefault();
    let content = this.state.content
    let outcomeId = this.props.outcomeId
    this.props.editOutcome(content, outcomeId)
    this.setState({content:''})
  }

  dataChanged = (data) => {
    let content = data.message
    this.setState({content:content})
    this.props.editOutcome(content, this.props.outcomeId)
  }

  customValidateText = (text) => {
    return (text.length > 0 && text.length < 64);
  }


  render (){
    return (
      <div>
        {this.props.outcomes.map((outcome, idx) =>

          <div>
            <Segment as="h3" className="content-tile" key={idx} id={outcome.id}>
              <InlineEdit
               validate={this.customValidateText}
               activeClassName="editing"
               text={outcome.content.toUpperCase()}
               paramName="message"
               change={this.dataChanged.bind(this)}
               style={{
                 backgroundColor: 'white',
                 minWidth: 200,
                 display: 'inline-block',
                 margin: 0,
                 padding: 0,
                 fontSize: 15,
                 outline: 0,
                 border: 10
               }}/>
               <Segment>
                 <Statistic color='green' size='mini' value='4' label='pro'/>
                 <Statistic color='red' size='mini' value='3' label='con' />
               </Segment>
               <Segment>
                 <button onClick={this.props.handleDelete.bind(this, outcome.id)}>-</button>
                 <button onClick={this.props.handleAddOpinion.bind(this, outcome.id)}>add opinion</button>
                 <button onClick={this.props.viewOpinions.bind(this, outcome.id)}>view opinions</button>
               </Segment>
             </Segment>
           </div>)}

      </div>
    )
  }
}
