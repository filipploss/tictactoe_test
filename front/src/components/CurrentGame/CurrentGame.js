import React, { Component } from "react";
import { connect } from "react-redux";

import store from "../../index";
import { renderCurrentGame } from "../../actions";

class CurrentGame extends Component {
  componentDidMount() {
    const fetchMove = async url => {
      const response = await fetch(url);
      const myJson = await response.json();
      const result = await myJson.result;
      // console.log('Current game result: ', result)
      store.dispatch(renderCurrentGame(result));
      console.log("store", store.getState());
    };
    fetchMove("http://localhost:3001/api/game");
  }

  render() {
    return (
      <div>
        <div>
          <b>Current Game</b>
        </div>
        <div>AI command: {this.props.aiCommand}</div>
        <div>Player command: {this.props.playerCommand}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ aiCommand, playerCommand, gamesList }) => {
  return {
    aiCommand,
    playerCommand,
    gamesList
  };
};

export default connect(mapStateToProps)(CurrentGame);
