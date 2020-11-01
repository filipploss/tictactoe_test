import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "muicss/lib/react/button";
import Panel from "muicss/lib/react/panel";

// import store from "../../index";
import { dispatch } from "../../index";
import "./Board.css";
import Score from "../Score/Score";
import CurrentGame from "../CurrentGame";
import {
  moveStore,
  renderBoardStore,
  matchRestartStore,
  resetAllGamesStore,
  nextMatchStore,
  renderScoreStore
} from "../../actions";

class Board extends Component {
  fetchFunc = async (url, method, dispatchFunc, func) => {
    try {
      const response = await fetch(url, {
        method
      });
      const myJson = await response.json();
      const result = await myJson.result;
      console.log(result)
      dispatch(dispatchFunc(result));
      if (func) {
        func();
      }
    } catch (err) {
      alert(err);
    }
  };

  componentDidMount() {
    this.fetchFunc("http://localhost:3001/api/game", "GET", renderBoardStore);
  }

  scoreUpdate = () => {
    this.fetchFunc("http://localhost:3001/api/score", "GET", renderScoreStore);
  };

  matchRestart = () => {
    this.fetchFunc(
      "http://localhost:3001/api/game/reset",
      "POST",
      matchRestartStore,
      this.scoreUpdate
    );
  };

  nextMatch = () => {
    this.fetchFunc(
      "http://localhost:3001/api/game/next",
      "GET",
      nextMatchStore,
      this.scoreUpdate
    );
  };

  resetAllGames = () => {
    this.fetchFunc(
      "http://localhost:3001/api/score/reset",
      "POST",
      resetAllGamesStore,
      this.nextMatch
    );
  };

  makeMove = cell => {
    const data = {
      index: cell
    };
    const fetchMove = async url => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        const myJson = await response.json();
        const result = await myJson.result;
        dispatch(moveStore(result));
      } catch (err) {
        alert(err);
      }
    };
    fetchMove("http://localhost:3001/api/game/move");
    this.scoreUpdate();
  };

  render() {
    return (
      <div className="main-container">
        <div className="container ">
          {this.props.board.map((item, i) =>
            item.map((item, index) => {
              return (
                <div
                  className="cells"
                  key={
                    i === 1
                      ? (index = index + 3)
                      : i === 2
                      ? (index = index + 6)
                      : index
                  }
                  onClick={() => {
                    if (typeof item === "number" && !this.props.matchEnd) {
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
        <Panel className="results">
          <div>
            <CurrentGame />
            {this.props.matchEnd && this.props.winner === "ai" ? (
              <div className="winner">AI Wins!</div>
            ) : this.props.matchEnd && this.props.winner === "player" ? (
              <div className="winner">Player Wins!</div>
            ) : this.props.matchEnd && !this.props.winner ? (
              <div className="winner">DRAW!</div>
            ) : (
              ""
            )}
          </div>
          <Score />
        </Panel>
        <div className="buttons-container">
          <Button variant="raised" color="primary" onClick={this.matchRestart}>
            Restart Match
          </Button>
          <Button variant="raised" color="primary" onClick={this.nextMatch}>
            Next Match
          </Button>
          <Button variant="raised" color="primary" onClick={this.resetAllGames}>
            Reset All Games
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  playerCommand,
  aiCommand,
  board,
  matchEnd,
  winner,
  team
}) => {
  return {
    playerCommand,
    aiCommand,
    board,
    matchEnd,
    winner,
    team
  };
};

export default connect(mapStateToProps)(Board);
