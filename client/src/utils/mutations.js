import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

// Adding a Song
export const ADD_SONG = gql`
  mutation addSong(
    $name: String!
    $artist: String!
    $album: String!
    $imageUrl: String
    $externalUrl: String!
  ) {
    addSong(
      name: $name
      artist: $artist
      album: $album
      imageUrl: $imageUrl
      externalUrl: $externalUrl
    ) {
      _id
      name
      artist
      album
      imageUrl
      externalUrl
      users {
        _id
        email
      }
    }
  }
`;

// Adding an Artist
export const ADD_ARTIST = gql`
  mutation addArtist(
    $name: String!
    $spotifyId: String!
    $imageUrl: String
    $externalUrl: String!
  ) {
    addArtist(
      name: $name
      spotifyId: $spotifyId
      imageUrl: $imageUrl
      externalUrl: $externalUrl
    ) {
      _id
      name
      spotifyId
      imageUrl
      externalUrl
      users {
        _id
        email
      }
    }
  }
`;

// Adding an Event
export const ADD_EVENT = gql`
  mutation addEvent(
    $name: String!
    $date: String!
    $venue: String!
    $city: String!
    $externalUrl: String!
  ) {
    addEvent(
      name: $name
      date: $date
      venue: $venue
      city: $city
      externalUrl: $externalUrl
    ) {
      _id
      name
      date
      venue
      city
      externalUrl
      users {
        _id
        email
      }
    }
  }
`;

// Removing a song
export const REMOVE_SONG = gql`
  mutation removeUserFromSong($songId: ID!, $userId: ID!) {
    removeUserFromSong(songId: $songId, userId: $userId) {
      _id
      name
      artist
      album
      imageUrl
      externalUrl
      users {
        _id
        email
      }
    }
  }
`;

// Removing an Artist
export const REMOVE_ARTIST = gql`
  mutation RemoveArtist($artistId: ID!, $userId: ID!) {
    removeUserFromArtist(artistId: $artistId, userId: $userId) {
      _id
      name
      imageUrl
      spotifyId
      externalUrl
    }
  }
`;

// Removing an Event
export const REMOVE_EVENT = gql`
  mutation removeUserFromEvent($userId: ID!, $eventId: ID!) {
    removeUserFromEvent(userId: $userId, eventId: $eventId) {
      _id
      name
      date
      venue
      city
      externalUrl
      users {
        _id
      }
    }
  }
`;
