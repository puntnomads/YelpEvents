export type ForgotPasswordValues = {
  email: string,
  "g-recaptcha-response": string
};

export type ForgotPasswordRequest = {
  type: string,
  values: {
    email: string,
    "g-recaptcha-response": string
  }
};

export type ForgotPasswordState = {
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
