const mongoose = require('mongoose');

const { Schema } = mongoose;

const artistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  spotifyId: {
    type: String,
    unique: true,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  externalUrl: {
    type: String,
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  songs: [{
    type: Schema.Types.ObjectId,
    ref: 'Song',
  }],
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
