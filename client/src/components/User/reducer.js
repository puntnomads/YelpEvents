import { USER_SET, USER_UNSET } from "./constants";
import type { UserState } from "./types";

type State = UserState;

const initialSate = {
  token: "",
  ttl: "",
  created: "",
  name: "",
  email: "",
  id: ""
};

const reducer = function userReducer(
  state: State = initialSate,
  action: Object
): State {
  switch (action.type) {
    case USER_SET:
      return {
        ...state,
        token: action.token,
        ttl: action.ttl,
        created: action.created,
        name: action.name,
        email: action.email,
        id: action.id
      };

    case USER_UNSET:
      return {
        ...state,
        token: "",
        ttl: "",
        created: "",
        name: "",
        email: "",
        id: ""
      };

    default:
      return state;
  }
};

export default reducer;
