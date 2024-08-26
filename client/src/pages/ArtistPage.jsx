import { StarOutlined } from "@ant-design/icons";
import { Tooltip, Button, Row, Col } from "antd";

import ArtistEvents from "../components/artist/ArtistEvents";
import ArtistSongs from "../components/artist/ArtistSongs";
import RelatedArtists from "../components/artist/RelatedArtists";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ARTISTS, QUERY_EVENTS } from "../utils/queries";
import { ADD_ARTIST, ADD_EVENT } from "../utils/mutations";
import Auth from "../utils/auth";

// const sampleArtist = {
//   id: 1,
//   name: "Taylor Swift",
//   imageUrl:
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlz-0gZGjxoAp2wa6pbtGIR_9nsVwQZMHbOQ&s",
//   events: [
//     {
//       id: 1,
//       time: "7:00",
//       city: "Charlotte",
//       venue: "Bank of America Stadium",
//       eventUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
//       artists: [
//         {
//           id: 1,
//           name: "Taylor Swift",
//           imageUrl:
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlz-0gZGjxoAp2wa6pbtGIR_9nsVwQZMHbOQ&s",
//         },
//         {
//           id: 2,
//           name: "Sabrina Carpenter",
//           imageUrl:
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlz-0gZGjxoAp2wa6pbtGIR_9nsVwQZMHbOQ&s",
//         },
//       ],
//     },
//     {
//       id: 2,
//       time: "5:00",
//       city: "Columbia",
//       venue: "Williams Brice Stadium",
//       eventUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
//       artists: [
//         {
//           id: 1,
//           name: "Taylor Swift",
//           imageUrl:
//             "https://media.gq.com/photos/610172681ac2ac787b459b47/4:3/w_2283,h_1712,c_limit/olivia-rodrigo-gq-september-2021-01.jpg",
//         },
//       ],
//     },
//   ],
//   songs: [
//     {
//       id: 1,
//       name: "Bejeweled",
//       imageUrl:
//         "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Midnights_-_Taylor_Swift.png/220px-Midnights_-_Taylor_Swift.png",
//       artists: ["Taylor Swift"],
//     },
//     {
//       id: 2,
//       name: "Florida!!!!",
//       imageUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlz-0gZGjxoAp2wa6pbtGIR_9nsVwQZMHbOQ&s",
//       artists: ["Taylor Swift", "Florence + The Machine"],
//     },
//     {
//       id: 3,
//       name: "Fortnight",
//       imageUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlz-0gZGjxoAp2wa6pbtGIR_9nsVwQZMHbOQ&s",
//       artists: ["Taylor Swift", "Post Malone"],
//     },
//     {
//       id: 4,
//       name: "Mastermind",
//       imageUrl:
//         "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Midnights_-_Taylor_Swift.png/220px-Midnights_-_Taylor_Swift.png",
//       artists: ["Taylor Swift"],
//     },
//     {
//       id: 5,
//       name: "Karma",
//       imageUrl:
//         "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Midnights_-_Taylor_Swift.png/220px-Midnights_-_Taylor_Swift.png",
//       artists: ["Taylor Swift"],
//     },
//   ],
// };

// const sampleRelatedArtists = [
//   {
//     id: 1,
//     name: "Sabrina Carpenter",
//     imageUrl:
//       "https://cdns-images.dzcdn.net/images/cover/e3221287a77eb262944e6528766eeba4/1900x1900-000000-80-0-0.jpg",
//   },
//   {
//     id: 2,
//     name: "Chappell Roan",
//     imageUrl:
//       "https://media.pitchfork.com/photos/64ff1676931354660ba71d8b/master/pass/Chappell-Roan-Princess.jpg",
//   },
//   {
//     id: 3,
//     name: "Olivia Rodrigo",
//     imageUrl:
//       "https://media.gq.com/photos/610172681ac2ac787b459b47/4:3/w_2283,h_1712,c_limit/olivia-rodrigo-gq-september-2021-01.jpg",
//   },
// ];

const ArtistPage = () => {
  const { artistId } = useParams();
  const [relatedArtists, setRelatedArtists] = useState([]);

  return (
    <div>
      <Row
        gutter={40}
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
                onClick={() => console.log("Add artist functionality")} // Replace with actual function
              />
            </Tooltip>
            <h1 style={{ margin: "20px", marginTop: "30px" }}>
              {/* Replace with the artist's name */}
            </h1>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={"artist_image_url"} // Replace with actual image URL from your data
              style={{ width: "100%", margin: 10, borderRadius: 20 }}
              alt="Artist"
            />
          </div>
          <ArtistEvents events={[]} /> {/* Replace with actual events data */}
        </Col>
        <Col flex={2}>
          <ArtistSongs artistId={artistId} />
        </Col>
        <Col flex={2}>
          <RelatedArtists artistId={artistId} setRelatedArtists={setRelatedArtists} />
          <div>
            {relatedArtists.map((artist) => (
              <Card
                key={artist.id}
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
                      alt={artist.name}
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
                    <Tooltip title="Add Artist to Profile">
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
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ArtistPage;
