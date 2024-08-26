import { useQuery } from "@apollo/client";
import { List, Button } from "antd";
import { GET_USERS_SONGS } from "../../utils/queries";
import { PlayCircleFilled } from "@ant-design/icons";
// import SongCard from "./SongCard";

const SavedSongs = () => {
  const { loading, error, data } = useQuery(GET_USERS_SONGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { songs } = data.me;
  console.log(songs);
  return (
    <div style={{ margin: "5px" }}>
      <h1 style={{ textAlign: "center" }}>My Songs</h1>{" "}
      {/* <Row gutter={[16, 16]}>
        {songs.map((song) => (
          <Col xs={24} sm={12} md={8} lg={6} key={song._id}>
            <SongCard song={song} />
          </Col>
        ))}
      </Row> */}
      <List
        style={{ margin: "20px" }}
        itemLayout="vertical"
        dataSource={songs}
        renderItem={(song) => (
          <List.Item key={song.id}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "30px", marginLeft: 100 }}>
                <img
                  width={140}
                  alt={song.name}
                  src={song.imageUrl}
                  style={{ borderRadius: 10 }}
                />
              </div>
              <div style={{ flex: 3 }}>
                <List.Item.Meta
                  title={song.name}
                  description={
                    <div>
                      <p>{song.album}</p>
                      <p>{song.artist}</p>
                      <Button
                        href={song.externalUrl}
                        shape="circle"
                        target="_blank"
                        rel="noopener noreferrer"
                        type="primary"
                        size="medium"
                        icon={<PlayCircleFilled />}
                      ></Button>
                    </div>
                  }
                />{" "}
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SavedSongs;
