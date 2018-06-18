import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { loadingBarReducer } from "react-redux-loading-bar";
import results from "./components/Results/reducer";
import login from "./components/Login/reducer";
import forgotPassword from "./components/ForgotPassword/reducer";
import user from "./components/User/reducer";
import signUp from "./components/Login/reducer";

const IndexReducer = combineReducers({
  form,
  loadingBar: loadingBarReducer,
  results,
  login,
  forgotPassword,
  user,
  signUp
});

export default IndexReducer;
