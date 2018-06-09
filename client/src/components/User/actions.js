import { USER_SET, USER_UNSET } from "./constants";
import type { Values, SetUser } from "./types";

export const setUser = function setUser(values: Values): SetUser {
  return {
    type: USER_SET,
    ...values
  };
};

export const unsetUser = function unsetUser() {
  return {
    type: USER_UNSET
  };
};
