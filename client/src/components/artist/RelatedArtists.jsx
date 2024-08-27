import { useState, useEffect } from "react";
import ArtistCard from "./ArtistCard";

const RelatedArtists = ({ artistId, onAddToMyPage, setRelatedArtists, isOnProfile }) => {
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
    <div style={{ margin: "10px" }}>
      <h1 style={{ textAlign: "center" }}>Related Artists</h1>
      {relatedArtists.map((artist) => (
        <ArtistCard
          key={artist.spotifyId}
          artist={{
            ...artist,
            imageUrl: artist.image // Ensuring correct key is passed
          }}
          onAddToMyPage={onAddToMyPage}
          isOnProfile={isOnProfile}
        />
      ))}
    </div>
  );
};

export default RelatedArtists;
