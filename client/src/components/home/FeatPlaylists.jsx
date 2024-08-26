import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";

// import { Card, Row, Col, Container } from "react-bootstrap";

const FeaturedPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("/api/search/featured-playlists");
        if (!response.ok) {
          throw new Error("Failed to fetch featured playlists");
        }

        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.error("Error fetching featured playlists:", error);
      }
    };
    fetchPlaylists();
  }, []);

  return (
    <div>
      <h2>Featured Playlists</h2>
      <Row gutter={[16, 16]}>
        {playlists.map((playlist, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card
              hoverable
              cover={
                playlist.imageUrl && (
                  <img alt="Playlist Cover" src={playlist.imageUrl} />
                )
              }
            >
              <Card.Meta title={playlist.description} />
              <a
                href={playlist.externalUrls}
                target="_blank"
                rel="noopener noreferrer"
              >
                Listen on Spotify
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeaturedPlaylists;
