import React, { Component } from 'react'
import Logo from '../../../img/fplogo_sm.png'

export default class Header extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  render(){
    return(
      <div className="header">
        <div className="small_logo">
          <img src={Logo} />
        </div>
      </div>
    )
  }
}
