import { put, takeEvery, all } from "redux-saga/effects";

import {
  fetchFail,
  makeMoveSuccess,
  matchRestartSuccess,
  nextMatchSuccess,
  renderBoardSuccess,
  renderScoreSuccess,
  resetAllGamesSuccess,
  updateScoreSuccess,
} from "./actions";

function* fetchFunc(url, method, dispatchFunc, callback, action) {
  try {
    const response = action
      ? yield fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(action.payload),
        })
      : yield fetch(url, {
          method,
        });
    const myJson = yield response.json();
    const result = yield myJson.result;
    yield put(dispatchFunc(result));
    if (callback) {
      yield callback();
    }
  } catch (err) {
    yield put(fetchFail(err));
    alert(err);
  }
}

function* renderBoard() {
  yield fetchFunc("http://localhost:3001/api/game", "GET", renderBoardSuccess);
}

function* makeMove(action) {
  yield fetchFunc(
    "http://localhost:3001/api/game/move",
    "POST",
    makeMoveSuccess,
    null,
    action
  );
}

function* scoreUpdate() {
  yield fetchFunc("http://localhost:3001/api/score", "GET", updateScoreSuccess);
}

function* matchRestart() {
  yield fetchFunc(
    "http://localhost:3001/api/game/reset",
    "POST",
    matchRestartSuccess,
    scoreUpdate
  );
}

function* nextMatch() {
  yield fetchFunc(
    "http://localhost:3001/api/game/next",
    "GET",
    nextMatchSuccess,
    scoreUpdate
  );
}

function* resetAllGames() {
  yield fetchFunc(
    "http://localhost:3001/api/score/reset",
    "POST",
    resetAllGamesSuccess,
    nextMatch
  );
}

function* renderScore() {
  yield fetchFunc("http://localhost:3001/api/score", "GET", renderScoreSuccess);
}

function* watch() {
  yield takeEvery("MAKE_MOVE_REQUEST", makeMove);
  yield takeEvery("RENDER_SCORE_REQUEST", renderScore);
  yield takeEvery("UPDATE_SCORE_REQUEST", scoreUpdate);
  yield takeEvery("RESTART_MATCH_REQUEST", matchRestart);
  yield takeEvery("NEXT_MATCH_REQUEST", nextMatch);
  yield takeEvery("RESET_ALL_GAMES_REQUEST", resetAllGames);
  yield takeEvery("RENDER_BOARD_REQUEST", renderBoard);
}

export default function* rootSaga() {
  yield all([watch()]);
}
