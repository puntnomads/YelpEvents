import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { loadingBarReducer } from "react-redux-loading-bar";
import results from "./components/Results/reducer";

const IndexReducer = combineReducers({
  form,
  loadingBar: loadingBarReducer,
  results
});

export default IndexReducer;
