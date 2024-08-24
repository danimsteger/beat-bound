const mongoose = require("mongoose");

const { Schema } = mongoose;

const songSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  artist: {
    type: String,
    trim: true,
  },
  album: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  externalUrl: {
    type: String,
    trim: true,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
