import React, { Component } from 'react'
import {Button, Divider, Icon, Input, Menu, Segment} from 'semantic-ui-react'
import SlideEditor from './components/slide_editor.jsx'

export default class Training extends Component{
  constructor(props){
    super(props)
    this.state = {
      section: 'Main',

      slide_editor: false,
      code: "<h1>Edit HTML here!</h1>",
      editor_dark_mode: true
    }
  }
  render(){
    return(
      <div className="dashboard-section">
        <h1>Training {this.state.section === 'Main' ? "" : ` > ${this.state.section}`}</h1>
        <Divider horizontal>
            <Icon name="ellipsis horizontal" color={this.state.loading ? "teal" : "grey"} loading={this.state.loading}/>
        </Divider>
        {this.state.section === "Main" &&
          <div className="column" style={{height: 'calc(100% - 100px)', background: "#cfd8dc"}}>
          <div style={{flex: 1}} />
          <div className="row" style={{width: "100%", alignItems: 'center'}}>
            <div className="row" style={{alignItems: 'center'}}>
              <Segment
                circular
                color="teal"
                style={{width: 250, height: 250, cursor: 'pointer'}}
                onClick={() => {this.setState({section: 'Slides'})}}
                >
                <div className="column" style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                  <Icon name="image" size="huge" color="teal"/>
                  <h3>Slides</h3>
                </div>
              </Segment>
            </div>
            <div className="row" style={{alignItems: 'center'}}>
              <Segment
                circular
                color="orange"
                style={{width: 250, height: 250, cursor: 'pointer'}}
                onClick={() => {this.setState({section: 'Questions'})}}
                >
                <div className="column" style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                  <Icon name="pencil" size="huge" color="orange"/>
                  <h3>Questions</h3>
                </div>
              </Segment>
            </div>
            <div className="row" style={{alignItems: 'center'}}>
              <Segment
                circular
                color="grey"
                style={{width: 250, height: 250, cursor: 'pointer'}}
                onClick={() => {this.setState({section: 'Settings'})}}
                >
                <div className="column" style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                  <Icon name="cog" size="huge" color="grey"/>
                  <h3>Settings</h3>
                </div>
              </Segment>
            </div>
          </div>
          <div style={{flex: 1}} />
        </div>
      }{this.state.section === 'Slides' &&
        <div className="column" style={{height: 'calc(100% - 100px)'}}>
          {this.state.slide_editor &&
            <div className="column">
              <Menu pointing>
                <Menu.Item>
                  <h3>Slide Editor</h3>
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
              <div className="column" style={{alignItems: 'center', overflowY: 'scroll'}}>
                <div className="row" style={{height: "75vh", width: '90%'}}>
                  <div style={{flex: 1}}>
                    <SlideEditor />
                  </div>
                </div>
              </div>
            </div>
          }
          {!this.state.slide_editor &&
            <Menu pointing>
              <Menu.Item>
                <Button
                  basic
                  content='Create New'
                  icon='plus'
                  labelPosition='left'
                  color="teal"
                  onClick={() => {this.setState({slide_editor: this.state.slide_editor ? false : true})}}
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
      }{this.state.section === 'Questions' &&
        <div className="column" style={{height: 'calc(100% - 100px)'}}>
        Questions
        </div>
      }{this.state.section === 'Settings' &&
        <div className="column" style={{height: 'calc(100% - 100px)'}}>
          Settings
        </div>
      }
      </div>
    )
  }
}
