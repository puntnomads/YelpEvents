import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { loadingBarReducer } from "react-redux-loading-bar";
import results from "./components/Results/reducer";
import login from "./components/Login/reducer";
import user from "./components/User/reducer";
import signUp from "./components/Login/reducer";

const IndexReducer = combineReducers({
  form,
  loadingBar: loadingBarReducer,
  results,
  login,
  user,
  signUp
});

export default IndexReducer;
