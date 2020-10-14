import React, { Component } from 'react'
import Axios from 'axios'
import {Button, Divider, Dropdown, Icon, Input, Label, Menu, Message} from 'semantic-ui-react'
import ReactPrismEditor from "react-prism-editor";
import config from '../../global/config.json'

const API = config.api_url

export default class Templates extends Component{
  constructor(props){
    super(props)
    this.state = {
      editor: true,
      code: "<h1>Edit HTML here!</h1>",
      editor_dark_mode: false,
      template_vars: [
        { key: 'tracking', icon: 'chain', text: 'Tracking URL', value: '%%Tracking_URL%%' },
        { key: 'fname', icon: 'user', text: 'First Name', value: '%%First_Name%%' },
        { key: 'lname', icon: 'user', text: 'Last Name', value: '%%Last_Name%%' },
        { key: 'position', icon: 'user', text: 'Position', value: '%%Position%%' },
        { key: 'group', icon: 'group', text: 'Group Name', value: '%%Group_Name%%' },

      ]
    }
  }
  handleTempVar = (e, {value}) => {
    this.setState({temp_var: value, copied: true})
    setTimeout(() => {
      this.setState({copied: false})
    }, 1500)
    navigator.clipboard.writeText(value)
  }
  handleCopyTempVar = () => {
    this.setState({copied: true})
    setTimeout(() => {
      this.setState({copied: false})
    }, 1500)
    navigator.clipboard.writeText(this.state.temp_var)
  }
  handleInsertTempVar = () => {

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
              <div style={{flex: 3}}>
                <h3>Template Editor</h3>
              </div>
              <div style={{flex: 1}}>
                <div className="row">
                  <Dropdown
                    placeholder='Template Variables'
                    search selection options={this.state.template_vars}
                    onChange={this.handleTempVar}
                    />
                  <span>&nbsp;</span>
                  {this.state.temp_var &&
                    <Button icon="copy" color="teal" onClick={this.handleCopyTempVar}/>
                  }
                </div>
              </div>
              <div style={{flex: 1}}>
                <div className="row">
                  {this.state.copied &&
                    <Message size="mini" color="green">Copied to clipboard</Message>
                  }
                </div>
              </div>
              <div style={{paddingRight: 20}}>
                <Button.Group>
                  <Button basic color="green">Save</Button>
                  <Button basic color="red">Cancel</Button>
                </Button.Group>
              </div>
            </div>
            <Divider />
            <div className="row" style={{height: "80vh"}}>
              <div style={{
                  flex: 1,
                  overflowY: "scroll",
                  height: '100%',
                  opacity: 0.95,
                  padding: 10,
                  background: this.state.editor_dark_mode ? "#2d2d2d" : "#fdf6e3"
                }}
                >
                <Button
                  basic={this.state.editor_dark_mode}
                  inverted={this.state.editor_dark_mode}
                  onClick={() => {this.setState({editor_dark_mode: this.state.editor_dark_mode ? false : true})}}
                  color={this.state.editor_dark_mode ? "yellow" : "grey"}>
                  {this.state.editor_dark_mode ? "Light Mode" : "Dark Mode"}
                </Button> <br /><br />
                <ReactPrismEditor
                  language={"html"}
                  code={this.state.code}
                  theme={this.state.editor_dark_mode ? "tomorrow" : "solarizedlight"}
                  lineNumber={true}
                  readOnly={false}
                  clipboard={true}
                  changeCode={code => {
                    this.setState({code: code})
                  }}
                  />
              </div>
              <div style={{flex: 1}}></div>
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
