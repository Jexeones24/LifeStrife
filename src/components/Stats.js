import React, { Component } from 'react'
import { Segment, Statistic } from 'semantic-ui-react'


const Stats = () => {
  return (
    <div>
      <Segment as='h3' className="stats">
        <Segment as='h3' className="stats">
          <Statistic>
            <Statistic.Value text>
              Best
              <br /> Outcome
            </Statistic.Value>
            <Statistic.Label>Highest Ranking</Statistic.Label>
          </Statistic>

          <Segment as='h3' className="stats">
            <Statistic color='green' size='mini' value='4' label='pro' />
            <Statistic color='red' size='mini' value='3' label='con' />
            <br />
            I am the best outcome
          </Segment>

        </Segment>
      </Segment>
    </div>
  )
}


export default Stats
