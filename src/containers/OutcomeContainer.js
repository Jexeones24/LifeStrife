import React, {Component} from 'react'
import { Grid, Header, Icon, Segment, Form, TextArea } from 'semantic-ui-react'


export default class OutcomeContainer extends Component {
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
    this.props.createOutcome(this.state.content, this.props.decisionId)
    this.setState({content:''})
  }

  handleDelete = () => {
    debugger
    console.log("delete me")
  }

  render(){
    return(

        <Grid.Column>
          <Header as='h2'>
            <Icon name='balance' />
            <Header.Content>
              POSSIBLE OUTCOMES
            </Header.Content>
          </Header>

          <Form onSubmit={this.handleSubmit}>
            <TextArea autoHeight placeholder='Add Outcome...' rows={2}
            onChange={this.handleChange} value={this.state.content} required/>
            <button>+</button>
          </Form>


            {this.props.outcomes &&
              this.props.outcomes.map((outcome, idx) =>
                <div>
                  <Segment as='h3' className="content-tile" key={outcome.id}>
                    {outcome.content}
                    <button onClick={this.handleEdit}>e</button>
                    <button onClick={this.handleDelete}>-</button>
                  </Segment>
                </div>)}

        </Grid.Column>



    )
  }
}
