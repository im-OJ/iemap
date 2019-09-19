//AIzaSyBEcm6B-_364Pb4t12WRm5qtWjg4Oki_aM
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Polyline from 'google-map-react';

import Marker from './Marker/Marker.js';
const google = window.google;

let lines = [];
let markerClicked = -1;
class MyMap extends Component {
  static defaultProps = {
    center: {
      lat: 40,
      lng: 90,
    },
    zoom: 15,
  };
  constructor(props) {
    super(props);
    this.markerList = null;
    this.state = ({
      pathCoordinates: [
        { lat: 50, lng: 1 },
        { lat: 50.1, lng: 1.1 },
      ],
      map: undefined,
      clickedMarker: -1,
     
    });

  }

  handleApiLoaded(map, maps) {
    this.setState({ map: map });
    new google.maps.Circle({
      strokeColor: '#4DA3FF',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#4DA3FF',
      fillOpacity: 0.05,
      map,
      center: this.props.center,
      cursor: "default",
      radius: 1000,
    });

    //draw lines



  }

  getLat(id) {
    let markersToDraw = this.props.markersToDraw;
    for (let i = 0; i < markersToDraw.length; i++) {
      if (markersToDraw[i].ID == id) {
        return parseFloat(markersToDraw[i].lat);
      }
    }
    return 0;
  }

  getLng(id) {
    let markersToDraw = this.props.markersToDraw;
    for (let i = 0; i < markersToDraw.length; i++) {
      if (markersToDraw[i].ID == id) {
        return parseFloat(markersToDraw[i].lng);
      }
    }
    return 0;
  }

  render() {

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100%', width: '100%' }} >
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBEcm6B-_364Pb4t12WRm5qtWjg4Oki_aM" }}
          center={this.props.center}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}


        >

          {this.generateMarkers()}
        </GoogleMapReact>
      </div>
    );


  }

  generateMarkers() {
    let output = [];
    let markersToDraw = this.props.markersToDraw;
    for (let i = 0; i < markersToDraw.length; i++) {
      console.log("a");
      console.log(markersToDraw[i].lng)
      output.push(this.createMarker(markersToDraw[i].ID, markersToDraw[i].lat, markersToDraw[i].lng, markersToDraw[i].category, markersToDraw[i].name));
    }
    
    //POLYLINES
    
    this.drawLines();

    return output;

  }

  drawLines(){
    let links = this.props.links;
    //clear lines
    for(let i = 0; i < lines.length; i++){
      lines[i].setMap(null);
    }
    lines = [];


    for (let i = 0; i < links.length; i++) {
      //SHOW ON CLICK ONLY
      if(links[i][0] !== markerClicked && links[i][1] !== markerClicked){
        
      }else{
        console.log("FOUND LINK")
        let latA = this.getLat(links[i][0]);
        let lngA = this.getLng(links[i][0]);
        let latB = this.getLat(links[i][1]);
        let lngB = this.getLng(links[i][1]);;

        if(latA == 0 || latB == 0 || lngA == 0 || lngB == 0){
          break;
        }

        console.log(latA + ", " + latB);
        var flightPlanCoordinates = [
          { lat: latA, lng: lngA },
          { lat: latB, lng: lngB }
        ];
        lines.push(new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: false,
          strokeColor: '#52d83a',
          strokeOpacity: 0.5,
          strokeWeight: 2,
          
        }));
        console.log("drawing link: " + latA + "," + lngA);
        console.log("drawing link: " + latB + "," + lngB);
    }
    }


    for(let i = 0; i < lines.length; i++){
      lines[i].setMap(this.state.map);
    }
  }

  createMarker(key, lat, lng, type, text) {
    console.log("create marker " + lat + lng + type);
    return (
      <Marker
        lat={lat}
        lng={lng}
        type={type}
        text={text}
        key={key}
        onClick={() => this.markerClick(key)}
      />
    );
  }

  markerClick(i) {
    this.setState({markerClicked: i});
    markerClicked = i;
    console.log("pressed" + i);
    this.props.markerClicked(i);
  }

}

export default MyMap;