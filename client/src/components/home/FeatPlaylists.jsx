import { useEffect, useState } from "react";
import { Carousel } from "antd";
import customTheme from "../../styles/customTheme";

const FeaturedPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("/api/search/featured-playlists");
        if (!response.ok) {
          throw new Error("Failed to fetch featured playlists");
        }

        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.error("Error fetching featured playlists:", error);
      }
    };
    fetchPlaylists();
  }, []);

  return (
    <div
      style={{
        padding: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: customTheme.token.colorSecondary,
      }}
    >
      <h2
        style={{ color: customTheme.token.colorDanger }}
        className="concert-one-regular"
      >
        {" "}
        Featured Playlists
      </h2>

      <Carousel
        autoplay
        className="first-carousel"
        style={{ borderRadius: 20, margin: 10, width: 300 }}
      >
        {playlists.map((playlist, index) => (
          <div key={index}>
            <a>
              <img
                alt="Playlist Cover"
                src={playlist.imageUrl}
                style={{ borderRadius: 20 }}
              />
            </a>
          </div>
        ))}
      </Carousel>
      <Carousel
        autoplay
        className="second-carousel"
        style={{ width: 300, borderRadius: 20, margin: 10 }}
      >
        {playlists.map(
          (playlist, index) =>
            index > 0 && (
              <div key={index}>
                <a>
                  <img
                    alt="Playlist Cover"
                    src={playlist.imageUrl}
                    style={{ borderRadius: 20 }}
                  />
                </a>
              </div>
            )
        )}
      </Carousel>
      <Carousel
        autoplay
        className="third-carousel"
        style={{ width: 300, borderRadius: 20, margin: 10 }}
      >
        {playlists.map(
          (playlist, index) =>
            index > 1 && (
              <div key={index}>
                <a>
                  <img
                    alt="Playlist Cover"
                    src={playlist.imageUrl}
                    style={{ borderRadius: 20 }}
                  />
                </a>
              </div>
            )
        )}
      </Carousel>
    </div>
  );
};

export default FeaturedPlaylists;
