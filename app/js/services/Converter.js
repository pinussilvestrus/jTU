angular.module("converterService", [])

	.factory("Converter", function($http, $q, $location, $anchorScroll, $sce){
    var _converter = {};

		var _guidGenerator = function guidGenerator() {
    	var S4 = function() {
       	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    	};
    	return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
		};

    /**
    * ##structure of umlObject##
    {
			id: String,
      className: String,
      attributes: Array of {name: String, type: String of ['string', 'number', 'date', 'Object', List of ['string', 'number', List, 'object']]},
      associations: Array of {name: String, object: umlObject, multiplicity: String of ['1:n', '1:1', 'm:n']}
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
				id: _guidGenerator(),
        className: '',
        attributes : [],
        associations: []
      };

      for (key in json) {

				var _key = key;
        var _property = json[_key];

        if (_key === '_umlClassName') {
          umlObject.className = _property;
          continue;
        }

        var _type = _typeOf(_property);
        var _newAttribute = {name: _key, type: _type};
        var _object = {};
        if (typeof(_property) === 'object') {
          if(_type.includes('Array')) {
            if (!_type.includes('string') && !_type.includes('number') && !_type.includes('mixed')) {
							_object = _converter.jsonToUML(_property[0]);
              umlObject.associations.push({name: _key, object: _object, multiplicity: '1:n'});
            }
          } else {
            _object = _converter.jsonToUML(_property);
            umlObject.associations.push({name: _key, object: _object, multiplicity: '1:1'});
          }
        }

        umlObject.attributes.push(_newAttribute);
      }

      return umlObject;

    };

		return _converter;
	});
