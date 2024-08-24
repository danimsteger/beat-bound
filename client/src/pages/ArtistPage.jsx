import { StarOutlined } from "@ant-design/icons";
import { Tooltip, Button, Row, Col } from "antd";

import ArtistEvents from "../components/artist/ArtistEvents";

const sampleArtist = {
  id: 1,
  name: "Taylor Swift",
  imageUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlz-0gZGjxoAp2wa6pbtGIR_9nsVwQZMHbOQ&s",
  events: [
    {
      id: 1,
      time: "7:00",
      city: "Charlotte",
      venue: "Bank of America Stadium",
      eventUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
      artists: [
        {
          id: 1,
          name: "Taylor Swift",
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlz-0gZGjxoAp2wa6pbtGIR_9nsVwQZMHbOQ&s",
        },
        {
          id: 2,
          name: "Sabrina Carpenter",
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlz-0gZGjxoAp2wa6pbtGIR_9nsVwQZMHbOQ&s",
        },
      ],
    },
    {
      id: 2,
      time: "5:00",
      city: "Columbia",
      venue: "Williams Brice Stadium",
      eventUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
      artists: [
        {
          id: 1,
          name: "Taylor Swift",
          imageUrl:
            "https://media.gq.com/photos/610172681ac2ac787b459b47/4:3/w_2283,h_1712,c_limit/olivia-rodrigo-gq-september-2021-01.jpg",
        },
      ],
    },
  ],
  songs: [
    {
      id: 1,
      name: "Bejeweled",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Midnights_-_Taylor_Swift.png/220px-Midnights_-_Taylor_Swift.png",
      artists: ["Taylor Swift"],
    },
    {
      id: 2,
      name: "Florida!!!!",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlz-0gZGjxoAp2wa6pbtGIR_9nsVwQZMHbOQ&s",
      artists: ["Taylor Swift", "Florence + The Machine"],
    },
  ],
};

// switch STAR button to add profile to disabled on click!!!
const ArtistPage = () => {
  return (
    <div>
      <Row
        gutter={16}
        justify="center"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <Col flex={3}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Tooltip title="Add Artist to Profile">
              <Button
                type="primary"
                shape="circle"
                icon={<StarOutlined />}
                style={{ margin: "40px" }}
                size="large"
              />
            </Tooltip>
            <h1 style={{ margin: "20px", marginTop: "30px" }}>
              {sampleArtist.name}
            </h1>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={sampleArtist.imageUrl}
              style={{ width: "100%", margin: 10, borderRadius: 20 }}
            />
          </div>
          <ArtistEvents events={sampleArtist.events}></ArtistEvents>
        </Col>
        <Col flex={2}>
          <h1>ARTISTS TOP SONGS HERE!!!</h1>
        </Col>
        <Col flex={2}>
          {" "}
          <h1>RELATED ARTIST CARDS HERE!!!</h1>
        </Col>
      </Row>
    </div>
  );
};

export default ArtistPage;
