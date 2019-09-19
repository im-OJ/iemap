//AIzaSyBEcm6B-_364Pb4t12WRm5qtWjg4Oki_aM
import React, { Component } from 'react';
import styled, {ThemeProvider} from 'styled-components';
import { Button, Form, FormGroup, Label, Input, FormText, Checkbox } from 'reactstrap';
import {  Row, Col } from 'reactstrap';
import Geocode from "react-geocode";


var formFilters = [
    ["Category", "checkboxlist", ["Education", "Business", "Sport & Health", "Social", "Housing", "Media & Comms", "Health & Wellbeing", "Professional Services", "Transport", "Political", "Other"]],
    ["Demonstration", "checkboxlist", ["Now", "In 12 weeks", "In 24 weeks"]],

    
]

// [name, type, [inputs]]
//  - checkboxlist, options
// - minmax , defaultMin, defaultMax
const Container = styled.div`
  width:100%;
  height:100%;
  background:white;
  Margin: 0px;
`

const MyBox = styled.div`
    padding: 10px 15px;
    margin:0px;
   

`

const HR = styled.hr`
    margin:0px;

`
const P = styled.p`
-webkit-touch-callout: none; /* iOS Safari */
-webkit-user-select: none; /* Safari */
 -khtml-user-select: none; /* Konqueror HTML */
   -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                              supported by Chrome and Opera */
                              `

class MyMenu extends Component {

    constructor(props){
        super(props);
        this.state = {value: ''};

        
    }


render() {
    return (
      <Container>
        <Row key="0">
            <Col xs="12">
                <MyBox>
                    <form action="#" onSubmit={(e) => this.props.search(e)}>
                        <Input name="s" id="txtLocation" placeholder="Search Location" />
                    </form>
                </MyBox>
                <HR/>
            </Col>
        </Row>

        {this.getForm()}

      </Container>
    );
  }

  getForm(){
    let output = [];
    for(let i = 0; i < formFilters.length; i++){
        let thisChildComponent = [];
        let thisElement = [];
        let name = formFilters[i][0]
        let type = formFilters[i][1]
        let elements = formFilters[i][2];

        if(type == "checkboxlist"){
            thisChildComponent.push(this.getCheckBoxList(i, name, elements))
        }
        if(type == "minmax"){
            thisChildComponent.push(this.getMinMax(i, name, elements))
        }

        //head
        thisElement.push(
            <Row>
                <Col xs="12">
                    <MyBox>
                        <h5>{name}</h5>
                        {thisChildComponent}
                    </MyBox>
                
                </Col>
            </Row>
        );
        output.push(thisElement);
    }
    
    return output;
  }

  getCheckBoxList(i, name, elements){
      let defaultChecked = true;
      if(name == "Demonstration"){
          defaultChecked = false;
      }
      let formElements = [];
      console.log(elements)
      for(let c = 0; c < elements.length; c++){
          let elementName = (name + elements[c]).replace(/\s/g, '');
        formElements.push(
            <div>
            <Label check>
                <Input type="checkbox" defaultChecked={defaultChecked} name={elementName} onChange={(e) => this.handleChange(e)}/>
                <P style = {{cursor:"pointer", display:"inline", userSelect: "none" }}>{elements[c]}</P>
                
            </Label>
            </div>
            
        )

      }
      console.log(formElements);
    return (
        <FormGroup check key={i} id={"checkboxlist" + name}>
          {formElements}
        </FormGroup>
    )
  }

  getMinMax(i, name, elements){
    
   return( 
    <FormGroup check key={i} id={name}>
            <Row>
                <Col xs="5">
                    <Input name={name + "Min"} defaultValue={elements[0]}
                     placeholder = "Min." onChange={(e) => this.handleChange(e)}>
                    </Input>
                </Col> 
                <Col xs="1"> to </Col>
                <Col xs="5">
                    <Input  name={name + "Max"} defaultValue={elements[1]} 
                    placeholder = "Max." onChange={(e) => this.handleChange(e)}>
                    </Input>
                </Col>
            </Row>
        </FormGroup>
   )
  }

  handleChange(e) {
      //TOOD: pass this data up 
      let name = e.target.name;
      let value = e.target.value;
      console.log(e.target.value);
      if(e.target.value == "on"){
          value = e.target.checked;
         
      }
      if(e.target.value == "off"){
        value = e.target.checked;
    }

      console.log("Handling change: " + name + ", " + value);

        let change = {
            name: value
        }
        //change[name] = value
        this.setState(change)
    // console.log(this.state)
    this.props.parentCallback(name, value)
    }


}


 
export default MyMenu;