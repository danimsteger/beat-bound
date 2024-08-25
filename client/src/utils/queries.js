import { gql } from '@apollo/client';

//  Fetches all songs
export const QUERY_SONGS = gql`
  query getSongs {
    songs {
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

// Fetches all artists
export const QUERY_ARTISTS = gql`
  query getArtists {
    artists {
      _id
      name
      imageUrl
      events {
        _id
        name
        date
        venue
        city
        externalUrl
      }
    }
  }
`;

// Fetches all events including location, time, city, etc
export const QUERY_EVENTS = gql`
  query getEvents {
    events {
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

// Fetches a specific user by ID
export const QUERY_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      _id
      firstName
      lastName
      email
      songs {
        _id
        name
        imageUrl
      }
      artists {
        _id
        name
        imageUrl
      }
      events {
        _id
        location
        time
        city
      }
    }
  }
`;

// Fetches the currently logged-in user's information
export const QUERY_ME = gql`
  query me {
    me {
      _id
      firstName
      lastName
      email
      songs {
        _id
        name
        imageUrl
      }
      artists {
        _id
        name
        imageUrl
      }
      events {
        _id
        location
        time
        city
      }
    }
  }
`;

export const GET_USERS_ARTISTS = gql`
  query GetMyArtists {
    me {
      artists {
        _id
        name
        imageUrl
        spotifyId
      }
    }
  }
`;

export const GET_USERS_EVENTS = gql`
  query GetMyEvents {
    me {
      events {
        _id
        name
        date
        venue
        city
      }
    }
  }
`;

export const GET_USERS_SONGS = gql`
  query GetMySongs {
    me {
      _id
      firstName
      lastName
      songs {
        _id
        name
        artist
        album
        imageUrl
        externalUrl
      }
    }
  }
`;


