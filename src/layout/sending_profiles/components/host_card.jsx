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
  handleEdit = (data) => {
    this.setState({loading: true})
    Axios.post(API + 'smtp_hosts/edit', {
      token: this.state.token,
      host_data: data
    }).then((res) => {
      this.setState({loading: false, reload: true})
    })
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
              <Segment>
                <Input
                  action={{
                    color: "teal",
                    icon: "globe"
                  }}
                  actionPosition="left"
                  value={`${this.state.data.hostname}${this.state.data.port ? ":" : ""}${this.state.data.port}`}
                  disabled={this.state.editing ? false : true}
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
                  disabled={this.state.editing ? false : true}
                  />
              </Segment>
              <Segment>
                <Input
                  action={{
                    color: "teal",
                    icon: "lock"
                  }}
                  actionPosition="left"
                  disabled={this.state.editing ? false : true}
                  type="password"
                  />
              </Segment>
            </Segment.Group>
            <Segment>
              <div className="row">
                <div style={{flex: 2}}></div>
                <div style={{flex: 1}}>
                  <Button.Group fluid compact>
                    <Button color="blue" style={{opacity: 0.9}} disabled={this.state.editing} onClick={() => {this.setState({editing: true})}}>Edit</Button>
                    <Button color="red" style={{opacity: 0.9}} onClick={this.props.deleteCall}>Delete</Button>
                  </Button.Group>
                </div>
              </div>
            </Segment>
          </Segment.Group>
    )
  }
}
