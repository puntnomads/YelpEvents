export type LoginValues = {
  email: string,
  password: string
};

export type TokenValues = {
  token: string
};

export type LoginRequest = {
  type: string,
  values: {
    email: string,
    password: string
  }
};

export type ConfirmUserEmailRequest = {
  type: string,
  values: {
    token: string
  }
};

export type LoginState = {
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
