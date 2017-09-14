import React, {Component} from 'react'
import { Segment, Statistic, Button } from 'semantic-ui-react'


export default class Stats extends Component {
  constructor(){
    super();

    this.state = {
      bestOutcome: {}
    }
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    if(nextProps.highestRanking !== this.props.highestRanking){
      this.setState({bestOutcome:nextProps.highestRanking[0]})
    }
  }

  render(){

    const ranking = this.state.bestOutcome ? this.state.bestOutcome : {}

    // console.log(this.state.bestOutcome.content)

    return (
      <div>
        <Segment as='h3' className="stats" raised>
          <Segment>
            <Statistic>
              <Statistic.Value text>
                Best
                <br /> Outcome
              </Statistic.Value>
              <Statistic.Label>Highest Ranking</Statistic.Label>
            </Statistic>

            <Segment as='h3' className="stats">
              {this.state.bestOutcome ? <Statistic size='mini' label={this.state.bestOutcome.content} /> : null}

                <div>
                  <Button inverted size="mini" color='red' onClick={this.props.handleSave}>SAVE</Button>
                </div>
            </Segment>
          </Segment>
        </Segment>
      </div>
    )
  }
}
