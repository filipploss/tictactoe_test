const makeMoveRequest = (payload) => ({
  type: "MAKE_MOVE_REQUEST",
  payload,
});
const makeMoveSuccess = (payload) => ({ type: "MAKE_MOVE_SUCCESS", payload });

const renderBoardRequest = () => ({ type: "RENDER_BOARD_REQUEST" });
const renderBoardSuccess = (payload) => ({
  type: "RENDER_BOARD_SUCCESS",
  payload,
});

const nextMatchRequest = () => ({ type: "NEXT_MATCH_REQUEST" });
const nextMatchSuccess = (payload) => ({ type: "NEXT_MATCH_SUCCESS", payload });

const matchRestartRequest = () => ({ type: "RESTART_MATCH_REQUEST" });
const matchRestartSuccess = (payload) => ({
  type: "RESTART_MATCH_SUCCESS",
  payload,
});

const resetAllGamesRequest = () => ({ type: "RESET_ALL_GAMES_REQUEST" });
const resetAllGamesSuccess = (payload) => ({
  type: "RESET_ALL_GAMES_SUCCESS",
  payload,
});

const updateScoreRequest = () => ({ type: "UPDATE_SCORE_REQUEST" });
const updateScoreSuccess = (payload) => ({
  type: "UPDATE_SCORE_SUCCESS",
  payload,
});

const renderScoreRequest = () => ({ type: "RENDER_SCORE_REQUEST" });
const renderScoreSuccess = (payload) => ({
  type: "RENDER_SCORE_SUCCESS",
  payload,
});
const renderScoreFail = (payload) => ({ type: "RENDER_SCORE_FAIL", payload });

const fetchFail = (payload) => ({ type: "FETCH_FAIL", payload });

export {
  fetchFail,
  makeMoveRequest,
  makeMoveSuccess,
  matchRestartRequest,
  matchRestartSuccess,
  nextMatchRequest,
  nextMatchSuccess,
  renderBoardRequest,
  renderBoardSuccess,
  renderScoreRequest,
  renderScoreFail,
  renderScoreSuccess,
  resetAllGamesRequest,
  resetAllGamesSuccess,
  updateScoreRequest,
  updateScoreSuccess,
};
