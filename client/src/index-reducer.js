import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { loadingBarReducer } from "react-redux-loading-bar";

const IndexReducer = combineReducers({
  form,
  loadingBar: loadingBarReducer
});

export default IndexReducer;
