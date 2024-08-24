const mongoose = require("mongoose");

const { Schema } = mongoose;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  externalUrl: {
    type: String,
    required: true,
    trim: true,
  },
  artist: [
    {
      type: String,
      trim: true,
    },
  ],
  time: {
    type: String,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
