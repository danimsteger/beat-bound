// import IndivEvent from "./IndivEvent";

import { List } from "antd";

const sampleEvent = [
  {
    id: 1,
    time: "7:00",
    city: "Charlotte",
    location: "Bank of America Stadium",
    eventUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
    artists: [
      {
        name: "Taylor Swift",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlz-0gZGjxoAp2wa6pbtGIR_9nsVwQZMHbOQ&s",
      },
      {
        name: "Sabrina Carpenter",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlz-0gZGjxoAp2wa6pbtGIR_9nsVwQZMHbOQ&s",
      },
    ],
  },
  {
    id: 2,
    time: "5:00",
    city: "Columbia",
    location: "Williams Brice Stadium",
    eventUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
    artists: [
      {
        name: "Olivia Rodrigo",
        imageUrl:
          "https://media.gq.com/photos/610172681ac2ac787b459b47/4:3/w_2283,h_1712,c_limit/olivia-rodrigo-gq-september-2021-01.jpg",
      },
    ],
  },
];
const SavedEvents = () => {
  return (
    <div style={{ margin: "10px" }}>
      <h1>SAVED EVENTS: </h1>
      <List
        style={{ margin: "20px" }}
        itemLayout="vertical"
        dataSource={sampleEvent}
        renderItem={(item, index) => (
          <List.Item
            key={item.id}
            extra={
              <img width={100} alt="logo" src={item.artists[0].imageUrl} />
            }
          >
            <List.Item.Meta
              title={<a href={item.eventUrl}>{item.location}</a>}
              description={
                <div>
                  {item.artists.map((artist) => (
                    <div key={artist.name}>{artist.name}</div>
                  ))}
                </div>
              }
            />
            {item.time}
          </List.Item>
        )}
      />
    </div>
  );
};

export default SavedEvents;
