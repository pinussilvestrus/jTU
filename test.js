var converter = require("./app/js/jTUConverter");

var _testJson = {
  _umlClassName: 'TestClass',
  string: "Hi",
  number: 3,
  object: {
    test: 1
  }
};

console.log(converter.jsonToUML(_testJson));
