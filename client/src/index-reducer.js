import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { loadingBarReducer } from "react-redux-loading-bar";
import results from "./components/Results/reducer";
import login from "./components/Login/reducer";
import forgotPassword from "./components/ForgotPassword/reducer";
import resetPassword from "./components/ResetPassword/reducer";
import user from "./components/User/reducer";
import signUp from "./components/SignUp/reducer";
import userEvents from "./components/UserEvents/reducer";
import autoComplete from "./components/Lib/AutoComplete/reducer";

const IndexReducer = combineReducers({
  form,
  loadingBar: loadingBarReducer,
  results,
  login,
  forgotPassword,
  resetPassword,
  user,
  signUp,
  userEvents,
  autoComplete
});

export default IndexReducer;
