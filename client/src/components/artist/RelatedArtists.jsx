import { Row, Col, Card, Button, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { StarOutlined } from "@ant-design/icons";

const { Meta } = Card;

const RelatedArtists = ({ artists }) => {
  return (
    <div
      style={{
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3 style={{ textAlign: "center" }}>Related Artists</h3>
      {artists.map((artist) => (
        <Link to="" key={artist.id}>
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
            <Row
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
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
                    title={
                      <span style={{ fontSize: "16px" }}>{artist.name}</span>
                    }
                  />
                </div>
              </Col>
              <Col>
                <Tooltip title="Add Song to Profile">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<StarOutlined />}
                    style={{ margin: "5px" }}
                    size="medium"
                  />
                </Tooltip>
              </Col>
            </Row>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default RelatedArtists;
