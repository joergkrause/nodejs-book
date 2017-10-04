var http = require("http");
var url = require("url");
var formidable = require("formidable");
var querystring = require("querystring");

function start(route, handler) {
  
  function execute(pathname, handler, request, response, data) {
    var content = route(pathname, handler, request, response, data);
    if (!content) {
      response.writeHead(400, { "Content-Type": "text/plain" });
      response.write("400 Bad request");
      response.end();
    }
  }
  
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    var query = url.parse(request.url).query;
    if (request.method === 'POST') {
      var form = new formidable.IncomingForm();
      form.parse(request, function (err, fields, files) {
        if (err) {
          console.error(err.message);
          return;
        }
        var data = { fields: fields, files: files };
        execute(pathname, handler, request, response, data);
      });
    }
    if (request.method === 'GET') {
      var data = {
        fields: querystring.parse(query)
      };
      execute(pathname, handler, request, response, data);
    }
  }
  var port = process.env.port || 1337;
  http.createServer(onRequest).listen(port);
  console.log("Server gestartet.");
}

exports.start = start;