import React, { Component } from 'react'
import Axios from 'axios'
import {Button, Checkbox, Divider, Dropdown, Icon, Input, Label, Menu, Message, Segment} from 'semantic-ui-react'
import { Sandbox, withDependencies } from "react-sandbox-editor"
import config from '../../global/config.json'

const API = config.api_url

export default class Templates extends Component{
  constructor(props){
    super(props)
    this.state = {
      editor: false,
      code: "<h1>Edit HTML here!</h1>",
      template_vars: [
        { key: 'tracking', icon: 'chain', text: 'Tracking URL', value: '%%Tracking_URL%%' },
        { key: 'fname', icon: 'user', text: 'First Name', value: '%%First_Name%%' },
        { key: 'lname', icon: 'user', text: 'Last Name', value: '%%Last_Name%%' },
        { key: 'position', icon: 'user', text: 'Position', value: '%%Position%%' },
        { key: 'group', icon: 'group', text: 'Group Name', value: '%%Group_Name%%' }
      ],
      cb_fail: false
    }
  }
  handleTempVar = (e, {value}) => {
    this.setState({temp_var: value})
    setTimeout(() => {
      this.setState({copied: false})
    }, 1500)
    if(navigator.clipboard){
      navigator.clipboard.writeText(value).then((r) => {}).catch((e) => {})
      this.setState({copied: true})
    }else{
      this.setState({cb_fail: true})
    }
  }
  handleCopyTempVar = () => {
    this.setState({copied: true})
    setTimeout(() => {
      this.setState({copied: false})
    }, 1500)
    navigator.clipboard.writeText(this.state.temp_var)
  }
  render(){
    return(
      <div className="dashboard-section" style={{overflowY: "scroll"}}>
        <h1>Email Templates</h1>
        <Divider horizontal>
            <Icon name="ellipsis horizontal" color={this.state.loading ? "teal" : "grey"} loading={this.state.loading}/>
        </Divider>
        {this.state.editor &&
          <div className="column">
            <div className="row">
              <div style={{flex: 1}}>
                <h3>Template Editor</h3>
              </div>
              <div style={{flex: 1}}>
                <Button color="grey">Dark Mode</Button>
              </div>
              <div style={{flex: 1}}>
                <div className="row">
                  <Dropdown
                    fluid
                    placeholder='Select Template Variable'
                    search selection options={this.state.template_vars}
                    onChange={this.handleTempVar}
                    />
                  <span>&nbsp;</span>
                  {this.state.temp_var && !this.state.cb_fail &&
                    <Button icon="copy" color="teal" onClick={this.handleCopyTempVar}/>
                  }
                </div>
              </div>
              <div style={{flex: 1}}>
                  {this.state.copied &&
                    <div className="row">
                      <Message size="mini" color="green">Copied to clipboard</Message>
                    </div>
                  }{this.state.cb_fail && this.state.temp_var &&
                    <Input fluid value={this.state.temp_var} />
                  }
              </div>
              <div style={{padding: "0 20px 0 5px"}}>
                <Button.Group>
                  <Button basic color="green">Save</Button>
                  <Button basic color="red">Cancel</Button>
                </Button.Group>
              </div>
            </div>
            <Divider />
            <div className="row" style={{height: "80vh"}}>
              <div style={{flex: 1}}>
                <Sandbox
                  style={{height: "80vh"}}
                  theme="solarized_dark"
                  templateEditor={{
                    defaultValue: this.state.code,
                    mode: 'html',
                    readOnly: false,
                    wrapLines: false
                  }}
                  scriptEditor={{readOnly: true}}
                  stylesheetEditor={{readOnly: true}}
                  executeOnCodeChange={true}
                  onCodeChange={(name, val) => {this.setState({code: val})}}
                />
              </div>
            </div>
          </div>
        }
        <Menu pointing>
          <Menu.Item>
            <Button
              basic
              content='Create New'
              icon='plus'
              labelPosition='left'
              color="teal"
              onClick={() => {this.setState({editor: this.state.editor ? false : true})}}
              />
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}
