import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_SONG, ADD_ARTIST, ADD_EVENT } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

import ArtistDetails from "../components/artist/ArtistDetails";
import ArtistSongs from "../components/artist/ArtistSongs";
import ArtistEvents from "../components/artist/ArtistEvents";
import RelatedArtists from "../components/artist/RelatedArtists";

const ArtistPage = () => {
  const { artistId } = useParams();
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [artistName, setArtistName] = useState("");
  const [addedItems, setAddedItems] = useState([]);

  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  const [addSong] = useMutation(ADD_SONG, {
    update(cache, { data: { addSong } }) {
      const { me } = cache.readQuery({ query: QUERY_ME });

      cache.writeQuery({
        query: QUERY_ME,
        data: {
          me: {
            ...me,
            songs: [...me.songs, addSong],
          },
        },
      });
    },
  });

  const [addArtist] = useMutation(ADD_ARTIST, {
    update(cache, { data: { addArtist } }) {
      const { me } = cache.readQuery({ query: QUERY_ME });

      cache.writeQuery({
        query: QUERY_ME,
        data: {
          me: {
            ...me,
            artists: [...me.artists, addArtist],
          },
        },
      });
    },
  });

  const [addEvent] = useMutation(ADD_EVENT, {
    update(cache, { data: { addEvent } }) {
      const { me } = cache.readQuery({ query: QUERY_ME });

      cache.writeQuery({
        query: QUERY_ME,
        data: {
          me: {
            ...me,
            events: [...me.events, addEvent],
          },
        },
      });
    },
  });

  const isOnProfile = (item, type) => {
    if (type === "song") {
      return (
        userData.songs?.some((song) => song.externalUrl === item.externalUrl) ||
        addedItems.includes(item.externalUrl)
      );
    } else if (type === "artist") {
      return (
        userData.artists?.some(
          (artist) => artist.spotifyId === item.spotifyId
        ) || addedItems.includes(item.spotifyId)
      );
    } else if (type === "events") {
      return (
        userData.events?.some(
          (event) => event.externalUrl === item.externalUrl
        ) || addedItems.includes(item.externalUrl)
      );
    }
    return false;
  };

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

        await addSong({
          variables: {
            name: item.name || "Unknown Name",
            artist: artists,
            album: item.albumName || "Unknown Album",
            imageUrl: item.imageUrl || "",
            externalUrl: item.externalUrl || "",
          },
        });

        setAddedItems((prevItems) => [...prevItems, item.externalUrl]);
      } else if (type === "artist") {
        await addArtist({
          variables: {
            name: item.name,
            spotifyId: item.spotifyId,
            imageUrl: item.imageUrl || "",
            externalUrl: item.externalUrl || "",
          },
        });

        setAddedItems((prevItems) => [...prevItems, item.spotifyId]);
      } else if (type === "event") {
        await addEvent({
          variables: {
            name: item.name,
            date: item.date || "",
            venue: item.venue || "",
            city: item.city || "",
            externalUrl: item.externalUrl || "",
          },
        });

        setAddedItems((prevItems) => [...prevItems, item.externalUrl]);
      }
    } catch (error) {
      console.error("Error adding item to page:", error);
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
            isOnProfile={(item) => isOnProfile(item, "artist")}
          />
          <ArtistEvents
            artistName={artistName}
            onAddToMyPage={(item) => handleAddToMyPage(item, "event")}
            isOnProfile={(item) => isOnProfile(item, "events")}
          />
        </Col>
        <Col flex={2}>
          <ArtistSongs
            artistId={artistId}
            onAddToMyPage={(item) => handleAddToMyPage(item, "song")}
            isOnProfile={(item) => isOnProfile(item, "song")}
          />
        </Col>
        <Col flex={2}>
          <RelatedArtists
            artistId={artistId}
            setRelatedArtists={setRelatedArtists}
            onAddToMyPage={(item) => handleAddToMyPage(item, "artist")}
            isOnProfile={(item) => isOnProfile(item, "artist")}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ArtistPage;
