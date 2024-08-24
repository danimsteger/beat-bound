import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

//NEED TO ADD LINK TO THAT SPECIFIC ARTISTS PAGE!!!
const ArtistCard = ({ artist }) => {
  return (
    <Link to="">
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
              style={{ width: 100, height: 100, marginRight: 20 }}
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
