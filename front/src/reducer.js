const initialState = {
  playerCommand: "",
  aiCommand: "",
  board: [],
  matchEnd: "",
  winner: "",
  team: "",
  aiWins: "",
  playerWins: "",
  xWins: "",
  oWins: "",
  moveRequestPending: false,
  renderScorePending: false,
  restartMatchPending: false,
  updateScorePending: false,
  nextMatchPending: false,
  resetAllGamesPending: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "MAKE_MOVE_REQUEST":
      return {
        ...state,
        moveRequestPending: true,
      };

    case "MAKE_MOVE_SUCCESS":
      return {
        ...state,
        board: action.payload.board,
        matchEnd: action.payload.end,
        winner: action.payload.winner,
        moveRequestPending: false,
      };

    case "RENDER_BOARD_REQUEST":
      return {
        ...state,
        renderBoardPending: true,
      };
      
    case "RENDER_BOARD_SUCCESS":
      return {
        ...state,
        playerCommand: action.payload.player,
        aiCommand: action.payload.ai,
        board: action.payload.board,
        matchEnd: action.payload.end,
        renderBoardPending: false,
      };

    case "RESTART_MATCH_REQUEST":
      return {
        ...state,
        restartMatchPending: true,
      };

    case "RESTART_MATCH_SUCCESS":
      return {
        ...state,
        board: action.payload.board,
        matchEnd: null,
        winner: null,
        restartMatchPending: false,
      };

    case "NEXT_MATCH_REQUEST":
      return {
        ...state,
        nextMatchPending: true,
      };

    case "NEXT_MATCH_SUCCESS":
      return {
        ...state,
        playerCommand: action.payload.player,
        aiCommand: action.payload.ai,
        board: action.payload.board,
        matchEnd: null,
        winner: null,
        nextMatchPending: false,
      };

    case "RESET_ALL_GAMES_REQUEST":
      return {
        ...state,
        resetAllGamesPending: true,
      };

    case "RESET_ALL_GAMES_SUCCESS":
      return {
        ...state,
        winner: null,
        resetAllGamesPending: false,
      };

    case "RENDER_SCORE_REQUEST":
      return {
        ...state,
        renderScorePending: true,
      };

    case "RENDER_SCORE_SUCCESS":
      return {
        ...state,
        aiWins: action.payload.ai,
        playerWins: action.payload.player,
        xWins: action.payload.X,
        oWins: action.payload.O,
        gamesList: action.payload.list,
        renderScorePending: false,
      };

    case "UPDATE_SCORE_REQUEST":
      return {
        ...state,
        updateScoreRequestPending: true,
      };
    case "UPDATE_SCORE_SUCCESS":
      return {
        ...state,
        aiWins: action.payload.ai,
        playerWins: action.payload.player,
        xWins: action.payload.X,
        oWins: action.payload.O,
        gamesList: action.payload.list,
        updateScoreRequestPending: false,
      };

    case "FETCH_FAIL":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
