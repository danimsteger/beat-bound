import FeatPlaylistCarousel from "../components/home/FeatPlaylists";
import { Row, Col } from "antd";

import MainHome from "../components/home/mainHome";

const Home = () => {
  return (
    <div>
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
