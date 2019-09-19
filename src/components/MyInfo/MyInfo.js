//AIzaSyBEcm6B-_364Pb4t12WRm5qtWjg4Oki_aM
import React, { Component } from 'react';
import styled, {ThemeProvider} from 'styled-components';

const Container = styled.div`
  width:100%;
  padding: 10px 10px;
    margin:0px;
  height:100%;
`


class MyInfo extends Component {
  constructor(props){
      super(props);
     


  }
  render() {
    
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100%', width: '100%' }} >
        <Container>
         {this.getInfo(this.props.ID)}
        </Container>
      </div>
    );
  }

  getInfo(id){
    if(id == -1){
      return(
        <div>Click a marker to view info</div>
      );
    }
    let data = this.props.data;
    console.log("info page" + data[id].category);
    return(
      <Container>
      <h1>{data[id].name}</h1>
      <h3>{data[id].category}</h3>
      <h6>Email: <a href="">{data[id].email}</a></h6>
      <h6>Phone: <a href="">{data[id].phone}</a></h6>
      <p>{data[id].bio}</p>
      </Container>
    )
    
  }
    

}
 
export default MyInfo;