const fs = require('fs').promises;
const path = require('path');

class ResxumeWriter {
  static async getAll() {
    try {
      const data = await fs.readFile(path.join(__dirname, '../data/resxumewriters.json'), 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error reading ResxumeWriters data');
    }
  }
}

module.exports = ResxumeWriter;