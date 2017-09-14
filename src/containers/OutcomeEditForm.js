import React, {Component} from 'react'
import { Segment, Statistic, Button } from 'semantic-ui-react'
import InlineEdit from 'react-edit-inline';


export default class OutcomeEditForm extends Component {
  constructor(){
    super();

    this.state = {
      content: ''
    }
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

          <div key={idx} className="content-tile">
            <Segment as="h3" id={outcome.id}>
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
                 <Button basic size="mini" color='black' onClick={this.props.handleDelete.bind(this, outcome.id)}>Delete</Button>
                 <Button basic size="mini" color='black' onClick={this.props.handleAddOpinion.bind(this, outcome.id)}>+ opinion</Button>
                 <Button basic size="mini" color='black' onClick={this.props.viewOpinions.bind(this, outcome.id)}>view opinions</Button>
               </Segment>
             </Segment>
           </div>)}

      </div>
    )
  }
}
