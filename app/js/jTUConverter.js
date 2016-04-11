var _converter = {};

/**
DEPRECATED!!
* ##structure of umlObject##
{
  className: String,
  attributes: Array of {name: String, type: String of ['string', 'number', 'date', 'Object', List of ['string', 'number', List, 'object']]},
  associations: Array of umlObjects
}
* todo: if array has just equal-typed objects, then add to associations
**/

var _isArray = function(json) {
  if (json.length) return true;
  else return false;
};

var _typeOf = function(json) {
  if (typeof(json) === 'object') {
    if (_isArray(json)) {
      return 'Array<' + _getTypeOfArray(json) + '>';
    } else {
      var _object = _converter.jsonToUML(json);
      if (_object.className && _object.className !== '') {
        return _object.className
      } else {
        return 'object';
      }
    }
  }

  return typeof(json);
};

var _getTypeOfArray = function(array) {
    if (!_isArray(array)) {
      return;
    }

    var type = _typeOf(array[0]);
    for (var i = 1; i < array.length; i++) {
      if (_typeOf(array[i]) !== _typeOf(array[i-1])) {
        type = 'mixed';
        break;
      }
    }

    return type;
};

_converter.jsonToUML = function(json) {
  var umlObject = {
    className: '',
    attributes : [],
    associations: []
  };

  for (key in json) {

    var _property = json[key];

    if (key === '_umlClassName') {
      umlObject.className = _property;
      continue;
    }

    var _type = _typeOf(_property);
    var _newAttribute = {name: key, type: _type};
    var _object = {};
    if (typeof(_property) === 'object') {
      if(_type.includes('Array')) {
        if (!_type.includes('string') && !_type.includes('number') && !_type.includes('mixed')) {
          umlObject.associations.push(_object);
        }
      } else {
        console.log('hier');
        _object = _converter.jsonToUML(_property);
        umlObject.associations.push(_object);
      }
    }

    umlObject.attributes.push(_newAttribute);
  }

  return umlObject;

};

module.exports = _converter;
