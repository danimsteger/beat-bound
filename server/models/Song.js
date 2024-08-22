const mongoose = require('mongoose');

const { Schema } = mongoose;

const songSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
  },
  artists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Artist',
      required: true,
    },
  ],

  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
