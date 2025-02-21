import React, { Component } from 'react'
import Axios from 'axios'
import {Icon, Statistic} from 'semantic-ui-react'

export default class Addresses extends Component{
  constructor(props){
    super(props)
    this.resultRef = React.createRef()
    this.state = {
      scroll_pos: 0,
      scroll_max: 0,
      endpoint: null,
      page: 1,
      has_more: true,
      loading: false,
      results: []
    }
  }
  componentDidMount = () => {
    this.setState({
      token: this.props.token,
      endpoint: this.props.endpoint
    })
    this.setState({token: this.props.token})
    setTimeout(() => {
      this.handleRefresh()
    }, 100)
    setInterval(() => {
      if(this.resultRef.current){
        let st = this.resultRef.current.scrollTop
        if(st !== 0 && st > (this.resultRef.current.scrollTopMax - 10)){
          this.setState({
            last_scroll: st,
            scroll_max: this.resultRef.current.scrollTopMax
          })
          if(this.state.has_more){
            this.collectResults()
          }
        }
      }
    }, 500)
  }
  componentDidUpdate = (prevProps, prevState) => {
    if(prevProps.reload !== this.props.reload && this.props.reload === true){
      this.handleRefresh()
    }
  }
  collectResults = () => {
    this.setState({loading: true})
    Axios.post(this.state.endpoint, {
      token: this.state.token,
      page: this.state.page
    }).then((res) => {
      let page = this.state.page
      let results = this.state.results
      let list = []
      res.data.results.map((p, i) => {
        let obj = {
          key: p.id,
          value: p.id,
          text: p.name
        }
        list.push(obj)
        results.push(p)
        return null
      })
      if(this.props.dropdownList){
        this.props.dropdownList(list)
      }
      let uniq = new Set(results.map(e => JSON.stringify(e)))
      let arr = Array.from(uniq).map(e => JSON.parse(e))
      if(res.data.results.length > 0){
        this.setState({page: page + 1, has_more: true})
      }else{
        this.setState({has_more: false, loading: false})
      }
      setTimeout(() => {
        this.setState({results: arr, loading: false})
        this.props.onCollect(arr)
        this.resultRef.current.scrollTop = this.state.last_scroll
      }, 250)
    })
  }
  handleRefresh = () => {
    this.setState({reloading: true})
    setTimeout(() => {
      Axios.post(this.state.endpoint, {
        token: this.state.token,
        page: 1
      }).then((res) => {
        if(res.data.status === 200){
          this.setState({
            available: true,
            reloading: false,
            results: res.data.results,
            page: 2
          })
          this.props.reloadDone()
          this.props.onCollect(res.data.results)
        }else{
          this.setState({
            available: true,
            reloading: false,
            results: [],
            page: 1
          })
        }
      })
    }, 100)
  }
  render(){
    return(
      <div className="column" ref={this.resultRef} id="profiles" style={{overflow: 'auto'}}>
        {!this.state.reloading && this.state.results.length > 0 && this.props.children}
        {this.state.reloading &&
          <div className="row" style={{flex: 1, height: '100%', alignItems: 'center'}}>
            <Icon size="huge" color="grey" loading name="cog" style={{opacity: 0.75}} />
          </div>
        }{this.state.available && !this.state.reloading && this.state.results.length < 1 &&
          <div className="row" style={{flex: 1, height: '100%', alignItems: 'center', opacity: 0.75}}>
            <Statistic color='green' size="big">
              <Statistic.Value><Icon name="envelope open outline" color="teal"/></Statistic.Value>
              <Statistic.Label>Nothing to see here</Statistic.Label>
            </Statistic>
          </div>
        }
        <div className="row" >
          {this.state.loading &&
            <Icon loading name="spinner" size="big" color="teal"/>
          }
        </div>
      </div>
    )
  }
}
