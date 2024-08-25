import { useState } from "react";
import { Container} from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_SONG, ADD_ARTIST, ADD_EVENT } from "../utils/mutations";
import Auth from "../utils/auth";
import SearchBar from "../components/search/SearchBar";
import ResultsList from "../components/search/ResultList";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("track");
  const [results, setResults] = useState(null);
  const [lastSearchType, setLastSearchType] = useState("track");

  const [addSong] = useMutation(ADD_SONG);
  const [addArtist] = useMutation(ADD_ARTIST);
  const [addEvent] = useMutation(ADD_EVENT);

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
      console.log(data);
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
          console.log("item.artists in search function:", item.artists);
          artists = item.artists
            .map((artist) => artist?.name?.trim() || "Unknown Artist")
            .join(", ");
        } else if (item.artists && typeof item.artists === "string") {
          artists = item.artists.trim();
        }

        const name = item.name ? item.name.trim() : "Unknown Name";
        const album = item.album ? item.album.trim() : "Unknown Album";

        console.log("Track Mutation Variables:", {
          name: name,
          artist: artists,
          album: album,
          imageUrl: item.imageURL || "",
          externalUrl: item.externalUrl || "",
        });

        await addSong({
          variables: {
            name: name,
            artist: artists,
            album: album,
            imageUrl: item.imageURL || "",
            externalUrl: item.externalUrl || "",
          },
        });
      } else if (lastSearchType === "artist") {
        console.log("Artist Mutation Variables:", {
          name: item.name,
          spotifyId: item.spotifyId,
          imageUrl: item.imageURL,
          externalUrl: item.externalUrl,
        });

        await addArtist({
          variables: {
            name: item.name,
            spotifyId: item.spotifyId,
            imageUrl: item.imageURL || "",
            externalUrl: item.externalUrl || "",
          },
        });
      } else if (lastSearchType === "events") {
        const artistNames =
          Array.isArray(item.artists) && item.artists.length > 0
            ? item.artists
            : ["Unknown Artist"];

        console.log("Event Mutation Variables:", {
          name: item.name,
          date: item.date,
          venue: item.venue,
          city: item.city,
          externalUrl: item.externalUrl,
          artistNames: artistNames,
        });
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
      }

      alert("Item added to your page!");
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
    <Container>
      <h1 className="my-4">Search</h1>
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
      />
    </Container>
  );
};

export default Search;
