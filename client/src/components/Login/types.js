export type Values = {
  email: string,
  password: string
};

export type LoginRequest = {
  type: string,
  values: {
    email: string,
    password: string
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
