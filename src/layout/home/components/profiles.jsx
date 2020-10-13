import React, { Component } from 'react'
import Axios from 'axios'
import {Button, Divider, Grid, Header, Icon, Input, Segment} from 'semantic-ui-react'
import config from '../../global/config.json'

const API = config.api_url

export default class Profiles extends Component{
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      dummy: [
        {
          name: "Fake Gmail Account",
          address: "attacker@gmail.com",
          smtp_host: "smtp.gmail.com",
          port: 587,
          username: "username@gmail.com",
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
          <div className="column" style={{flex: 1}}>
          </div>
          <div className="column" style={{
              flex: 2,
              padding: '0 20px',
              borderLeft: 'solid 1px rgba(0, 0, 0, 0.15)',
              overflowY: 'scroll'
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
