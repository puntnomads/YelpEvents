import { SIGN_UP_REQUESTING } from "./constants";
import type { Values, SignUpRequest } from "./types";

const signUpRequest = function signUpRequest(values: Values): SignUpRequest {
  return {
    type: SIGN_UP_REQUESTING,
    values
  };
};

export default signUpRequest;
