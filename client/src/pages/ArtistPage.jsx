import { StarOutlined } from "@ant-design/icons";
import { Tooltip, Button, Row, Col } from "antd";

import ArtistEvents from "../components/artist/ArtistEvents";
import ArtistSongs from "../components/artist/ArtistSongs";
import RelatedArtists from "../components/artist/RelatedArtists";
=======
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
// const
      });

      alert("Event added to your page!");
    } catch (error) {
      console.error("Error adding event to page:", error);
      alert("There was an error adding this event to your page.");
    }
  };

  if (artistLoading || eventsLoading) return <p>Loading...</p>;
  if (artistError || eventsError) return <p>Error: {artistError?.message || eventsError?.message}</p>;
//  sampleArtist = {
//   id: 1,
//   name: "Taylor Swift",
//   imageUrl:
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlz-0gZGjxoAp2wa6pbtGIR_9nsVwQZMHbOQ&s",
//   events: [
//     {
//       id: 1,
//       time: "7:00",
//       city: "Charlotte",
//       venue: "Bank of America Stadium",
//       eventUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
//       artists: [
//         {
//           id: 1,
//           name: "Taylor Swift",
//           imageUrl:
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlz-0gZGjxoAp2wa6pbtGIR_9nsVwQZMHbOQ&s",
//         },
//         {
//           id: 2,
//           name: "Sabrina Carpenter",
//           imageUrl:
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlz-0gZGjxoAp2wa6pbtGIR_9nsVwQZMHbOQ&s",
//         },
//       ],
//     },
//     {
//       id: 2,
//       time: "5:00",
//       city: "Columbia",
//       venue: "Williams Brice Stadium",
//       eventUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
//       artists: [
//         {
//           id: 1,
//           name: "Taylor Swift",
//           imageUrl:
//             "https://media.gq.com/photos/610172681ac2ac787b459b47/4:3/w_2283,h_1712,c_limit/olivia-rodrigo-gq-september-2021-01.jpg",
//         },
//       ],
//     },
//   ],
//   songs: [
//     {
//       id: 1,
//       name: "Bejeweled",
//       imageUrl:
//         "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Midnights_-_Taylor_Swift.png/220px-Midnights_-_Taylor_Swift.png",
//       artists: ["Taylor Swift"],
//     },
//     {
//       id: 2,
//       name: "Florida!!!!",
//       imageUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlz-0gZGjxoAp2wa6pbtGIR_9nsVwQZMHbOQ&s",
//       artists: ["Taylor Swift", "Florence + The Machine"],
//     },
//     {
//       id: 3,
//       name: "Fortnight",
//       imageUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlz-0gZGjxoAp2wa6pbtGIR_9nsVwQZMHbOQ&s",
//       artists: ["Taylor Swift", "Post Malone"],
//     },
//     {
//       id: 4,
//       name: "Mastermind",
//       imageUrl:
//         "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Midnights_-_Taylor_Swift.png/220px-Midnights_-_Taylor_Swift.png",
//       artists: ["Taylor Swift"],
//     },
//     {
//       id: 5,
//       name: "Karma",
//       imageUrl:
//         "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Midnights_-_Taylor_Swift.png/220px-Midnights_-_Taylor_Swift.png",
//       artists: ["Taylor Swift"],
//     },
//   ],
// };

// const sampleRelatedArtists = [
//   {
//     id: 1,
//     name: "Sabrina Carpenter",
//     imageUrl:
//       "https://cdns-images.dzcdn.net/images/cover/e3221287a77eb262944e6528766eeba4/1900x1900-000000-80-0-0.jpg",
//   },
//   {
//     id: 2,
//     name: "Chappell Roan",
//     imageUrl:
//       "https://media.pitchfork.com/photos/64ff1676931354660ba71d8b/master/pass/Chappell-Roan-Princess.jpg",
//   },
//   {
//     id: 3,
//     name: "Oliva Rodrigo",
//     imageUrl:
//       "https://media.gq.com/photos/610172681ac2ac787b459b47/4:3/w_2283,h_1712,c_limit/olivia-rodrigo-gq-september-2021-01.jpg",
//   },
// ];
// // switch STAR button to add profile to disabled on click!!!
// const ArtistPage = () => {
//   return (
//     <div>
      <Row
        gutter={40}
        justify="center"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <Col flex={3}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Tooltip title="Add Artist to Profile">
              <Button
                type="primary"
                shape="circle"
                icon={<StarOutlined />}
                style={{ margin: "40px" }}
                size="large"
              />
            </Tooltip>
            <h1 style={{ margin: "20px", marginTop: "30px" }}>
              {sampleArtist.name}
            </h1>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={sampleArtist.imageUrl}
              style={{ width: "100%", margin: 10, borderRadius: 20 }}
            />
          </div>
          <ArtistEvents events={sampleArtist.events}></ArtistEvents>
        </Col>
        <Col flex={2}>
          <ArtistSongs songs={sampleArtist.songs}></ArtistSongs>
        </Col>
        <Col flex={2}>
          <RelatedArtists artists={sampleRelatedArtists}></RelatedArtists>
        </Col>
      </Row>
=======
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
