import { LOGIN_REQUESTING } from "./constants";
import type { Values, LoginRequest } from "./types";

const loginRequest = function loginRequest(values: Values): LoginRequest {
  return {
    type: LOGIN_REQUESTING,
    values
  };
};

export default loginRequest;
