import { useQuery } from "@apollo/client";
import { List, Tooltip, Button } from "antd";
import { GET_USERS_EVENTS } from "../../utils/queries";

const SavedEvents = () => {
  const { loading, error, data } = useQuery(GET_USERS_EVENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : Please try again</p>;

  const events = data.me.events;
  console.log(events);

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
              title={
                <a
                  href={`#event/${item._id}`}
                  style={{ textDecoration: "none" }}
                >
                  {item.name}
                </a>
              }
              description={`${item.venue}, ${item.city} on ${item.date}`}
            />
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
            <Tooltip title="Remove From Profile">
              <Button
                shape="circle"
                rel="noopener noreferrer"
                type="primary"
                size="medium"
                style={{ margin: "10px" }}
              >
                <img src="/trash.white.png" alt="remove" width="30px" />
              </Button>
            </Tooltip>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SavedEvents;
