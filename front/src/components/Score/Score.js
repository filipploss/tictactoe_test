import React from "react";

const Score = ({ aiWins, playerWins, xWins, oWins }) => {
  return (
    <div>
      <div>
        <b>Score</b>
      </div>
      <div>AI wins: {aiWins}</div>
      <div>Player wins: {playerWins}</div>
      <div>X wins: {xWins}</div>
      <div>O wins: {oWins}</div>
    </div>
  );
};

export default Score;
