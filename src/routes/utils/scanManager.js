

var stringUtils = require("./stringUtils");


var saveProd = async function(req, res) {
  var params =  stringUtils.setParams( req.body );
  var database = req.app.get('database');
  var result = await database( 'ucScanMapper' , 'getValues' , params );
  res.json( result );
};


var getBarCd = async function(req, res) {
  var params =  stringUtils.setParams( req.body );
  var database = req.app.get('database');
  var result = await database( 'ucScanMapper' , 'getBarCd' , params );
  res.json( result );
}

module.exports.saveProd = saveProd;
module.exports.getBarCd = getBarCd;


