import React from "react";

import SavedEvents from "../components/profile/SavedEvents";
import SavedArtists from "../components/profile/SavedArtists";
import SavedSongs from "../components/profile/SavedSongs";

import { Row, Col } from "antd";

const Profile = () => {
  return (
    <div>
      <Row
        gutter={16}
        justify="center"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <Col flex={1} style={{ marginRight: "0px", marginLeft: "50px" }}>
          {" "}
          <SavedEvents></SavedEvents>
        </Col>
        <Col flex={3} style={{ marginRight: "50px", marginLeft: "0px" }}>
          {" "}
          <SavedArtists></SavedArtists>
        </Col>
        <Col flex={1} style={{ marginRight: "50px", marginLeft: "10px" }}>
          {" "}
          <SavedSongs></SavedSongs>
        </Col>
      </Row>

      <footer>
        <div>{/* TODO: Add Now Playing bar here */}</div>
      </footer>
    </div>
  );
};

export default Profile;
