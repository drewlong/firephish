import React, { Component } from 'react'
import Axios from 'axios'
import {Button, Checkbox, Divider, Icon, Input, Label, Menu, Rating, Segment} from 'semantic-ui-react'
import config from '../../global/config.json'

const API = config.api_url

export default class Profiles extends Component{
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      editor: true,
      dummy: [
        {
          name: "Gmail Profile",
          address: "attacker@gmail.com",
          smtp_host: "smtp.gmail.com",
          port: 587,
          username: "username@gmail.com",
          password: "poqwieurpoqiuwe"
        },
        {
          name: "Microsoft Teams",
          address: "notify@teams.microsoft.t9sr.com",
          smtp_host: "184.15.203.15",
          port: 25,
          username: "admin00",
          password: "poqwieurpoqiuwe"
        },
        {
          name: "HelpDesk",
          address: "PSC_HELPDESK@psc.monitoring.jqwcom.us",
          smtp_host: "184.15.203.15",
          port: 25,
          username: "admin00",
          password: "poqwieurpoqiuwe"
        }
      ]
    }
  }
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({loading: false})
    }, 2000)
  }
  render(){
    return(
      <div className="dashboard-section">
        <h1>Sending Profiles</h1>
        <Divider horizontal>
            <Icon name="ellipsis horizontal" color={this.state.loading ? "teal" : "grey"} loading={this.state.loading}/>
        </Divider>

        <div className="row" style={{height: '100%'}}>
          <div className="column" style={{flex: 1, padding: "0 20px 0 20px"}}>
            <Segment.Group>
              <Segment color="teal">
                <h3>Create New Profile</h3>
              </Segment>
              <Segment>
                <div className="column" style={{marginBottom: 10}}>
                  <Label color="teal" ribbon style={{width: "50%", marginBottom: 10}}>Profile Name</Label>
                  <Input
                    style={{width: '100%'}}
                    placeholder="Profile Name"
                    />
                </div>
                <div className="column" style={{marginBottom: 10}}>
                  <Label color="teal" ribbon style={{width: "50%", marginBottom: 10}}>SMTP Host</Label>
                  <Input
                    style={{width: '100%'}}
                    action={{
                      basic: true,
                      color: "teal",
                      icon: "globe"
                    }}
                    actionPosition="left"
                    placeholder="smtp.example.com"
                    />
                </div>
                <div className="column" style={{marginBottom: 10}}>
                  <Label color="teal" ribbon style={{width: "50%", marginBottom: 10}}>SMTP Port</Label>
                  <Input
                    style={{width: '100%'}}
                    action={{
                      basic: true,
                      color: "teal",
                      icon: "hashtag"
                    }}
                    actionPosition="left"
                    placeholder="25"
                    />
                </div>
                <div className="column" style={{marginBottom: 10}}>
                  <Label color="teal" ribbon style={{width: "50%", marginBottom: 10}}>Username</Label>
                  <Input
                    style={{width: '100%'}}
                    action={{
                      basic: true,
                      color: "teal",
                      icon: "user"
                    }}
                    actionPosition="left"
                    placeholder="Optional"
                    />
                </div>
                <div className="column" style={{marginBottom: 10}}>
                  <Label color="teal" ribbon style={{width: "50%", marginBottom: 10}}>Password</Label>
                  <Input
                    style={{width: '100%'}}
                    action={{
                      basic: true,
                      color: "teal",
                      icon: "lock"
                    }}
                    actionPosition="left"
                    placeholder="Optional"
                    />
                </div>
              </Segment>
              <Segment>
                <div className="row" style={{marginBottom: 10}}>
                  <Button color="green" fluid>Save</Button>
                </div>
              </Segment>
            </Segment.Group>
          </div>
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
                      <Checkbox toggle />
                    </div>
                  </div>
                </Menu.Item>
                <Menu.Menu position='right'>
                  <Menu.Item>
                    <Input icon='search' placeholder='Search...' />
                  </Menu.Item>
                </Menu.Menu>
              </Menu>
            </div>
            <div className="column" style={{overflowY: 'scroll'}}>
              {this.state.dummy.map((d, i) => {
                return(
                  <Segment.Group>
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
                      <Segment style={{width: '100%'}}>{d.address}</Segment>
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
            </div>
          </div>
        </div>
      </div>
    )
  }
}
