// import React from "react";

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
        // style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <Col
          flex={8}
          style={{ marginRight: "0px", marginLeft: "50px", marginTop: "80px" }}
        >
          {" "}
          <SavedEvents />
        </Col>
        <Col
          flex={8}
          style={{ marginRight: "0px", marginLeft: "0px", marginTop: "80px" }}
        >
          {" "}
          <SavedArtists />
        </Col>
        <Col
          flex={8}
          style={{ marginRight: "50px", marginLeft: "0px", marginTop: "80px" }}
        >
          {" "}
          <SavedSongs />
        </Col>
      </Row>

      <footer>
        <div>{/* TODO: Add Now Playing bar here */}</div>
      </footer>
    </div>
  );
};

export default Profile;
