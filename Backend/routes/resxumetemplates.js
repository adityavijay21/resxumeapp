const express = require('express');
const ResxumeTemplate = require('../models/resxumetemplates');
const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const resxumetemplates = await ResxumeTemplate.getAll();
    res.json(resxumetemplates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;