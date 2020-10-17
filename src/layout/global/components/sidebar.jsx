import React, { Component } from 'react'
import {Button, Icon} from 'semantic-ui-react';

export default class Sidebar extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  handleNav = (s) => {
    window.location = '/dashboard/' + s
  }
  componentDidUpdate = (prevProps) => {
    if(this.props.jwt !== prevProps.jwt){
      if(this.props.jwt){
        let jwt = JSON.parse(this.props.jwt)
        this.setState({user: jwt.username})
      }
    }
  }
  render(){
    return(
      <div className="sidebar">
        <div className="sidebar-item" onClick={() => {this.handleNav('stats')}}>
          <Icon name="line graph" inverted /> &nbsp; Stats
        </div>
        <div className="sidebar-item" onClick={() => {this.handleNav('campaigns')}}>
          <Icon name="flag" inverted /> &nbsp; Campaigns
        </div>
        <div className="sidebar-item" onClick={() => {this.handleNav('profiles')}}>
          <Icon name="address card" inverted /> &nbsp; Sending Profiles
        </div>
        <div className="sidebar-item" onClick={() => {this.handleNav('templates')}}>
          <Icon name="mail" inverted /> &nbsp; Email Templates
        </div>
        <div className="sidebar-item" onClick={() => {this.handleNav('landing_pages')}}>
          <Icon name="image" inverted /> &nbsp; Landing Pages
        </div>
        <div className="sidebar-item" onClick={() => {this.handleNav('attachments')}}>
          <Icon name="file code" inverted /> &nbsp; Attachments
        </div>
        <div className="sidebar-item" onClick={() => {this.handleNav('training')}}>
          <Icon name="idea" inverted /> &nbsp; Training
        </div>
        <div className="sidebar-item" onClick={() => {this.handleNav('addresses')}}>
          <Icon name="address book" inverted /> &nbsp; Address Book
        </div>
        <div className="sidebar-item" onClick={() => {this.handleNav('settings')}}>
          <Icon name="cog" inverted /> &nbsp; Settings
        </div>
        <div className="logout-btn">
        <p>
          Logged in as &nbsp;
          <strong style={{color: "#43a047"}}>
            {this.state.user} <br />
          </strong>
        </p>
          <Button fluid inverted color="teal">Logout</Button>
        </div>
      </div>
    )
  }
}
