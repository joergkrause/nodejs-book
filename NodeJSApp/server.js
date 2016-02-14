var server = require("./start");
var router = require("./router");
var requestHandlers = require("./handlers");

var handler = {};
handler[["/", 'GET']] = requestHandlers.home;
handler[["/show", 'GET']] = requestHandlers.show;
handler[["/upload", 'POST']] = requestHandlers.upload;

server.start(router.route, handler);