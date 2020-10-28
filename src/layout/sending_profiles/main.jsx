import React, { Component } from 'react'
import Axios from 'axios'
import {Button, Checkbox, Dimmer, Dropdown, Divider, Icon, Input, Label, Menu, Message, Rating, Segment, Statistic} from 'semantic-ui-react'
import InfiniteScroll from '../global/components/infinite_scroll'
import config from '../global/config.json'

import ProfileCard from './components/profile_card'
import HostCard from './components/host_card'

const API = config.api_url

export default class Profiles extends Component{
  constructor(props){
    super(props)
    this.resultRef = React.createRef()
    this.state = {
      available: false,
      loading: false,
      editor: true,
      host: {},
      hosts: [],
      profiles: [],
      profile: {},
      created: false,
      dimmed: false,
      errors: [],
      dimmed_profile: null,
      dimmed_host: null,
      loading_delete: null,
      active: 'profiles'
    }
  }
  componentDidMount = () => {
    this.setState({token: this.props.token})
  }
  handleCreateProfile = () => {
    let errors = []
    if(!this.state.name){errors.push("Name cannot be blank.")}
    if(!this.state.from){errors.push("Sender cannot be blank.")}
    if(!this.state.hostname){errors.push("SMTP Host cannot be blank.")}
    if(errors.length < 1){
      this.setState({loading: true})
      Axios.post(API + 'senders/new', {
        token: this.state.token,
        profile_data: {
          name: this.state.name,
          from: this.state.from,
          host_id: this.state.host.guid,
        }
      }).then((res) => {
        if(res.data.status === 200){
          this.setState({
            name: "",
            from: "",
            hostname: "",
            port: "",
            username: "",
            password: "",
            loading: false,
            created: true,
            dimmed: true
          })
          this.setState({reload: true})
        }else{
          errors.push(res.data.message)
        }
      }).catch((err) => {
        console.log(err)
      })
    }else{
      this.setState({dimmed: true, errors: errors})
    }
  }
  handleCreateHost = () => {
    let errors = []
    if(!this.state.name){errors.push("Name cannot be blank.")}
    if(!this.state.hostname){errors.push("SMTP Host cannot be blank.")}
    if(errors.length < 1){
      this.setState({loading: true})
      Axios.post(API + 'smtp_hosts/new', {
        token: this.state.token,
        host_data: {
          name: this.state.name,
          hostname: this.state.hostname,
          port: this.state.port,
          username: this.state.username,
          password: this.state.password
        }
      }).then((res) => {
        if(res.data.status === 200){
          this.setState({
            name: "",
            hostname: "",
            port: "",
            username: "",
            password: "",
            loading: false,
            created: true,
            dimmed: true
          })
          this.setState({reload: true})
        }else{
          errors.push(res.data.message)
        }
      }).catch((err) => {
        console.log(err)
      })
    }else{
      this.setState({dimmed: true, errors: errors})
    }
  }
  handleDeleteProfile = (id) => {
    this.setState({loading_delete: id})
    Axios.post(API + 'senders/delete', {
      token: this.state.token,
      id: id
    }).then((res) => {
      this.setState({loading_delete: null, reload: true, dimmed_profile: null})
    })
  }
  handleDeleteHost = (id) => {
    this.setState({loading_delete: id})
    Axios.post(API + 'smtp_hosts/delete', {
      token: this.state.token,
      id: id
    }).then((res) => {
      this.setState({loading_delete: null, reload: true, dimmed_host: null})
    })
  }
  handleFavorite = (id, b) => {
    this.setState({loading: true})
    Axios.post(API + 'senders/delete', {
      token: this.state.token,
      id: id,
      favorite: b
    }).then((res) => {
      this.setState({loading: false})
    })
  }
  render(){
    return(
      <div className="dashboard-section">
        <h1>Sending Profiles</h1>
        <Divider horizontal>
            <Icon name="ellipsis horizontal" color={this.state.loading ? "teal" : "grey"} loading={this.state.loading}/>
        </Divider>

        <div className="row" style={{height: '100%'}}>
          <Dimmer.Dimmable blurring dimmed={this.state.dimmed}>
            <Dimmer
              inverted
              active={this.state.dimmed}
              onClickOutside={() => {this.setState({dimmed: false})}}
              verticalAlign="middle"
              >
              {this.state.created &&
                <div className="column">
                    <div className="row" style={{flex: 1, marginBottom: 20}}>
                      <Statistic color='green' size="mini">
                        <Statistic.Value><Icon name="check" color="green" size="big"/></Statistic.Value>
                        <Statistic.Label>Success!</Statistic.Label>
                      </Statistic>
                    </div>
                    <div style={{flex: 1}}></div>
                    <div className="row" style={{flex: 1}}>
                      <Button basic color="green" onClick={() => {this.setState({created: false, dimmed: false})}}>OK</Button>
                    </div>
                </div>
              }{!this.state.created && this.state.errors.length > 0 &&
                <div className="column">
                    <div className="row" style={{flex: 1, marginBottom: 20}}>
                      <Message
                        error
                        list={this.state.errors}
                      />
                    </div>
                    <div style={{flex: 1}}></div>
                    <div className="row" style={{flex: 1}}>
                      <Button basic color="green" onClick={() => {this.setState({errors: [], dimmed: false})}}>OK</Button>
                    </div>
                </div>
              }
            </Dimmer>
            <div className="column" style={{flex: 1, padding: "0 10px 0 10px"}}>
              {this.state.active === 'profiles' &&
                <Segment.Group>
              <Segment color="teal">
                <h3>Create New Profile</h3>
              </Segment>
              <Segment>
                <div className="column" style={{marginBottom: 10}}>
                  <Label color="teal" ribbon style={{width: "50%", marginBottom: 10}}>Profile Name</Label>
                  <Input
                    value={this.state.name}
                    style={{width: '100%'}}
                    placeholder="Profile Name"
                    onChange={(e) => {this.setState({name: e.target.value})}}
                    />
                </div>
                <div className="column" style={{marginBottom: 10}}>
                  <Label color="teal" ribbon style={{width: "50%", marginBottom: 10}}>Sender</Label>
                  <Input
                    value={this.state.from}
                    style={{width: '100%'}}
                    action={{
                      basic: true,
                      color: "teal",
                      icon: "mail"
                    }}
                    actionPosition="left"
                    placeholder="Attacker <phony_address@email.com>"
                    onChange={(e) => {this.setState({from: e.target.value})}}
                    />
                </div>
                <div className="column" style={{marginBottom: 10}}>
                  <Label color="teal" ribbon style={{width: "50%", marginBottom: 10}}>SMTP Host</Label>
                    <Dropdown
                      fluid
                      style={{minWidth: 250}}
                      placeholder='Select Host'
                      search
                      selection
                      options={this.state.hosts}
                      value={this.state.host}
                      onChange={(e, obj) => {this.setState({host: obj.value})}}
                      />
                </div>
              </Segment>
              <Segment>
                <div className="row" style={{marginBottom: 10}}>
                  <Button color="green" fluid onClick={this.handleCreateProfile}>Save</Button>
                </div>
              </Segment>
            </Segment.Group>
              }{this.state.active === 'hosts' &&
                <Segment.Group>
                  <Segment color="teal">
                    <h3>Create New Host</h3>
                  </Segment>
                  <Segment>
                    <div className="column" style={{marginBottom: 10}}>
                      <Label color="teal" ribbon style={{width: "50%", marginBottom: 10}}>SMTP Host Name</Label>
                      <Input
                        value={this.state.host_name}
                        style={{width: '100%'}}
                        placeholder="e.g., 'Gmail', 'Home Server', etc"
                        onChange={(e) => {this.setState({name: e.target.value})}}
                        />
                    </div>
                    <div className="column" style={{marginBottom: 10}}>
                      <Label color="teal" ribbon style={{width: "50%", marginBottom: 10}}>Host Address</Label>
                      <Input
                        value={this.state.hostname}
                        style={{width: '100%'}}
                        action={{
                          basic: true,
                          color: "teal",
                          icon: "globe"
                        }}
                        actionPosition="left"
                        placeholder="smtp.example.com"
                        onChange={(e) => {this.setState({hostname: e.target.value})}}
                        />
                    </div>
                    <div className="column" style={{marginBottom: 10}}>
                      <Label color="teal" ribbon style={{width: "50%", marginBottom: 10}}>Port Number</Label>
                      <Input
                        value={this.state.port}
                        style={{width: '100%'}}
                        action={{
                          basic: true,
                          color: "teal",
                          icon: "hashtag"
                        }}
                        actionPosition="left"
                        placeholder="25"
                        onChange={(e) => {this.setState({port: e.target.value})}}
                        />
                    </div>
                    <div className="column" style={{marginBottom: 10}}>
                      <Label color="teal" ribbon style={{width: "50%", marginBottom: 10}}>Username</Label>
                      <Input
                        value={this.state.username}
                        style={{width: '100%'}}
                        action={{
                          basic: true,
                          color: "teal",
                          icon: "user"
                        }}
                        actionPosition="left"
                        placeholder="Optional"
                        onChange={(e) => {this.setState({username: e.target.value})}}
                        />
                    </div>
                    <div className="column" style={{marginBottom: 10}}>
                      <Label color="teal" ribbon style={{width: "50%", marginBottom: 10}}>Password</Label>
                      <Input
                        value={this.state.password}
                        style={{width: '100%'}}
                        action={{
                          basic: true,
                          color: "teal",
                          icon: "lock"
                        }}
                        type="password"
                        actionPosition="left"
                        placeholder="Optional"
                        onChange={(e) => {this.setState({password: e.target.value})}}
                        />
                    </div>
                  </Segment>
                  <Segment>
                    <div className="row" style={{marginBottom: 10}}>
                      <Button color="green" fluid onClick={this.handleCreateHost}>Save</Button>
                    </div>
                  </Segment>
                </Segment.Group>
              }
            </div>
          </Dimmer.Dimmable>
          <div className="column" style={{
              flex: 2,
              padding: '0 20px',
              borderLeft: 'solid 1px rgba(0, 0, 0, 0.15)',
              height: "calc(100% - 65px)",
            }}>
            <div className="row" style={{marginBottom: 20}}>
              <Menu pointing style={{width: '100%'}}>
                <Menu.Item
                  name='Profiles'
                  active={this.state.active === 'profiles'}
                  onClick={() => {this.setState({active: 'profiles'})}}
                  />
                <Menu.Item
                  name='SMTP Hosts'
                  active={this.state.active === 'hosts'}
                  onClick={() => {this.setState({active: 'hosts'})}}
                  />
                <Menu.Menu position='right'>
                  <Menu.Item>
                    <div className="row">
                      <div className="row">
                        <h4>Favorites:</h4>
                      </div>
                      <span>&nbsp;&nbsp;&nbsp;</span>
                      <div className="row">
                        <Checkbox toggle disabled={this.state.loading || this.state.profiles.length < 1}/>
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <Input
                      disabled={this.state.loading || this.state.profiles.length < 1}
                      icon='search'
                      placeholder='Search...'
                      />
                  </Menu.Item>
                </Menu.Menu>
              </Menu>
            </div>
            {this.state.active === 'profiles' &&
              <InfiniteScroll
              endpoint={API + 'senders/collect'}
              token={this.props.token}
              onCollect={(e) => {this.setState({profiles: e})}}
              reload={this.state.reload}
              reloadDone={() => {this.setState({reload: false})}}
              >
              {this.state.profiles.map((d, i) => {
                return(
                  <div style={{marginBottom: 20}}>
                    <Dimmer.Dimmable blurring dimmed={this.state.dimmed_profile === d.id}>
                      <Dimmer
                        inverted
                        active={this.state.dimmed_profile === d.id}
                        onClickOutside={() => {this.setState({dimmed_profile: null})}}
                        verticalAlign="middle"
                        >
                        <div className="column">
                          <div className="row" style={{flex: 1}}>
                            <h3>
                              Delete profile?
                            </h3>
                          </div>
                          <div style={{flex: 1}}></div>
                          <div className="row" style={{flex: 1}}>
                            <Button color="green" loading={this.state.loading_delete === d.id} onClick={() => {this.handleDeleteProfile(d.id)}}>Yes</Button>
                            <Button color="red" loading={this.state.loading_delete === d.id} onClick={() => this.setState({dimmed_profile: null})}>No</Button>
                          </div>
                        </div>
                      </Dimmer>
                      <ProfileCard token={this.state.token} data={d} deleteCall={() => {this.setState({dimmed_profile: d.id})}}/>
                    </Dimmer.Dimmable>
                  </div>
                )
              })}
            </InfiniteScroll>
            }
            {this.state.active === 'hosts' &&
              <InfiniteScroll
              endpoint={API + 'smtp_hosts/collect'}
              token={this.props.token}
              onCollect={(e) => {this.setState({hosts: e})}}
              reload={this.state.reload}
              reloadDone={() => {this.setState({reload: false})}}
              >
              {this.state.hosts.map((d, i) => {
                return(
                  <div style={{marginBottom: 20}}>
                    <Dimmer.Dimmable blurring dimmed={this.state.dimmed_host === d.id}>
                      <Dimmer
                        inverted
                        active={this.state.dimmed_host === d.id}
                        onClickOutside={() => {this.setState({dimmed_host: null})}}
                        verticalAlign="middle"
                        >
                        <div className="column">
                          <div className="row" style={{flex: 1}}>
                            <h3>
                              Delete host?
                            </h3>
                          </div>
                          <div style={{flex: 1}}></div>
                          <div className="row" style={{flex: 1}}>
                            <Button color="green" loading={this.state.loading_delete === d.id} onClick={() => {this.handleDeleteHost(d.id)}}>Yes</Button>
                            <Button color="red" loading={this.state.loading_delete === d.id} onClick={() => this.setState({dimmed_host: null})}>No</Button>
                          </div>
                        </div>
                      </Dimmer>
                      <HostCard token={this.state.token} data={d} deleteCall={() => {this.setState({dimmed_host: d.id})}}/>
                    </Dimmer.Dimmable>
                  </div>
                )
              })}
            </InfiniteScroll>
            }
          </div>
        </div>
      </div>
    )
  }
}
