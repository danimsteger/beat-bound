const typeDefs = `
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    songs: [Song]
    artists: [Artist]
    events: [Event]
  }

type Event {
  _id: ID
  name: String
  date: String
  venue: String
  city: String
  externalUrl: String
  users: [User]
  artists: [Artist]
}

type Artist {
  _id: ID
  name: String
  imageUrl: String
  spotifyId: String
  externalUrl: String
  users: [User]
  songs: [Song]
  events: [Event]
}

type Auth {
  token: ID
  user: User
}

 type Song {
    _id: ID
    name: String
    artist: String
    album: String
    imageUrl: String
    externalUrl: String
    artists: [Artist]
    users: [User]
  }

type Query {
  users: [User]
  songs: [Song]
  me: User
  user(id: ID!): User
  events: [Event]
  artists: [Artist]
}

type Mutation {
   addSong(
      name: String!,
      artist: String!,
      album: String!,
      imageUrl: String,
      externalUrl: String!,
    ): Song

  addUser(
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  ): Auth

  login(
    email: String!
    password: String!
    ): Auth

  addEvent(
    name: String!
    date: String!
    venue: String!
    city: String!
    externalUrl: String!
    artistNames: [String!]!
  ): Event

   addArtist(
      name: String!
      spotifyId: String!
      imageUrl: String
      externalUrl: String!
    ): Artist

  removeEvent(
    userId: ID!
    eventId: ID!
  ): User

  removeArtist(
    userId: ID!
    artistId: ID!
  ): User

  removeSong(
    userId: ID!
    songId: ID!
  ): User
  }
`;

module.exports = typeDefs;
