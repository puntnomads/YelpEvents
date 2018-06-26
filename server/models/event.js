const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Event = new Schema({
  id: {
    type: String
  },
  user: {
    type: mongoose.Schema.ObjectId
  },
  name: {
    type: String
  },
  attending_count: {
    type: Number
  },
  business_id: {
    type: String
  },
  category: {
    type: String
  },
  cost: {
    type: Number
  },
  cost_max: {
    type: Number
  },
  description: {
    type: String
  },
  event_site_url: {
    type: String
  },
  image_url: {
    type: String
  },
  interested_count: {
    type: Number
  },
  is_canceled: {
    type: Boolean
  },
  is_free: {
    type: Boolean
  },
  is_official: {
    type: Boolean
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  tickets_url: {
    type: String
  },
  time_end: {
    type: Date
  },
  time_start: {
    type: Date
  },
  location: {
    address1: {
      type: String
    },
    address2: {
      type: String
    },
    address3: {
      type: String
    },
    city: {
      type: String
    },
    country: {
      type: String
    },
    cross_streets: {
      type: String
    },
    state: {
      type: String
    },
    zip_code: {
      type: String
    },
    display_address: {
      type: [String]
    }
  }
});

module.exports = mongoose.model("Event", Event);
