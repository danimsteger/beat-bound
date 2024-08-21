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
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
