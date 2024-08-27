import React, { useState, useEffect } from "react";
import { Card, Button, Tooltip, Image } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";

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
    <Card style={{ margin: 5, width: 400 }} onClick={handleCardClick} hoverable>
      {type === "track" && (
        <div>
          {result.imageURL && (
            <Image src={result.imageURL} style={{ borderRadius: 10 }} />
          )}
          <Card.Meta
            title={result.name}
            style={{ textAlign: "center", margin: 10 }}
            description={
              <>
                <strong>Artists:</strong>{" "}
                {result.artists.map((artist) => artist.name).join(", ")}
                <br />
                <strong>Album:</strong> {result.album}
              </>
            }
          />
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
          {result.previewUrl && (
            <div className="mt-3">
              <audio controls>
                <source src={result.previewUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      )}
      {type === "artist" && (
        <div>
          {result.imageURL && (
            <Image src={result.imageURL} style={{ borderRadius: 10 }} />
          )}
          <Card.Meta
            title={result.name}
            style={{ textAlign: "center", margin: 10 }}
          />
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
      )}
      {type === "events" && (
        <div>
          <Card.Meta
            title={result.name}
            description={
              <>
                <strong>Date:</strong> {result.date}
                <br />
                <strong>Venue:</strong> {result.venue}, {result.city}
                <br />
              </>
            }
          />
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
      )}
    </Card>
  );
};

export default ResultCard;
