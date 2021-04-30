const path = require('path');

module.exports = {
  client: {
    includes: [path.join(__dirname, '/src/**/*.query.ts')],
  },
};
