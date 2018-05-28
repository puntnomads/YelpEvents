module.exports = {
  secret: "super secret passphrase",
  database: process.env.MONGOLAB_URI || "mongodb://localhost:27017/yelp-events",
  port: process.env.PORT || 3001,
  email_user: process.env.EMAIL_USER,
  email_password: process.env.EMAIL_PASSWORD,
  siteKey: process.env.SITE_KEY,
  secretKey: process.env.SECRET_KEY
};
