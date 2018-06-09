import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from "./constants";
import type { LoginState } from "./types";

type State = LoginState;

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: []
};

const reducer = function loginReducer(
  state: State = initialState,
  action: Object
): LoginState {
  switch (action.type) {
    case LOGIN_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{ body: "Logging in...", time: new Date() }],
        errors: []
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        errors: [],
        messages: [],
        requesting: false,
        successful: true
      };

    case LOGIN_ERROR:
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
