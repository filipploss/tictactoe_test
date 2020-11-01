import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import "./index.css";
import App from "./App";
import reducer from "./reducer";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
export const { dispatch } = store;

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

export default store;
