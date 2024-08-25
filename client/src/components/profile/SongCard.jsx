import { Card, Row, Col, Button } from "antd";
const { Meta } = Card;

const SongCard = ({ song }) => {
  return (
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
            src={song.imageUrl}
            alt={`${song.name} album cover`}
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
              title={<span style={{ fontSize: "24px" }}>{song.name}</span>}
              description={
                <>
                  <p>{song.artist}</p>
                  <p>Album: {song.album}</p>
                  <Button
                    href={song.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    type="primary"
                  >
                    Listen
                  </Button>
                </>
              }
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default SongCard;
