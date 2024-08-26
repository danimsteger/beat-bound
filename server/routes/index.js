const express = require("express");
const path = require("path");
const router = express.Router();

const searchApiRoutes = require("./searchApi-routes");
router.use("/api/search", searchApiRoutes);

module.exports = router;
