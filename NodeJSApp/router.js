function route(pathname, handler, request, response, data) {
  console.log("Anforderung für " + pathname);
  var method = request.method;
  if (typeof handler[[pathname, method]] === 'function') {
    return handler[[pathname, method]](response, data);
  } else {
    console.log("Keine Methode gefunden für " + pathname + " und Verb " + method);
    return null;
  }
}
exports.route = route;