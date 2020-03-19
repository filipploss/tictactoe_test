import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "muicss/lib/react/button";
import Panel from "muicss/lib/react/panel";

import store from "../../index";
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

  componentDidMount() {
    const fetchMove = async url => {
      const response = await fetch(url);
      const myJson = await response.json();
      // console.log("Match Started", JSON.stringify(myJson));
      const result = await myJson.result;
      // console.log('result Didmount', result)
      store.dispatch(renderBoardStore(result));
      // console.log("ComponentDidMount store", store.getState());
    };
    fetchMove("http://localhost:3001/api/game");
  }

  scoreUpdate = () => {
    const fetchMove = async url => {
      const response = await fetch(url);
      const myJson = await response.json();
      const result = await myJson.result;
      // console.log(result);
      // console.log("store before result", store.getState());
      store.dispatch(renderScoreStore(result));
      // console.log("store after result", store.getState());
    };
    fetchMove("http://localhost:3001/api/score");
  };

  matchRestart = () => {
    const fetchMove = async url => {
      const response = await fetch(url, {
        method: "POST"
      });
      const myJson = await response.json();
      const result = await myJson.result;
      console.log('result:', result);
      console.log("Store before result", store.getState());
      store.dispatch(matchRestartStore(result));
      console.log("Store after result", store.getState());
    };
    fetchMove("http://localhost:3001/api/game/reset");
    this.scoreUpdate();
  };

  nextMatch = () => {
    const fetchMove = async url => {
      const response = await fetch(url);
      const myJson = await response.json();
      const result = await myJson.result;
      // console.log("Next Match", JSON.stringify(myJson));
      // console.log('nextMatch fetch:', result);
      store.dispatch(nextMatchStore(result));
      // console.log("store", store.getState());
    };
    fetchMove("http://localhost:3001/api/game/next");
    this.scoreUpdate();
  };

  resetAllGames = () => {
    const fetchMove = async url => {
      const response = await fetch(url, {
        method: "POST"
      });
      const myJson = await response.json();
      const result = await myJson.result;
      // console.log('Reset all games result: ', result)
      store.dispatch(resetAllGamesStore(result));
      // console.log("store", store.getState());


    };
    fetchMove("http://localhost:3001/api/score/reset");
    this.nextMatch();
  };

  makeMove = cell => {
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
      const result = await myJson.result;
      console.log("MOVE store before result", store.getState());
      console.log('MOVE result=', result)
      store.dispatch(moveStore(result));
      console.log("MOVE store after result", store.getState());
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
            {/* {console.log('PROPS=', this.props)} */}
            {this.props.matchEnd && this.props.winner === "ai" ? (
              <div className="winner">AI Wins!</div>
            ) : this.props.matchEnd && this.props.winner === "player" ? (
              <div className="winner">Player Wins!</div>
            ) : this.props.matchEnd && !this.props.winner ? (
              <div className="winner">DRAW!</div>
            ) : ''}
          </div>
          <Score />
        </Panel>
        <div className="buttons">
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
