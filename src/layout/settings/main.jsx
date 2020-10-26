import React, { Component } from 'react'
import {Divider, Icon} from 'semantic-ui-react'

export default class Settings extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  render(){
    return(
      <div className="dashboard-section">
        <h1>Settings</h1>
        <Divider horizontal>
            <Icon name="ellipsis horizontal" color={this.state.loading ? "teal" : "grey"} loading={this.state.loading}/>
        </Divider>
      </div>
    )
  }
}
