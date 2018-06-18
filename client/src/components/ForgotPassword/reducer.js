import {
  FORGOT_PASSWORD_REQUESTING,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR
} from "./constants";
import type { ForgotPasswordState } from "./types";

type State = ForgotPasswordState;

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: []
};

const reducer = function forgotPasswordReducer(
  state: State = initialState,
  action: Object
): State {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [
          { body: "Forgot password requesting in...", time: new Date() }
        ],
        errors: []
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        errors: [],
        messages: [],
        requesting: false,
        successful: true
      };

    case FORGOT_PASSWORD_ERROR:
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
