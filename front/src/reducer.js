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
  oWins: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "MAKE_MOVE":
      return {
        ...state,
        board: action.payload.board,
        matchEnd: action.payload.end,
        winner: action.payload.winner
      };

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

    case "RENDER_SCORE_STORE":
      return {
        ...state,
        aiWins: action.payload.ai,
        playerWins: action.payload.player,
        xWins: action.payload.X,
        oWins: action.payload.O,
        gamesList: action.payload.list
      };

    case "RENDER_CURRENT_GAME_STORE":
      return {
        ...state,
        aiCommand: action.payload.ai,
        playerCommand: action.payload.player
      };
    default:
      return state;
  }
};

export default reducer;
