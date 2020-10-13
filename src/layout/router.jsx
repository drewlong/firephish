import React, { Component } from 'react'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import Cookie from 'universal-cookie'

// Route Components
import Auth from './auth/main.jsx'
import Dashboard from './home/main.jsx'

const cookie = new Cookie()

export default class Router extends Component{
  constructor(props){
    super(props);
    this.state = {
      auth: false
    }
  }
  render(){
    return(
      <div>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Auth} />
            <Route exact path="/dashboard" render={(props) => (
              cookie.get("fp_token") ? (
                <Dashboard {...props} />
              ) : (
                <Redirect to="/"/>
              )
            )}/>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}
