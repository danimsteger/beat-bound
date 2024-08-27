import FeatPlaylistCarousel from "../components/home/FeatPlaylists";
import { Row, Col } from "antd";

import MainHome from "../components/home/mainHome";
import customTheme from "../styles/customTheme";

const Home = () => {
  return (
    <div
      style={{
        backgroundColor: customTheme.token.colorSecondary,
        height: "100%",
        minHeight: "calc(100vh - 100px)",
      }}
    >
      <Row justify="center">
        <Col flex={1}>
          <FeatPlaylistCarousel></FeatPlaylistCarousel>
        </Col>
        <Col flex={20}>
          <MainHome></MainHome>
        </Col>
        <Col flex={1}>
          <FeatPlaylistCarousel></FeatPlaylistCarousel>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
