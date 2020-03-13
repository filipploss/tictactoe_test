import React, { Component } from "react";
import Container from "muicss/lib/react/container";
import Row from "muicss/lib/react/row";
import Col from "muicss/lib/react/col";

import "./Board.css";
import Score from "../Score/Score";
import CurrentGame from "../CurrentGame";

export default class Board extends Component {
  state = {
    cell1: "-",
    cell2: "-",
    cell3: "-",
    cell4: "-",
    cell5: "-",
    cell6: "-",
    cell7: "-",
    cell8: "-",
    cell9: "-"
  };

  matchRestart() {
    const fetchMove = async url => {
      const response = await fetch(url, {
        method: "POST"
      });
      const myJson = await response.json();
      console.log('Match Restart', JSON.stringify(myJson));
    };
    fetchMove("http://localhost:3001/api/game/reset");
  }

  matchNext() {
    const fetchMove = async url => {
      const response = await fetch(url);
      const myJson = await response.json();
      console.log('Next Match', JSON.stringify(myJson));
    };
    fetchMove("http://localhost:3001/api/game/next");
  }


  gameReset() {
    const fetchMove = async url => {
      const response = await fetch(url, {
        method: "POST"
      });
      const myJson = await response.json();
      console.log('Game Reset', JSON.stringify(myJson));
    };
    fetchMove("http://localhost:3001/api/score/reset");
  }

  makeMove(cell) {
    const data = {
      index: cell
    };
    const fetchMove = async url => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const myJson = await response.json();
      console.log(JSON.stringify(myJson));
      console.log(this.state);
    };
    fetchMove("http://localhost:3001/api/game/move");
  }

  render() {
    return (
      <Container className="container ">
        <div>
          <Row>
            <Col
              className="column"
              xs="1"
              onClick={() => {
                this.makeMove(1);
                this.setState({ cell1: "X" });
              }}
            >
              {this.state.cell1 === "X" ? (
                <p>X</p>
              ) : this.state.cell1 === "0" ? (
                <p>O</p>
              ) : (
                ""
              )}
              {console.log(this.state)}
            </Col>
            <Col
              className="column"
              xs="1"
              onClick={() => this.makeMove(2)}
            ></Col>
            <Col
              className="column"
              xs="1"
              onClick={() => this.makeMove(3)}
            ></Col>
          </Row>
          <Row>
            <Col
              className="column"
              xs="1"
              onClick={() => this.makeMove(4)}
            ></Col>
            <Col
              className="column"
              xs="1"
              onClick={() => this.makeMove(5)}
            ></Col>
            <Col
              className="column"
              xs="1"
              onClick={() => this.makeMove(6)}
            ></Col>
          </Row>
          <Row>
            <Col
              className="column"
              xs="1"
              onClick={() => this.makeMove(7)}
            ></Col>
            <Col
              className="column"
              xs="1"
              onClick={() => this.makeMove(8)}
            ></Col>
            <Col
              className="column"
              xs="1"
              onClick={() => this.makeMove(9)}
            ></Col>
          </Row>
          <div className="results">
            <CurrentGame />
            <Score />
          </div>
          <button onClick={this.matchRestart}>Restart Match</button>
          <button onClick={this.matchNext}>Next Match</button>
          <button onClick={this.gameReset}>Reset All Games</button>
        </div>
      </Container>
    );
  }
}
