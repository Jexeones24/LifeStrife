import React, { Component } from 'react'
import { Segment, Statistic } from 'semantic-ui-react'


const Stats = () => {
  return (
    <div>
      <Segment as='h3' className="stats">
        <Segment as='h3' className="stats">
          <Statistic>
            <Statistic.Value text>
              Outcome
              <br />Rankings
            </Statistic.Value>
            <Statistic.Label>Stats</Statistic.Label>
          </Statistic>

          <Segment as='h3' className="stats">
            <Statistic color='green' size='mini' value='4' label='pro' />
            <Statistic color='red' size='mini' value='3' label='con' />
            <br />
            I am an outcome
          </Segment>

        </Segment>
      </Segment>
    </div>
  )
}


export default Stats
