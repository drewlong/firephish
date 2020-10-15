import React, { Component } from 'react'
import Axios from 'axios'
import {Button, Dimmer, Divider, Header, Icon, Input, Label, Menu, Progress, Segment} from 'semantic-ui-react'
import {VictoryBar, VictoryContainer, VictoryStack} from 'victory'
import config from '../../global/config.json'

const API = config.api_url
export default class Stats extends Component{
  constructor(props){
    super(props)
    this.barRef = React.createRef()
    this.state = {
      dimmed: false
    }
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
                  Campaign Name Here
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
              <Segment>Start Time: 10/12/2020 13:45:00</Segment>
              <Segment>Time Remaining: 00:00:00</Segment>
              <Segment>Total Targets: 9537</Segment>
            </Segment.Group>
            <Segment.Group horizontal style={{height: 50}}>
              <Segment style={{width: 100}}>
                <div className="column" style={{width: "100%", alignItems: "center", justifyContent: "center"}}>
                  Progress
                </div>
              </Segment>
              <Segment style={{width: "100%"}}>
                <Progress attached active style={{opacity: 0.75}} percent={83} color='blue' progress/>
              </Segment>
            </Segment.Group>
            <Segment.Group horizontal style={{height: 100}}>
              <Segment style={{width: 100}}>
                <div className="column" style={{width: "100%", alignItems: "center", justifyContent: "center"}}>
                  Stats
                </div>
              </Segment>
              <Segment style={{width: "100%"}}>
                <div className="row">
                  <div ref={this.barRef} style={{width: "100%"}}>
                    <div>
                      <Button as='div' labelPosition='right'>
                        <Button size="mini" basic color='green'>
                          <Icon name='mail' />
                          Sent
                        </Button>
                        <Label as='a' basic color='green' pointing='left'>
                          4379
                        </Label>
                      </Button>
                      &nbsp;
                      <Button as='div' labelPosition='right'>
                        <Button size="mini" basic color='yellow'>
                          <Icon name='envelope open' />
                          Opened
                        </Button>
                        <Label as='a' basic color='yellow' pointing='left'>
                          2100
                        </Label>
                      </Button>
                      <Button as='div' labelPosition='right'>
                        <Button size="mini" basic  color='red'>
                          <Icon name='bomb' />
                          Clicked
                        </Button>
                        <Label as='a' basic color='red' pointing='left'>
                          1437
                        </Label>
                      </Button>
                    </div>
                    <div className="row" style={{opacity: 0.75}}>
                      {this.barRef.current &&
                        <VictoryStack
                          animate={{
                            duration: 1000,
                            onLoad: { duration: 100 }
                          }}
                          width={this.barRef.current.offsetWidth}
                          height={30}
                          padding={0}
                          colorScale={["#21ba45", "#fbbd08", "#db2828"]}
                          containerComponent={
                            <VictoryContainer
                              height={30}
                              width={this.barRef.current.offsetWidth}
                              responsive
                              />
                          }
                          >
                          <VictoryBar horizontal
                            padding={0}
                            style={{data:{
                              width: 30}
                            }}
                            data={[{x: "unopened", y: 4379}]}
                            />
                          <VictoryBar horizontal
                            padding={0}
                            style={{data:{
                              width: 30
                            }
                          }}
                          data={[{x: "opened", y: 2100}]}
                          />
                        <VictoryBar horizontal
                          padding={0}
                          style={{data:{
                            width: 30}
                          }}
                          data={[{x: "clicked", y: 1437}]}
                          />
                      </VictoryStack>
                    }{!this.barRef.current &&
                      <div className="row"><Icon name="spinner" color="grey" size="big" loading /></div>
                    }
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
