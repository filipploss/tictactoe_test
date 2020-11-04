import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../../actions";
import Score from "../../components/Score";

const ScoreContainer = ({ renderScoreRequest, ...props }, ) => {
  useEffect(() => {
    renderScoreRequest();
  });

  return <Score {...props} />;
};

const mapStateToProps = ({ aiWins, playerWins, xWins, oWins }) => {
  return {
    aiWins,
    playerWins,
    xWins,
    oWins,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { renderScoreRequest } = bindActionCreators(actions, dispatch);
  return {
    renderScoreRequest,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScoreContainer);
