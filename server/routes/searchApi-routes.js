const express = require("express");
const { getTrack, getArtist, getArtistEvents, getFeaturedPlaylists, getArtistFeaturedTracks, getRelatedArtists, getArtistById } = require("../utils/API");
const router = express.Router();

router.route("/track").get(async (req, res) => {
  const trackQuery = req.query.q;
  try {
    const result = await getTrack(trackQuery);
    res.json(result);
  } catch (error) {
    console.error('Error fetching track:', error);
    res.status(500).json({ error: "Failed to fetch track" });
  }
});

router.route("/artist").get(async (req, res) => {
  const artistQuery = req.query.q;
  try {
    const result = await getArtist(artistQuery);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch artist" });
  }
});
router.route("/artist/:artistId").get(async (req, res) => {
  try {
    const artistId = req.params.artistId;
    const result = await getArtistById(artistId);
    res.json(result);
  } catch (error) {
    console.error('Error fetching artist:', error);
    res.status(500).json({ error: "Failed to fetch artist" });
  }
});

router.route("/artist-events").get(async (req, res) => {
  const artistName = req.query.q;
  try {
    const result = await getArtistEvents(artistName);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch artist events" });
  }
});

router.route("/featured-playlists").get(async (req, res) => {
  try {
    const result = await getFeaturedPlaylists();
    res.json(result);
  } catch (error) {
    console.error('Error fetching featured playlists:', error);
    res.status(500).json({ error: "Failed to fetch featured playlists" });
  }
});

router.route("/artist-featured-tracks/:artistId").get(async (req, res) => {
  try {
    const artistId = req.params.artistId;
    const result = await getArtistFeaturedTracks(artistId);
    res.json(result);
  } catch (error) {
    console.error('Error fetching featured tracks:', error);
    res.status(500).json({ error: "Failed to fetch featured tracks" });
  }
});

router.route("/related-artists/:artistId").get(async (req, res) => {
  try {
    const artistId = req.params.artistId;
    const result = await getRelatedArtists(artistId);
    res.json(result);
  } catch (error) {
    console.error('Error fetching related artists:', error);
    res.status(500).json({ error: "Failed to fetch related artists" });
  }
});

module.exports = router;
