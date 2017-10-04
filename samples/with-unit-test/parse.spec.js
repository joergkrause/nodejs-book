describe("CSV Parser", function() {
  var parse = require('./parse');
  var content = '';

  beforeEach(function() {
    content = 
`# I'm a comment
IP,127.0.0.1
Port,8080
IP,198.162.15.0
Port,8081`;
  });

  it("Should return an array", function() {
    var result = parse(content);
    expect(result.length).toEqual(4);
  });

});