import React, { useState, useEffect } from "react";
import ArtistCard from "./ArtistCard";

const RelatedArtists = ({ artistId, onAddToMyPage }) => {
  const [relatedArtists, setRelatedArtists] = useState([]);
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
        setRelatedArtists(result);
      } catch (err) {
        setError("Failed to load related artists.");
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedArtists();
  }, [artistId]);

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
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Related Artists</h1>
      {relatedArtists.map((artist) => (
        <ArtistCard
          key={artist.spotifyId}
          artist={artist}
          onAddToMyPage={onAddToMyPage} // Pass the correct function
        />
      ))}
    </div>
  );
};

export default RelatedArtists;
