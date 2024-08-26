import { useQuery, useMutation } from "@apollo/client"; // Import useMutation
import { List, Tooltip, Button } from "antd";
import { GET_USERS_EVENTS } from "../../utils/queries";
import { REMOVE_EVENT } from "../../utils/mutations"; // Import REMOVE_EVENT mutation

const SavedEvents = ({ userId }) => {  // Accept userId as a prop
  const { loading, error, data } = useQuery(GET_USERS_EVENTS);
  const [removeEvent] = useMutation(REMOVE_EVENT); // Initialize the REMOVE_EVENT mutation

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { events } = data.me;
  console.log(events);

  const handleRemoveEvent = async (eventId) => {
    try {
      await removeEvent({
        variables: { userId, eventId }, // Use userId from props
        refetchQueries: [{ query: GET_USERS_EVENTS }], // Refetch events after mutation to update the UI
      });
      console.log(`Event with ID ${eventId} removed successfully`);
    } catch (err) {
      console.error("Error removing event:", err);
    }
  };

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
            <Tooltip title="Remove From Profile">
              <Button
                shape="circle"
                rel="noopener noreferrer"
                type="primary"
                size="medium"
                style={{ margin: "10px" }}
                onClick={(e) => {
                  e.preventDefault(); // Prevent default action
                  handleRemoveEvent(item._id); // Remove event
                }}
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
