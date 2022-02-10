/*
 * 설정
 */

var property = require("./property");

module.exports = {
	server_ip: property.server_ip,
	server_port: property.server_port,

	db_user: property.db_user,
	db_pwd: property.db_pwd,
	db_connectString: property.db_connectString,


	db_user2: property.db_user2,
	db_pwd2: property.db_pwd2,
	db_connectString2: property.db_connectString2,


	//파일 위치 (%소스 위치 아님)
	files_location: property.files_location,
	//파일 업로드 위치 
	upload_location: property.files_location + "/upload",
	//APK 업로드 위치
	apk_location: property.files_location + "/apk",

	//pm2사용
	apps: [{
		name: 'api',
		script: 'app.js',
		merge_logs: true,
		autorestart: true,
		watch: true,
		instances: 4,
		exec_mode: 'cluster',
		ignore_watch: ['node_modules', '.git', '.env', 'package.json'],
		env: {
			NODE_ENV: 'development',
		},
		env_production: {
			NODE_ENV: 'production',
		},
	}],

	//라우터 설정
	route_info: [

		{ file: '../src/routes/login', path: '/', method: 'login', type: 'get' },
		{ file: '../src/routes/login', path: '/login/loginChk', method: 'loginChk', type: 'post' },
		{ file: '../src/routes/login', path: '/logout', method: 'loginOut', type: 'get' },


		//메인화면1
		{ file: '../src/routes/main', path: '/main', method: 'main', type: 'get' },
		{ file: '../src/routes/main', path: '/login', method: 'login', type: 'post' },


		{ file: '../src/routes/main', path: '/getMenu', method: 'getMenu', type: 'post' },
		{ file: '../src/routes/main', path: '/getComp', method: 'getComp', type: 'post' },
		{ file: '../src/routes/main', path: '/getPlant', method: 'getPlant', type: 'post' },
		{ file: '../src/routes/main', path: '/frmLogin', method: 'frmLogin', type: 'post' },

		//Scan 조회
		{ file: '../src/routes/main', path: '/ucScanWh', method: 'ucScanWh', type: 'get' },
		{ file: '../src/routes/main', path: '/ucScanWh', method: 'ucScanWh', type: 'post' },
		{ file: '../src/routes/main', path: '/saveProd', method: 'saveProd', type: 'post' },

		//ScanList 조회
		{ file: '../src/routes/main', path: '/scanListWh', method: 'scanListWh', type: 'post' },

		//DlvyOrd 조회
		{ file: '../src/routes/main', path: '/dlvyOrd', method: 'dlvyOrd', type: 'post' },

		//Dlvy 탭조회
		{ file: '../src/routes/main', path: '/getLdOrdDt', method: 'getLdOrdDt', type: 'post' },

		//Dlvy 스캔조회
		{ file: '../src/routes/main', path: '/procLdScan', method: 'procLdScan', type: 'post' },

		//Dlvy 삭제
		{ file: '../src/routes/main', path: '/procLdScDel', method: 'procLdScDel', type: 'post' },
		{ file: '../src/routes/main', path: '/procLdScDelAll', method: 'procLdScDelAll', type: 'post' },

		//Move 탭조회
		{ file: '../src/routes/main', path: '/getMvLdScSum', method: 'getMvLdScSum', type: 'post' },

		//Move 스캔조회
		{ file: '../src/routes/main', path: '/procMvLdScan', method: 'procMvLdScan', type: 'post' },

		//Move 삭제
		{ file: '../src/routes/main', path: '/procMvLdScDel', method: 'procMvLdScDel', type: 'post' },
		{ file: '../src/routes/main', path: '/procMvLdScDelAll', method: 'procMvLdScDelAll', type: 'post' },


		//납품TAG 전송 SCANLIST(EDI)
		{ file: '../src/routes/main', path: '/scanListEdiIn', method: 'scanListEdiIn', type: 'post' },

		//재고실사 SCANLIST(EDI)
		{ file: '../src/routes/main', path: '/scanListEdiExam', method: 'scanListEdiExam', type: 'post' },

		// 거래명세서 ucScan(EDI)
		{ file: '../src/routes/main', path: '/sendTrans', method: 'sendTrans', type: 'post' },
		// 투입 ucScan(EDI)
		{ file: '../src/routes/main', path: '/sendPutMtrl', method: 'sendPutMtrl', type: 'post' },
		// 투입취소 ucScan(EDI)
		{ file: '../src/routes/main', path: '/sendPutMtrlCncl', method: 'sendPutMtrlCncl', type: 'post' },

		// 재고조회 ucStockFind(EDI)
		{ file: '../src/routes/main', path: '/getStockListBar', method: 'getStockListBar', type: 'post' },
		// --- 2021.12.10 추가 ----
		{ file: '../src/routes/main', path: '/procStockExamPda', method: 'procStockExamPda', type: 'post' },

		// 납품TAG2 ucIbgo2Edi(EDI)
		{ file: '../src/routes/main', path: '/procIbgoScan', method: 'procIbgoScan', type: 'post' },

		// 반품 콤보박스 ucBansongEdi(EDI)
		{ file: '../src/routes/main', path: '/rtnList', method: 'rtnList', type: 'post' },

		// 반품 전송 ucBansongEdi(EDI)
		{ file: '../src/routes/main', path: '/procRtnTag', method: 'procRtnTag', type: 'post' },

		// 생산 작업장 선택 (PROD)
		{ file: '../src/routes/main', path: '/getWcListProd', method: 'getWcListProd', type: 'post' },


		{ file: '../src/routes/main', path: '/savePaintInput', method: 'savePaintInput', type: 'post' },

		{ file: '../src/routes/main', path: '/matDeploy', method: 'matDeploy', type: 'post' },

		// ---------------- GMS -----------------

		// 아이디 로그인 (GMS)
		{ file: '../src/routes/main', path: '/gmsUserInfo', method: 'gmsUserInfo', type: 'post' },
		// 돌발 스캔 텍스트 박스 조회 (GMS)
		{ file: '../src/routes/main', path: '/gmsEquipInfo', method: 'gmsEquipInfo', type: 'post' },
		// 돌발 스캔 리스트 조회 (GMS)
		{ file: '../src/routes/main', path: '/gmsGetSuddenList', method: 'gmsGetSuddenList', type: 'post' },
		// 돌발 스캔 원인/현상 콤보박스 조회 (GMS)
		{ file: '../src/routes/main', path: '/gmsCboWoSymptom', method: 'gmsCboWoSymptom', type: 'post' },
		// 돌발 점검 등록 (GMS)
		{ file: '../src/routes/main', path: '/gmsDelWorkOrder', method: 'gmsDelWorkOrder', type: 'post' },
		// 돌발 삭제 (GMS)
		{ file: '../src/routes/main', path: '/gmsDelWorkOrderDel', method: 'gmsDelWorkOrderDel', type: 'post' },
		// 점검 콤보박스(GMS)
		{ file: '../src/routes/main', path: '/gmspEquipInfo', method: 'gmspEquipInfo', type: 'post' },
		// 점검 조회(GMS)
		{ file: '../src/routes/main', path: '/gmsGetList', method: 'gmsGetList', type: 'post' },
		// 조회번호 불러오기(GMS)
		{ file: '../src/routes/main', path: '/getPartSeq', method: 'getPartSeq', type: 'post' },
		// 자재 정보 조회(GMS)
		{ file: '../src/routes/main', path: '/getStockListGms', method: 'getStockListGms', type: 'post' },
		// 자재 구매 입고 조회(GMS)
		{ file: '../src/routes/main', path: '/getNeedHdrList', method: 'getNeedHdrList', type: 'post' },
		// 자재 일반 입고 창고 콤보박스(GMS)
		{ file: '../src/routes/main', path: '/getWhListGms', method: 'getWhListGms', type: 'post' },
		// 자재 일반 입고 구분 콤보박스(GMS)
		{ file: '../src/routes/main', path: '/getPtHistTypList', method: 'getPtHistTypList', type: 'post' },
		// 자재 일반 입고 조회(GMS)
		{ file: '../src/routes/main', path: '/getStockGms', method: 'getStockGms', type: 'post' },
		// 자재 일반 입고(GMS)
		{ file: '../src/routes/main', path: '/saveReceiveGms', method: 'saveReceiveGms', type: 'post' },
		// 자재실사 조회(GMS)
		{ file: '../src/routes/main', path: '/getExamListGms', method: 'getExamListGms', type: 'post' },
		// 자재출고 출고유형 콤보(GMS)
		{ file: '../src/routes/main', path: '/getReleaseTypList', method: 'getReleaseTypList', type: 'post' },
		// 자재출고 자재상태 콤보(GMS)
		{ file: '../src/routes/main', path: '/getPartTypList', method: 'getPartTypList', type: 'post' },
		// 자재출고 리스트(GMS)
		{ file: '../src/routes/main', path: '/getPartSeqListGms', method: 'getPartSeqListGms', type: 'post' },
		// 자재출고 처리(GMS)
		{ file: '../src/routes/main', path: '/gmsSaveRelease', method: 'gmsSaveRelease', type: 'post' },
		// 자재실사 실사수행 리스트(GMS)
		{ file: '../src/routes/main', path: '/gmsGetExamDtlList', method: 'gmsGetExamDtlList', type: 'post' },
		// 자재실사 실사 리스트(GMS)
		{ file: '../src/routes/main', path: '/gmsGetExamStockList', method: 'gmsGetExamStockList', type: 'post' },
		// 자재실사 저장(GMS)
		{ file: '../src/routes/main', path: '/gmsSaveConduct', method: 'gmsSaveConduct', type: 'post' },
		// 자재점검 항목 리스트(GMS)
		{ file: '../src/routes/main', path: '/gmsGetChkList', method: 'gmsGetChkList', type: 'post' },
		// 자재점검 항목 리스트(GMS)
		{ file: '../src/routes/main', path: '/getNewHdrNo', method: 'getNewHdrNo', type: 'post' },
		// 자재점검 저장(GMS)
		{ file: '../src/routes/main', path: '/gmsSaveChk', method: 'gmsSaveChk', type: 'post' },
		// --------------------------------------

		// ---------------- SKD -----------------
		{ file: '../src/routes/main', path: '/skdSendDlvyTag', method: 'skdSendDlvyTag', type: 'post' },
		{ file: '../src/routes/main', path: '/skdSendStag', method: 'skdSendStag', type: 'post' },
		{ file: '../src/routes/main', path: '/skdSendLtag', method: 'skdSendLtag', type: 'post' },
		// --------------------------------------

		// ---------------- COIL -----------------
		{ file: '../src/routes/main', path: '/coilProcScanF', method: 'coilProcScanF', type: 'post' },
		{ file: '../src/routes/main', path: '/coilProcLocMoveF', method: 'coilProcLocMoveF', type: 'post' },
		{ file: '../src/routes/main', path: '/coilGetShipDtl', method: 'coilGetShipDtl', type: 'post' },
		{ file: '../src/routes/main', path: '/coilProShipScan', method: 'coilProShipScan', type: 'post' },
		{ file: '../src/routes/main', path: '/coilProScanExam', method: 'coilProScanExam', type: 'post' },
		// --------------------------------------

		
		// 검수 스캔(WH)
		{ file: '../src/routes/main', path: '/procLdSampleScan', method: 'procLdSampleScan', type: 'post' },
		{ file: '../src/routes/main', path: '/getLdSampleList', method: 'getLdSampleList', type: 'post' },

		// 검수 삭제(WH)
		{ file: '../src/routes/main', path: '/procLdSampleScDelete', method: 'procLdSampleScDelete', type: 'post' },
		{ file: '../src/routes/main', path: '/procLdSampleScDeleteAll', method: 'procLdSampleScDeleteAll', type: 'post' },

		// 조회 테스트
		{ file: '../src/routes/utils/scanManager', path: '/getBarCd', method: 'getBarCd', type: 'post' },

		//APK 관련 라우트
		{ file: '../src/routes/utils/fileManager', path: '/apkView', method: 'apkView', type: 'get' },
		{ file: '../src/routes/utils/fileManager', path: '/uploadApk', method: 'uploadApk', type: 'post' },
		{ file: '../src/routes/utils/fileManager', path: '/chkApk', method: 'chkApk', type: 'post' },
		{ file: '../src/routes/utils/fileManager', path: '/apkDown', method: 'apkDown', type: 'get' },
		{ file: '../src/routes/utils/fileManager', path: '/apkQrDown', method: 'apkQrDown', type: 'get' },
		//이미지 업로드
		{ file: '../src/routes/utils/fileManager', path: '/uploadImg', method: 'uploadImg', type: 'post' },
		//공통 라우트
		{ file: '../src/routes/utils/base_routes', path: '/comRouter', method: 'comRouter', type: 'post' },



	],

	// 로그인 체크할 페이지 설정
	auth_url: [
		"/main",
		"/apkView",
		"/uploadApk",
		"/apkDown"
	],

	// Mybatis Mapper 설정
	mapper_info: [
		{ mapperNm: 'mainMapper', path: 'D:/Projects/HGPS_mobile/nodeServer/src/mapper/mainMapper.xml' },
		{ mapperNm: 'apkMapper', path: 'D:/Projects/HGPS_mobile/nodeServer/src/mapper/apkMapper.xml' },
		{ mapperNm: 'sampleMapper', path: 'D:/Projects/HGPS_mobile/nodeServer/src/mapper/sampleMapper.xml' },
		{ mapperNm: 'loginMapper', path: 'D:/Projects/HGPS_mobile/nodeServer/src/mapper/loginMapper.xml' }
	]

}
