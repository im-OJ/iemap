import {React, Component} from 'react';
import styled, {ThemeProvider} from 'styled-components';
// import {  Row, Col } from 'reactstrap';

import MyMap from './MyMap/MyMap.js'
import MyMenu from './MyMenu/MyMenu.js'

const theme = {
  primary: 'teal',
  secondary: 'green',
  font: 'sans-serif',
}

const Block = styled.div`
  width:100%;
  height:100%;

  background: ${props => (props.other ? 'violet' :'red')};
  padding:0px;
  margin:0px;
`

const Container = styled.div`
  width:100vw;
  height:100vh;
  background:white;
`

const Row = styled.div`
  display:flex;
  width:100%;
`

const ColMenu = styled.div`
  max-width: 350px;
  width:100%;
  
  
`

const ColMap= styled.div`
  width:100%;

  flex-grow: 1;
`

const ColInfoBox = styled.div`
    max-width: 350px;
    width:100%;
    display:none;
`


class MyApp extends Component {

  render() {
    return (
        <ThemeProvider theme={theme}>
        <Container>
          <Row style={{height:'100%',width:'100%', padding:'0', margin:'0'}}>
            <ColMenu className="noSpace">
              <Block>
                <MyMenu parentCallback = {this.filterUpdate}></MyMenu>
              </Block>
            </ColMenu>
            <ColMap className="noSpace">
              <Block other>
                <MyMap></MyMap>
              </Block>
            </ColMap>
            <ColInfoBox>
              <Block>
  
              </Block>
            </ColInfoBox>
  
            </Row>
        </Container>
      </ThemeProvider>
    )
  }
  filterUpdate(){

  }

}
 
export default MyApp;