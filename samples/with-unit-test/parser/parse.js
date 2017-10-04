const debug = require('debug')('csv-app');

function parse(content) {
  let ln = 1;
  let result = [];
  content.split(/\r?\n/).forEach(function (line) {
    debug('%s: %s ', ln++, line);
    if (!(line.length && line[0] === '#')) {
      result.push(line);
    }
  });
  return result;
}

module.exports = parse;