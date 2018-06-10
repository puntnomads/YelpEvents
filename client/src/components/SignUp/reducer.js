import {
  SIGN_UP_REQUESTING,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR
} from "./constants";
import type { SignUpState } from "./types";

type State = SignUpState;

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: []
};

const reducer = function signUpReducer(
  state: State = initialState,
  action: Object
): State {
  switch (action.type) {
    case SIGN_UP_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{ body: "Signing up...", time: new Date() }],
        errors: []
      };

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        errors: [],
        messages: [
          {
            body: `Successfully created account for ${
              action.response.data.user.email
            }`,
            time: new Date()
          }
        ],
        requesting: false,
        successful: true
      };

    case SIGN_UP_ERROR:
      return {
        ...state,
        errors: state.errors.concat([
          {
            body: action.error.response.data.error,
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
