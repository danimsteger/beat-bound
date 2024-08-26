import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Tooltip, Button } from "antd";
import { StarOutlined } from "@ant-design/icons";

const ArtistDetails = ({ setArtistName, onAddToMyPage }) => {
  const { artistId } = useParams();
  const [artistData, setArtistData] = useState({
    imageUrl: "",
    name: "",
    externalUrl: "",
    spotifyId: artistId,
  });

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`/api/search/artist/${artistId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch artist data");
        }
        const artist = await response.json();
        setArtistData({
          imageUrl: artist.imageURL,
          name: artist.name,
          externalUrl: artist.externalUrl,
          spotifyId: artistId,
        });
        setArtistName(artist.name);
      } catch (error) {
        console.error("Error fetching artist data:", error);
      }
    };

    fetchArtist();
  }, [artistId, setArtistName]);

  return (
    <div>
      <Row
        gutter={40}
        justify="center"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <Col flex={3}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Tooltip title="Listen on Spotify">
              <Button
                href={artistData.externalUrl}
                shape="circle"
                target="_blank"
                rel="noopener noreferrer"
                type="primary"
                size="large"
                style={{ margin: "40px" }}
              >
                <img src="/spotify.white.png" alt="spotify logo" width="45px" />
              </Button>
            </Tooltip>
            <h1 style={{ margin: "20px", marginTop: "30px" }}>
              {artistData.name}
            </h1>
            <Tooltip title="Add Artist to Profile">
              <Button
                type="primary"
                shape="circle"
                icon={<StarOutlined />}
                style={{ margin: "40px" }}
                size="large"
                onClick={() => onAddToMyPage(artistData)}
              />
            </Tooltip>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={artistData.imageUrl}
              style={{ width: "75%", margin: 10, borderRadius: 20 }}
              alt={artistData.name}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ArtistDetails;
