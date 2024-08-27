import { useState, useEffect } from "react";
import { Card, Row, Col, Tooltip, Button } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
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
    <Link to={`/ArtistPage/${artist.spotifyId}`}>
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
              src={artist.image || "https://via.placeholder.com/100"}
              alt={artist.name}
              style={{ width: 100, height: 100, marginRight: 20 }}
              onError={(e) => (e.target.src = "https://via.placeholder.com/100")}
            />
          </Col>
          <Col>
            <Meta title={<span style={{ fontSize: "24px" }}>{artist.name}</span>} />
          </Col>
          <Col>
            <Tooltip title={alreadyOnProfile ? "Already on your profile" : "Add Artist to Profile"}>
              <Button
                type="primary"
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
          </Col>
        </Row>
      </Card>
    </Link>
  );
};

export default ArtistCard;
