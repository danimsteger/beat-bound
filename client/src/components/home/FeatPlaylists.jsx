import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";

const FeaturedPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch('/api/search/featured-playlists');
        if (!response.ok) {
          throw new Error('Failed to fetch featured playlists');
        }
    
        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.error('Error fetching featured playlists:', error);
      }
    };
    fetchPlaylists();
  }, []);

  return (
    <Container>
      <h2>~ Featured Playlists ~</h2>
      <Row>
        {playlists.map((playlist, index) => (
          <Col xs={12} md={6} lg={4} key={index} className="mb-4">
            <Card>
              {playlist.imageUrl && (
                <Card.Img variant="top" src={playlist.imageUrl} alt="Playlist Cover" />
              )}
              <Card.Body>
                <Card.Text>{playlist.description}</Card.Text>
                <a href={playlist.externalUrls} target="_blank" rel="noopener noreferrer">
                  Listen on Spotify
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FeaturedPlaylists;
