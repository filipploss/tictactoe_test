import React, { useEffect } from "react";
import { connect } from "react-redux";

import { dispatch } from "../../index";
import { renderCurrentGame } from "../../actions";
import CurrentGame from "../../components/CurrentGame";

const CurrentGameContainer = ({ ...props }) => {
  useEffect(() => {
    const fetchMove = async (url) => {
      try {
        const response = await fetch(url);
        const myJson = await response.json();
        const result = await myJson.result;
        dispatch(renderCurrentGame(result));
      } catch (err) {
        alert(err);
      }
    };
    fetchMove("http://localhost:3001/api/game");
  }, []);

  return <CurrentGame {...props} />;
};

const mapStateToProps = ({ aiCommand, playerCommand, gamesList }) => {
  return {
    aiCommand,
    playerCommand,
    gamesList,
  };
};

export default connect(mapStateToProps)(CurrentGameContainer);
