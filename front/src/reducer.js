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
  error: null
};

const reducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case "MAKE_MOVE_REQUESTED":
      return {
        ...state,
        moveRequestPending: true
      };

    case "MAKE_MOVE_SUCCESS":
      return {
        ...state,
        board: action.payload.board,
        matchEnd: action.payload.end,
        winner: action.payload.winner,
        moveRequestPending: false
      };

      case "MAKE_MOVE_FAIL":
      return {
        ...state,
        moveRequestPending: false,
        error: action.payload
      };


      // TODO: ERROR: NULL
    case "RENDER_STORE":
      return {
        ...state,
        playerCommand: action.payload.player,
        aiCommand: action.payload.ai,
        board: action.payload.board,
        matchEnd: action.payload.end
      };

    case "RESTART_MATCH":
      return {
        ...state,
        board: action.payload.board,
        matchEnd: null,
        winner: null
      };

    case "NEXT_MATCH_STORE":
      return {
        ...state,
        playerCommand: action.payload.player,
        aiCommand: action.payload.ai,
        board: action.payload.board,
        matchEnd: null,
        winner: null
      };

    case "RESET_ALL_GAMES":
      return {
        ...state,
        winner: null
      };

      case "RENDER_SCORE_REQUEST":
        return {
          ...state,
        renderScorePending: true
        };

    case "RENDER_SCORE_SUCCESS":
      return {
        ...state,
        aiWins: action.payload.ai,
        playerWins: action.payload.player,
        xWins: action.payload.X,
        oWins: action.payload.O,
        gamesList: action.payload.list,
        renderScorePending: false
      };

      case "RENDER_SCORE_FAIL":
      return {
        ...state,
        renderScorePending: false,
        error: action.payload
      };
      

    case "RENDER_CURRENT_GAME_STORE":
      return {
        ...state,
        aiCommand: action.payload.ai,
        playerCommand: action.payload.player
      };

    case "RENDER_CURRENT_GAME_STORE":
      return {
        ...state,
        aiCommand: action.payload.ai,
        playerCommand: action.payload.player
      };

      case "UPDATE_SCORE_REQUEST":
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
