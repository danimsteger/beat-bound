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
  mutation addSong($name: String!, $artist: String!, $album: String!, $imageUrl: String, $externalUrl: String!) {
    addSong(name: $name, artist: $artist, album: $album, imageUrl: $imageUrl, externalUrl: $externalUrl) {
      _id
      name
      artist
      album
      imageUrl
      externalUrl
    }
  }
`;

// Adding an Artist
export const ADD_ARTIST = gql`
  mutation addArtist($name: String!, $imageUrl: String, $externalUrl: String!) {
    addArtist(name: $name, imageUrl: $imageUrl, externalUrl: $externalUrl) {
      _id
      name
      imageUrl
      externalUrl
    }
  }
`;

// Adding an Event
export const ADD_EVENT = gql`
mutation addEvent($name: String!, $date: String!, $venue: String!, $city: String!, $externalUrl: String!) {
  addEvent(name: $name, date: $date, venue: $venue, city: $city, externalUrl: $externalUrl) {
    _id
    name
    date
    venue
    city
    externalUrl
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
