const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

const jsonFiles = ['opportunities', 'resxumetemplates', 'resxumewriters', 'slider'];

// GET all data from a specific JSON file
router.get('/:file', async (req, res) => {
  const { file } = req.params;
  if (!jsonFiles.includes(file)) {
    return res.status(400).json({ error: 'Invalid file name' });
  }
  
  try {
    const data = await fs.readFile(path.join(__dirname, `../data/${file}.json`), 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Error reading file' });
  }
});

// POST new item to a specific JSON file
router.post('/:file', async (req, res) => {
  const { file } = req.params;
  if (!jsonFiles.includes(file)) {
    return res.status(400).json({ error: 'Invalid file name' });
  }

  try {
    const data = await fs.readFile(path.join(__dirname, `../data/${file}.json`), 'utf8');
    const jsonData = JSON.parse(data);
    jsonData.push(req.body);
    await fs.writeFile(path.join(__dirname, `../data/${file}.json`), JSON.stringify(jsonData, null, 2));
    res.json({ message: 'Item added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error writing to file' });
  }
});

// PUT (update) an item in a specific JSON file
router.put('/:file/:id', async (req, res) => {
  const { file, id } = req.params;
  if (!jsonFiles.includes(file)) {
    return res.status(400).json({ error: 'Invalid file name' });
  }

  try {
    const data = await fs.readFile(path.join(__dirname, `../data/${file}.json`), 'utf8');
    let jsonData = JSON.parse(data);
    const index = jsonData.findIndex(item => item.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }
    jsonData[index] = { ...jsonData[index], ...req.body };
    await fs.writeFile(path.join(__dirname, `../data/${file}.json`), JSON.stringify(jsonData, null, 2));
    res.json({ message: 'Item updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating file' });
  }
});

// DELETE an item from a specific JSON file
router.delete('/:file/:id', async (req, res) => {
  const { file, id } = req.params;
  if (!jsonFiles.includes(file)) {
    return res.status(400).json({ error: 'Invalid file name' });
  }

  try {
    const data = await fs.readFile(path.join(__dirname, `../data/${file}.json`), 'utf8');
    let jsonData = JSON.parse(data);
    jsonData = jsonData.filter(item => item.id !== id);
    await fs.writeFile(path.path(__dirname, `../data/${file}.json`), JSON.stringify(jsonData, null, 2));
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting from file' });
  }
});

module.exports = router;