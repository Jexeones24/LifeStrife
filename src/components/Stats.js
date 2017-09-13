import React from 'react'
import { Segment, Statistic, Button } from 'semantic-ui-react'


const Stats = () => {
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
              <Statistic size='mini' label='I am the best outcome' />
              <div>
                <Button basic size="mini" color='black'>CHOOSE OTHER</Button>
                <Button inverted size="mini" color='red'>SAVE</Button>
              </div>
          </Segment>
        </Segment>
      </Segment>
    </div>
  )
}


export default Stats
