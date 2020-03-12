import React, { Component } from 'react'
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';


export default class Board extends Component {
    render() {
        return (
            <Container >
        <Row>
          <Col xs="1" >xs-2 md-4</Col>
          <Col xs="1" >xs-2 md-4</Col>
          <Col xs="1">xs-2 md-4</Col>
          {/* <Col xs="6" md="4">xs-6 md-4</Col> */}
        </Row>
        <Row>
         <Col xs="2" md="4">xs-2 md-4</Col>
          <Col xs="2" md="4">xs-2 md-4</Col>
          <Col xs="2" md="4">xs-2 md-4</Col>
        </Row>
        <Row>
        <Col xs="2" md="4">xs-2 md-4</Col>
          <Col xs="2" md="4">xs-2 md-4</Col>
          <Col xs="2" md="4">xs-2 md-4</Col>
        </Row>
      </Container>
        )
    }
}
