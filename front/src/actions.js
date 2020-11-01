const moveStore = (payload) => ({
  type: "MAKE_MOVE_REQUEST",
  payload,
});
const moveStoreSuccess = (payload) => ({ type: "MAKE_MOVE_SUCCESS", payload });
const moveStoreFail = (payload) => ({ type: "MAKE_MOVE_FAIL", payload });

const renderBoardStore = (payload) => ({ type: "RENDER_STORE", payload });



const nextMatchStore = (payload) => ({ type: "NEXT_MATCH_STORE", payload });
const matchRestartStore = (payload) => ({ type: "RESTART_MATCH", payload });
const resetAllGamesStore = (payload) => ({ type: "RESET_ALL_GAMES", payload });

const updateScoreRequest = (payload) => ({ type: "UPDATE_SCORE_REQUEST", payload });
const updateScoreSuccess = (payload) => ({ type: "UPDATE_SCORE_SUCCESS", payload });
const updateScoreFail = (payload) => ({ type: "UPDATE_SCORE_FAIL", payload });

const renderScore = (payload) => ({ type: "RENDER_SCORE_REQUEST", payload });
const renderScoreSuccess = (payload) => ({
  type: "RENDER_SCORE_SUCCESS",
  payload,
});
const renderScoreFail = (payload) => ({ type: "RENDER_SCORE_FAIL", payload });

const renderCurrentGame = (payload) => ({
  type: "RENDER_CURRENT_GAME_REQUEST",
  payload,
});
const renderCurrentGameSuccess = (payload) => ({
  type: "RENDER_CURRENT_GAME_SUCCESS",
  payload,
});
const renderCurrentGameFail = (payload) => ({
  type: "RENDER_CURRENT_GAME_FAIL",
  payload,
});

export {
  matchRestartStore,
  moveStore,
  moveStoreFail,
  moveStoreSuccess,
  nextMatchStore,
  renderBoardStore,
  renderCurrentGame,
  renderCurrentGameFail,
  renderCurrentGameSuccess,
  renderScore,
  renderScoreFail,
  renderScoreSuccess,
  resetAllGamesStore,
  updateScoreRequest,
  updateScoreSuccess,
  updateScoreFail
};
