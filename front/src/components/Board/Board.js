import React, { Component } from "react";

import "./Board.css";
import Score from "../Score/Score";
import CurrentGame from "../CurrentGame";

export default class Board extends Component {
  state = {
    playerCommand: "",
    aiCommand: "",
    board: [],
    matchEnd: '',
    winner: "",
    team: ""
  };
  

  componentDidMount() {
    const fetchMove = async url => {
      const response = await fetch(url);
      const myJson = await response.json();
      console.log("Match Started", JSON.stringify(myJson));
      const playerCommand = await myJson.result.player;
      const aiCommand = await myJson.result.ai;
      const board = await myJson.result.board;
      const matchEnd = await myJson.result.end
      this.setState({ playerCommand, aiCommand, board, matchEnd });
      console.log('COMPONENTDIDMOUNT STATE= ', this.state)
    };
    fetchMove("http://localhost:3001/api/game");
  }


  matchRestart = () => {
    const fetchMove = async url => {
      const response = await fetch(url, {
        method: "POST"
      });
      const myJson = await response.json();
      const board = await myJson.result.board;
      console.log("Match Restart", JSON.stringify(myJson));
      this.setState({
        board, matchEnd: null, winner: null
      });
      console.log("state!= ", this.state);
    };
    fetchMove("http://localhost:3001/api/game/reset");
  };

  matchNext() {
    const fetchMove = async url => {
      const response = await fetch(url);
      const myJson = await response.json();
      console.log("Next Match", JSON.stringify(myJson));
    };
    fetchMove("http://localhost:3001/api/game/next");
  }

  gameReset() {
    const fetchMove = async url => {
      const response = await fetch(url, {
        method: "POST"
      });
      const myJson = await response.json();
      console.log("Game Reset", JSON.stringify(myJson));
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
      const board = await myJson.result.board;
      console.log(JSON.stringify(myJson));
      console.log("Cell", cell);
      const matchEnd = await myJson.result.end;
      const winner = await myJson.result.winner;
      const team = await myJson.result.team;
      console.log("matchEnd= ", matchEnd);
      this.setState({ board, matchEnd, winner, team });
      console.log("State after move", this.state);
    };
    fetchMove("http://localhost:3001/api/game/move");
  }

  render() {
    return (
      <div className="main-container">
        <div className="container ">
          {this.state.board.map((item, i) =>
            item.map((item, index) => {
              return (
                <div
                  className="column"
                  key={
                    i === 1
                      ? (index = index + 3)
                      : i === 2
                      ? (index = index + 6)
                      : index
                  }
                  onClick={() => {
                    if (typeof item === "number" && !this.state.matchEnd) {
                      console.log(!this.state.matchEnd)
                      this.makeMove(index + 1);
                    }
                  }}
                >
                  {item === "X" ? "X" : item === "O" ? "O" : ""}
                </div>
              );
            })
          )}
        </div>
        <div className="results">
          <CurrentGame />
          <Score />
        </div>
        <button onClick={this.matchRestart}>Restart Match</button>
        <button onClick={this.matchNext}>Next Match</button>
        <button onClick={this.gameReset}>Reset All Games</button>
      </div>
     
    );
  }
}
