import FeatPlaylistCarousel from "../components/home/FeatPlaylists";
import { Row, Col } from "antd";

import SavedEvents from "../components/profile/SavedEvents";

const Home = () => {
  return (
    <div>
      <section>
        <FeatPlaylistCarousel></FeatPlaylistCarousel>
      </section>
    </div>
  );
};

export default Home;
