import React, { useEffect, useState } from "react";
import { Carousel } from "antd";

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
      <h2> ~ Featured Playlists ~</h2>

      <Carousel autoplay style={{ width: 500, borderRadius: 20 }}>
        {playlists.map((playlist, index) => (
          <div key={index}>
            <a>
              <img
                alt="Playlist Cover"
                src={playlist.imageUrl}
                style={{ borderRadius: 20 }}
              />
            </a>
          </div>
        ))}
      </Carousel>
      <Carousel autoplay style={{ width: 500, borderRadius: 20 }}>
        {playlists.map(
          (playlist, index) =>
            index > 0 && (
              <div key={index}>
                <a>
                  <img
                    alt="Playlist Cover"
                    src={playlist.imageUrl}
                    style={{ borderRadius: 20 }}
                  />
                </a>
              </div>
            )
        )}
      </Carousel>
      <Carousel autoplay style={{ width: 500, borderRadius: 20 }}>
        {playlists.map(
          (playlist, index) =>
            index > 1 && (
              <div key={index}>
                <a>
                  <img
                    alt="Playlist Cover"
                    src={playlist.imageUrl}
                    style={{ borderRadius: 20 }}
                  />
                </a>
              </div>
            )
        )}
      </Carousel>
    </div>
  );
};

export default FeaturedPlaylists;
