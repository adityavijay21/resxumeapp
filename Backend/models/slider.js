const fs = require('fs').promises;
const path = require('path');

class Slider {
  static async getAll() {
    try {
      const data = await fs.readFile(path.join(__dirname, '../data/slider.json'), 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error reading slider');
    }
  }
}

module.exports = Slider;