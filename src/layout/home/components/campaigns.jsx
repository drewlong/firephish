import React, { Component } from 'react'
import Axios from 'axios'
import {Divider, Icon, Input, Menu, Segment} from 'semantic-ui-react'
import config from '../../global/config.json'

const API = config.api_url

export default class Campaigns extends Component{
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      activeItem: 'active'
    }
  }
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({loading: false})
    }, 2000)
  }
  handleItemClick = (e) => {
    this.setState({activeItem: e})
  }
  render(){
    return(
      <div className="dashboard-section">
        <h1>Campaigns</h1>
        <Divider horizontal>
            <Icon name="ellipsis horizontal" color={this.state.loading ? "teal" : "grey"} loading={this.state.loading}/>
        </Divider>
        <Menu pointing>
          <Menu.Item
            name='active'
            active={this.state.activeItem === 'active'}
            onClick={() => {this.handleItemClick("active")}}
          />
          <Menu.Item
            name='inactive'
            active={this.state.activeItem === 'inactive'}
            onClick={() => {this.handleItemClick("inactive")}}
          />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        {this.state.activeItem == 'active' &&
          <div className="column">
            <Segment.Group>
              <Segment color="yellow">
                <span style={{color: "#546e7a", fontSize: '1.5em'}}>
                  Campaign Name Here
                </span>
              </Segment>
              <Segment.Group horizontal>
                <Segment>Start Time: 10/12/2020 13:45:00</Segment>
                <Segment>Time Remaining: 00:00:00</Segment>
                <Segment>Total Targets: 9537</Segment>
              </Segment.Group>
              <Segment>
                <div className="row" style={{height: 200}}></div>
              </Segment>
            </Segment.Group>
          </div>
        }{this.state.activeItem == 'inactive' &&
          <div className="column">
            inactive campaigns
          </div>
        }
      </div>
    )
  }
}
