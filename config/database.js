const mybatisMapper = require('mybatis-mapper');
const config = require('./config');
const oracledb = require('oracledb')

oracledb.autoCommit = true;

var databaseInit = function () {

	var arr = config.mapper_info;
	for (var z = 0; z < arr.length; z++) {
		for (var y = 0; y < z; y++) {
			if (arr[z].mapperNm == arr[y].mapperNm) {

				console.log("[Database Error] ======> Mapper Name Duplication Exception")
				process.exit();
				break;
			};
		};
	};
};

var database = async function (mapperNm, queryId, param) {
	var mapperPath = null;

	for (var i = 0; i < config.mapper_info.length; i++) {
		if (config.mapper_info[i].mapperNm == mapperNm) {
			mapperPath = config.mapper_info[i].path;
		};
	};
	if (mapperPath == null) {
		console.log("[Database Error] ======>Mapper Path Null Exception ");
		return false;
	};
	let oraConnection;
	let result;
	try {
		oraConnection = await oracledb.getConnection({
			user: process.env.NODE_ORACLEDB_USER || config.db_user,
			password: process.env.NODE_ORACLEDB_PASSWOR || config.db_pwd,
			connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING || config.db_connectString
		});
		oracledb.outFormat = oracledb.OBJECT;
		let format = { language: 'sql', indent: ' ' }; //첫번째는 xml의 namespace, 두번째는 해당 xml id값, 세번째는 파라미터, 마지막은 포맷. 
		mybatisMapper.createMapper([mapperPath]);
		let query = mybatisMapper.getStatement(mapperNm, queryId, param, format);
		console.log("[DB SQL]]  " + queryId + "   In    " + mapperNm + "   ============>");
		console.log(query);
		result = await oraConnection.execute(query);
	} catch (err) {
		console.log("[Database Error] ========================>" + err);
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
	// error
	if ((result == null) && (result == undefined)) {
		return [{ err: "ERRROR" }];
	};
	if (result.rowsAffected != undefined) {
		return [{ rowsAffected: result.rowsAffected }];
	};
	if (result.rows != undefined) {
		return result.rows;
	};
	return result.rows
};



// database 객체를 module.exports에 할당
module.exports = database;
module.exports.databaseInit = databaseInit;