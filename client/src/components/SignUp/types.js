export type Values = {
  email: string,
  password: string
};

export type SignUpRequest = {
  type: string,
  values: {
    email: string,
    password: string
  }
};

export type SignUpState = {
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
