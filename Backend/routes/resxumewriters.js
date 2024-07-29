const express = require('express');
const router = express.Router();
const ResxumeWriter = require('../models/resxumewriters');

router.get('/', async (req, res) => {
  try {
    const resxumewriters = await ResxumeWriter.getAll();
    res.json(resxumewriters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
