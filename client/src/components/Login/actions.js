import { LOGIN_REQUESTING, CONFIRM_USER_EMAIL_REQUESTING } from "./constants";
import type {
  LoginValues,
  TokenValues,
  LoginRequest,
  ConfirmUserEmailRequest
} from "./types";

export const loginRequest = function loginRequest(
  values: LoginValues
): LoginRequest {
  return {
    type: LOGIN_REQUESTING,
    values
  };
};

export const confirmUserEmail = function loginRequest(
  values: TokenValues
): ConfirmUserEmailRequest {
  return {
    type: CONFIRM_USER_EMAIL_REQUESTING,
    values
  };
};
