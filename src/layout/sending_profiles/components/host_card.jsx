import React, { Component } from 'react'
import {Button, Icon, Input, Rating, Segment} from 'semantic-ui-react'
import Axios from 'axios'
import config from '../../global/config.json'

const API = config.api_url

export default class Settings extends Component{
  constructor(props){
    super(props)
    this.state = {
      data: {},
      host: {}
    }
  }
  componentDidMount = () => {
    let data = this.props.data
    this.setState({data: data, token: this.props.token})
  }
  handleEdit = () => {
    let data = this.state.data
    this.setState({loading: true})
    Axios.post(API + 'smtp_hosts/edit', {
      token: this.state.token,
      id: this.state.data.id,
      host_data: data
    }).then((res) => {
      this.setState({loading: false, editing: false})
    })
  }
  handleFavorite = (e) => {
    Axios.post(API + 'smtp_hosts/favorite', {
      token: this.state.token,
      id: this.state.data.id,
      favorite: e
    }).then((res) => {
      
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
                {!this.state.editing &&
                <Input
                  action={{
                    color: "teal",
                    icon: "globe",
                    title: "SMTP Host + Port"
                  }}
                  actionPosition="left"
                  value={`${this.state.data.hostname}${this.state.data.port ? ":" : ""}${this.state.data.port}`}
                  disabled
                  />
              }{this.state.editing &&
                  <Input
                    action={{
                      color: "teal",
                      icon: "globe",
                      title: "SMTP Hostname"
                    }}
                    actionPosition="left"
                    value={this.state.data.hostname}
                    onChange={(e) => {
                      let data = this.state.data;
                      data.hostname = e.target.value
                      this.setState({data: data})
                    }}
                    />
              }
              </Segment>
              <Segment>
                <Input
                  action={{
                    color: "teal",
                    icon: "user",
                    title: "Username"
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
                    icon: "lock",
                    title: "Password"
                  }}
                  actionPosition="left"
                  disabled={this.state.editing ? false : true}
                  placeholder="[REDACTED]"
                  onChange={(e) => {
                    let data = this.state.data;
                    data.password = e.target.value
                    this.setState({data: data})
                  }}
                  type="password"
                  />
              </Segment>
            </Segment.Group>
            <Segment.Group horizontal>
              {this.state.editing &&
                <Segment>
                  <Input
                    action={{
                      color: "teal",
                      icon: "hashtag",
                      title: "SMTP Host Port"
                    }}
                    actionPosition="left"
                    value={this.state.data.port}
                    onChange={(e) => {
                      let data = this.state.data;
                      data.port = e.target.value
                      this.setState({data: data})
                    }}
                    />
                </Segment>
              }
              <Segment>
                <div className="row">
                  <div style={{flex: 2}}></div>
                  <div style={{flex: 1}}>
                    <Button.Group fluid compact>
                      {this.state.editing &&
                        <Button color="green" style={{opacity: 0.9}} loading={this.state.loading} onClick={this.handleEdit}>Save</Button>
                      }{!this.state.editing &&
                        <Button color="blue" style={{opacity: 0.9}} onClick={() => {this.setState({editing: true})}}>Edit</Button>
                      }
                      {this.state.editing &&
                        <Button color="red" style={{opacity: 0.9}} onClick={() => {this.setState({editing: false})}}>Cancel</Button>
                      }{!this.state.editing &&
                        <Button color="red" style={{opacity: 0.9}} onClick={this.props.deleteCall}>Delete</Button>
                      }
                    </Button.Group>
                  </div>
                </div>
              </Segment>
            </Segment.Group>
          </Segment.Group>
    )
  }
}
