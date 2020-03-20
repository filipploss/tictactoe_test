const moveStore = payload => ({ type: "MAKE_MOVE", payload });
const renderBoardStore = payload => ({ type: "RENDER_STORE", payload });
const nextMatchStore = payload => ({ type: "NEXT_MATCH_STORE", payload });
const matchRestartStore = payload => ({ type: "RESTART_MATCH", payload });
const resetAllGamesStore = payload => ({ type: "RESET_ALL_GAMES", payload });
const renderScoreStore = payload => ({ type: "RENDER_SCORE_STORE", payload });
const renderCurrentGame = payload => ({
  type: "RENDER_CURRENT_GAME_STORE",
  payload
});

export {
  moveStore,
  renderBoardStore,
  matchRestartStore,
  resetAllGamesStore,
  nextMatchStore,
  renderScoreStore,
  renderCurrentGame
};
