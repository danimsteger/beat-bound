const express = require("express");
const { getTrack, getArtist, getArtistEvents } = require("../utils/API");
const router = express.Router();

router.route("/track").get(async (req, res) => {
  const trackQuery = req.query.q;
  try {
    const result = await getTrack(trackQuery);
    res.json(result);
  } catch (error) {
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

router.route("/artist-events").get(async (req, res) => {
  const artistName = req.query.q;
  try {
    const result = await getArtistEvents(artistName);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch artist events" });
  }
});

module.exports = router;
