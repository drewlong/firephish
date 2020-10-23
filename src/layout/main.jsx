import React, { Component } from 'react'
import Axios from 'axios'
import config from './global/config.json'
import Cookie from 'universal-cookie'

//Components
import Header from './global/components/header'
import SideBar from './global/components/sidebar'

// Sections
import AddressBook from './address_book/main.jsx'
import Attachments from './attachments/main.jsx'
import Auth from './auth/main.jsx'
import Campaigns from './campaigns/main.jsx'
import EmailTemplates from './email_templates/main.jsx'
import LandingPages from './landing_pages/main.jsx'
import SendingProfiles from './sending_profiles/main.jsx'
import Settings from './settings/main.jsx'
import Statistics from './statistics/main.jsx'
import Training from './training/main.jsx'

// Constants
const API = config.api_url
const cookie = new Cookie()

export default class Dashboard extends Component{
  constructor(props){
    super(props)
    this.state = {
      section: null,
      jwt: null
    }
  }
  componentDidMount = () => {
    this.setState({section: this.props.match.params.section})
    let c = cookie.get('fp_token')
    if(c){
      let jwt = atob(c.split(".")[1])
      this.setState({jwt: jwt, token: c})
    }
  }
  render(){
    return(
      <div className="dashboard-main">
        <Header />
        <SideBar jwt={this.state.jwt}/>
        <div className="dashboard-content">
          {this.state.section == 'addresses' &&
            <AddressBook />
          }
          {this.state.section == 'attachments' &&
            <Attachments />
          }
          {this.state.section == 'campaigns' &&
            <Campaigns />
          }
          {this.state.section == 'templates' &&
            <EmailTemplates />
          }
          {this.state.section == 'landing_pages' &&
            <LandingPages />
          }
          {this.state.section == 'profiles' &&
            <SendingProfiles token={this.state.token}/>
          }
          {this.state.section == 'settings' &&
            <Settings />
          }
          {this.state.section == 'stats' &&
            <Statistics />
          }
          {this.state.section == 'training' &&
            <Training />
          }
        </div>
      </div>
    )
  }
}
