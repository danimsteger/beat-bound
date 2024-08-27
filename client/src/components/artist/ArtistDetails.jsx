import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Tooltip, Button } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import customTheme from "../../styles/customTheme";

const ArtistDetails = ({ setArtistName, onAddToMyPage, isOnProfile }) => {
  const { artistId } = useParams();
  const [artistData, setArtistData] = useState({
    imageUrl: "",
    name: "",
    externalUrl: "",
    spotifyId: artistId,
  });
  const [alreadyOnProfile, setAlreadyOnProfile] = useState(false);

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
        setAlreadyOnProfile(isOnProfile(artist));
      } catch (error) {
        console.error("Error fetching artist data:", error);
      }
    };

    fetchArtist();
  }, [artistId, setArtistName, isOnProfile]); // Only runs when artistId or setArtistName changes

  const handleAddClick = async () => {
    if (!alreadyOnProfile) {
      await onAddToMyPage(artistData);
      setAlreadyOnProfile(true); // Update the UI state without triggering another API call
    }
  };

  return (
    <div>
      <Row
        gutter={40}
        justify="center"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <Col flex={3}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 15,
              }}
            >
              <Tooltip
                title={
                  alreadyOnProfile
                    ? "Already on your profile"
                    : "Add Artist to Profile"
                }
              >
                <Button
                  type="primary"
                  shape="circle"
                  icon={alreadyOnProfile ? <StarFilled /> : <StarOutlined />}
                  style={{ margin: "10px" }}
                  size="large"
                  onClick={handleAddClick}
                  disabled={alreadyOnProfile}
                />
              </Tooltip>
              <Tooltip title="Listen on Spotify">
                <Button
                  href={artistData.externalUrl}
                  shape="circle"
                  target="_blank"
                  rel="noopener noreferrer"
                  type="primary"
                  size="large"
                  style={{ margin: "10px" }}
                >
                  <img src="/spotify.png" alt="spotify logo" width="30px" />
                </Button>
              </Tooltip>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1
                style={{
                  margin: "10px",
                  marginTop: "px",
                  color: customTheme.token.colorSecondary,
                  fontSize: "4rem",
                }}
                className="bungee-regular artist-name"
              >
                {artistData.name}
              </h1>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={artistData.imageUrl}
              style={{ width: "80%", margin: 10, borderRadius: 20 }}
              alt={artistData.name}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ArtistDetails;
