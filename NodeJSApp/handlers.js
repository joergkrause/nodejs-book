var fs = require('fs');
var path = require('path');
var mime = require('mime');

function home(response, data) {
  fs.readFile('views/home.html', function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
  return true; 
}
function show(response, data) {
  // Herunterladen
  if (data.fields && data.fields['fn']) {
    var name = data.fields['fn'];
    var file = path.join(__dirname, '/files', name);
    var mimeType = mime.lookup(file);
    response.setHeader('Content-disposition', 'attachment; filename=' + name);
    response.setHeader('Content-type', mimeType);
    var filedata = fs.readFileSync(file, 'binary');
    response.end(filedata, 'binary');
    return true;
  }
  // Alle anzeigen
  fs.readdir('files', function (err, list) {
    response.writeHead(200, { "Content-Type": "text/html" });
    var html = '<html><head></head><body><h1>Dateimanager</h1>';    
    if (list.length) {
      html += "<ul>";
      for (i = 0; i < list.length; i++) {
        html += '<li><a href="/show?fn=' + list[i] + '">' + list[i] + '</a></li>';
      }
      html += "</ul>";
    } else {
      html += '<h2>Keine Dateien gefunden</h2>';
    }
    html += '</body></html>';
    response.write(html);
    response.end();
  });
  return true; 
}
function upload(response, data) {
  // Hochladen
  var temp = data.files['fn'].path;
  var name = data.files['fn'].name;
  copyFile(temp, path.join('./files', name), function (err) {
    if (err) {
      console.log(err);
      return false;
    } else {
      // Dateiliste anzeigen
      return show(response, data);
    }
  });
  return true;
}

function copyFile(source, target, callback) {
    var rd = fs.createReadStream(source);
    rd.on('error', function (err) { callback(err); });
    var wr = fs.createWriteStream(target);
    wr.on('error', function (err) { callback(err); });
    wr.on('finish', function () { callback(); });
    rd.pipe(wr);
}

exports.home = home;
exports.show = show;
exports.upload = upload;