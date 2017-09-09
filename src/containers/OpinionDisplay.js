import React, {Component} from 'react'

export default class OpinionDisplay extends Component {
  render(){
    return (
      <div className="opinion-display">
        <Segment>

              {/* <Form onSubmit={this.handleSubmit.bind(this)}>
                <TextArea autoHeight placeholder={this.props.decision.content.toUpperCase()} rows={2}
                  onChange={this.handleChange} value={this.state.content}
                  required/><button type="submit">+</button>
              </Form>  */}

              <Segment as='h3' className="content-tile">
                HELLO
              </Segment>
              <button>-</button>

          </Segment>

      </div>
    )
  }
}
