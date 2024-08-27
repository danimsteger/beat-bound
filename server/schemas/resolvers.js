const jwt = require("jsonwebtoken");
const { User, Song, Event, Artist } = require("../models");
const mongoose = require("mongoose");
const { ApolloError } = require("@apollo/server/errors");
const {
  Types: { ObjectId },
} = require("mongoose");

const { signToken, AuthenticationError } = require("../utils/auth");

const createSong = async (name, imageUrl) => {
  const newSong = new Song({ name, imageUrl, artists: [], users: [] });
  await newSong.save();
  return newSong;
};

const updateUser = async (user) => {
  await User.findByIdAndUpdate(user._id, {
    $set: { songs: user.songs, events: user.events, artists: user.artist },
  });
};

const createEvent = async (location, time, city) => {
  const newEvent = new Event({ location, time, city, artists: [], users: [] });
  await newEvent.save();
  return newEvent;
};

const createArtist = async (name, imageUrl) => {
  const newArtist = new Artist({ name, imageUrl, events: [], users: [] });
  await newArtist.save({ new: true });
  return newArtist;
};

const resolvers = {
  Query: {
    songs: async () => Song.find().populate("users"),
    events: async () => Event.find().populate("users"),
    artists: async () => Artist.find().populate("users"),
    users: async () =>
      User.find({}).populate("songs").populate("events").populate("artists"),

    me: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError("You must be logged in");
      }

      const currentUser = await User.findById(user._id)
        .populate({
          path: "songs",
          match: { users: user._id },
        })
        .populate({
          path: "artists",
          match: { users: user._id },
        })
        .populate({
          path: "events",
          match: { users: user._id },
        })

      if (!currentUser) {
        throw new AuthenticationError("User not found");
      }

      if (!currentUser.songs) {
        currentUser.songs = [];
      }
      if (!currentUser.artists) {
        currentUser.artists = [];
      }
      if (!currentUser.events) {
        currentUser.events = [];
      }

      return currentUser;
    },
    user: async (_, args) => {
      return await User.findById(args.id)
        .populate("songs")
        .populate("artists")
        .populate("events");
    },
  },
  Mutation: {
    addSong: async (
      parent,
      { name, artist, album, imageUrl, externalUrl },
      context
    ) => {
      if (!context || !context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const normalizedName = name.trim().toLowerCase();
      const normalizedArtist = artist.trim().toLowerCase();
      const normalizedAlbum = album.trim().toLowerCase();

      let song = await Song.findOne({
        name: normalizedName,
        artist: normalizedArtist,
        album: normalizedAlbum,
      });

      if (song) {
        if (!song.imageUrl || song.imageUrl !== imageUrl) {
          song.imageUrl = imageUrl;
          song.externalUrl = externalUrl;
          await song.save();
        }

        if (!song.users.includes(context.user._id)) {
          song.users.push(context.user._id);
          await song.save();
        }
      } else {
        song = await Song.create({
          name: normalizedName,
          artist: normalizedArtist,
          album: normalizedAlbum,
          imageUrl,
          externalUrl,
          users: [context.user._id],
        });
      }

      await User.findByIdAndUpdate(context.user._id, {
        $addToSet: { songs: song._id },
      });

      return song;
    },

    addEvent: async (
      parent,
      { name, date, venue, city, externalUrl },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      let event = await Event.findOne({ name, date, venue, city });

      if (event) {
        if (!event.users.includes(context.user._id)) {
          event.users.push(context.user._id);
          await event.save();
        }
      } else {
        event = await Event.create({
          name,
          date,
          venue,
          city,
          externalUrl,
          users: [context.user._id],
        });
      }
      await User.findByIdAndUpdate(context.user._id, {
        $addToSet: { events: event._id },
      });

      return event;
    },

    addArtist: async (
      parent,
      { name, spotifyId, imageUrl, externalUrl },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      let artist = await Artist.findOne({ spotifyId });

      if (artist) {
        if (!artist.users.includes(context.user._id)) {
          artist.users.push(context.user._id);
          await artist.save();
        }
      } else {
        artist = await Artist.create({
          name,
          spotifyId,
          imageUrl,
          externalUrl,
          users: [context.user._id],
        });
      }

      await User.findByIdAndUpdate(context.user._id, {
        $addToSet: { artists: artist._id },
      });

      return artist;
    },

    addUser: async (_, { firstName, lastName, email, password }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error("A user with this email already exists");
        }

        const newUser = await User.create({
          firstName,
          lastName,
          email,
          password,
        });

        const token = signToken(newUser);

        return { token, user: newUser };
      } catch (err) {
        console.error("Error creating user:", err); // Log the specific error

        if (err.name === "ValidationError") {
          throw new Error(
            "User validation failed: " + Object.keys(err.errors).join(", ")
          );
        }

        throw new Error("Failed to create user");
      }
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address.");
      }

      const validPassword = await user.isCorrectPassword(password);

      if (!validPassword) {
        throw new AuthenticationError("Incorrect password.");
      }

      const token = signToken(user);

      return { token, user };
    },

    removeUserFromEvent: async (parent, { userId, eventId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
    
      try {
        const event = await Event.findById(eventId);
        if (!event) {
          throw new Error("Event not found!");
        }
    
        if (!event.users.includes(userId)) {
          throw new Error("User not found in event's users list!");
        }
    
        const updatedEvent = await Event.findByIdAndUpdate(
          eventId,
          { $pull: { users: userId } },
          { new: true }
        ).populate("users");
    
        return updatedEvent;
      } catch (err) {
        console.error("Error in removeUserFromEvent resolver:", err.message);
        console.error("Stack trace:", err.stack);
        throw new Error("Failed to remove user from event.");
      }
    },

    removeUserFromArtist: async (parent, { artistId, userId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      try {
        const artist = await Artist.findById(artistId);
        if (!artist) {
          throw new Error("Artist not found!");
        }

        if (!artist.users.includes(userId)) {
          throw new Error("User not found in artist's users list!");
        }

        const updatedArtist = await Artist.findByIdAndUpdate(
          artistId,
          { $pull: { users: userId } },
          { new: true }
        ).populate("users");

        return updatedArtist;
      } catch (err) {
        console.error("Error in removeUserFromArtist resolver:", err.message);
        console.error("Stack trace:", err.stack);
        throw new Error("Failed to remove user from artist.");
      }
    },

    removeUserFromSong: async (parent, { songId, userId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      try {
        const song = await Song.findById(songId);
        if (!song) {
          throw new Error("Song not found!");
        }

        if (!song.users.includes(userId)) {
          throw new Error("User not found in song's users list!");
        }

        const updatedSong = await Song.findByIdAndUpdate(
          songId,
          { $pull: { users: userId } },
          { new: true }
        ).populate("users");

        return updatedSong;
      } catch (err) {
        console.error("Error in removeUserFromSong resolver:", err.message);
        console.error("Stack trace:", err.stack);
        throw new Error("Failed to remove user from song.");
      }
    },
  },
};

module.exports = resolvers;
