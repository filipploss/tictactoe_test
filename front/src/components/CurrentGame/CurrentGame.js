import React, { Component } from 'react'

export default class CurrentGame extends Component {
    state = {
        aiCommand: "-",
        playerCommand: "-",
        xWins: "-",
        oWins: "-",
        gamesList: "-"
    
      };
    
      componentDidMount() {
        const fetchMe = async url => {
          const response = await fetch(url);
          const myJson = await response.json();
          console.log(JSON.stringify(myJson));
          let aiCommand = await JSON.stringify(myJson.result.ai);
          let playerCommand = await JSON.stringify(myJson.result.player);
          let xWins = await JSON.stringify(myJson.result.X);
          let oWins = await JSON.stringify(myJson.result.O);
          let gamesList = await JSON.stringify(myJson.result.list);
          this.setState({ aiCommand, playerCommand, xWins, oWins, gamesList });
        };
        fetchMe("http://localhost:3001/api/game");
      }
    
      render() {
    
        return (
          <div>
            <div>Current Game:</div>
            <div>AI: {this.state.aiCommand}</div>
            <div>Player: {this.state.playerCommand}</div>
            <div>Match Log: {this.state.gamesList}</div>
          </div>
        );
      }
    }
    