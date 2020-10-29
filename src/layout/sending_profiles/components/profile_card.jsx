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
    let data = this.props.data
    this.setState({data: this.props.data, token: this.props.token})
    setTimeout(() => {
      this.getHostDetails()
    }, 100)
  }
  handleEdit = () => {
    this.setState({loading: true})
    Axios.post(API + 'senders/edit', {
      token: this.state.token,
      id: this.state.data.id,
      profile_data: this.state.data
    }).then((res) => {
      this.setState({loading: false, reload: true, editing: false})
    })
  }
  getHostDetails = () => {
    let data = this.state.data
    console.log(data)
    Axios.post(API + 'smtp_hosts/get', {
      token: this.state.token,
      id: data.host_id
    }).then((res) => {
      if(res.data.status === 200){
        data.hostname = res.data.result.hostname
        data.port = res.data.result.port
        data.username = res.data.result.username
        data.password = "REDACTED"
        this.setState({data: data})
      }
    })
  }
  handleFavorite = (e) => {
    let val = e === 0 ? false : true
    Axios.post(API + 'senders/favorite', {
      token: this.state.token,
      id: this.state.data.id,
      favorite: val
    }).then((res) => {})
    let data = this.state.data
    data.favorite = e
    this.setState({data: data})
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
                  <Rating rating={this.state.data.favorite} icon="heart" size="huge" onRate={(e, v) => {this.handleFavorite(v.rating)}}/>
                </div>
              </div>
            </Segment>
            <Segment.Group horizontal>
              <Segment style={{width: 100}}>Address</Segment>
              <Segment style={{width: '100%'}}>
                <Input
                  fluid
                  actionPosition="left"
                  value={this.state.data.from}
                  onChange={(e) => {let data = this.state.data; data.from = e.target.value; this.setState({data: data})}}
                  disabled={this.state.editing ? false : true}
                  />
              </Segment>
            </Segment.Group>
            <Segment.Group horizontal>
              <Segment>
                <Input
                  action={{
                    color: "teal",
                    icon: "globe"
                  }}
                  actionPosition="left"
                  value={`${this.state.data.hostname}${this.state.data.port ? ":" : ""}${this.state.data.port}`}
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
                  placeholder="[REDACTED]"
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
    )
  }
}
