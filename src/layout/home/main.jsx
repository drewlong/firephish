import React, { Component } from 'react'
import Axios from 'axios'
import config from '../global/config.json'
import Cookie from 'universal-cookie'

//Components
import Header from '../global/components/header'
import SideBar from '../global/components/sidebar'

// Sections
import Stats from './components/stats'
import Campaigns from './components/campaigns'
import Profiles from './components/profiles'
import Templates from './components/templates'
import LandingPages from './components/landing_pages'
import Attachments from './components/attachments'
import Training from './components/training'
import Addresses from './components/addresses'
import Settings from './components/settings'

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
      this.setState({jwt: jwt})
    }
  }
  render(){
    return(
      <div className="dashboard-main">
        <Header />
        <SideBar jwt={this.state.jwt}/>
        <div className="dashboard-content">
          {this.state.section == 'stats' &&
            <Stats />
          }
          {this.state.section == 'campaigns' &&
            <Campaigns />
          }
          {this.state.section == 'profiles' &&
            <Profiles />
          }
          {this.state.section == 'templates' &&
            <Templates />
          }
          {this.state.section == 'landing_pages' &&
            <LandingPages />
          }
          {this.state.section == 'attachments' &&
            <Attachments />
          }
          {this.state.section == 'training' &&
            <Training />
          }
          {this.state.section == 'addresses' &&
            <Addresses />
          }
          {this.state.section == 'settings' &&
            <Settings />
          }
        </div>
      </div>
    )
  }
}
