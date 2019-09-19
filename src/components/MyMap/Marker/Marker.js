
import React, { Component } from 'react';
import './Marker.css'
import personIcon from './icons/Other.png';
import businessIcon from './icons/Social.png';
import socialIcon from './icons/Social.png';
import educationIcon from './icons/Education.png';
import transportIcon from './icons/Transport.png';
import sportIcon from './icons/Sport&Health.png';
import housingIcon from './icons/Housing.png';
import mediaIcon from './icons/Media.png';
import healthIcon from './icons/Health.png';
import proIcon from './icons/ProfessionalServices.png';
import politicalIcon from './icons/Political.png';
import styled, {ThemeProvider} from 'styled-components';

const Img = styled.img`
    height:100%;
    width:100%;
`
        
const Text = styled.p`
    text-align: center;
    position:absolute;
    left:0;
    background-color: white;
    padding:5px;
    border-radius: 20px;
    overflow: hidden;
    white-space: nowrap;
    font-size: 1oem;
`

let images = {
  "Education": educationIcon,
  "Business": proIcon,
  "Transport": transportIcon,
  "Sport & Health": sportIcon,
  "Housing": housingIcon,
  "Other": personIcon,
  "Media & Comms": mediaIcon,
  "Health & Wellbeing": healthIcon,
  "Professional Services": proIcon,
  "Political": politicalIcon,
  "Social" : socialIcon
}


class Marker extends Component {
    



 
  render() {
    return (
        <div className="marker" onClick = {this.props.onClick}
        style={{ backgroundColor: this.props.color, cursor: 'pointer'}}
        title={this.props.name}
        >
            <Img src={this.getIcon()}></Img><br/>
            
            {/* <Text>{this.props.text}</Text> */}
          
        </div>
    );
  }


  getIcon(){
    return images[this.props.type];
  }
}
 
export default Marker;