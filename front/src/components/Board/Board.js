import React, { Component } from "react";
import Container from "muicss/lib/react/container";
import Row from "muicss/lib/react/row";
import Col from "muicss/lib/react/col";

import "./Board.css";
import Results from "../Results/Results";

export default class Board extends Component {
  render() {
    return (
      <Container className="container ">
          <div >
        <Row>
          <Col className="column" xs="1"></Col>
          <Col className="column" xs="1"></Col>
          <Col className="column" xs="1"></Col>
        </Row>
        <Row>
          <Col className="column" xs="1"></Col>
          <Col className="column" xs="1"></Col>
          <Col className="column" xs="1"></Col>
        </Row>
        <Row>
          <Col className="column" xs="1"></Col>
          <Col className="column" xs="1"></Col>
          <Col className="column" xs="1"></Col>
        </Row>
        <Results/>
        </div>
      </Container>
    );
  }
}
