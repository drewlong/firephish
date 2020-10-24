import React, { Component } from 'react'
import {Button, Dimmer, Progress, Segment, Statistic} from 'semantic-ui-react'
import { ResponsiveBar } from '@nivo/bar'

export default class Stats extends Component{
  constructor(props){
    super(props)
    this.barRef = React.createRef()
    this.state = {
      dimmed: false,
      data: [
        {
          "id": 'Campaign',
          "Unopened": 8000,
          "Opened": 1100,
          "Clicked": 237
        }
      ],
      campaign: {}
    }
  }
  componentDidMount = () => {
    this.setState({campaign: this.props.campaign})
  }
  handleStopCampaign = () => {
    this.setState({dimmed: false})
  }
  render(){
    return(
      <div style={{marginBottom: 20}}>
        <Dimmer.Dimmable blurring dimmed={this.state.dimmed}>
          <Dimmer
            inverted
            active={this.state.dimmed}
            onClickOutside={() => {this.setState({dimmed: false})}}
            verticalAlign="middle"
            >
            <div className="column">
              <div className="row" style={{flex: 1}}>
                <h3>
                  Stop Campaign?
                </h3>
              </div>
              <div style={{flex: 1}}></div>
              <div className="row" style={{flex: 1}}>
                <Button color="green" onClick={this.handleStopCampaign}>Yes</Button>
                <Button color="red" onClick={() => this.setState({dimmed: false})}>No</Button>
              </div>
            </div>
          </Dimmer>
          <Segment.Group>
            <Segment color="yellow">
              <div className="row">
                <div style={{flex: 3, color: "#546e7a", fontSize: '1.5em'}}>
                  {this.state.campaign.name}
                </div>
                <div className="row" style={{flex: 1, justifyContent: 'flex-end', paddingRight: 20}}>
                  <Button.Group style={{opacity: 0.9}}>
                    <Button content='Copy' icon='copy' color="blue" labelPosition='left' />
                    <Button color="red"
                      onClick={() => {this.setState({dimmed: true})}}
                      style={{opacity: 0.9}}>
                      STOP
                    </Button>
                  </Button.Group>
                </div>
              </div>
            </Segment>
            <Segment.Group horizontal>
              <Segment>Start Time: {this.state.campaign.start_time}</Segment>
              <Segment>Time Remaining: 00:00:00</Segment>
              <Segment>Total Targets: 9537</Segment>
            </Segment.Group>
            <Segment.Group horizontal>
              <Segment style={{width: 100}}>
                <div className="column" style={{width: "100%", alignItems: "center", justifyContent: "center"}}>
                  Progress
                </div>
              </Segment>
              <Segment style={{width: "100%"}}>
                <Progress attached active style={{opacity: 0.75}} percent={83} color='blue' progress/>
              </Segment>
            </Segment.Group>
            <Segment.Group horizontal style={{height: 70}}>
              <Segment style={{width: 100}}>
                <div className="column" style={{width: "100%", alignItems: "center", justifyContent: "center"}}>
                  Stats
                </div>
              </Segment>
              <Segment style={{width: "100%"}}>
                <div className="row">
                  <div ref={this.barRef} style={{width: "100%"}}>
                    <div className="row" style={{opacity: 0.75, flex: 1, height: 40}}>
                        <ResponsiveBar
                          data={this.state.data}
                          keys={[ 'Unopened', 'Opened', 'Clicked' ]}
                          groupMode="grouped"
                          padding={0.15}
                          layout="horizontal"
                          colorBy="id"
                          borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                          axisTop={null}
                          axisRight={null}
                          axisBottom={null}
                          axisLeft={null}
                          enableLabel={false}
                          enableGridY={false}
                          animate={true}
                          motionStiffness={90}
                          motionDamping={15}
                          defs={[
                            {
                                id: 'sent',
                                type: 'patternLines',
                                background: '#388e3c',
                                color: '#4caf50',
                                rotation: -45,
                                lineWidth: 2,
                                spacing: 3
                            },
                          {
                              id: 'opened',
                              type: 'patternLines',
                              background: '#ffa000',
                              color: '#ffc107',
                              rotation: -45,
                              lineWidth: 2,
                              spacing: 3
                          },
                          {
                            id: 'clicked',
                            type: 'patternLines',
                            background: '#d32f2f',
                            color: '#f44336',
                            rotation: -45,
                            lineWidth: 2,
                            spacing: 3
                          }
                      ]}
                      fill={[
                          {
                              match: {
                                  id: 'Opened'
                              },
                              id: 'opened'
                          },
                          {
                              match: {
                                  id: 'Unopened'
                              },
                              id: 'sent'
                          },
                          {
                              match: {
                                  id: 'Clicked'
                              },
                              id: 'clicked'
                          }
                      ]}
                      tooltip={(e) => {
                        return(
                          <div className="row">
                            {e.id === "Unopened" &&
                              <Statistic color='green' size="mini">
                                <Statistic.Value>{e.value}</Statistic.Value>
                                <Statistic.Label>Unopened</Statistic.Label>
                              </Statistic>
                            }
                            {e.id === "Opened" &&
                              <Statistic color='yellow' size="mini">
                                <Statistic.Value>{e.value}</Statistic.Value>
                                <Statistic.Label>Opened</Statistic.Label>
                              </Statistic>
                            }
                            {e.id === "Clicked" &&
                              <Statistic color='red' size="mini">
                                <Statistic.Value>{e.value}</Statistic.Value>
                                <Statistic.Label>Clicked</Statistic.Label>
                              </Statistic>
                            }
                          </div>
                        )
                      }}
                      />
                  </div>
                </div>
              </div>
            </Segment>
          </Segment.Group>
        </Segment.Group>
        </Dimmer.Dimmable>
    </div>
    )
  }
}
