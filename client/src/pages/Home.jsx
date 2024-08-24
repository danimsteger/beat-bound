import FeatPlaylistCarousel from "../components/home/FeatPlaylists";
import FeatArtists from "../components/home/FeatArtists";

import { Row, Col } from "antd";

import SavedEvents from "../components/profile/SavedEvents";

const Home = () => {
  return (
    <div>
      <section>
        <FeatPlaylistCarousel></FeatPlaylistCarousel>
        <FeatArtists></FeatArtists>

        <h2> Featured Tracks???</h2>
        <div>{/* tracks */}</div>
      </section>
      <footer>
        <div id="now-playing">{/* TODO: Add Now Playing bar here */}</div>
      </footer>
    </div>
  );
};

export default Home;
