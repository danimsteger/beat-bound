import { List, Tooltip, Button } from "antd";
import { StarOutlined } from "@ant-design/icons";

const ArtistSongs = ({ songs }) => {
  return (
    <div style={{ margin: "10px" }}>
      <div>
        <List
          style={{ margin: "20px" }}
          itemLayout="vertical"
          dataSource={songs}
          renderItem={(item) => (
            <List.Item key={item.id}>
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
                    description={
                      <div>
                        {item.artists.map((artist, index) => (
                          <div key={index}>{artist}</div>
                        ))}
                      </div>
                    }
                  />{" "}
                  <Tooltip title="Add Song to Profile">
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<StarOutlined />}
                      style={{ margin: "10px" }}
                      size="medium"
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
