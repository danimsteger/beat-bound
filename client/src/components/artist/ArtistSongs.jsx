import React, { useState, useEffect } from "react";
import { List, Tooltip, Button, Spin, Alert } from "antd";
import { StarOutlined } from "@ant-design/icons";

const ArtistSongs = ({ artistId, onAddToMyPage }) => {
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
        setSongs(result);
      } catch (err) {
        setError("Failed to load featured tracks.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedTracks();
  }, [artistId]);

  if (loading) {
    return <Spin tip="Loading featured tracks..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div style={{ margin: "10px" }}>
      <h1 style={{ textAlign: "center" }}>Featured Songs</h1>
      <div>
        <List
          style={{
            margin: "20px",

            alignItems: "center",
          }}
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
                    title={item.name}
                    description={<div>{item.albumName}</div>}
                  />
                  <Tooltip title="Add Song to Profile">
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<StarOutlined />}
                      style={{ margin: "10px" }}
                      size="medium"
                      onClick={() => onAddToMyPage(item)}
                    />
                  </Tooltip>
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
