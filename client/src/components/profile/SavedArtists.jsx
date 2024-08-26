import { useQuery, useMutation } from "@apollo/client"; // Import useMutation
import ArtistCard from "./ArtistCard";
import { GET_USERS_ARTISTS } from "../../utils/queries";
import { REMOVE_ARTIST } from "../../utils/mutations"; // Import REMOVE_ARTIST mutation

const SavedArtists = ({ userId }) => {  // Accept userId as a prop
  const { loading, error, data } = useQuery(GET_USERS_ARTISTS);
  const [removeArtist] = useMutation(REMOVE_ARTIST); // Initialize the REMOVE_ARTIST mutation

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleRemoveArtist = async (artistId) => {
    try {
      await removeArtist({
        variables: { userId, artistId }, // Use userId from props
        refetchQueries: [{ query: GET_USERS_ARTISTS }], // Refetch artists after mutation to update the UI
      });
      console.log(`Artist with ID ${artistId} removed successfully`);
    } catch (err) {
      console.error("Error removing artist:", err);
    }
  };

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
      {data.me.artists.map((artist) => (
        <ArtistCard
          key={artist._id}
          artist={artist}
          onRemove={() => handleRemoveArtist(artist._id)} // Add onRemove to ArtistCard
        />
      ))}
    </div>
  );
};

export default SavedArtists;
