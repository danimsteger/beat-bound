import { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { List, Tooltip, Button } from "antd";
import { GET_USERS_EVENTS } from "../../utils/queries";
import { REMOVE_EVENT } from "../../utils/mutations";
import customTheme from "../../styles/customTheme";

const SavedEvents = ({ addedItems }) => {
  const { loading, error, data, refetch } = useQuery(GET_USERS_EVENTS);
  const [removeEvent] = useMutation(REMOVE_EVENT, {
    update(cache, { data: { removeUserFromEvent } }) {
      const { me } = cache.readQuery({ query: GET_USERS_EVENTS });

      cache.writeQuery({
        query: GET_USERS_EVENTS,
        data: {
          me: {
            ...me,
            events: me.events.filter(
              (event) => event._id !== removeUserFromEvent._id
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
  if (error) return <p>Error: Please try again</p>;

  const events = data.me.events;

  const handleDelete = async (eventId) => {
    const userId = data.me._id;
    try {
      await removeEvent({ variables: { userId, eventId } });
    } catch (err) {
      console.error("Error removing event: ", err.message);
      console.error("GraphQL Errors: ", err.graphQLErrors);
      console.error("Network Error: ", err.networkError);
    }
  };

  return (
    <div style={{ margin: "5px", color: customTheme.token.colorPrimary }}>
      <h1 style={{ textAlign: "center" }} className="concert-one-regular">
        MY EVENTS
      </h1>
      <List
        style={{ margin: "20px", color: customTheme.token.colorPrimary }}
        itemLayout="vertical"
        dataSource={events}
        renderItem={(item) => (
          <List.Item key={item._id}>
            <List.Item.Meta
              title={
                <a
                  href={`#event/${item._id}`}
                  style={{
                    textDecoration: "none",
                    color: customTheme.token.colorSecondary,
                    fontSize: "1.3rem",
                  }}
                  className="bungee-regular"
                >
                  {item.name}
                </a>
              }
              description={
                <span
                  style={{
                    color: customTheme.token.colorPrimary,
                    fontSize: "1rem",
                  }}
                >
                  {item.venue}, {item.city} on {item.date}
                </span>
              }
            />
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
              <Tooltip title="Remove From Profile">
                <Button
                  shape="circle"
                  type="primary"
                  size="medium"
                  style={{ margin: "10px" }}
                  onClick={() => handleDelete(item._id)}
                >
                  <img src="/trash.white.png" alt="remove" width="30px" />
                </Button>
              </Tooltip>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SavedEvents;
