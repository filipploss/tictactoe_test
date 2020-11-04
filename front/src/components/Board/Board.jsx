import React from "react";

import "./Board.css";
import Button from "muicss/lib/react/button";
import Panel from "muicss/lib/react/panel";

import ScoreContainer from "../../containers/ScoreContainer";
import CurrentGameContainer from "../../containers/CurrentGameContainer";

const Board = ({
  board,
  makeMove,
  matchEnd,
  winner,
  matchRestart,
  nextMatch,
  resetAllGames,
}) => {
  return (
    <div className="main-container">
      <div className="container ">
        {board.map((item, i) =>
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
                  if (typeof item === "number" && !matchEnd) {
                    makeMove(index + 1);
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
          <CurrentGameContainer />
          {matchEnd && winner === "ai" ? (
            <div className="winner">AI Wins!</div>
          ) : matchEnd && winner === "player" ? (
            <div className="winner">Player Wins!</div>
          ) : matchEnd && !winner ? (
            <div className="winner">DRAW!</div>
          ) : (
            ""
          )}
        </div>
        <ScoreContainer />
      </Panel>
      <div className="buttons-container">
        <Button variant="raised" color="primary" onClick={matchRestart}>
          Restart Match
        </Button>
        <Button variant="raised" color="primary" onClick={nextMatch}>
          Next Match
        </Button>
        <Button variant="raised" color="primary" onClick={resetAllGames}>
          Reset All Games
        </Button>
      </div>
    </div>
  );
};

export default Board;
