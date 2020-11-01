import React, { useEffect } from "react";
import { connect } from "react-redux";

import Board from "../../components/Board";
// TODO: DISPATCH REMOVE
import { dispatch } from "../../index";
import {
  moveStore,
  renderBoardStore,
  matchRestartStore,
  resetAllGamesStore,
  nextMatchStore,
  renderScore,
  updateScoreRequest
} from "../../actions";

const BoardContainer = ({ ...props }) => {
  const fetchFunc = async (url, method, dispatchFunc, func) => {
    try {
      const response = await fetch(url, {
        method,
      });
      const myJson = await response.json();
      const result = await myJson.result;
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
    dispatch(updateScoreRequest())
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
    dispatch(moveStore(data));
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
