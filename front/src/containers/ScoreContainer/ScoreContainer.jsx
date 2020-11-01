import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../../actions";
import Score from "../../components/Score";

const ScoreContainer = ({ renderScore, ...props }) => {
  useEffect(() => {
    renderScore();
  }, [renderScore]);

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
  const { renderScore } = bindActionCreators(actions, dispatch);
  return {
    renderScore,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScoreContainer);
