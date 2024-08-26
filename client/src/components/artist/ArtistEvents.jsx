import React, { useState, useEffect } from "react";
import { List, Tooltip, Button } from "antd";
import { StarOutlined } from "@ant-design/icons";
import Auth from "../../utils/auth";

const ArtistEvents = ({ artistName, onAddToMyPage }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!artistName) return;

    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `/api/search/artist-events?q=${encodeURIComponent(artistName)}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const result = await response.json();
        console.log("API Response:", result);

        console.log("Fetched Events:", result);
        setEvents(Array.isArray(result) ? result : []);
      } catch (err) {
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [artistName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (events.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        No upcoming events found
      </div>
    );
  }

  return (
    <div style={{ margin: "5px" }}>
      <h1 style={{ textAlign: "center", marginTop: 10 }}>Events</h1>
      <List
        style={{ margin: "20px" }}
        itemLayout="vertical"
        dataSource={events}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <div style={{ flex: 1 }}>
                <List.Item.Meta
                  title={item.name}
                  description={
                    <>
                      <strong>Date:</strong> {item.date}
                      <br />
                      <strong>Venue:</strong> {item.venue}, {item.city}
                      <br />
                    </>
                  }
                />
              </div>
              <div>
                <Tooltip title="View on Ticketmaster">
                  <Button
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    type="primary"
                    shape="circle"
                    style={{ margin: "10px" }}
                    size="medium"
                  >
                    <img
                      src="/ticketmaster.white.png"
                      alt="spotify logo"
                      width="20px"
                    />
                  </Button>
                </Tooltip>

                {Auth.loggedIn() && (
                  <Tooltip title="Add Event to Profile">
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<StarOutlined />}
                      style={{ margin: "10px" }}
                      size="medium"
                      onClick={() => onAddToMyPage(item)}
                    />
                  </Tooltip>
                )}
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ArtistEvents;
