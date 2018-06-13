import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { applyMiddleware, createStore, compose } from "redux";
import {
  connectRouter,
  routerMiddleware,
  ConnectedRouter
} from "connected-react-router";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { ToastContainer } from "react-toastify";
import LoadingBar from "react-redux-loading-bar";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import lightBlue from "@material-ui/core/colors/lightBlue";
import CssBaseline from "@material-ui/core/CssBaseline";
import Main from "./components/Main";
import "./index.css";

import IndexReducer from "./index-reducer";
import IndexSagas from "./index-sagas";

const history = createBrowserHistory();

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: lightBlue
  }
});

const sagaMiddleware = createSagaMiddleware();

const composeSetup =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const store = createStore(
  connectRouter(history)(IndexReducer),
  (composeSetup(
    applyMiddleware(routerMiddleware(history), sagaMiddleware)
  ): any)
);

sagaMiddleware.run(IndexSagas);

const root: ?Element = document.getElementById("root");

if (root != null) {
  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Fragment>
            <LoadingBar
              showFastActions
              style={{
                backgroundColor: "red",
                height: "5px",
                position: "absolute",
                zIndex: "1"
              }}
            />
            <ToastContainer />
            <CssBaseline />
            <Main />
          </Fragment>
        </ConnectedRouter>
      </Provider>
    </MuiThemeProvider>,
    root
  );
}
