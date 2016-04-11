var _converter = {};

/**
* ##structure of umlObject##
{
  className: String,
  attributes: Array of {name: String, type: String of ['string', 'number', 'date', 'Object']},
  associations: Array of umlObjects
}
*
**/
_converter.jsonToUML = function(json) {
  var umlObject = {
    className: '',
    attributes : [],
    associations: []
  };

  for (key in json) {
    if (key === '_umlClassName') {
      umlObject.className = json[key];
      continue;
    }

    umlObject.attributes.push({name: key, type: typeof(json[key])});
    if (typeof(json[key]) === 'object') {
      umlObject.associations.push(_converter.jsonToUML(json[key]));
    }
  }

  return umlObject;

};

module.exports = _converter;
