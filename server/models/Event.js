const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
  location: {
    type: String,
    required: true,
    trim: true,
  },
  time: {
    type: String,
  },
  city: {
    type: String,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  artists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Artist',
    },
  ],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
