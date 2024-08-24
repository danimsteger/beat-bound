import ArtistCard from "./ArtistCard";

const sampleArtists = [
  {
    id: 1,
    name: "Taylor Swift",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlz-0gZGjxoAp2wa6pbtGIR_9nsVwQZMHbOQ&s",
  },
  {
    id: 2,
    name: "Oliva Rodrigo",
    imageUrl:
      "https://media.gq.com/photos/610172681ac2ac787b459b47/4:3/w_2283,h_1712,c_limit/olivia-rodrigo-gq-september-2021-01.jpg",
  },
  {
    id: 3,
    name: "Oliva Rodrigo",
    imageUrl:
      "https://media.gq.com/photos/610172681ac2ac787b459b47/4:3/w_2283,h_1712,c_limit/olivia-rodrigo-gq-september-2021-01.jpg",
  },
];

const SavedArtists = () => {
  return (
    <div
      style={{
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>My Artists</h1>
      {sampleArtists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  );
};

export default SavedArtists;
