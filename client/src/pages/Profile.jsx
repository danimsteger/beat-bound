import React from "react";

import SavedEvents from "../components/profile/SavedEvents";
import SavedArtists from "../components/profile/SavedArtists";

import { Row, Col } from "antd";

const Profile = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={8}>
          {" "}
          <SavedEvents></SavedEvents>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8}>
          {" "}
          <SavedArtists></SavedArtists>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8}>
          {" "}
          <SavedEvents></SavedEvents>
        </Col>
      </Row>

      <footer>
        <div>{/* TODO: Add Now Playing bar here */}</div>
      </footer>
    </div>
  );
};

export default Profile;
