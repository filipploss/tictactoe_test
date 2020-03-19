import React, { Component } from "react";
import { connect } from "react-redux";

import store from "../../index";
import { renderScoreStore } from "../../actions";

export class Score extends Component {
  componentDidMount() {
    const fetchMove = async url => {
      const response = await fetch(url);
      const myJson = await response.json();
      const result = await myJson.result;
      store.dispatch(renderScoreStore(result));
    };
    fetchMove("http://localhost:3001/api/score");
  }

  render() {
    return (
      <div>
        <div>
          <b>Score</b>
        </div>
        <div>AI wins: {this.props.aiWins}</div>
        <div>Player wins: {this.props.playerWins}</div>
        <div>X wins: {this.props.xWins}</div>
        <div>O wins: {this.props.oWins}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ aiWins, playerWins, xWins, oWins }) => {
  return {
    aiWins,
    playerWins,
    xWins,
    oWins
  };
};

export default connect(mapStateToProps)(Score);
