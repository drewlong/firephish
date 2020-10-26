import React, { Component } from 'react'
import {Button, Checkbox, Divider, Dropdown, Icon, Input, Menu, Message} from 'semantic-ui-react'
import { Sandbox } from "react-sandbox-editor"
import PhishingExample from './example.json'

export default class LandingPages extends Component{
  constructor(props){
    super(props)
    this.state = {
      editor: false,
      code: atob(PhishingExample.html),
      template_vars: [
        { key: 'tracking', icon: 'chain', text: 'Tracking URL', value: '%%Tracking_URL%%' },
        { key: 'fname', icon: 'user', text: 'First Name', value: '%%First_Name%%' },
        { key: 'lname', icon: 'user', text: 'Last Name', value: '%%Last_Name%%' },
        { key: 'position', icon: 'user', text: 'Position', value: '%%Position%%' },
        { key: 'group', icon: 'group', text: 'Group Name', value: '%%Group_Name%%' }
      ],
      cb_fail: false,
      editor_dark_mode: true,
      dummy: [
        {}
      ]
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
    }, 2000)
    navigator.clipboard.writeText(this.state.temp_var)
  }
  handleCodeSave = () => {
    this.setState({loading: true, saving: true})
    setTimeout(() => {
      this.setState({loading: false, saving: false, saved: true})
      this.flashSavedBtn()
    }, 2000)
  }
  flashSavedBtn = () => {
    setTimeout(() => {
      this.setState({saved: false})
    }, 1000)
  }
  render(){
    return(
      <div className="dashboard-section" style={{overflowY: "scroll"}}>
        <h1>Landing Pages</h1>
        <Divider horizontal>
            <Icon name="ellipsis horizontal" color={this.state.loading ? "teal" : "grey"} loading={this.state.loading}/>
        </Divider>
        {this.state.editor &&
          <div className="column">
            <Menu pointing>
              <Menu.Item>
                <h3>Page Editor</h3>
              </Menu.Item>
              <Menu.Item>
                <div className="row">
                  <Checkbox
                    toggle
                    checked={this.state.editor_dark_mode}
                    onClick={() => {this.setState({editor_dark_mode: this.state.editor_dark_mode ? false : true})}}
                    />
                  <span>&nbsp;</span>
                  <span>Dark Mode</span>
                </div>
              </Menu.Item>

              <Menu.Item position="right">
                <Button.Group>
                  {this.state.saved &&
                    <Button basic color="green" icon="check" />
                  }{!this.state.saved &&
                    <Button basic={this.state.saving} loading={this.state.saving} color="blue" onClick={this.handleCodeSave}>Save</Button>
                  }
                  <Button
                    color="red"
                    onClick={() => {this.setState({editor: this.state.editor ? false : true})}}
                    >Close</Button>
                </Button.Group>
              </Menu.Item>
            </Menu>
            <div className="row" style={{height: "75vh"}}>
              <div style={{flex: 1}}>
                <Sandbox
                  style={{height: "75vh"}}
                  theme={this.state.editor_dark_mode ? "solarized_dark" : "tomorrow"}
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
        {!this.state.editor &&
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
        }
      </div>
    )
  }
}
