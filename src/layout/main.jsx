import React, { Component } from 'react'
import Cookie from 'universal-cookie'

//Components
import Header from './global/components/header'
import SideBar from './global/components/sidebar'

// Sections
import AddressBook from './address_book/main.jsx'
import Attachments from './attachments/main.jsx'
import Campaigns from './campaigns/main.jsx'
import EmailTemplates from './email_templates/main.jsx'
import LandingPages from './landing_pages/main.jsx'
import SendingProfiles from './sending_profiles/main.jsx'
import Settings from './settings/main.jsx'
import Statistics from './statistics/main.jsx'
import Training from './training/main.jsx'

// Constants
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
          {this.state.section === 'addresses' &&
            <AddressBook token={this.state.token} />
          }
          {this.state.section === 'attachments' &&
            <Attachments  token={this.state.token}/>
          }
          {this.state.section === 'campaigns' &&
            <Campaigns  token={this.state.token}/>
          }
          {this.state.section === 'templates' &&
            <EmailTemplates  token={this.state.token}/>
          }
          {this.state.section === 'landing_pages' &&
            <LandingPages  token={this.state.token}/>
          }
          {this.state.section === 'profiles' &&
            <SendingProfiles token={this.state.token}/>
          }
          {this.state.section === 'settings' &&
            <Settings  token={this.state.token}/>
          }
          {this.state.section === 'stats' &&
            <Statistics  token={this.state.token}/>
          }
          {this.state.section === 'training' &&
            <Training  token={this.state.token}/>
          }
        </div>
      </div>
    )
  }
}
