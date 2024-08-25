import { useQuery } from "@apollo/client";
import ArtistCard from "./ArtistCard";
import { GET_USERS_ARTISTS } from "../../utils/queries";

const SavedArtists = () => {
  const { loading, error, data } = useQuery(GET_USERS_ARTISTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : Please try again</p>;

  return (
    <div style={{
      margin: "10px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <h1 style={{ textAlign: "center" }}>My Artists</h1>
      {data.me.artists.map((artist) => (
        <ArtistCard key={artist._id} artist={artist} />
      ))}
    </div>
  );
};

export default SavedArtists;

