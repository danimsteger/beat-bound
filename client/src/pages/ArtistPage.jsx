import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ARTISTS, QUERY_EVENTS } from "../utils/queries";
import { ADD_ARTIST, ADD_EVENT } from "../utils/mutations";
import Auth from "../utils/auth";

const ArtistPage = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [events, setEvents] = useState([]);

  const { loading: artistLoading, error: artistError, data: artistData } = useQuery(QUERY_ARTISTS, {
    variables: { id: artistId },
  });

  const { loading: eventsLoading, error: eventsError, data: eventsData } = useQuery(QUERY_EVENTS, {
    variables: { artistId: artistId },
  });

  const [addArtist] = useMutation(ADD_ARTIST);
  const [addEvent] = useMutation(ADD_EVENT);

  useEffect(() => {
    if (artistData && artistData.artists) {
      setArtist(artistData.artists.find((artist) => artist._id === artistId));
    }

    if (eventsData && eventsData.events) {
      setEvents(eventsData.events);
    }
  }, [artistData, eventsData, artistId]);

  const handleAddArtist = async (artist) => {
    if (!Auth.loggedIn()) {
      console.error("User is not logged in.");
      return;
    }

    try {
      await addArtist({
        variables: {
          name: artist.name,
          imageUrl: artist.imageUrl || "",
          externalUrl: artist.externalUrl,
        },
      });

      alert("Artist added to your page!");
    } catch (error) {
      console.error("Error adding artist to page:", error);
      alert("There was an error adding this artist to your page.");
    }
  };

  const handleAddEvent = async (event) => {
    if (!Auth.loggedIn()) {
      console.error("User is not logged in.");
      return;
    }

    try {
      await addEvent({
        variables: {
          name: event.name,
          date: event.date,
          venue: event.venue,
          city: event.city,
          externalUrl: event.externalUrl,
        },
      });

      alert("Event added to your page!");
    } catch (error) {
      console.error("Error adding event to page:", error);
      alert("There was an error adding this event to your page.");
    }
  };

  if (artistLoading || eventsLoading) return <p>Loading...</p>;
  if (artistError || eventsError) return <p>Error: {artistError?.message || eventsError?.message}</p>;

  return (
    <div>
      <section>
        <h2>{artist?.name}</h2>
        <div>
          {artist?.imageUrl && (
            <img
              src={artist.imageUrl || "https://via.placeholder.com/150"}
              alt={artist.name}
            />
          )}
          <h3>Top Songs</h3>
          {/* Display top songs here */}
          {artist?.songs &&
            artist.songs.map((song, index) => (
              <div key={index}>
                <p>{song.name}</p>
                <audio controls>
                  <source src={song.preview_url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ))}
          {Auth.loggedIn() && (
            <button onClick={() => handleAddArtist(artist)}>Add to My Page</button>
          )}
        </div>
      </section>
      <section>
        <h2>Related Artists</h2>
        <div>
          {artist?.relatedArtists?.length > 0 ? (
            artist.relatedArtists.map((relatedArtist, index) => (
              <div key={index}>
                <p>{relatedArtist.name}</p>
                <img
                  src={relatedArtist.imageUrl || "https://via.placeholder.com/150"}
                  alt={relatedArtist.name}
                />
              </div>
            ))
          ) : (
            <p>No related artists found.</p>
          )}
        </div>
      </section>
      <section>
        <h2>Upcoming Events</h2>
        <div>
          {events.length > 0 ? (
            events.map((event, index) => (
              <div key={index}>
                <p>{event.name}</p>
                <p>
                  {event.date} - {event.city}
                </p>
                <a href={event.externalUrl} target="_blank" rel="noopener noreferrer">
                  View Event
                </a>
                {Auth.loggedIn() && (
                  <button onClick={() => handleAddEvent(event)}>Add to My Page</button>
                )}
              </div>
            ))
          ) : (
            <p>No upcoming events found.</p>
          )}
        </div>
      </section>
      <footer>
        <div>
          {/* Add Now Playing bar here */}
        </div>
      </footer>
    </div>
  );
};

export default ArtistPage;
