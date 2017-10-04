const debug = require('debug')('csv-app')
const fs = require('fs');
const path = require('path');

const name = 'CSV Application';
debug('Starting %s', name);

const inputFile= path.join(__dirname, 'ips.csv');
debug('Loading file %s', inputFile);

fs.open(inputFile, 'r', (err, fd) => {
  if (err){
    debug('Error reading file');    
  } else {
    fs.fstat(fd, function(err, stats) {
      let bufferSize=stats.size;
      let chunkSize=512;
      let buffer=new Buffer(bufferSize);
      let bytesRead = 0;

      while (bytesRead < bufferSize) {
          if ((bytesRead + chunkSize) > bufferSize) {
              chunkSize = (bufferSize - bytesRead);
          }
          fs.read(fd, buffer, bytesRead, chunkSize, bytesRead);
          bytesRead += chunkSize;
      }
      debug('Reading %s Bytes', bufferSize);
      let content = buffer.toString('utf8', 0, bufferSize);
      parse(content);
      fs.close(fd);
  });
  }
});

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
