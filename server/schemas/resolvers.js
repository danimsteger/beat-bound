const jwt = require('jsonwebtoken');
const { User, Song, Event, Artist } = require('../models');

const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    songs: async () => Song.find(),
    users: async () => User.find(),
    me: async (parent, args, { user }) => {
      if (!user) {
        if (!user) throw new AuthenticationError("You must be logged in");
      }
      const foundUser = await User.findById(user._id)
        .populate('songs')
        .populate('artists')
        .populate('events');

      if (!user.songs) {
        user.songs = [];
      }

      if (!user.artists) {
        user.artists = [];
      }

      if (!user.events) {
        user.events = [];
      }

      return foundUser;
    },
  },
  Mutation: {
    addSong: async (parent, { name, imageUrl }) => {
      return await Song.create({ name, imageUrl });
    },

    addUser: async (_, { firstName, lastName, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new UserInputError('A user with this email already exists');
      }

      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password,
      });

      const token = signToken(newUser);

      return { token, newUser };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const validPassword = await user.isCorrectPassword(password);

      if (!validPassword) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
