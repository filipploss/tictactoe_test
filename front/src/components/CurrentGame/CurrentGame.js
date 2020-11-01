import React from "react";

const CurrentGame = ({ aiCommand, playerCommand }) => {
  return (
    <div>
      <div>
        <b>Current Game</b>
      </div>
      <div>AI command: {aiCommand}</div>
      <div>Player command: {playerCommand}</div>
    </div>
  );
};

export default CurrentGame;
