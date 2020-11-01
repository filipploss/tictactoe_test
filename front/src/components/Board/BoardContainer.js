import React, { useEffect } from "react";
import { connect } from "react-redux";

import Board from "./Board";
import { dispatch } from "../../index";
import {
  moveStore,
  renderBoardStore,
  matchRestartStore,
  resetAllGamesStore,
  nextMatchStore,
  renderScoreStore,
} from "../../actions";

const BoardContainer = ({ ...props }) => {
  const fetchFunc = async (url, method, dispatchFunc, func) => {
    try {
      const response = await fetch(url, {
        method,
      });
      const myJson = await response.json();
      const result = await myJson.result;
      console.log(result);
      dispatch(dispatchFunc(result));
      if (func) {
        func();
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchFunc("http://localhost:3001/api/game", "GET", renderBoardStore);
  }, []);

  const scoreUpdate = () => {
    fetchFunc("http://localhost:3001/api/score", "GET", renderScoreStore);
  };

  const matchRestart = () => {
    fetchFunc(
      "http://localhost:3001/api/game/reset",
      "POST",
      matchRestartStore,
      scoreUpdate
    );
  };

  const nextMatch = () => {
    fetchFunc(
      "http://localhost:3001/api/game/next",
      "GET",
      nextMatchStore,
      scoreUpdate
    );
  };

  const resetAllGames = () => {
    fetchFunc(
      "http://localhost:3001/api/score/reset",
      "POST",
      resetAllGamesStore,
      nextMatch
    );
  };

  const makeMove = (cell) => {
    const data = {
      index: cell,
    };
    const fetchMove = async (url) => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const myJson = await response.json();
        const result = await myJson.result;
        dispatch(moveStore(result));
      } catch (err) {
        alert(err);
      }
    };
    fetchMove("http://localhost:3001/api/game/move");
    scoreUpdate();
  };

  return (
    <Board
      {...props}
      makeMove={makeMove}
      matchRestart={matchRestart}
      nextMatch={nextMatch}
      resetAllGames={resetAllGames}
    />
  );
};

const mapStateToProps = ({
  playerCommand,
  aiCommand,
  board,
  matchEnd,
  winner,
  team,
}) => {
  return {
    playerCommand,
    aiCommand,
    board,
    matchEnd,
    winner,
    team,
  };
};

export default connect(mapStateToProps)(BoardContainer);
