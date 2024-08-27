require("dotenv").config();
const getAccessToken = require("./getToken");

async function getTrack(trackQuery) {
  try {
    const accessToken = await getAccessToken();
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      trackQuery
    )}&type=track&offset=0&limit=5`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (data.tracks && data.tracks.items.length > 0) {
      const tracks = data.tracks.items.map((track) => ({
        name: track.name,
        artists: track.artists.map((artist) => ({
          name: artist.name,
          spotifyId: artist.id,
        })),
        album: track.album.name,
        imageURL: track.album.images.length > 0 ? track.album.images[0].url : null,
        previewUrl: track.preview_url,
        externalUrl: track.external_urls.spotify,
      }));
      return tracks;
    } else {
      console.log("No tracks found");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getArtist(artistQuery) {
  try {
    const accessToken = await getAccessToken();
    const url = `https://api.spotify.com/v1/search?query=${encodeURIComponent(
      artistQuery
    )}&type=artist&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=5`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    if (data.artists && data.artists.items.length > 0) {
      const artists = data.artists.items.map((artist) => ({
        name: artist.name,
        spotifyId: artist.id,
        URI: artist.uri,
        imageURL: artist.images.length > 0 ? artist.images[0].url : null,
        externalUrl: artist.external_urls.spotify,
      }));
      return artists;
    } else {
      console.log("No artist found");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getArtistEvents(artistName) {
  try {
    const API_KEY = process.env.TICKETMASTER_API;
    const attractionsUrl = `https://app.ticketmaster.com/discovery/v2/attractions.json?keyword=${encodeURIComponent(
      artistName
    )}&apikey=${API_KEY}&size=5`;
    const attractionsResponse = await fetch(attractionsUrl, { method: "GET" });

    if (!attractionsResponse.ok) {
      throw new Error(`HTTP error! Status: ${attractionsResponse.status}`);
    }

    const attractionsData = await attractionsResponse.json();

    if (
      attractionsData._embedded &&
      attractionsData._embedded.attractions &&
      attractionsData._embedded.attractions.length > 0
    ) {
      const artistAttractions = attractionsData._embedded.attractions.filter(
        (attraction) =>
          attraction.name.toLowerCase() === artistName.toLowerCase()
      );

      if (artistAttractions.length === 0) {
        return { error: "No attractions found for the specified artist" };
      }
      const eventsPromises = artistAttractions.map(async (attraction) => {
        const eventsUrl = `https://app.ticketmaster.com/discovery/v2/events.json?attractionId=${attraction.id}&apikey=${API_KEY}&size=5`;
        const eventsResponse = await fetch(eventsUrl, { method: "GET" });

        if (!eventsResponse.ok) {
          throw new Error(`HTTP error! Status: ${eventsResponse.status}`);
        }

        const eventsData = await eventsResponse.json();
        return eventsData._embedded ? eventsData._embedded.events : [];
      });

      const allEvents = (await Promise.all(eventsPromises)).flat();
      const formattedEvents = allEvents.map((event) => ({
        name: event.name,
        date: event.dates.start.localDate,
        venue: event._embedded.venues
          ? event._embedded.venues[0].name
          : "Unknown",
        city: event._embedded.venues
          ? event._embedded.venues[0].city.name
          : "Unknown",
        externalUrl: event.url,
        artist: [artistName],
      }));

      return formattedEvents.length > 0
        ? formattedEvents
        : { error: "No events found for the specified artist" };
    } else {
      return { error: "No attractions found" };
    }
  } catch (error) {
    console.error("Error:", error);
    return { error: "Error fetching events data" };
  }
}

async function getFeaturedPlaylists() {
  try {
      const accessToken = await getAccessToken();
      const url = 'https://api.spotify.com/v1/browse/featured-playlists?limit=6';

      const response = await fetch(url, {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${accessToken}`
          },
      });

      if (!response.ok) {
          throw new Error('Failed to fetch featured playlists: ' + response.statusText);
      }

      const data = await response.json();
      const playlists = data.playlists.items.map(playlist => ({
          description: playlist.description,
          externalUrls: playlist.external_urls.spotify,
          imageUrl: playlist.images[0]?.url
      }));

      return playlists;
  } catch (error) {
      console.error('Error in getFeaturedPlaylists:', error);
      throw error;
  }
}

async function getArtistFeaturedTracks(artistId) {
  try {
      const accessToken = await getAccessToken();
      const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`;

      const response = await fetch(url, {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${accessToken}`
          },
      });

      if (!response.ok) {
          throw new Error(`Failed to fetch top tracks: ${response.statusText}`);
      }

      const data = await response.json();
      const topTracks = data.tracks.slice(0, 10).map(track => ({
          name: track.name,
          albumName: track.album.name,
          previewUrl: track.preview_url,
          imageUrl: track.album.images[0]?.url,
          externalUrl: track.external_urls.spotify
      }));

      return topTracks;
  } catch (error) {
      console.error('Error fetching artist top tracks:', error);
      throw error;
  }
}

async function getRelatedArtists(artistId) {
  try {
      const accessToken = await getAccessToken();
      const url = `https://api.spotify.com/v1/artists/${artistId}/related-artists`;

      const response = await fetch(url, {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${accessToken}`
          }
      });

      if (!response.ok) {
          throw new Error(`Failed to fetch related artists: ${response.statusText}`);
      }

      const data = await response.json();
      const relatedArtists = data.artists.slice(0, 5).map(artist => ({
          name: artist.name,
          spotifyId: artist.id,
          externalUrl: artist.external_urls.spotify,
          image: artist.images[0]?.url
      }));

      return relatedArtists;
  } catch (error) {
      console.error('Error fetching related artists:', error);
      throw error;
  }
}

async function getArtistById(spotifyId) {
  try {
    const accessToken = await getAccessToken(); // Assume this function fetches a valid access token
    const url = `https://api.spotify.com/v1/artists/${spotifyId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    if (data) {
      const artist = {
        name: data.name,
        spotifyId: data.id,
        URI: data.uri,
        imageURL: data.images.length > 0 ? data.images[0].url : null,
        externalUrl: data.external_urls.spotify,
      };
      return artist;
    } else {
      console.log("Artist not found");
    }
  } catch (error) {
    console.error("Error fetching artist:", error);
  }
}




module.exports = { getTrack, getArtist, getArtistEvents, getFeaturedPlaylists, getArtistFeaturedTracks, getRelatedArtists, getArtistById };
