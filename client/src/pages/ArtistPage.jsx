import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "antd";
import ArtistEvents from "../components/artist/ArtistEvents";
import ArtistSongs from "../components/artist/ArtistSongs";
import RelatedArtists from "../components/artist/RelatedArtists";
import ArtistDetails from "../components/artist/ArtistDetails";

const ArtistPage = () => {
  const { artistId } = useParams();
  const [artistName, setArtistName] = useState("");

  return (
    <div>
      <Row
        gutter={40}
        justify="center"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <Col flex={3}>
          <ArtistDetails artistId={artistId} setArtistName={setArtistName} />
          <ArtistEvents artistName={artistName} />
        </Col>
        <Col flex={2}>
          <ArtistSongs artistId={artistId} />
        </Col>
        <Col flex={2}>
          <RelatedArtists artistId={artistId} />
        </Col>
      </Row>
    </div>
  );
};

export default ArtistPage;
