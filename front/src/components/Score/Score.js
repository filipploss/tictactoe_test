import React, { Component } from "react";

export default class Score extends Component {
  state = {
    aiWins: "-",
    playerWins: "-",
    xWins: "-",
    oWins: "-",
    gamesList: "-"

  };

  componentDidMount() {
    const fetchMe = async url => {
      const response = await fetch(url);
      const myJson = await response.json();
      console.log(JSON.stringify(myJson));
      let aiWins = await JSON.stringify(myJson.result.ai);
      let playerWins = await JSON.stringify(myJson.result.player);
      let xWins = await JSON.stringify(myJson.result.X);
      let oWins = await JSON.stringify(myJson.result.O);
      let gamesList = await JSON.stringify(myJson.result.list);
      this.setState({ aiWins, playerWins, xWins, oWins, gamesList });
    };
    fetchMe("http://localhost:3001/api/score");
  }

  render() {

    return (
      <div>
        <div>Score:</div>
        <div>AI wins: {this.state.aiWins}</div>
        <div>Player wins: {this.state.playerWins}</div>
        <div>X wins: {this.state.xWins}</div>
        <div>O wins: {this.state.oWins}</div>
        <div>Games List: {this.state.gamesList}</div>
      </div>
    );
  }
}
