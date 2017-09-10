import React, { Component } from 'react'
import { Segment, Statistic, Button } from 'semantic-ui-react'


const Stats = () => {
  return (
    <div>
      <Segment as='h3' className="stats">
        <Segment>
          <Statistic>
            <Statistic.Value text>
              Best
              <br /> Outcome
            </Statistic.Value>
            <Statistic.Label>Highest Ranking</Statistic.Label>
          </Statistic>

          <Segment as='h3' className="stats">
            <Button size='big'>
              <Statistic size='mini' label='I am the best outcome' value='46%' />
            </Button>

          </Segment>

        </Segment>
      </Segment>
    </div>
  )
}


export default Stats
