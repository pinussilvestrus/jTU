var converter = require("./app/js/jTUConverter");

var _testJson = {
  _umlClassName: 'TestClass',
  string: "Hi",
  number: 3,
  testObject: {
    _umlClassName: 'Thing',
    test: 1
  },
  testArray: [{_umlClassName: 'Hello', string: 'test'}, 'string']
};

console.log(converter.jsonToUML(_testJson));
