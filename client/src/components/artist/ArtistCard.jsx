import { useState, useEffect } from "react";
import { Card, Row, Col, Tooltip, Button } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import customTheme from "../../styles/customTheme";

import { Link } from "react-router-dom";

const { Meta } = Card;

const ArtistCard = ({ artist, onAddToMyPage, isOnProfile }) => {
  const [alreadyOnProfile, setAlreadyOnProfile] = useState(false);

  useEffect(() => {
    setAlreadyOnProfile(isOnProfile(artist, "artist"));
  }, [artist, isOnProfile]);

  const handleAddClick = async () => {
    if (!alreadyOnProfile) {
      await onAddToMyPage(artist);
      setAlreadyOnProfile(true);
    }
  };
  return (
    <Link
      to={`/ArtistPage/${artist.spotifyId}`}
      style={{ textDecoration: "none" }}
    >
      <Card
        hoverable
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: 500,
          margin: "20px",
          backgroundColor: customTheme.token.colorPrimary,
          color: "white",
          borderColor: customTheme.token.colorSecondary,
        }}
      >
        <Row style={{ display: "flex", justifyContent: "space-between" }}>
          <Col>
            <img
              src={artist.image || "https://via.placeholder.com/100"}
              alt={artist.name}
              style={{
                width: 100,
                height: 100,
                marginRight: 20,
                borderRadius: 10,
              }}
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/100")
              }
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
                title={
                  <span
                    style={{
                      fontSize: "1.3rem",
                      textDecoration: "none",
                      color: customTheme.token.colorBgContainer,
                    }}
                    className="bungee-regular"
                  >
                    {artist.name}
                  </span>
                }
              />
            </div>
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
              <Tooltip
                title={
                  alreadyOnProfile
                    ? "Already on your profile"
                    : "Add Artist to Profile"
                }
              >
                <Button
                  type="dashed"
                  shape="circle"
                  icon={alreadyOnProfile ? <StarFilled /> : <StarOutlined />}
                  style={{ margin: "10px" }}
                  size="medium"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddClick();
                  }}
                  disabled={alreadyOnProfile}
                />
              </Tooltip>
            </div>
          </Col>
        </Row>
      </Card>
    </Link>
  );
};

export default ArtistCard;
