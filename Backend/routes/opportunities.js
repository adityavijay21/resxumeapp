const express = require('express');
const router = express.Router();
const Opportunity = require('../models/opportunity');

router.get('/', async (req, res) => {
  try {
    const opportunities = await Opportunity.getAll();
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;