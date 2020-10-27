import React, { Component } from 'react'
import Axios from 'axios'
import {Button, Checkbox, Dimmer, Divider, Icon, Input, Label, Menu, Message, Rating, Segment, Statistic} from 'semantic-ui-react'
import InfiniteScroll from '../global/components/infinite_scroll'
import config from '../global/config.json'

import ProfileCard from './components/card'

const API = config.api_url

export default class Profiles extends Component{
  constructor(props){
    super(props)
    this.resultRef = React.createRef()
    this.state = {
      available: false,
      loading: false,
      editor: true,
      profiles: [],
      profile: {},
      created: false,
      dimmed: false,
      errors: [],
      dimmed_card: null
    }
  }
  componentDidMount = () => {
    this.setState({token: this.props.token})
  }
  handleCreateProfile = () => {
    let errors = []
    if(!this.state.name){errors.push("Name cannot be blank.")}
    if(!this.state.from){errors.push("Sender cannot be blank.")}
    if(!this.state.smtp_host){errors.push("SMTP Host cannot be blank.")}
    if(errors.length < 1){
      this.setState({loading: true})
      Axios.post(API + 'senders/new', {
        token: this.state.token,
        profile_data: {
          name: this.state.name,
          from: this.state.from,
          smtp_host: this.state.smtp_host,
          port: this.state.port ? this.state.port : 25,
          username: this.state.username,
          password: this.state.password
        }
      }).then((res) => {
        if(res.data.status === 200){
          this.setState({
            name: "",
            from: "",
            smtp_host: "",
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
  handleDelete = (id) => {
    this.setState({loading: true})
    Axios.post(API + 'senders/delete', {
      token: this.state.token,
      id: id
    }).then((res) => {
      this.setState({loading: false, reload: true, dimmed_card: null})
    })
  }
  handleEdit = () => {
      this.setState({loading: true})
    Axios.post(API + 'senders/edit', {
      token: this.state.token,
      name: this.state.name,
      from: this.state.from,
      smtp_host: this.state.smtp_host,
      port: this.state.port,
      username: this.state.username,
      password: this.state.password
    }).then((res) => {
      this.setState({loading: false, reload: true})
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
                  <Input
                    value={this.state.smtp_host}
                    style={{width: '100%'}}
                    action={{
                      basic: true,
                      color: "teal",
                      icon: "globe"
                    }}
                    actionPosition="left"
                    placeholder="smtp.example.com"
                    onChange={(e) => {this.setState({smtp_host: e.target.value})}}
                    />
                </div>
                <div className="column" style={{marginBottom: 10}}>
                  <Label color="teal" ribbon style={{width: "50%", marginBottom: 10}}>SMTP Port</Label>
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
                  <Button color="green" fluid onClick={this.handleCreateProfile}>Save</Button>
                </div>
              </Segment>
            </Segment.Group>
          </div>
          </Dimmer.Dimmable>
          <div className="column" style={{
              flex: 2,
              padding: '0 20px',
              borderLeft: 'solid 1px rgba(0, 0, 0, 0.15)',
              height: "calc(100% - 65px)",
            }}>
            <div className="row" style={{marginBottom: 20}}>
              <Menu attached>
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
                <Menu.Menu position='right'>
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
                    <Dimmer.Dimmable blurring dimmed={this.state.dimmed_card === d.id}>
                      <Dimmer
                        inverted
                        active={this.state.dimmed_card === d.id}
                        onClickOutside={() => {this.setState({dimmed_card: null})}}
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
                            <Button color="green" onClick={() => {this.handleDelete(d.id)}}>Yes</Button>
                            <Button color="red" onClick={() => this.setState({dimmed_card: null})}>No</Button>
                          </div>
                        </div>
                      </Dimmer>
                      <ProfileCard token={this.state.token} data={d} deleteCall={() => {this.setState({dimmed_card: d.id})}}/>
                    </Dimmer.Dimmable>
                  </div>
                )
              })}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    )
  }
}
