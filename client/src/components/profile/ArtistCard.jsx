import { Card, Row, Col, Tooltip, Button } from "antd";
import { Link } from "react-router-dom";
import customTheme from "../../styles/customTheme";
const { Meta } = Card;

const ArtistCard = ({ artist, handleDelete }) => {
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
        }}
      >
        <Row style={{ display: "flex", justifyContent: "space-between" }}>
          <Col>
            <img
              src={artist.imageUrl}
              style={{
                width: 100,
                height: 100,
                marginRight: 20,
                borderRadius: 10,
              }}
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
              <Tooltip title="Remove From Profile">
                <Button
                  shape="circle"
                  type="default"
                  size="medium"
                  style={{ margin: "10px" }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(artist._id);
                  }}
                >
                  <img src="/trashcan.primary.png" alt="remove" width="25px" />
                </Button>
              </Tooltip>
            </div>
          </Col>
        </Row>
      </Card>
    </Link>
  );
};

export default ArtistCard;
