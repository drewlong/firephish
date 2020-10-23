import React, { Component } from 'react'
import Axios from 'axios'
import config from '../global/config.json'

// Components
const API = config.api_url

export default class Addresses extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  render(){
    return(
      <div className="dashboard-section">
      Address Book
      </div>
    )
  }
}
