import React, { useState, useEffect } from "react";
import { Card, Button, Tooltip, Image, Row } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import customTheme from "../../styles/customTheme";

const ResultCard = ({ result, type, handleAddToMyPage, isOnProfile }) => {
  const [alreadyOnProfile, setAlreadyOnProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAlreadyOnProfile(isOnProfile(result, type));
  }, [result, type, isOnProfile]);

  const handleAddClick = async () => {
    if (!alreadyOnProfile) {
      await handleAddToMyPage(result);
      setAlreadyOnProfile(true);
    }
  };

  const handleCardClick = () => {
    if (type === "artist" && result.spotifyId) {
      navigate(`/ArtistPage/${result.spotifyId}`);
    }
  };

  return (
    <Card
      style={{ margin: 5, width: 400 }}
      onClick={handleCardClick}
      className="result-card"
      hoverable
    >
      {type === "track" && (
        <div>
          {result.imageURL && (
            <Image src={result.imageURL} style={{ borderRadius: 10 }} />
          )}
          <Card.Meta
            title={
              <span
                className="bungee-regular"
                style={{
                  fontSize: "1.5rem",
                  color: customTheme.token.colorSecondary,
                }}
              >
                {result.name}
              </span>
            }
            style={{ textAlign: "center", margin: 10 }}
            description={
              <div
                className="concert-one-regular"
                style={{
                  fontSize: "1rem",
                  color: customTheme.token.colorSecondary,
                }}
              >
                <strong className="bungee-regular">Artists:</strong>{" "}
                {result.artists.map((artist) => artist.name).join(", ")}
                <br />
                <strong className="bungee-regular">Album:</strong>{" "}
                {result.album}
              </div>
            }
          />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Tooltip title="Listen on Spotify">
              <Button
                href={result.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                type="primary"
                shape="circle"
                style={{ margin: "10px" }}
                size="medium"
              >
                <img src="/spotify.png" alt="spotify logo" width="30px" />
              </Button>
            </Tooltip>
            {Auth.loggedIn() && (
              <Tooltip
                title={
                  alreadyOnProfile
                    ? "Already on your profile"
                    : "Add Song to Profile"
                }
              >
                <Button
                  onClick={handleAddClick}
                  type="primary"
                  shape="circle"
                  icon={alreadyOnProfile ? <StarFilled /> : <StarOutlined />}
                  style={{ margin: "10px" }}
                  size="medium"
                  disabled={alreadyOnProfile}
                />
              </Tooltip>
            )}
          </div>
          <Row style={{ justifyContent: "center" }}>
            {result.previewUrl && (
              <div style={{ margin: 0 }}>
                <audio controls>
                  <source src={result.previewUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </Row>
        </div>
      )}
      {type === "artist" && (
        <div>
          {result.imageURL && (
            <Image src={result.imageURL} style={{ borderRadius: 10 }} />
          )}
          <Card.Meta
            title={
              <span
                className="bungee-regular"
                style={{
                  fontSize: "1.5rem",
                  color: customTheme.token.colorSecondary,
                }}
              >
                {result.name}
              </span>
            }
            style={{ textAlign: "center", margin: 10 }}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Tooltip title="View Artist on Spotify">
              <Button
                onClick={(e) => e.stopPropagation()}
                href={result.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                type="primary"
                style={{ margin: "10px" }}
                size="medium"
                shape="circle"
              >
                <img src="/spotify.png" alt="spotify logo" width="30px" />
              </Button>
            </Tooltip>
            {Auth.loggedIn() && (
              <Tooltip
                title={
                  alreadyOnProfile
                    ? "Already on your profile"
                    : "Add Artist to Profile"
                }
              >
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleAddClick(e);
                  }}
                  type="primary"
                  shape="circle"
                  icon={alreadyOnProfile ? <StarFilled /> : <StarOutlined />}
                  style={{ margin: "10px" }}
                  size="medium"
                  disabled={alreadyOnProfile}
                />
              </Tooltip>
            )}
          </div>
        </div>
      )}
      {type === "events" && (
        <div>
          <Card.Meta
            title={
              <span
                className="bungee-regular"
                style={{
                  fontSize: "1.2rem",
                  color: customTheme.token.colorSecondary,
                }}
              >
                {result.name}
              </span>
            }
            description={
              <div
                className="concert-one-regular"
                style={{
                  fontSize: "1rem",
                  color: customTheme.token.colorSecondary,
                }}
              >
                <strong className="bungee-regular">Date:</strong> {result.date}
                <br />
                <strong className="bungee-regular">Venue:</strong>{" "}
                {result.venue}, {result.city}
                <br />
              </div>
            }
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Tooltip title="View on Ticketmaster">
              <Button
                href={result.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                type="primary"
                shape="circle"
                style={{ margin: "10px" }}
                size="medium"
              >
                <img
                  src="/ticketmaster.white.png"
                  alt="ticketmaster logo"
                  width="20px"
                />
              </Button>
            </Tooltip>
            {Auth.loggedIn() && (
              <Tooltip
                title={
                  alreadyOnProfile
                    ? "Already on your profile"
                    : "Add Event to Profile"
                }
              >
                <Button
                  onClick={handleAddClick}
                  shape="circle"
                  icon={alreadyOnProfile ? <StarFilled /> : <StarOutlined />}
                  style={{ margin: "10px" }}
                  size="medium"
                  type="primary"
                  disabled={alreadyOnProfile}
                />
              </Tooltip>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export default ResultCard;
