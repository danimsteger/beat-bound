import FeatPlaylistCarousel from "../components/home/FeatPlaylists";
import FeatArtists from "../components/home/FeatArtists";

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
