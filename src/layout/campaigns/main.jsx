import React, { Component } from 'react'
import Axios from 'axios'
import {Button, Checkbox, Divider, Dropdown, Icon, Input, Menu, Segment, Step} from 'semantic-ui-react'
import DateTimePicker from 'react-datetime-picker';
import config from '../global/config.json'

// Components
import CampaignCard from './components/card.jsx'

//Constants
const API = config.api_url

export default class Campaigns extends Component{
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      activeItem: 'active',
      editor: false,
      attachment: false,
      landing_pages: [
        {key: 'basic', text: 'Generic', value: 'basic' },
       { key: 'microsoft', text: 'Microsoft Password Reset', value: 'microsoft' }
      ],
      start_date: false,
      send_date: false,
      end_date: false
    }
  }
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({loading: false})
    }, 2000)
  }
  handleItemClick = (e) => {
    this.setState({
      activeItem: e
    })
  }
  handleCancel = () => {
    this.setState({
      start_time: null,
      end_time: null,
      send_by_time: null,
      attachment: false,
      editor: false
    })
  }
  render(){
    return(
      <div className="dashboard-section">
        <h1>Campaigns</h1>
        <Divider horizontal>
            <Icon name="ellipsis horizontal" color={this.state.loading ? "teal" : "grey"} loading={this.state.loading}/>
        </Divider>
        {this.state.editor &&
          <div className="column" style={{background: "#cfd8dc"}}>
            <div style={{flex: 1}}></div>
            <div className="row" style={{flex: 4}}>
              <div style={{flex: 1}}></div>
              <Segment.Group style={{flex: 3}}>
                <Segment>
                  <Segment.Group horizontal>
                    <Segment>
                    <div className="column">
                    <div className="row" style={{justifyContent: 'flex-start', marginBottom: 5}}>
                      <h4>Name</h4>
                    </div>
                    <div className="row" style={{marginBottom: 10}}>
                      <Input style={{flex: 1}}/>
                    </div>
                    <div className="row" style={{justifyContent: 'flex-start', marginBottom: 5}}>
                      <h4>Phishing Domain</h4>
                    </div>
                    <div className="row" style={{marginBottom: 10}}>
                      <Input style={{flex: 1}} placeholder="IP or URL of webserver"/>
                    </div>
                    <div className="row" style={{justifyContent: 'flex-start', marginBottom: 5}}>
                      <h4>Sender</h4>
                    </div>
                    <div className="row" style={{marginBottom: 10}}>
                      <Dropdown
                        fluid
                        style={{minWidth: 250}}
                        placeholder='Select Sender'
                        search
                        selection
                        options={this.state.email_templates}
                        onChange={this.handleEmailTemplate}
                        />
                    </div>
                    <div className="row" style={{justifyContent: 'flex-start', marginBottom: 5}}>
                      <h4>Email Template</h4>
                    </div>
                    <div className="row" style={{marginBottom: 10}}>
                      <Dropdown
                        fluid
                        style={{minWidth: 250}}
                        placeholder='Select Attachment'
                        search
                        selection
                        options={this.state.email_templates}
                        onChange={this.handleEmailTemplate}
                        />
                    </div>
                  </div>
                    </Segment>
                    <Segment>
                      <div className="column">

                        <div className="row" style={{justifyContent: 'flex-start', marginBottom: 5}}>
                          <h4 style={{paddingRight: 10}}>Attachment</h4>
                            <Checkbox
                              toggle
                              onClick={() => {this.setState({attachment: this.state.attachment ? false : true})}}
                              checked={this.state.attachment}
                              />
                        </div>
                        {this.state.attachment &&
                          <div className="row" style={{marginBottom: 10}}>
                            <Dropdown
                              fluid
                              style={{minWidth: 250}}
                              placeholder='Select Attachment'
                              search
                              selection
                              options={this.state.attachments}
                              onChange={this.handleAttachments}
                              />
                          </div>
                        }
                        <div className="row" style={{justifyContent: 'flex-start', marginBottom: 5}}>
                          <h4>Landing Page</h4>
                        </div>
                        <div className="row" style={{marginBottom: 10}}>
                          <Dropdown
                            fluid
                            style={{minWidth: 250}}
                            placeholder='Select Landing Page'
                            search
                            selection
                            options={this.state.landing_pages}
                            onChange={this.handleLandingPage}
                            />
                        </div>
                        <div className="row" style={{justifyContent: 'flex-start', marginBottom: 5}}>
                          <h4>Start Time</h4>
                        </div>
                        <div className="row" style={{justifyContent: 'flex-start', marginBottom: 5}}>
                          <DateTimePicker
                            disableClock
                            onChange={(val, e) => {this.setState({start_time: val})}}
                            value={this.state.start_time}
                          />
                        </div>
                        <div className="row" style={{justifyContent: 'flex-start', marginBottom: 5}}>
                          <h4>Send Emails By (Optional)</h4>
                        </div>
                        <div className="row" style={{justifyContent: 'flex-start', marginBottom: 5}}>
                          <DateTimePicker
                            disableClock
                            onChange={(val, e) => {this.setState({start_time: val})}}
                            value={this.state.start_time}
                          />
                        </div>
                        <div className="row" style={{justifyContent: 'flex-start', marginBottom: 5}}>
                          <h4>End Time (Optional)</h4>
                        </div>
                        <div className="row" style={{justifyContent: 'flex-start', }}>
                          <DateTimePicker
                            disableClock
                            onChange={(val, e) => {this.setState({start_time: val})}}
                            value={this.state.start_time}
                          />
                        </div>
                      </div>
                    </Segment>
                  </Segment.Group>
                </Segment>
                <Segment>
                  <Button.Group fluid style={{opacity: 0.9}}>
                    <Button color="teal">Save</Button>
                    <Button color="red" onClick={this.handleCancel}>Cancel</Button>
                  </Button.Group>
                </Segment>
              </Segment.Group>
              <div style={{flex: 1}}></div>
            </div>
            <div style={{flex: 1}}></div>
            <div style={{flex: 1}}></div>
          </div>
        }
        {!this.state.editor &&
          <div className="column">
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
              <Button
                basic
                content='Create New'
                icon='plus'
                labelPosition='left'
                color="teal"
                onClick={() => {this.setState({editor: true})}}
                />
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
        }
      </div>
    )
  }
}
