import FeatPlaylistCarousel from "../components/FeatPlaylists";
import FeatArtists from "../components/FeatArtists";

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
