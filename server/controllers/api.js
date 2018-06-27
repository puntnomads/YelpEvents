const Event = require("../models/event"),
  axios = require("axios"),
  config = require("../config/main");

exports.searchYelp = async (req, res, next) => {
  const category = req.query.category;
  const location = req.query.location;
  const now = Math.floor(Date.now() / 1000);
  const url = `https://api.yelp.com/v3/events?categories=${category}&location=${location}&limit=10`;
  const Authorization = "Bearer " + config.yelpAPIKey;
  const response = await axios.get(url, {
    headers: { Authorization: Authorization }
  });
  res.json({ results: response.data.events });
};

exports.getUserEvents = async (req, res, next) => {
  const events = await Event.find({ user: req.params.userID });
  res.json({ events: events });
};

exports.createEvent = async (req, res, next) => {
  const event = new Event(req.body);
  const newEvent = await event.save();
  res.json({ event: newEvent, info: "Event saved" });
};

exports.deleteEvent = async (req, res, next) => {
  const event = await Event.findOneAndRemove({
    id: req.query.e,
    user: req.query.u
  });
  res.json({ event: event, info: "Event deleted" });
};
