import { call, put, takeEvery, all } from "redux-saga/effects";

import {
  moveStore,
  moveStoreSuccess,
  moveStoreFail,
  renderBoardStore,
  renderScore,
  renderScoreFail,
  renderScoreSuccess,
  renderCurrentGame,
  renderCurrentGameSuccess,
  renderCurrentGameFail,
} from "./actions";
import { dispatch } from "./index";

function* fetchFunc (url, method, dispatchFunc, callback) {
    console.log('fetchFunc', url, method, dispatchFunc, callback)
    try {
      const response = yield fetch(url, {
        method,
      });
      const myJson = yield response.json();
      const result = yield myJson.result;
      yield put(dispatchFunc(result));
      if (callback) {
        yield callback();
      }
    } catch (err) {
      alert(err);
    }
  };

  // TODO: КАК обрабатывать ошибки?
  function* scoreUpdate() {
    yield fetchFunc("http://localhost:3001/api/score", "GET", renderScoreSuccess);
  };

  

function* makeMove(action) {
  try {
    const response = yield fetch("http://localhost:3001/api/game/move", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.payload),
    });

    const myJson = yield response.json();
    const result = yield myJson.result;
    yield put(moveStoreSuccess(result));
  } catch (e) {
    yield put(moveStoreFail({ message: e.message }));
    alert(e);
  }
}

function* fetchCurrentGame() {
  try {
    const response = yield fetch("http://localhost:3001/api/game");
    const myJson = yield response.json();
    const result = yield myJson.result;
    put(renderCurrentGameSuccess(result));
  } catch (e) {
    put(renderCurrentGameFail({ message: e.message }));
    alert(e);
  }
}

function* fetchScore() {
  try {
    const response = yield fetch("http://localhost:3001/api/score");
    const myJson = yield response.json();
    const result = yield myJson.result;
    yield put(renderScoreSuccess(result));
  } catch (e) {
    yield put(renderScoreFail({ message: e.message }));
    alert(e);
  }
}

function* watch() {
  yield takeEvery("MAKE_MOVE_REQUEST", makeMove);
  yield takeEvery("RENDER_SCORE_REQUEST", fetchScore);
  yield takeEvery("RENDER_CURRENT_GAME_REQUEST", fetchCurrentGame);
  yield takeEvery("UPDATE_SCORE_REQUEST", scoreUpdate);
}

export default function* rootSaga() {
  yield all([watch()]);
}
