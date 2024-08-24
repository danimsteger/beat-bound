import { useState } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_SONG, ADD_ARTIST, ADD_EVENT } from "../utils/mutations";
import Auth from "../utils/auth";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("track");
  const [results, setResults] = useState(null);
  const [lastSearchType, setLastSearchType] = useState("track");

  const [addSong] = useMutation(ADD_SONG);
  const [addArtist] = useMutation(ADD_ARTIST);
  const [addEvent] = useMutation(ADD_EVENT);

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

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
          imageUrl: item.imageUrl || "",
          externalUrl: item.externalUrl || "",
        });

        await addSong({
          variables: {
            name: name,
            artist: artists,
            album: album,
            imageUrl: item.imageUrl || "",
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
      <Form>
        <Row className="align-items-center">
          <Col xs={12} md={8}>
            <Form.Control
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
            />
          </Col>
          <Col xs={6} md={2}>
            <Form.Select value={searchType} onChange={handleSearchTypeChange}>
              <option value="track">Track</option>
              <option value="artist">Artist</option>
              <option value="events">Events</option>
            </Form.Select>
          </Col>
          <Col xs={6} md={2}>
            <Button onClick={handleSearch} variant="primary">
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      <Row className="mt-4">
        {results && results.length > 0 ? (
          results.map((result, index) => (
            <Col xs={12} md={6} lg={4} className="mb-4" key={index}>
              <Card>
                {lastSearchType === "track" && (
                  <>
                    {result.imageURL && (
                      <Card.Img variant="top" src={result.imageURL} />
                    )}
                    <Card.Body>
                      <Card.Title>{result.name}</Card.Title>
                      <Card.Text>
                        <strong>Artists:</strong>{" "}
                        {result.artists.map((artist) => artist.name).join(", ")}
                        <br />
                        <strong>Album:</strong> {result.album}
                      </Card.Text>
                      <Button
                        href={result.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="success"
                      >
                        Listen on Spotify
                      </Button>
                      {result.previewUrl && (
                        <div className="mt-3">
                          <audio controls>
                            <source src={result.previewUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      )}
                      {Auth.loggedIn() && (
                        <Button
                          onClick={() => handleAddToMyPage(result)}
                          variant="warning"
                          className="mt-2"
                        >
                          Add to My Page
                        </Button>
                      )}
                    </Card.Body>
                  </>
                )}
                {lastSearchType === "artist" && (
                  <>
                    {result.imageURL && (
                      <Card.Img variant="top" src={result.imageURL} />
                    )}
                    <Card.Body>
                      <Card.Title>{result.name}</Card.Title>
                      <Button
                        href={result.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="success"
                      >
                        View on Spotify
                      </Button>
                      {Auth.loggedIn() && (
                        <Button
                          onClick={() => handleAddToMyPage(result)}
                          variant="warning"
                          className="mt-2"
                        >
                          Add to My Page
                        </Button>
                      )}
                    </Card.Body>
                  </>
                )}
                {lastSearchType === "events" && (
                  <Card.Body>
                    <Card.Title>{result.name}</Card.Title>
                    <Card.Text>
                      <strong>Date:</strong> {result.date}
                      <br />
                      <strong>Venue:</strong> {result.venue}, {result.city}
                      <br />
                      <strong>Artists:</strong>
                      {result.artist && result.artist.length > 0
                        ? result.artist.map((artist) => artist.name).join(", ")
                        : "Unknown Artists"}
                    </Card.Text>
                    <Button
                      href={result.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="success"
                    >
                      Get Tickets
                    </Button>
                    {Auth.loggedIn() && (
                      <Button
                        onClick={() => handleAddToMyPage(result)}
                        variant="warning"
                        className="mt-2"
                      >
                        Add to My Page
                      </Button>
                    )}
                  </Card.Body>
                )}
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No results found</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Search;
