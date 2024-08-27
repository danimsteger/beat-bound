import { useState, useEffect } from "react";
import { List, Tooltip, Button } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import customTheme from "../../styles/customTheme";

import Auth from "../../utils/auth";

const capitalize = (text) => {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
};
const ArtistSongs = ({ artistId, onAddToMyPage, isOnProfile }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedTracks = async () => {
      try {
        const response = await fetch(
          `/api/search/artist-featured-tracks/${artistId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch featured tracks");
        }
        const result = await response.json();

        // Update each song with an isOnProfile flag
        const updatedSongs = result.map((song) => ({
          ...song,
          isOnProfile: isOnProfile(song, "track"),
        }));

        setSongs(updatedSongs);
      } catch (err) {
        setError("Failed to load featured tracks.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedTracks();
  }, [artistId, isOnProfile]);

  const handleAddClick = async (item) => {
    if (!item.isOnProfile) {
      await onAddToMyPage(item);

      // Update the specific song to reflect it's on profile
      setSongs((prevSongs) =>
        prevSongs.map((song) =>
          song.externalUrl === item.externalUrl
            ? { ...song, isOnProfile: true }
            : song
        )
      );
    }
  };

  return (
    <div style={{ margin: "10px", color: customTheme.token.colorPrimary }}>
      <div>
        <h1 style={{ textAlign: "center" }} className="concert-one-regular">
          TOP SONGS
        </h1>
        <List
          style={{ margin: "20px", color: customTheme.token.colorPrimary }}
          itemLayout="vertical"
          dataSource={songs}
          renderItem={(item) => (
            <List.Item key={item.name}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "30px", marginLeft: 100 }}>
                  <img
                    width={125}
                    alt={item.name}
                    src={item.imageUrl}
                    style={{ borderRadius: 10 }}
                  />
                </div>
                <div style={{ flex: 3 }}>
                  <List.Item.Meta
                    title={
                      <span
                        style={{
                          color: customTheme.token.colorSecondary,
                          fontSize: "1.1rem",
                          margin: 0,
                        }}
                        className="bungee-regular"
                      >
                        {capitalize(item.name)}{" "}
                        {/* Capitalizing the song name */}
                      </span>
                    }
                    description={
                      <div
                        style={{
                          color: customTheme.token.colorPrimary,
                          fontSize: "1rem",
                          margin: 0,
                        }}
                      >
                        {item.albumName}
                      </div>
                    }
                  />
                  {Auth.loggedIn() && (
                    <Tooltip
                      title={
                        item.isOnProfile
                          ? "Already on your profile"
                          : "Add Song to Profile"
                      }
                    >
                      <Button
                        onClick={() => handleAddClick(item)}
                        type="primary"
                        shape="circle"
                        icon={
                          item.isOnProfile ? <StarFilled /> : <StarOutlined />
                        }
                        style={{ margin: "10px" }}
                        size="medium"
                        disabled={item.isOnProfile}
                      />
                    </Tooltip>
                  )}
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ArtistSongs;
