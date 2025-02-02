const fs = require('node:fs');
const path = require('node:path');
const { LansaConfig } = require('@lansa/config');

fs.writeFileSync(
  path.resolve(__dirname, '../schema.json'),
  JSON.stringify(LansaConfig, null, 2),
  'utf8'
);
