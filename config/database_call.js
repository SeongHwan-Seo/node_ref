
const config = require('./config');
const oracledb = require('oracledb')

oracledb.autoCommit = true;

var database_call = async function (query, params, db_no = 1) {

   var return_Objs = [];
   let oraConnection;
   try {

      let user = ""
      let pwd = ""
      let connectString = ""

      if (db_no == 1) {
         user = config.db_user
         pwd = config.db_pwd
         connectString = config.db_connectString

      } else {
         user = config.db_user2
         pwd = config.db_pwd2
         connectString = config.db_connectString2
      }

      oraConnection = await oracledb.getConnection({
         user: process.env.NODE_ORACLEDB_USER || user,
         password: process.env.NODE_ORACLEDB_PASSWOR || pwd,
         connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING || connectString
      });

      var outType = { type: oracledb.STRING, dir: oracledb.BIND_OUT, maxSize: 1073741822 };
      for (var i = 0; i < Object.keys(params).length; i++) {
         key = Object.keys(params)[i];
         if (params[key] == "OUT_DATA") {
            params[key] = outType;
         };
      };
      console.log(params)

      var queryStr = query;
      console.log("[DATABASE QUERY] ==========");
      console.log(query);
      let result = await oraConnection.execute(queryStr, params);

      var obj = {};

      for (var i = 0; i < Object.keys(params).length; i++) {
         key = Object.keys(params)[i];
         if (params[key] == outType) {
            obj[key] = result.outBinds[key]
         };
      };

      return_Objs[0] = obj;

      console.log(return_Objs);

   } catch (ERR) {
      console.log("ERR" + ERR);
      return_Objs[0] = { DBERROR: ERR };
   } finally {
      if (oraConnection) {
         try {
            await oraConnection.close();
            console.log("[Database Close]");
         } catch (err) {
            console.error(err);
         };
      };
   };

   return return_Objs;

};


module.exports = database_call;