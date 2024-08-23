const jwt = require('jsonwebtoken');
const { User, Song, Event, Artist } = require('../models');
const mongoose = require('mongoose');
const {
  Types: { ObjectId },
} = require('mongoose');

const { signToken, AuthenticationError } = require('../utils/auth');

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
    songs: async () => Song.find().populate('users'),
    events: async () => Event.find().populate('users'),
    artists: async () => Artist.find().populate('users'),
    users: async () =>
      User.find({}).populate('songs').populate('events').populate('artists'),

    me: async (parent, args, { user }) => {
      if (!user) {
        if (!user) throw new AuthenticationError('You must be logged in');
      }
      const currentUser = await User.findById(user._id)
        .populate('songs')
        .populate('artists')
        .populate('events');

      if (!currentUser.songs) {
        user.songs = [];
      }
      if (!currentUser.artists) {
        user.artists = [];
      }
      if (!currentUser.events) {
        user.events = [];
      }
      return foundUser;
    },
    user: async (_, args) => {
      return await User.findById(args.id)
        .populate('songs')
        .populate('artists')
        .populate('events');
    },
  },
  Mutation: {
    addSong: async (parent, { name, imageUrl, userId }, context) => {
      const newSong = await createSong(name, imageUrl);

      const user = await User.findById(userId);

      await user.populate();

      user.songs.push(newSong);
      await updateUser(user);

      newSong.users.push(user);
      await newSong.save({ new: true });

      return newSong;
    },

    addEvent: async (parent, { location, time, city, userId }, context) => {
      const newEvent = await createEvent(location, time, city);
      const user = await User.findById(userId);

      if (!user) {
        throw new Error('User not found');
      }

      await user.populate();

      user.events.push(newEvent);
      await updateUser(user);

      newEvent.users.push(user);
      await newEvent.save({ new: true });

      return newEvent;
    },

    addArtist: async (parent, { name, imageUrl, userId }, context) => {
      const newArtist = await createArtist(name, imageUrl);
      const user = await User.findById(userId);

      if (!user) {
        throw new Error('User not found');
      }

      user.artists.push(newArtist);
      await user.save();

      newArtist.users.push(user);
      await newArtist.save({ new: true });

      return newArtist;
    },

    addUser: async (_, { firstName, lastName, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new UserInputError('A user with this email already exists');
      }

      const newUser = await User.create(
        {
          firstName,
          lastName,
          email,
          password,
        },
        { new: true }
      );

      const token = signToken(newUser);

      return { token, user: newUser };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address.');
      }

      const validPassword = await user.isCorrectPassword(password);

      if (!validPassword) {
        throw new AuthenticationError('Incorrect password.');
      }

      const token = signToken(user);

      return { token, user };
    },

    removeEvent: async (_, { userId, eventId }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        {
          $pull: {
            events: {
              _id: eventId,
            },
          },
        },
        { new: true }
      );
    },

    removeArtist: async (_, { userId, artistId }) => {
      // const artistObjectId = ObjectId(artistId);
      return User.findOneAndUpdate(
        { _id: userId },
        {
          $pull: {
            artists: {
              _id: artistId,
            },
          },
        },
        { new: true }
      );
    },

    removeSong: async (_, { userId, songId }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        {
          $pull: {
            songs: {
              _id: songId,
            },
          },
        },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
