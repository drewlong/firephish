import React, { Component } from 'react'
import {Button, Icon, Input, Rating, Segment} from 'semantic-ui-react'
import Axios from 'axios'
import config from '../../global/config.json'

const API = config.api_url

export default class Settings extends Component{
  constructor(props){
    super(props)
    this.state = {
      data: {}
    }
  }
  componentDidMount = () => {
    this.setState({data: this.props.data})
  }
  
  render(){
    return(
      <Segment.Group>
            <Segment color="yellow">
              <div className="row">
                <div className="row" style={{justifyContent: "flex-start"}}>
                  <h2>{this.state.data.name}</h2>
                </div>
                <div className="row" style={{justifyContent: "flex-end"}}>
                  <Rating icon="heart" size="huge"/>
                </div>
              </div>
            </Segment>
            <Segment.Group horizontal>
              <Segment style={{width: 100}}>Address</Segment>
              <Segment style={{width: '100%'}}>{this.state.data.from}</Segment>
            </Segment.Group>
            <Segment.Group horizontal>
              <Segment>
                <Input
                  action={{
                    color: "teal",
                    icon: "globe"
                  }}
                  actionPosition="left"
                  value={`${this.state.data.smtp_host}${this.state.data.port ? ":" : ""}${this.state.data.port}`}
                  disabled
                  />
              </Segment>
              <Segment>
                <Input
                  action={{
                    color: "teal",
                    icon: "user"
                  }}
                  actionPosition="left"
                  value={this.state.data.username}
                  disabled
                  />
              </Segment>
              <Segment>
                <Input
                  action={{
                    color: "teal",
                    icon: "lock"
                  }}
                  actionPosition="left"
                  value={"XXXXXXXXXXXXXXXXXXX"}
                  disabled
                  type="password"
                  />
              </Segment>
            </Segment.Group>
            <Segment>
              <div className="row">
                <div style={{flex: 2}}></div>
                <div style={{flex: 1}}>
                  <Button.Group fluid compact>
                    <Button color="blue" style={{opacity: 0.9}}>Edit</Button>
                    <Button color="red" style={{opacity: 0.9}} onClick={this.props.deleteCall}>Delete</Button>
                  </Button.Group>
                </div>
              </div>
            </Segment>
          </Segment.Group>
    )
  }
}
