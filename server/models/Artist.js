const mongoose = require('mongoose');

const { Schema } = mongoose;

// const Song = require('./Song');
// const Event = require('./Event');

const artistSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Song',
    },
  ],
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
