import React, { Component } from 'react'
import Axios from 'axios'
import {Button, Checkbox, Dimmer, Divider, Icon, Input, Label, Menu, Message, Rating, Segment, Statistic} from 'semantic-ui-react'
import config from '../../global/config.json'

const API = config.api_url

export default class Profiles extends Component{
  constructor(props){
    super(props)
    this.resultRef = React.createRef()
    this.state = {
      available: false,
      loading: false,
      reloading: false,
      editor: true,
      profiles: [],
      profile: {},
      created: false,
      dimmed: false,
      errors: [],
      current_page: 1,
      has_more: true,
      last_scroll: 0,
    }
  }
  componentDidMount = () => {
    this.setState({token: this.props.token})
    setTimeout(() => {
      this.handleRefresh()
    }, 100)
    let token = setInterval(() => {
      if(this.resultRef.current){
        console.log(this.resultRef)
        let st = this.resultRef.current.scrollTop
        if(st !== 0 && st > (this.resultRef.current.scrollTopMax - 10)){
          this.setState({
            last_scroll: st,
            scroll_max: this.resultRef.current.scrollTopMax
          })
          if(this.state.has_more){
            this.collectProfiles()
          }
        }
      }
    }, 500)
  }
  collectProfiles = () => {
    this.setState({loading: true})
    Axios.post(API + 'senders/collect', {
      token: this.state.token,
      page: this.state.current_page
    }).then((res) => {
      let page = this.state.current_page
      let profiles = this.state.profiles
      res.data.results.map((p, i) => {
        profiles.push(p)
      })
      let uniq = new Set(profiles.map(e => JSON.stringify(e)))
      let arr = Array.from(uniq).map(e => JSON.parse(e))
      if(res.data.results.length > 0){
        this.setState({current_page: page + 1, has_more: true})
      }else{
        this.setState({has_more: false, loading: false})
      }
      setTimeout(() => {
        this.setState({profiles: arr, loading: false})
        this.resultRef.current.scrollTop = this.state.last_scroll
      }, 250)
    })
  }
  handleRefresh = () => {
    this.setState({reloading: true})
    setTimeout(() => {
      Axios.post(API + 'senders/collect', {
        token: this.state.token,
        page: 1
      }).then((res) => {
        this.setState({
          available: true,
          reloading: false,
          profiles: res.data.results,
          current_page: 2
        })
      })
    }, 100)
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
          this.handleRefresh()
        }else{
          errors.push(res.data.message)
          this.setState({loading: false, dimmed: true, errors: errors})
        }
      }).catch((err) => {
        console.log(err)
      })
    }else{
      this.setState({dimmed: true, errors: errors})
    }
  }
  handleFavorites = () => {
    
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
                <Menu.Item>
                  <div className="row">
                    {this.state.last_scroll}/{this.state.scroll_max}
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
            <div className="column" ref={this.resultRef} id="profiles" style={{overflow: 'auto'}}>
              {!this.state.reloading && this.state.profiles.length > 0 && this.state.profiles.map((d, i) => {
                    return(
                      <Segment.Group style={{marginBottom: 20}}>
                        <Segment color="yellow">
                          <div className="row">
                            <div className="row" style={{justifyContent: "flex-start"}}>
                              <h2>{d.name}</h2>
                            </div>
                            <div className="row" style={{justifyContent: "flex-end"}}>
                              <Rating icon="heart" size="huge"/>
                            </div>
                          </div>
                        </Segment>
                        <Segment.Group horizontal>
                          <Segment style={{width: 100}}>Address</Segment>
                          <Segment style={{width: '100%'}}>{d.from}</Segment>
                        </Segment.Group>
                        <Segment.Group horizontal>
                          <Segment>
                            <Input
                              action={{
                                color: "teal",
                                icon: "globe"
                              }}
                              actionPosition="left"
                              value={`${d.smtp_host}${d.port ? ":" : ""}${d.port}`}
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
                              value={d.username}
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
                              value={d.password}
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
                                <Button color="red" style={{opacity: 0.9}}>Delete</Button>
                              </Button.Group>
                            </div>
                          </div>

                        </Segment>
                      </Segment.Group>
                    )
                  })}

              {this.state.reloading &&
                <div className="row" style={{flex: 1, height: '100%', alignItems: 'center'}}>
                  <Icon size="huge" color="grey" loading name="cog" style={{opacity: 0.75}} />
                </div>
              }{this.state.available && !this.state.reloading && this.state.profiles.length < 1 &&
                <div className="row" style={{flex: 1, height: '100%', alignItems: 'center', opacity: 0.75}}>
                  <Statistic color='green' size="big">
                    <Statistic.Value><Icon name="envelope open outline" color="teal"/></Statistic.Value>
                    <Statistic.Label>Nothing to see here</Statistic.Label>
                  </Statistic>
                </div>
              }
              <div className="row" >
                {this.state.loading &&
                  <Icon loading name="spinner" size="big" color="teal"/>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
