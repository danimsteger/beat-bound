import { useQuery } from '@apollo/client';
import { Row, Col } from "antd";
import { GET_USERS_SONGS } from '../../utils/queries';
import SongCard from './SongCard';

const SavedSongs = () => {
  const { loading, error, data } = useQuery(GET_USERS_SONGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { songs } = data.me;

  return (
    <div>
      <h2>Saved Songs</h2>
      <Row gutter={[16, 16]}>
        {songs.map(song => (
          <Col xs={24} sm={12} md={8} lg={6} key={song._id}>
            <SongCard song={song} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SavedSongs;
