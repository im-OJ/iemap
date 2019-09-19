import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
// import {  Row, Col } from 'reactstrap';
import './App.css';
import MyMap from './components/MyMap/MyMap.js'
import MyMenu from './components/MyMenu/MyMenu.js'
import MyApp from './components/MyApp.js'
import MyInfo from './components/MyInfo/MyInfo.js'
import Geocode from "react-geocode";
import data from "./ExampleDataJSON.json";
import links from "./links.json"
import Draggable from 'react-draggable'; // The default
import { DraggableCore } from 'react-draggable'; // <DraggableCore>
import ReactDOM from 'react-dom';

//**************STYLE************** */

const theme = {
  primary: 'teal',
  secondary: 'green',
  font: 'sans-serif',
}

const Block = styled.div`
  width:100%;
  height:100%;
  padding:0px;
  margin:0px;
`

const Container = styled.div`
  width:100vw;
  height:100vh;
  background:white;
  -webkit-touch-callout: none; /* iOS Safari */
-webkit-user-select: none; /* Safari */
 -khtml-user-select: none; /* Konqueror HTML */
   -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                              supported by Chrome and Opera */
                              

`
const DragBar = styled.div`
  padding:10px;
  margin:0px;
  height:10px;
  width:100%;
  background:#007BFF;
  opacity:0.7;
`
const HR = styled.hr`
  padding: 10px;
`
const Row = styled.div`
  display:flex;
  width:100%;
`

const ColMenu = styled.div`
  position: absolute;
  left:20px;
  top: 5px;
  z-index: 10;
  max-width: 350px;
  width:100%;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  -ms-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  -o-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  -webkit-transition: all 0.25s ease-in-out;
  -moz-transition: all 0.25s ease-in-out;
  -ms-transition: all 0.25s ease-in-out;
  -o-transition: all 0.25s ease-in-out;
  transition: all 0.25s ease-in-out;
  &:hover{
    -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  -moz-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  -ms-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  -o-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
  

  
`
const ColMap = styled.div`
  width:100%;
  max-width: 100%;
  flex-grow: 1;
`

const ColInfoBox = styled.div`
    max-width: 400px;
    width:100%;
    top:15%;
    border-width:10px;
    position: absolute;
    background: white;
    z-index: 10;
    right:10px;
    top: 10px;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  -ms-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  -o-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);


  &:hover{
    -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  -moz-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  -ms-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  -o-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
`

//Chalvey, slough
//moreton in the marsh

//************************** */
//********** CLASS **************** */
//************************** */

Geocode.setApiKey("AIzaSyBEcm6B-_364Pb4t12WRm5qtWjg4Oki_aM");
let filters = {};


class App extends Component {
  componentWillMount() {
    document.body.style.overflow = "hidden";
    document.body.style.marginRight = "25px";
}

  eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };

  constructor(props) {
    super(props);
    this.state = {
      lat: 51.5087323,
      lng: -0.614499,
      markersToDraw: [],
      infoHidden: true,
      infoID: -1,
      infoDisplay: "?",
      numMarkers: 99999,
    };
    this.search = this.search.bind(this);
    this.filterUpdate = this.filterUpdate.bind(this);
    this.markerClicked = this.markerClicked.bind(this);

  }
  async componentDidMount() {
    console.log(data[0].name)
    this.dataCycle();
    this.filterUpdate("x","y");
  }

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Row style={{ height: '100%', width: '100%', padding: '0', margin: '0' }}>
            <ColMenu className="noSpace">
              <Block>
              <Draggable bounds="body"  handle="strong" {...dragHandlers}>
              <ColInfoBox style={{ display: this.state.infoDisplay }}>
                <Block>
                  <div className="box no-cursor">
                    <strong className="cursor"><DragBar></DragBar></strong>
                    <MyMenu parentCallback={this.filterUpdate} search={this.search} ></MyMenu>
                  </div>
                </Block>
              </ColInfoBox>
            </Draggable>
                
              </Block>
            </ColMenu>
            <ColMap className="noSpace">
              <Block other>
                <MyMap links={links} markerClicked={this.markerClicked} markersToDraw={this.state.markersToDraw} center={{ lat: this.state.lat, lng: this.state.lng }}></MyMap>
              </Block>
            </ColMap>
            <Draggable bounds="body"  handle="strong" {...dragHandlers}>
              <ColInfoBox style={{ display: this.state.infoDisplay }}>
                <Block>
                  <div className="box no-cursor">
                    <strong className="cursor"><DragBar></DragBar></strong>
                    <MyInfo data={data} ID={this.state.infoID} style={{ top: "-15px" }}></MyInfo>
                  </div>
                </Block>
              </ColInfoBox>
            </Draggable>
          </Row>
        </Container>
      </ThemeProvider>
    );
  }

  markerClicked(id) {
    console.log("info display: " + this.state.infoDisplay);
    console.log("got click in master " + id);
    this.setState({
      infoID: id,
      infoDisplay: "?"
    })
    console.log("info display: " + this.state.infoDisplay);
    if (this.state.infoDisplay == "none") {
      this.setState({
        infoDisplay: "?"
      })
    }
  }
  async setMapLocationAddr(addr) {
    let response = await Geocode.fromAddress(addr)
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);
    await this.setMapLocation(lat, lng);
  }

  async search(e) {

    const formData = new FormData(e.target)
    console.log("search");

    e.preventDefault();
    console.log(formData.get('s'));
    let s = formData.get('s');

    let response = await Geocode.fromAddress(s)
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);
    await this.setMapLocation(lat, lng);


  }

  async setMapLocation(mylat, mylng) {
    this.setState({
      lat: mylat,
      lng: mylng
    });
    console.log("lat" + this.state.lat);

  }

  filterUpdate(name, value) {
    console.log("i got it");
    console.log(name + value);
    filters[name] = value;
    console.log(filters);

    this.dataCycle();

  }

  doesCategoryPass(obj) {
    let category = obj.category.replace(/\s/g, '');
    if (filters["Category" + category] == undefined) {
      return true;
    }

    if (filters["Category" + category] == true) {
      return true;
    }

    if (filters["Category" + category] == false) {
      return false;
    }
  }

  filterCheck(obj) {
    //todo more filters here
    return this.doesCategoryPass(obj);
  }

  //cycles through JSOn objects and checks them against filters
  dataCycle() {
    let myMarkersToDraw = [];
    let count = 0;
    let limit = this.state.numMarkers;

    let num = -1;
    // Demo TODO: remove
    if(filters["DemonstrationNow"] == true){
      num = 5;
    }

    if(filters["DemonstrationIn12weeks"] == true){
      num = 12;
    }

    if(filters["DemonstrationIn24weeks"] == true){
      num = 9999;
    }

    limit = num;


    for (let i = 0; i < data.length; i++) {
      let currentObj = data[i];
      count++;
      if(count < limit){
        if (this.filterCheck(currentObj)) {
          myMarkersToDraw.push(currentObj);
        }
      }
    }
    this.setState({
      markersToDraw: myMarkersToDraw,
    })
  }

}



export default App;


