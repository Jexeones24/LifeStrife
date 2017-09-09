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
            I am an outcome
          </Segment>

          <Segment as='h3' className="stats">
            I am an outcome
          </Segment>

        </Segment>
      </Segment>
    </div>
  )
}


export default Stats
