import { useState, useEffect } from "react";
import { List, Tooltip, Button } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import Auth from "../../utils/auth";
import customTheme from "../../styles/customTheme";

const ArtistEvents = ({ artistName, onAddToMyPage, isOnProfile }) => {
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
        setEvents(Array.isArray(result) ? result : []);
      } catch (err) {
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [artistName]);

  return (
    <div style={{ margin: "5px" }}>
      <h1
        style={{
          textAlign: "center",
          marginTop: 10,
          color: customTheme.token.colorSecondary,
        }}
        className="concert-one-regular"
      >
        UPCOMING EVENTS
      </h1>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {events.length === 0 && (
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: customTheme.token.colorSecondary,
            fontSize: "1.3rem",
          }}
          className="concert-one-regular"
        >
          No upcoming events found
        </div>
      )}
      <List
        style={{ margin: "20px" }}
        itemLayout="vertical"
        dataSource={events}
        renderItem={(item) => {
          const alreadyOnProfile = isOnProfile(item, "events");
          return (
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
                    title={
                      <span
                        style={{
                          textDecoration: "none",
                          color: customTheme.token.colorSecondary,
                          fontSize: "1.3rem",
                        }}
                        className="bungee-regular"
                      >
                        {item.name}
                      </span>
                    }
                    description={
                      <div
                        className="concert-one-regular"
                        style={{
                          fontSize: "1rem",
                          color: customTheme.token.colorPrimary,
                        }}
                      >
                        <strong className="bungee-regular">Date:</strong>{" "}
                        {item.date}
                        <br />
                        <strong className="bungee-regular">Venue:</strong>{" "}
                        {item.venue}, {item.city}
                        <br />
                      </div>
                    }
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
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
                        alt="ticketmaster logo"
                        width="20px"
                      />
                    </Button>
                  </Tooltip>
                  {Auth.loggedIn() && (
                    <Tooltip
                      title={
                        alreadyOnProfile
                          ? "Already on your profile"
                          : "Add Event to Profile"
                      }
                    >
                      <Button
                        onClick={() => onAddToMyPage(item)}
                        shape="circle"
                        icon={
                          alreadyOnProfile ? <StarFilled /> : <StarOutlined />
                        }
                        style={{ margin: "10px" }}
                        size="medium"
                        type="primary"
                        disabled={alreadyOnProfile}
                      />
                    </Tooltip>
                  )}
                </div>
              </div>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default ArtistEvents;
