import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../../actions";
import Board from "../../components/Board";

const BoardContainer = ({
  matchRestartRequest,
  makeMoveRequest,
  nextMatchRequest,
  renderBoardRequest,
  resetAllGamesRequest,
  updateScoreRequest,
  ...props
}) => {
  useEffect(() => {
    renderBoardRequest();
  }, [renderBoardRequest]);

  const makeMove = (cell) => {
    const data = {
      index: cell,
    };
    makeMoveRequest(data);
    updateScoreRequest();
  };

  return (
    <Board
      {...props}
      makeMove={makeMove}
      matchRestart={matchRestartRequest}
      nextMatch={nextMatchRequest}
      resetAllGames={resetAllGamesRequest}
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

const mapDispatchToProps = (dispatch) => {
  const {
    matchRestartRequest,
    makeMoveRequest,
    nextMatchRequest,
    renderBoardRequest,
    resetAllGamesRequest,
    updateScoreRequest,
  } = bindActionCreators(actions, dispatch);
  return {
    matchRestartRequest,
    makeMoveRequest,
    nextMatchRequest,
    renderBoardRequest,
    resetAllGamesRequest,
    updateScoreRequest,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
