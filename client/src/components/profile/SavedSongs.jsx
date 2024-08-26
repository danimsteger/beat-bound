import { useQuery, useMutation } from "@apollo/client";
import { List, Tooltip, Button } from "antd";
import { GET_USERS_SONGS } from "../../utils/queries";
import { REMOVE_SONG } from "../../utils/mutations"; // Import REMOVE_SONG mutation
import { PlayCircleFilled } from "@ant-design/icons";
// import SongCard from "./SongCard";

const SavedSongs = ({ userId }) => { // Receive userId as a prop
  const { loading, error, data } = useQuery(GET_USERS_SONGS);
  const [removeSong] = useMutation(REMOVE_SONG);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { songs } = data.me;
  console.log(songs);

  const handleRemoveSong = async (songId) => {
    try {
      await removeSong({
        variables: { userId, songId }, // Use userId from props
        refetchQueries: [{ query: GET_USERS_SONGS }], // Refetch songs after mutation to update the UI
      });
      console.log(`Song with ID ${songId} removed successfully`);
    } catch (err) {
      console.error("Error removing song:", err);
    }
  };

  return (
    <div style={{ margin: "5px" }}>
      <h1 style={{ textAlign: "center" }}>My Songs</h1>
      <List
        style={{ margin: "20px" }}
        itemLayout="vertical"
        dataSource={songs}
        renderItem={(song) => (
          <List.Item key={song._id}>
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
                      <Tooltip title="Listen on Spotify">
                        <Button
                          href={song.externalUrl}
                          shape="circle"
                          target="_blank"
                          rel="noopener noreferrer"
                          type="primary"
                          size="medium"
                          style={{ margin: "10px" }}
                        >
                          <img
                            src="/spotify.white.png"
                            alt="spotify logo"
                            width="30px"
                          />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Remove From Profile">
                        <Button
                          shape="circle"
                          rel="noopener noreferrer"
                          type="primary"
                          size="medium"
                          style={{ margin: "10px" }}
                          onClick={() => handleRemoveSong(song._id)}
                        >
                          <img
                            src="/trash.white.png"
                            alt="remove"
                            width="30px"
                          />
                        </Button>
                      </Tooltip>
                    </div>
                  }
                />
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SavedSongs;
