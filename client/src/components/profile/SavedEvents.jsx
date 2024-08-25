import { useQuery } from '@apollo/client';
import { List } from 'antd';
import { GET_USERS_EVENTS } from '../../utils/queries';

const SavedEvents = () => {
  const { loading, error, data } = useQuery(GET_USERS_EVENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : Please try again</p>;

  const events = data.me.events;

  return (
    <div style={{ margin: "5px" }}>
      <h1 style={{ textAlign: "center" }}>My Events</h1>
      <List
        style={{ margin: "20px" }}
        itemLayout="vertical"
        dataSource={events}
        renderItem={(item) => (
          <List.Item key={item._id}>
            <List.Item.Meta
              title={<a href={`#event/${item._id}`}>{item.name}</a>} 
              description={`${item.venue}, ${item.city} on ${item.date}`} 
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default SavedEvents;
