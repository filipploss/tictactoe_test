import React from "react";
import { connect } from "react-redux";

import CurrentGame from "../../components/CurrentGame";

const CurrentGameContainer = ({ ...props }) => {
  return <CurrentGame {...props} />;
};

const mapStateToProps = ({ aiCommand, playerCommand,
   }) => {
  return {
    aiCommand,
    playerCommand,
  };
};

export default connect(mapStateToProps)(CurrentGameContainer);
