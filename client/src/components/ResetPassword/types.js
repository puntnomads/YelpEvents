export type ResetPasswordValues = {
  password: string,
  confirmPassword: string,
  token: string
};

export type ResetPasswordRequest = {
  type: string,
  values: {
    password: string,
    confirmPassword: string,
    token: string
  }
};

export type ResetPasswordState = {
  requesting: boolean,
  successful: boolean,
  messages: Array<{
    body: string,
    time: Date
  }>,
  errors: Array<{
    body: string,
    time: Date
  }>
};
