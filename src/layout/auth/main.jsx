import React, { Component } from 'react'
import Axios from 'axios'
import {Button, Input, Message} from 'semantic-ui-react'
import config from '../global/config.json'
import Cookie from 'universal-cookie'

const cookie = new Cookie()

const API = config.api_url

export default class Auth extends Component{
  constructor(props){
    super(props)
    this.state = {
      errors: [],
      username: null,
      password: null,
    }
  }
  handleLogin = () => {
    let errors = []
    if(!this.state.username){errors.push("Username cannot be blank")}
    if(!this.state.password){errors.push("Password cannot be blank")}
    this.setState({errors: errors})
    if(errors.length == 0){
      Axios.post(API + 'users/login', {
        username: this.state.username,
        password: this.state.password
      }).then((res) => {
        console.log(res.data)
        cookie.set("fp_token", res.data.token, {sameSite: 'lax'})
      }).catch((err) => {})
    }
  }
  render(){
    return(
      <div className="auth-main">
        <div className="auth-box">
          <h1>Login</h1>
          <Input
            className="auth-input"
            onChange={(e) => {this.setState({username: e.target.value})}}
            />
          <Input
            className="auth-input"
            type="password"
            onChange={(e) => {this.setState({password: e.target.value})}}
            />
          <Button
            fluid
            color="teal"
            onClick={this.handleLogin}
            >Submit
          </Button>
          {this.state.errors.length > 0 &&
            <Message
              style={{width: '100%'}}
              error
              list={this.state.errors}
              />
          }
        </div>
      </div>
    )
  }
}
