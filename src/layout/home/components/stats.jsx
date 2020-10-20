import React, { Component } from 'react'
import Axios from 'axios'
import MapGL, {Marker} from 'react-map-gl';
import {Divider, Icon,Segment, Statistic} from 'semantic-ui-react'
import config from '../../global/config.json'
import MARKER_STYLE from './marker_style';
import dummy from './map_dummy_data.json'
const API = config.api_url

export default class Stats extends Component{
  constructor(props){
    super(props)
    this.mapRef = React.createRef()
    this.chartRef = React.createRef()
    this.state = {
      viewport: {
        latitude: 37.729,
        longitude: -122.36,
        zoom: 11,
        bearing: 0,
        pitch: 50
      },
      loading: true
    }
  }
  componentDidMount = () => {
    let token = setInterval(() => {
      let viewport = this.state.viewport
      let c = this.mapRef.current
      let ch = this.chartRef.current
      if(c){
        viewport.width = c.offsetWidth
        viewport.height = c.offsetHeight
        this.setState({viewport: viewport})
      }
      if(ch){
        this.setState({
          chartWidth: ch.offsetWidth,
          chartHeight: ch.offsetHeight
        })
      }
    }, 250)
    this.genData(3, "sent_line")
    this.genData(2, "opened_line")
    this.genData(1, "clicked_line")
  }
  genData = (x, v) => {
    let data = []
    let max = 1000 * x
    let min = 1 * ((x - 1) * 1000)
    for(let i = 0; i < 18; i++){
      let datum = {
        y: Math.floor(Math.random() * (max - min + 1)) + min,
        x: i
      }
      data.push(datum)
    }
    this.setState({[v]: data})
  }
  _onViewportChange = viewport => this.setState({viewport});

  _renderMarker(station, i) {
      const {name, coordinates} = station;
      return (
        <Marker
          key={i}
          longitude={coordinates[0]}
          latitude={coordinates[1]}
          captureDrag={false}
          captureDoubleClick={false}
        >
          <div className="station">
            <span>{name}</span>
          </div>
        </Marker>
      );
    }
  render(){
    return(
      <div className="dashboard-section">
        <h1>Statistics</h1>
        <Divider horizontal>
            <Icon name="ellipsis horizontal" color={this.state.loading ? "teal" : "grey"} loading={this.state.loading}/>
        </Divider>
        <div className="column" style={{background: "#cfd8dc"}}>
          <div className="row" style={{flex: 1}}>
            <Segment style={{flex: 1, margin: 10}}>
              <div className="column" style={{height: '40vh'}}>
                <div className="row" style={{flex: 1}}>
                  <div className="column" style={{flex: 1, justifyContent: 'center', borderBottom: 'solid 1px #cfd8dc', borderRight: 'solid 1px #cfd8dc'}}>
                    <Statistic color='red'>
                      <Statistic.Value>28%</Statistic.Value>
                      <Statistic.Label>Overall Fail Rate</Statistic.Label>
                    </Statistic>
                  </div>
                  <div className="column" style={{flex: 1, justifyContent: 'center',  borderBottom: 'solid 1px #cfd8dc'}}>
                    <Statistic color='yellow'>
                      <Statistic.Value>87%</Statistic.Value>
                      <Statistic.Label>Overall Open Rate</Statistic.Label>
                    </Statistic>
                  </div>
                </div>
                <div className="row" style={{flex: 1}}>
                  <div className="column" style={{flex: 1, justifyContent: 'center'}}>
                    <Statistic color='green'>
                      <Statistic.Value>22.8K</Statistic.Value>
                      <Statistic.Label>Total Emails Sent</Statistic.Label>
                    </Statistic>
                  </div>
                  <div className="column" style={{flex: 1, justifyContent: 'center', borderLeft: 'solid 1px #cfd8dc'}}>
                    <Statistic color='blue'>
                      <Statistic.Value>18</Statistic.Value>
                      <Statistic.Label>Total Campaigns</Statistic.Label>
                    </Statistic>
                  </div>
                </div>
              </div>
            </Segment>
            <Segment style={{flex: 1, margin: 10}} ref={this.mapRef}>
              <div className="column" style={{height: '40vh'}} ref={this.mapRef}>
                {this.state.viewport.width &&
                  <MapGL
                    {...this.state.viewport}
                    width="100%"
                    height="100%"
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                    onViewportChange={this._onViewportChange}
                    mapboxApiAccessToken="pk.eyJ1IjoiZHJld2xvbmciLCJhIjoiY2s1OW02MGtlMHF5NTNnbzRyaHR5eTV3dyJ9.AhTZ6eDx09oegc4R8MND2Q"
                    >
                    <style>
                      {MARKER_STYLE}
                    </style>
                    {dummy.map(this._renderMarker)}
                  </MapGL>
                }
              </div>
            </Segment>
          </div>
          <div className="row" style={{flex: 1}}>
            <Segment style={{height: '36vh', flex: 1, margin: "0 10px 0 10px"}}>
              <div className="column" style={{height: '100%', flex: 1}} ref={this.chartRef}>
                {this.chartRef.current &&
                  <div></div>

                }
              </div>

            </Segment>
          </div>
        </div>
      </div>
    )
  }
}
