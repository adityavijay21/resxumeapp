const fs = require('fs').promises;
const path = require('path');

class ResxumeTemplate {
  static async getAll() {
    try {
      const data = await fs.readFile(path.join(__dirname, '../data/resxumetemplates.json'), 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error reading resxumetemplates data');
    }
  }
}

module.exports = ResxumeTemplate;