import { useEffect } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import ArtistCard from "./ArtistCard";
import { GET_USERS_ARTISTS } from "../../utils/queries";
import { REMOVE_ARTIST } from "../../utils/mutations";
import customTheme from "../../styles/customTheme";

const SavedArtists = ({ addedItems }) => {
  const client = useApolloClient();
  const { loading, error, data, refetch } = useQuery(GET_USERS_ARTISTS);

  const [removeUserFromArtist] = useMutation(REMOVE_ARTIST, {
    update(cache, { data: { removeUserFromArtist } }) {
      const { me } = cache.readQuery({ query: GET_USERS_ARTISTS });

      cache.writeQuery({
        query: GET_USERS_ARTISTS,
        data: {
          me: {
            ...me,
            artists: me.artists.filter(
              (artist) => artist._id !== removeUserFromArtist._id
            ),
          },
        },
      });
    },
    onCompleted: () => refetch(),
  });

  useEffect(() => {
    refetch()
      .then(() => {
        console.log("Refetch completed");
      })
      .catch((e) => {
        console.error("Refetch error:", e);
      });
  }, [addedItems, refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: Please try again</p>;

  const artists = data?.me?.artists || [];

  const handleDelete = async (artistId) => {
    const userId = data?.me?._id;

    // Log userId for debugging
    console.log("User ID:", userId);

    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    try {
      await removeUserFromArtist({ variables: { artistId, userId } });
    } catch (err) {
      console.error("Error removing artist: ", err.message);
      console.error("GraphQL Errors: ", err.graphQLErrors);
      console.error("Network Error: ", err.networkError);
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
        color: customTheme.token.colorPrimary,
      }}
    >
      <h1 style={{ textAlign: "center" }} className="concert-one-regular">
        MY ARTISTS
      </h1>
      {artists.map((artist) => (
        <ArtistCard
          key={artist._id}
          artist={artist}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default SavedArtists;
