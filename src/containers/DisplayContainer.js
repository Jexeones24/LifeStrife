import React, { Component } from 'react'
import { Grid, Header, Icon, Segment, Form, TextArea } from 'semantic-ui-react'
import ContentTile from '../components/ContentTile'
import OutcomeContainer from './OutcomeContainer'
import OpinionContainer from './OpinionContainer'


export default class DisplayContainer extends Component {
  constructor(){
    super();

    this.state = {
      content: '',
      isEditing: false,
      opinionFormVisible: false
    }
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps)
  }

  handleChange = (e) => {
    this.setState({content:e.target.value})
  }

  handleSubmit = () => {
    console.log("submitting edit")
    this.props.editDecision(this.state.content, this.props.decision.id)
    this.setState({isEditing:false})
  }

  showEditForm = () => {
    this.setState({isEditing:true})
  }

  handleDelete = (e) => {
    e.preventDefault();
    this.props.deleteDecision(this.props.decision.id)
    this.setState({content:''})
    // have to redirect and destroy all outcomes/opinions associated
  }

  showOpinionForm = () => {
    this.setState({opinionFormVisible:!this.state.opinionFormVisible})
  }

  render(){
    return(
      <div className="decision-display-container">

        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column>
              <Header as='h2'>
                <Icon/>
                <Header.Content>
                  CURRENT DECISION
                </Header.Content>
              </Header>

              {/* decision display/show decision edit form */}
              <Segment className="decision-show-title" onClick={this.showEditForm}>

                  {this.state.isEditing ?
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                      <TextArea autoHeight placeholder={this.props.decision.content.toUpperCase()} rows={2}
                        onChange={this.handleChange} value={this.state.content}
                        required/><button type="submit">+</button>
                    </Form> :
                    <Segment as='h3' className="content-tile" id={this.props.decision.id}>
                      {this.props.decision.content.toUpperCase()}
                    </Segment>}
                    <button onClick={this.handleDelete.bind(this)}>-</button>
                    
                </Segment>
            </Grid.Column>


            <OutcomeContainer outcomes={this.props.outcomes} decisionId={this.props.decision.id} createOutcome={this.props.createOutcome}/>


            <Grid.Column>
              <Header as='h2'>
                <Icon name='plus'/>
                <Header.Content>
                  Pros & Cons
                </Header.Content>
              </Header>

              {this.state.opinionFormVisible ?
                <OpinionContainer /> :
                null}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
