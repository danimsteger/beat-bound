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
  mutation addSong($name: String!, $imageUrl: String, $userId: ID!) {
    addSong(name: $name, imageUrl: $imageUrl, userId: $userId) {
      _id
      name
      imageUrl
      artists {
        _id
        name
      }
    }
  }
`;

// Adding an Artist
export const ADD_ARTIST = gql`
  mutation addArtist($name: String!, $imageUrl: String, $userId: ID!) {
    addArtist(name: $name, imageUrl: $imageUrl, userId: $userId) {
      _id
      name
      imageUrl
    }
  }
`;

// Adding an Event
export const ADD_EVENT = gql`
  mutation addEvent($location: String!, $time: String!, $city: String!, $userId: ID!) {
    addEvent(location: $location, time: $time, city: $city, userId: $userId) {
      _id
      location
      time
      city
      artists {
        _id
        name
      }
      users {
        _id
        firstName
        lastName
      }
    }
  }
`;

// Removing a song
export const REMOVE_SONG = gql`
  mutation removeSong($userId: ID!, $songId: ID!) {
    removeSong(userId: $userId, songId: $songId) {
      _id
      name
    }
  }
`;

// Removing an Artist
export const REMOVE_ARTIST = gql`
  mutation removeArtist($userId: ID!, $artistId: ID!) {
    removeArtist(userId: $userId, artistId: $artistId) {
      _id
      name
    }
  }
`;

// Removing an Event
export const REMOVE_EVENT = gql`
  mutation removeEvent($userId: ID!, $eventId: ID!) {
    removeEvent(userId: $userId, eventId: $eventId) {
      _id
      location
      time
      city
    }
  }
`;
