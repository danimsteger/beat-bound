import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_EVENTS } from "../utils/queries";
import { ADD_EVENT } from "../utils/mutations";
import Auth from "../utils/auth";
import { useState, useEffect } from "react";

const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const { loading, error, data } = useQuery(QUERY_EVENTS, {
    variables: { id: eventId },
  });

  const [addEvent] = useMutation(ADD_EVENT);

  useEffect(() => {
    if (data && data.events) {
      const foundEvent = data.events.find((event) => event._id === eventId);
      setEvent(foundEvent);
    }
  }, [data, eventId]);

  const handleAddEvent = async () => {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading event data: {error.message}</p>;

  return (
    <div>
      <section>
        <h2>{event?.name}</h2>
        <div>
          <p><strong>Date:</strong> {event?.date}</p>
          <p><strong>Venue:</strong> {event?.venue}</p>
          <p><strong>City:</strong> {event?.city}</p>
          <a href={event?.externalUrl} target="_blank" rel="noopener noreferrer">
            View Event
          </a>
          {Auth.loggedIn() && (
            <button onClick={handleAddEvent}>Add to My Page</button>
          )}
        </div>
      </section>
      <footer>
        <div>
          {/*bAdd Now Playing bar here */}
        </div>
      </footer>
    </div>
  );
};

export default EventPage;
