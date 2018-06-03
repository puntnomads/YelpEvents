export type searchYelpAction = {
  type: string,
  query: string
};

export type ResultsState = {
  results: Array<Object>,
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
