const Parser = require('./parser');

module.exports = function(queries, options) {
  let result = {};

  Object.keys(queries).forEach(function(query) {
    if (Parser.parse(query).match(options)) {
      Object.assign(result, queries[query]);
    }
  });

  return result;
};
