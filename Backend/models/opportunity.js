const fs = require('fs').promises;
const path = require('path');

class Opportunity {
  static async getAll() {
    try {
      const data = await fs.readFile(path.join(__dirname, '../data/opportunities.json'), 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error reading opportunities data');
    }
  }
}

module.exports = Opportunity;