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
  location: String
  time: String
  city: String
  users: [User]
  artists: [Artist]
}

type Artist {
  _id: ID
  name: String
  imageUrl: String
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
  imageUrl: String
  artists: [Artist]
  users: [User]
}


  type Query {
    users: [User]
    songs: [Song]
    me: User
   
  }

  type Mutation {
  addSong(
    name: String!,
    imageUrl: String
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

  }


`;

module.exports = typeDefs;

// events: [Event]
// artists: [Artist]
// artist(_id: ID!): Artist
// user: User
// event(_id: ID!): Event
// songs: [Song]

// user
