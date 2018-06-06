const axios = require("axios"),
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
