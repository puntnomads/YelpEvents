import { RESET_PASSWORD_REQUESTING } from "./constants";
import type { ResetPasswordValues, ResetPasswordRequest } from "./types";

const resetPasswordRequest = function resetPasswordRequest(
  values: ResetPasswordValues
): ResetPasswordRequest {
  return {
    type: RESET_PASSWORD_REQUESTING,
    values
  };
};

export default resetPasswordRequest;
