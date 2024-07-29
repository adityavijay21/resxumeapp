const express = require('express');
const router = express.Router();
const Slider = require('../models/slider');

router.get('/', async (req, res) => {
  try {
    const slider = await Slider.getAll();
    res.json(slider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;