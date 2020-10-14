import React, { Component } from 'react'
import Axios from 'axios'
import {Button, Divider, Icon, Input, Label, Menu, Progress, Segment} from 'semantic-ui-react'
import {VictoryBar, VictoryContainer, VictoryStack} from 'victory'
import config from '../../global/config.json'

const API = config.api_url

export default class Stats extends Component{
  constructor(props){
    super(props)
    this.barRef = React.createRef()
    this.state = {}
  }
  render(){
    return(
      <div style={{marginBottom: 20}}>
        <Segment.Group>
          <Segment color="yellow">
            <span style={{color: "#546e7a", fontSize: '1.5em'}}>
              Campaign Name Here
            </span>
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
              <Progress percent={83} color='blue' progress/>
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
                      <Button color='green'>
                        <Icon name='mail' />
                        Sent
                      </Button>
                      <Label as='a' basic color='green' pointing='left'>
                        4379
                      </Label>
                    </Button>
                    &nbsp;
                    <Button as='div' labelPosition='right'>
                      <Button color='yellow'>
                        <Icon name='envelope open' />
                        Opened
                      </Button>
                      <Label as='a' basic color='yellow' pointing='left'>
                        2100
                      </Label>
                    </Button>
                    <Button as='div' labelPosition='right'>
                      <Button color='red'>
                        <Icon name='bomb' />
                        Clicked
                      </Button>
                      <Label as='a' basic color='red' pointing='left'>
                        1437
                      </Label>
                    </Button>
                  </div>
                  {this.barRef.current &&
                    <VictoryStack
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
            </Segment>
          </Segment.Group>
        </Segment.Group>
      </div>
    )
  }
}
