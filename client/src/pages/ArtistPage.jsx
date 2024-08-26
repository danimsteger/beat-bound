import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "antd";
import { useMutation } from "@apollo/client";
import { ADD_SONG, ADD_ARTIST, ADD_EVENT } from "../utils/mutations";
import Auth from "../utils/auth";

import ArtistDetails from "../components/artist/ArtistDetails";
import ArtistSongs from "../components/artist/ArtistSongs";
import ArtistEvents from "../components/artist/ArtistEvents";
import RelatedArtists from "../components/artist/RelatedArtists";

const ArtistPage = () => {
  const { artistId } = useParams();
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [artistName, setArtistName] = useState("");

  const [addSong] = useMutation(ADD_SONG);
  const [addArtist] = useMutation(ADD_ARTIST);
  const [addEvent] = useMutation(ADD_EVENT);

  const handleAddToMyPage = async (item, type) => {
    if (!Auth.loggedIn()) {
      console.error("User is not logged in.");
      return;
    }

    try {
      if (type === "song") {
        let artists = "Unknown Artist";
        if (Array.isArray(item.artists) && item.artists.length > 0) {
          artists = item.artists.join(", ");
        }

        const name = item.name || "Unknown Name";
        const album = item.albumName || "Unknown Album";

        await addSong({
          variables: {
            name,
            artist: artists,
            album,
            imageUrl: item.imageUrl || "",
            externalUrl: item.externalUrl || "",
          },
        });

        alert("Song added to your page!");
      } else if (type === "artist") {
        await addArtist({
          variables: {
            name: item.name,
            spotifyId: artistId,
            imageUrl: item.imageUrl || "",
            externalUrl: item.externalUrl || "",
          },
        });

        alert("Artist added to your page!");
      } else if (type === "event") {
        console.log("Event being added:", item);
        const externalUrl = item.externalUrl || "";

        if (!externalUrl) {
          throw new Error("External URL is missing.");
        }

        console.log("Event Mutation Variables:", {
          name: item.name,
          date: item.date || "",
          venue: item.venue || "",
          city: item.city || "",
          externalUrl,
        });

        await addEvent({
          variables: {
            name: item.name,
            date: item.date || "",
            venue: item.venue || "",
            city: item.city || "",
            externalUrl,
          },
        });

        alert("Event added to your page!");
      }
    } catch (error) {
      console.error("Error adding item to page:", error);
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        console.log("GraphQL Error:", error.graphQLErrors);
      }
      if (error.networkError) {
        console.log("Network Error:", error.networkError);
      }
      alert("There was an error adding this item to your page.");
    }
  };

  return (
    <div>
      <Row
        gutter={40}
        justify="center"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <Col flex={1}>
          <ArtistDetails
            artistId={artistId}
            setArtistName={setArtistName}
            onAddToMyPage={(item) => handleAddToMyPage(item, "artist")}
          />
          <ArtistEvents
            artistName={artistName}
            onAddToMyPage={(item) => handleAddToMyPage(item, "event")}
          />
        </Col>
        <Col flex={2}>
          <ArtistSongs
            artistId={artistId}
            onAddToMyPage={(item) => handleAddToMyPage(item, "song")}
          />
        </Col>
        <Col flex={2}>
          <RelatedArtists
            artistId={artistId}
            setRelatedArtists={setRelatedArtists}
            onAddToMyPage={handleAddToMyPage}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ArtistPage;
