import { List } from "antd";

const ArtistEvents = ({ events }) => {
  return (
    <div style={{ margin: "5px" }}>
      <h1 style={{ textAlign: "center", marginTop: 10 }}>Events</h1>
      <List
        style={{
          margin: "20px",
        }}
        itemLayout="vertical"
        dataSource={events}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            style={
              {
                // display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
                // padding: "10px",
              }
            }
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
              }}
            >
              <div style={{ marginRight: "20px" }}>
                <img width={100} alt="logo" src={item.artists[0].imageUrl} />
              </div>

              <div style={{ flex: 1 }}>
                <List.Item.Meta
                  title={<a href={item.eventUrl}>{item.venue}</a>}
                  description={
                    <div>
                      {item.artists.map((artist, index) => (
                        <div key={index}>{artist.name}</div>
                      ))}
                    </div>
                  }
                />
                {item.time}
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ArtistEvents;
