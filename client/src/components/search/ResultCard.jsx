import React from 'react';
import { Card, Button } from "react-bootstrap";
import Auth from "../../utils/auth";

const ResultCard = ({ result, type, handleAddToMyPage }) => {
  return (
    <Card>
      {type === "track" && (
        <>
          {result.imageURL && <Card.Img variant="top" src={result.imageURL} />}
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
      {type === "artist" && (
        <>
          {result.imageURL && <Card.Img variant="top" src={result.imageURL} />}
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
      {type === "events" && (
        <Card.Body>
          <Card.Title>{result.name}</Card.Title>
          <Card.Text>
            <strong>Date:</strong> {result.date}
            <br />
            <strong>Venue:</strong> {result.venue}, {result.city}
            <br />
            <strong>Artists:</strong>{" "}
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
  );
};

export default ResultCard;
