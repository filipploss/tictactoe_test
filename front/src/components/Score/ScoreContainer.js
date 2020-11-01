import React from "react";
import { connect } from "react-redux";

import { dispatch } from "../../index";
import { renderScoreStore } from "../../actions";
import Score from "./Score";

const ScoreContainer = ({ ...props }) => {
  useEffect(() => {
    const fetchMove = async (url) => {
      try {
        const response = await fetch(url);
        const myJson = await response.json();
        const result = await myJson.result;
        dispatch(renderScoreStore(result));
      } catch (err) {
        alert(err);
      }
    };
    fetchMove("http://localhost:3001/api/score");
  }, []);

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

export default connect(mapStateToProps)(ScoreContainer);
