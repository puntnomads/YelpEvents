import { FORGOT_PASSWORD_REQUESTING } from "./constants";
import type { ForgotPasswordValues, ForgotPasswordRequest } from "./types";

const forgotPasswordRequest = function forgotPasswordRequest(
  values: ForgotPasswordValues
): ForgotPasswordRequest {
  return {
    type: FORGOT_PASSWORD_REQUESTING,
    values
  };
};

export default forgotPasswordRequest;
