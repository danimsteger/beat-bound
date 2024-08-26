import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

//NEED TO ADD LINK TO THAT SPECIFIC ARTIST'S PAGE
const ArtistCard = ({ artist }) => {
  const defaultImageUrl = "https://via.placeholder.com/100";

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
        </Row>
      </Card>
    </Link>
  );
};

export default ArtistCard;
