import React from "react";

import "./Board.css";
import Button from "muicss/lib/react/button";
import Panel from "muicss/lib/react/panel";

import Score from "../Score/Score";
import CurrentGame from "../CurrentGame";

const Board = (props) => {
  return (
    <div className="main-container">
      <div className="container ">
        {props.board.map((item, i) =>
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
                  if (typeof item === "number" && !props.matchEnd) {
                    props.makeMove(index + 1);
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
          {props.matchEnd && props.winner === "ai" ? (
            <div className="winner">AI Wins!</div>
          ) : props.matchEnd && props.winner === "player" ? (
            <div className="winner">Player Wins!</div>
          ) : props.matchEnd && !props.winner ? (
            <div className="winner">DRAW!</div>
          ) : (
            ""
          )}
        </div>
        <Score />
      </Panel>
      <div className="buttons-container">
        <Button variant="raised" color="primary" onClick={props.matchRestart}>
          Restart Match
        </Button>
        <Button variant="raised" color="primary" onClick={props.nextMatch}>
          Next Match
        </Button>
        <Button variant="raised" color="primary" onClick={props.resetAllGames}>
          Reset All Games
        </Button>
      </div>
    </div>
  );
};

export default Board;
