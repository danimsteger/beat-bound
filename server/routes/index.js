const express = require('express');
const path = require('path');
const router = express.Router();

const searchApiRoutes = require('./searchApi-routes');
router.use('/api/search', searchApiRoutes);
router.use(express.static(path.join(__dirname, '../../client/build')));
router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;
