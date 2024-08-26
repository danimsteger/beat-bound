import FeatPlaylistCarousel from "../components/home/FeatPlaylists";
import { Row, Col } from "antd";

import SavedEvents from "../components/profile/SavedEvents";

const Home = () => {
  return (
    <div>
      <header id='header'>
        <h1 id='homeheader'>Welcome to Beat Bound</h1></header>
      <section>
        <FeatPlaylistCarousel></FeatPlaylistCarousel>
      </section>
    </div>
  );
};

export default Home;
