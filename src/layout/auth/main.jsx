import React, { Component } from 'react'
import Axios from 'axios'
import {Button, Input, Message} from 'semantic-ui-react'
import config from '../global/config.json'
import Cookie from 'universal-cookie'
import Logo from '../../img/fplogo_lg.png'
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
    if(errors.length === 0){
      Axios.post(API + 'users/login', {
        username: this.state.username,
        password: this.state.password
      }).then((res) => {
        console.log(res.data)
        if(res.data.status === 200){

          cookie.set("fp_token", res.data.token, {sameSite: 'lax'})
          this.props.history.push('/dashboard/stats')
        }else{
          errors.push("Username or password is incorrect")
          this.setState({errors: errors})
        }
      }).catch((err) => {})
    }
  }
  render(){
    return(
      <div className="auth-main">
      <div className="big_logo">
        <img alt="logo" src={Logo} />
      </div>

        <div className="auth-box">
          <span style={{color: "#ffffff", fontSize: "2em", marginBottom: 20}}>Login</span>
          <Input
            className="auth-input"
            placeholder="Username"
            onChange={(e) => {this.setState({username: e.target.value})}}
            />
          <Input
            className="auth-input"
            placeholder="Password"
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
