import { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { List, Button, Tooltip } from "antd";
import { GET_USERS_SONGS } from "../../utils/queries";
import { REMOVE_SONG } from "../../utils/mutations";
import customTheme from "../../styles/customTheme";

// Function to capitalize the first letter of each word
const capitalize = (text) => {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
};

const SavedSongs = ({ addedItems }) => {
  const { loading, error, data, refetch } = useQuery(GET_USERS_SONGS);

  const [removeUserFromSong] = useMutation(REMOVE_SONG, {
    update(cache, { data: { removeUserFromSong } }) {
      const { me } = cache.readQuery({ query: GET_USERS_SONGS });

      cache.writeQuery({
        query: GET_USERS_SONGS,
        data: {
          me: {
            ...me,
            songs: me.songs.filter(
              (song) => song._id !== removeUserFromSong._id
            ),
          },
        },
      });
    },
    onCompleted: () => refetch(),
  });

  useEffect(() => {
    refetch();
  }, [addedItems, refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : Please try again</p>;

  const songs = data.me.songs;

  const handleDelete = async (songId) => {
    const userId = data.me._id;
    try {
      await removeUserFromSong({ variables: { songId, userId } });
    } catch (err) {
      console.error("Error removing song: ", err.message);
      console.error("GraphQL Errors: ", err.graphQLErrors);
      console.error("Network Error: ", err.networkError);
      console.error("Extra Info: ", err.extraInfo);
    }
  };

  return (
    <div style={{ margin: "5px", color: customTheme.token.colorPrimary }}>
      <h1 style={{ textAlign: "center" }} className="concert-one-regular">
        MY SONGS
      </h1>
      <List
        style={{ margin: "20px", color: customTheme.token.colorPrimary }}
        itemLayout="vertical"
        dataSource={songs}
        renderItem={(song) => (
          <List.Item key={song._id}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "30px", marginLeft: 100 }}>
                <img
                  width={140}
                  alt={capitalize(song.name)} // Capitalizing the song name for display
                  src={song.imageUrl}
                  style={{ borderRadius: 10 }}
                />
              </div>
              <div style={{ flex: 3 }}>
                <List.Item.Meta
                  title={
                    <span
                      style={{
                        color: customTheme.token.colorDanger,
                        fontSize: "1.3rem",
                      }}
                      className="bungee-regular"
                    >
                      {capitalize(song.name)} {/* Capitalizing the song name */}
                    </span>
                  }
                  description={
                    <div
                      style={{
                        color: customTheme.token.colorPrimary,
                        fontSize: "1rem",
                      }}
                    >
                      <p style={{ margin: 0 }}>{capitalize(song.album)}</p>
                      {/* Capitalizing the album name */}
                      <p style={{ margin: 0 }}>{capitalize(song.artist)}</p>
                      {/* Capitalizing the artist name */}
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
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
                              width="25px"
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
                            onClick={() => handleDelete(song._id)}
                          >
                            <img
                              src="/trash.white.png"
                              alt="remove"
                              width="30px"
                            />
                          </Button>
                        </Tooltip>
                      </div>
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
