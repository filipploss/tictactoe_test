import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../../actions";
import CurrentGame from "../../components/CurrentGame";

const CurrentGameContainer = ({ renderCurrentGame, ...props }) => {
  useEffect(() => {
    renderCurrentGame();
  }, [renderCurrentGame]);

  return <CurrentGame {...props} />;
};

const mapStateToProps = ({ aiCommand, playerCommand, gamesList }) => {
  return {
    aiCommand,
    playerCommand,
    gamesList,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { renderCurrentGame } = bindActionCreators(actions, dispatch);
  return {
    renderCurrentGame,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentGameContainer);
