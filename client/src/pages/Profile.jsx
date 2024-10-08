import { useState } from "react";

import SavedEvents from "../components/profile/SavedEvents";
import SavedArtists from "../components/profile/SavedArtists";
import SavedSongs from "../components/profile/SavedSongs";
import customTheme from "../styles/customTheme";

import { Row, Col } from "antd";

const Profile = () => {
  // Add a state to track added items
  const [addedItems, setAddedItems] = useState([]);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: customTheme.token.colorBgContainer,
        height: "100%",
        minHeight: "calc(100vh - 100px)",
        display: "flex",
        flexDirection: "column",
        color: "white",
      }}
    >
      <Row
        gutter={16}
        justify="center"
        // style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <Col
          flex={8}
          style={{ marginRight: "0px", marginLeft: "50px", marginTop: "80px" }}
          className="profile-columns"
        >
          <SavedEvents addedItems={addedItems} />
        </Col>
        <Col
          flex={8}
          style={{ marginRight: "0px", marginLeft: "0px", marginTop: "80px" }}
          className="profile-columns"
        >
          <SavedArtists addedItems={addedItems} />
        </Col>
        <Col
          flex={8}
          style={{ marginRight: "50px", marginLeft: "0px", marginTop: "80px" }}
          className="profile-columns"
        >
          <SavedSongs addedItems={addedItems} />
        </Col>
      </Row>

      <footer>
        <div>{/* TODO: Add Now Playing bar here */}</div>
      </footer>
    </div>
  );
};

export default Profile;
