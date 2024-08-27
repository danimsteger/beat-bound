import { Card, Row, Col, Tooltip, Button } from "antd";
import { Link } from "react-router-dom";
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
          width: 400,
          margin: "20px",
        }}
      >
        <Row>
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
                  <span style={{ fontSize: "24px", textDecoration: "none" }}>
                    {artist.name}
                  </span>
                }
              />
            </div>
          </Col>
          <Col>
            <Tooltip title="Remove From Profile">
              <Button
                shape="circle"
                type="primary"
                size="medium"
                style={{ margin: "10px" }}
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(artist._id);
                }}
              >
                <img src="/trash.white.png" alt="remove" width="30px" />
              </Button>
            </Tooltip>
          </Col>
        </Row>
      </Card>
    </Link>
  );
};

export default ArtistCard;
