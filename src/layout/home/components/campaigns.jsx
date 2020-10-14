import React, { Component } from 'react'
import Axios from 'axios'
import {Button, Divider, Icon, Input, Menu, Segment} from 'semantic-ui-react'
import config from '../../global/config.json'

// Components
import CampaignCard from './campaign_card'

//Constants
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
          <Menu.Item>
            <Button basic content='Create New' icon='plus' labelPosition='left' color="green"/>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        {this.state.activeItem == 'active' &&
          <Segment style={{overflowY: "scroll", height: "calc(100% - 130px)"}}>
              <CampaignCard />
              <CampaignCard />
              <CampaignCard />
              <CampaignCard />
          </Segment>
        }{this.state.activeItem == 'inactive' &&
          <div className="column">
            inactive campaigns
          </div>
        }
      </div>
    )
  }
}
