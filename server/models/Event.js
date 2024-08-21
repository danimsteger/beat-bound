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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
