import React, {Component} from 'react'
import { Segment, Statistic, Button } from 'semantic-ui-react'


export default class Stats extends Component {

  render(){
    const ranking = this.props.highestRanking[0] ? this.props.highestRanking[0] : {}
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
                <Statistic size='mini' label={ranking.content} />
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
