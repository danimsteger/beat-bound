import { List } from "antd";

const sampleSongs = [
  {
    id: 1,
    name: "Bejeweled",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Midnights_-_Taylor_Swift.png/220px-Midnights_-_Taylor_Swift.png",
    artists: ["Taylor Swift"],
  },
  {
    id: 2,
    name: "Mastermind",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Midnights_-_Taylor_Swift.png/220px-Midnights_-_Taylor_Swift.png",
    artists: ["Taylor Swift"],
  },
  {
    id: 3,
    name: "Florida!!!!",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlz-0gZGjxoAp2wa6pbtGIR_9nsVwQZMHbOQ&s",
    artists: ["Taylor Swift", "Florence + The Machine"],
  },
  {
    id: 4,
    name: "So High School",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlz-0gZGjxoAp2wa6pbtGIR_9nsVwQZMHbOQ&s",
    artists: ["Taylor Swift"],
  },
];

const SavedSongs = () => {
  return (
    <div style={{ margin: "10px" }}>
      <div>
        <h1 style={{ textAlign: "center" }}>My Songs</h1>
        <List
          style={{ margin: "20px" }}
          itemLayout="vertical"
          dataSource={sampleSongs}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "30px", marginLeft: 50 }}>
                  <img width={100} alt={item.name} src={item.imageUrl} />
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
                  />
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default SavedSongs;
