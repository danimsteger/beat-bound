import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_SONG, ADD_ARTIST, ADD_EVENT } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import SearchBar from "../components/search/SearchBar";
import ResultsList from "../components/search/ResultList";
import customTheme from "../styles/customTheme";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("track");
  const [results, setResults] = useState(null);
  const [lastSearchType, setLastSearchType] = useState("track");
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
  const handleSearch = async () => {
    setResults(null);
    setLastSearchType(searchType);

    let endpoint;
    switch (searchType) {
      case "track":
        endpoint = `/api/search/track?q=${encodeURIComponent(searchTerm)}`;
        break;
      case "artist":
        endpoint = `/api/search/artist?q=${encodeURIComponent(searchTerm)}`;
        break;
      case "events":
        endpoint = `/api/search/artist-events?q=${encodeURIComponent(
          searchTerm
        )}`;
        break;
      default:
        return;
    }

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const isOnProfile = (item, type) => {
    if (type === "track") {
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

  const handleAddToMyPage = async (item) => {
    if (!Auth.loggedIn()) {
      console.error("User is not logged in.");
      return;
    }

    try {
      if (lastSearchType === "track") {
        let artists = "Unknown Artist";

        if (Array.isArray(item.artists) && item.artists.length > 0) {
          artists = item.artists
            .map((artist) => artist?.name?.trim() || "Unknown Artist")
            .join(", ");
        } else if (item.artists && typeof item.artists === "string") {
          artists = item.artists.trim();
        }

        const name = item.name ? item.name.trim() : "Unknown Name";
        const album = item.album ? item.album.trim() : "Unknown Album";

        await addSong({
          variables: {
            name: name,
            artist: artists,
            album: album,
            imageUrl: item.imageURL || "",
            externalUrl: item.externalUrl || "",
          },
        });
        setAddedItems([...addedItems, item.externalUrl]);
      } else if (lastSearchType === "artist") {
        await addArtist({
          variables: {
            name: item.name,
            spotifyId: item.spotifyId,
            imageUrl: item.imageURL || "",
            externalUrl: item.externalUrl || "",
          },
        });
        setAddedItems([...addedItems, item.spotifyId]);
      } else if (lastSearchType === "events") {
        const artistNames =
          Array.isArray(item.artists) && item.artists.length > 0
            ? item.artists
            : ["Unknown Artist"];
        await addEvent({
          variables: {
            name: item.name,
            date: item.date || "",
            venue: item.venue || "",
            city: item.city || "",
            externalUrl: item.externalUrl || "",
            artistNames: artistNames,
          },
        });
        setAddedItems([...addedItems, item.externalUrl]);
      }
    } catch (error) {
      console.error("Error adding item to page:", error);
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        console.log(`[GraphQL error]: ${error.graphQLErrors[0].message}`);
      }
      if (error.networkError) {
        console.log(`[Network error]: ${error.networkError}`);
      }
      alert("There was an error adding this item to your page.");
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: customTheme.token.colorSecondary,
        height: "100%",
        minHeight: "calc(100vh - 100px)",
        display: "flex",
        flexDirection: "column",
        color: "white",
      }}
    >
      <h1 className="concert-one-regular">SEARCH</h1>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchType={searchType}
        setSearchType={setSearchType}
        handleSearch={handleSearch}
      />
      <ResultsList
        results={results}
        lastSearchType={lastSearchType}
        handleAddToMyPage={handleAddToMyPage}
        isOnProfile={isOnProfile}
      />
    </div>
  );
};

export default Search;
