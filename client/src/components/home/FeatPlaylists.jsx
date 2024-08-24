import { Carousel } from "antd";
import IndivPlaylist from "./IndivPlaylist";

// const contentStyle = {
//   height: "160px",
//   color: "#fff",
//   lineHeight: "160px",
//   textAlign: "center",
//   background: "#364d79",
// };

// Need to pass through Playlist component and map over each component!!
// <IndivPlaylist>

const samplePlaylists = [
  {
    id: 1,
    name: "popular playlist 1",
    imageUrl:
      "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    playlistUrl: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
  },
  {
    id: 2,
    name: "popular playlist 2",
    imageUrl:
      "https://i.scdn.co/image/ab67706f00000002b219b3def5af8116125fbfe2",
    playlistUrl: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
  },
  {
    id: 3,
    name: "popular playlist 3",
    imageUrl:
      "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    playlistUrl: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
  },
];

console.log(samplePlaylists[1].imageUrl);

// currently has many carousels but haven't figured out how to make this responsive yet!!!
function FeatPlaylistCarousel() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
        gap: "0px",
        marginTop: 70,
      }}
    >
      <Carousel autoplay style={{ width: "400px" }}>
        {samplePlaylists.map((samplePlaylist) => (
          <IndivPlaylist
            key={samplePlaylist.id}
            samplePlaylist={samplePlaylist}
          />
        ))}
      </Carousel>
      <Carousel autoplay style={{ width: "400px" }}>
        {samplePlaylists.map((samplePlaylist) => (
          <IndivPlaylist
            key={samplePlaylist.id}
            samplePlaylist={samplePlaylist}
          />
        ))}
      </Carousel>
      <Carousel autoplay style={{ width: "400px" }}>
        {samplePlaylists.map((samplePlaylist) => (
          <IndivPlaylist
            key={samplePlaylist.id}
            samplePlaylist={samplePlaylist}
          />
        ))}
      </Carousel>
      <Carousel autoplay style={{ width: "400px" }}>
        {samplePlaylists.map((samplePlaylist) => (
          <IndivPlaylist
            key={samplePlaylist.id}
            samplePlaylist={samplePlaylist}
          />
        ))}
      </Carousel>
      <Carousel autoplay style={{ width: "400px" }}>
        {samplePlaylists.map((samplePlaylist) => (
          <IndivPlaylist
            key={samplePlaylist.id}
            samplePlaylist={samplePlaylist}
          />
        ))}
      </Carousel>
    </div>
  );
}

export default FeatPlaylistCarousel;
