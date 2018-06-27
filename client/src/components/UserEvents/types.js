export type getEventsAction = {
  type: string,
  id: string
};

export type DeleteEventAction = {
  type: string,
  eventId: string,
  userId: string
};

export type EventValues = {
  id: string,
  user: string,
  name: string,
  attending_count: number,
  business_id: string,
  category: string,
  cost: number,
  cost_max: number,
  description: string,
  event_site_url: string,
  image_url: string,
  interested_count: number,
  is_canceled: boolean,
  is_free: boolean,
  is_official: boolean,
  latitude: number,
  longitude: number,
  tickets_url: string,
  time_end: Date,
  time_start: Date,
  location: {
    address1: string,
    address2: string,
    address3: string,
    city: string,
    country: string,
    cross_streets: string,
    state: string,
    zip_code: string,
    display_address: Array<string>
  }
};

export type EventAction = {
  type: string,
  event: EventValues
};

export type EventsState = {
  events: Array<EventValues>,
  event: Object,
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
