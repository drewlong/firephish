import React, { Component } from 'react'
import Axios from 'axios'
import Moment from 'moment'
import {Button, Checkbox, Divider, Dropdown, Icon, Input, Menu, Segment} from 'semantic-ui-react'
import DateTimePicker from 'react-datetime-picker';
import config from '../global/config.json'

// Components
import CampaignCard from './components/card.jsx'
import InfiniteScroll from '../global/components/infinite_scroll'

//Constants
const API = config.api_url

export default class Campaigns extends Component{
  constructor(props){
    super(props)
    this.state = {
      blanks: [],
      campaigns: [],
      reload: false,
      loading: true,
      activeItem: 'active',
      editor: false,
      attachment: false,
      landing_pages: [
        {key: 'basic', text: 'Generic', value: 'basic' },
       { key: 'microsoft', text: 'Microsoft Password Reset', value: 'microsoft' }
      ],
      start_time: Moment().format(),
      send_date: false,
      end_date: false,
      senders: []
    }
  }
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({loading: false})
    }, 2000)
    this.setState({token: this.props.token})
    setTimeout(() => {this.collectSenders()}, 100)
  }
  handleItemClick = (e) => {
    this.setState({
      activeItem: e
    })
  }
  handleCampaignCreate = () => {
    this.setState({blanks: []})
    let blanks = this.checkFields()
    blanks = []
    this.setState({blanks: blanks})
    if(blanks.length === 0){
      Axios.post(API + 'campaigns/new', {
        token: this.state.token,
        campaign_data: {
        name: this.state.name,
        domain: this.state.domain,
        sender: this.state.sender,
        template: this.state.template,
        attachment: this.state.attachment,
        landing_page: this.state.landing_page,
        start_time: this.state.start_time,
        send_by: this.state.send_by,
        completed_at: this.state.completed_at
      }
      }).then((res) => {
        console.log(res.data)
      })
    }
  }
  checkFields = () => {
    let blanks = []
    let fields = [
      "name", "domain", "sender", "template",
      "landing_page", "start_time"
    ]
    fields.map((f, i) => {
      if(!this.state[f]){blanks.push(f)}
      return null
    })
    return blanks
  }
  handleEmailTemplate = () => {
    this.setState({blanks: []})
  }
  collectSenders = () => {
    Axios.post(API + 'senders/collect', {
      token: this.state.token
    }).then((res) => {
      let senders = []
      res.data.results.map((s, i) => {
        let rec = {
          key: s.id,
          text: s.name,
          value: s.from
        }
        senders.push(rec)
        return null
      })
      this.setState({senders: senders})
    })
  }
  handleSwitchView = () => {
    let editor = this.state.editor ? false : true
    if(editor && this.state.senders === []){
        this.collectSenders()
    }
    if(!editor){
      this.setState({
        start_time: null,
        end_time: null,
        send_by_time: null,
        attachment: false,
        blanks: []
      })
    }
    this.setState({editor: editor})
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
                      <Input
                        style={{flex: 1}}
                        value={this.state.name}
                        onChange={(e) => {this.setState({name: e.target.value, blanks:[]})}}
                        error={this.state.blanks.includes("name")}
                        />
                    </div>
                    <div className="row" style={{justifyContent: 'flex-start', marginBottom: 5}}>
                      <h4>Phishing Domain</h4>
                    </div>
                    <div className="row" style={{marginBottom: 10}}>
                      <Input
                        style={{flex: 1}}
                        value={this.state.domain}
                        onChange={(e) => {this.setState({domain: e.target.value, blanks:[]})}}
                        error={this.state.blanks.includes("domain")}
                        placeholder="IP or URL of webserver"/>
                    </div>
                    <div className="row" style={{justifyContent: 'flex-start', marginBottom: 5}}>
                      <h4>Sender</h4>
                    </div>
                    <div className="row" style={{marginBottom: 10}}>
                      <Dropdown
                        error={this.state.blanks.includes("sender")}
                        fluid
                        style={{minWidth: 250}}
                        placeholder='Select Sender'
                        search
                        selection
                        options={this.state.senders}
                        value={this.state.sender}
                        onChange={(e, obj) => {this.setState({sender: obj.value})}}
                        />
                    </div>
                    <div className="row" style={{justifyContent: 'flex-start', marginBottom: 5}}>
                      <h4>Email Template</h4>
                    </div>
                    <div className="row" style={{marginBottom: 10}}>
                      <Dropdown
                        error={this.state.blanks.includes("template")}
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
                            error={this.state.blanks.includes("landing_page")}
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
                            error={this.state.blanks.includes("start_time")}
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
                            onChange={(val, e) => {this.setState({send_by: val})}}
                            value={this.state.send_by}
                          />
                        </div>
                        <div className="row" style={{justifyContent: 'flex-start', marginBottom: 5}}>
                          <h4>End Time (Optional)</h4>
                        </div>
                        <div className="row" style={{justifyContent: 'flex-start', }}>
                          <DateTimePicker
                            disableClock
                            onChange={(val, e) => {this.setState({completed_at: val})}}
                            value={this.state.completed_at}
                          />
                        </div>
                      </div>
                    </Segment>
                  </Segment.Group>
                </Segment>
                <Segment>
                  <Button.Group fluid style={{opacity: 0.9}}>
                    <Button color="teal" onClick={this.handleCampaignCreate}>Save</Button>
                    <Button color="red" onClick={() => {this.handleSwitchView()}}>Cancel</Button>
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
                onClick={this.handleSwitchView}
                />
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item>
                <Input icon='search' placeholder='Search...' />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
          {this.state.activeItem === 'active' &&
              <InfiniteScroll
                endpoint={API + 'campaigns/collect'}
                token={this.props.token}
                onCollect={(e) => {this.setState({campaigns: e})}}
                reload={this.state.reload}
                reloadDone={() => {this.setState({reload: false})}}
                >
                {this.state.campaigns.map((c, i) => {
                  return(
                    <CampaignCard campaign={c} />
                  )
                })}
              </InfiniteScroll>
          }{this.state.activeItem === 'inactive' &&
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
