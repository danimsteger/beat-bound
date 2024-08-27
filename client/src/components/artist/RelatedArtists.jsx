import { useState, useEffect } from "react";
import ArtistCard from "./ArtistCard";
import customTheme from "../../styles/customTheme";

const RelatedArtists = ({
  artistId,
  onAddToMyPage,
  setRelatedArtists,
  isOnProfile,
}) => {
  const [relatedArtists, setRelatedArtistsState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedArtists = async () => {
      try {
        const response = await fetch(`/api/search/related-artists/${artistId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch related artists");
        }
        const result = await response.json();
        setRelatedArtistsState(result);
        setRelatedArtists(result);
      } catch (err) {
        setError("Failed to load related artists.");
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedArtists();
  }, [artistId, setRelatedArtists]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
        RELATED ARTISTS
      </h1>
      {relatedArtists.map((artist) => (
        <ArtistCard
          key={artist.spotifyId}
          artist={{
            ...artist,
            imageUrl: artist.image, // Ensuring correct key is passed
          }}
          onAddToMyPage={onAddToMyPage}
          isOnProfile={isOnProfile}
        />
      ))}
    </div>
  );
};

export default RelatedArtists;
