export type searchGooglePlacesAction = {
  type: string,
  input: string
};

export type AutoCompleteState = {
  results: Array<string>,
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
