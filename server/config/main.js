module.exports = {
  secret: "super secret passphrase",
  database: process.env.MONGOLAB_URI || "mongodb://localhost:27017/yelp-events",
  port: process.env.PORT || 3001,
  sendGrid_api_key: process.env.SENDGRID_API_KEY,
  siteKey: process.env.SITE_KEY,
  secretKey: process.env.SECRET_KEY,
  yelpAPIKey: process.env.YELP_API_KEY,
  google: {
    clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET
  },
  twitter: {
    consumerKey: process.env.TWITTER_AUTH_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_AUTH_CONSUMER_SECRET
  },
  facebook: {
    clientID: process.env.FACEBOOK_AUTH_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_AUTH_CLIENT_SECRET
  }
};
