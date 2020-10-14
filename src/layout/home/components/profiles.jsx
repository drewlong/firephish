import React, { Component } from 'react'
import Axios from 'axios'
import {Button, Divider, Icon, Input, Segment} from 'semantic-ui-react'
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
          <div className="column" style={{flex: 1, padding: 10}}>
            <h4>Create New Profile</h4>
            <div className="row" style={{marginBottom: 10}}>
              <Input
                style={{width: '100%'}}
                placeholder="Profile Name"
                />
            </div>
            <div className="row" style={{marginBottom: 10}}>
              <Input
                style={{width: '100%'}}
                action={{
                  color: "teal",
                  icon: "globe"
                }}
                actionPosition="left"
                placeholder="SMTP Host (smtp.example.com)"
                />
            </div>
            <div className="row" style={{marginBottom: 10}}>
              <Input
                style={{width: '100%'}}
                action={{
                  color: "teal",
                  icon: "hashtag"
                }}
                actionPosition="left"
                placeholder="SMTP Port (default 25)"
                />
            </div>
            <div className="row" style={{marginBottom: 10}}>
              <Input
                style={{width: '100%'}}
                action={{
                  color: "teal",
                  icon: "user"
                }}
                actionPosition="left"
                placeholder="Username"
                />
            </div>
            <div className="row" style={{marginBottom: 10}}>
              <Input
                style={{width: '100%'}}
                action={{
                  color: "teal",
                  icon: "lock"
                }}
                type="password"
                actionPosition="left"
                placeholder="Password"
                />
            </div>
            <div className="row" style={{marginBottom: 10}}>
              <Button color="green" fluid>Save</Button>
            </div>
          </div>
          <div className="column" style={{
              flex: 2,
              padding: '0 20px',
              borderLeft: 'solid 1px rgba(0, 0, 0, 0.15)',
              overflowY: 'scroll',
              height: "calc(100% - 65px)"
            }}>
            {this.state.dummy.map((d, i) => {
              return(
                <Segment.Group>
                  <Segment color="teal">
                    <h2>{d.name}</h2>
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
                    <Button.Group fluid compact>
                      <Button color="blue" basic>Edit</Button>
                      <Button.Or inverted/>
                      <Button color="red" basic>Delete</Button>
                    </Button.Group>

                  </Segment>
                </Segment.Group>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
