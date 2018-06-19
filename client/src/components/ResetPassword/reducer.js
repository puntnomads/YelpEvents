import {
  RESET_PASSWORD_REQUESTING,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR
} from "./constants";
import type { ResetPasswordState } from "./types";

type State = ResetPasswordState;

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: []
};

const reducer = function loginReducer(
  state: State = initialState,
  action: Object
): State {
  switch (action.type) {
    case RESET_PASSWORD_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{ body: "Logging in...", time: new Date() }],
        errors: []
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        errors: [],
        messages: [],
        requesting: false,
        successful: true
      };

    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        errors: state.errors.concat([
          {
            body: action.error,
            time: new Date()
          }
        ]),
        messages: [],
        requesting: false,
        successful: false
      };

    default:
      return state;
  }
};

export default reducer;
