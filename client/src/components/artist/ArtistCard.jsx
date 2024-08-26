import { Card, Row, Col, Tooltip, Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { StarOutlined } from "@ant-design/icons";

const { Meta } = Card;

const ArtistCard = ({ artist, onAddToMyPage }) => {
  const defaultImageUrl = "https://via.placeholder.com/100";

  // Structure the data similar to ArtistDetails
  const artistData = {
    name: artist.name,
    imageUrl: artist.image || defaultImageUrl,
    externalUrl: artist.externalUrl,
    spotifyId: artist.spotifyId, // Use the artist's actual Spotify ID
  };

  return (
    <Link
      to={{
        pathname: `/ArtistPage/${artist.spotifyId}`,
        state: {
          imageUrl: artist.image || defaultImageUrl,
          name: artist.name,
          externalUrl: artist.externalUrl,
        },
      }}
    >
      <Card
        hoverable
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: 400,
          margin: "20px",
        }}
      >
        <Row>
          <Col>
            <img
              src={artist.image || defaultImageUrl}
              alt={artist.name}
              style={{ width: 100, height: 100, marginRight: 20 }}
              onError={(e) => (e.target.src = defaultImageUrl)}
            />
          </Col>
          <Col>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 100,
              }}
            >
              <Meta
                title={<span style={{ fontSize: "24px" }}>{artist.name}</span>}
              />
            </div>
          </Col>
          <Col>
            <Tooltip title="Add Artist to Profile">
              <Button
                type="primary"
                shape="circle"
                icon={<StarOutlined />}
                style={{ margin: "10px" }}
                size="medium"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default link behavior
                  console.log("Adding related artist to profile:", artistData);
                  onAddToMyPage(artistData, "artist");
                }}
              />
            </Tooltip>
          </Col>
        </Row>
      </Card>
    </Link>
  );
};

export default ArtistCard;
