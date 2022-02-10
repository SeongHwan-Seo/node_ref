/*
 * Main
 * @date 2019-05-07
 * @author LCY
 */
var stringUtils = require("./utils/stringUtils");

const config = require('../../config/config');
const { SHUTDOWN_MODE_DEFAULT } = require("oracledb");
const { server_port } = require("../../config/config");

//Main
var main = async function (req, res) {


  res.render('main.ejs', { param: req });
};

//로그인 액션
var login = async function (req, res) {
  var params = stringUtils.setParams(req.body);
  var database = req.app.get('database');
  var result = await database('mainMapper', 'getLogin', params);

  res.json(result);
};

//메뉴 셋팅
var getMenu = async function (req, res) {
  var params = stringUtils.setParams(req.body);
  var database = req.app.get('database');
  var result = await database('mainMapper', 'getMenu', params);

  res.json(result);
};

//콤보박스(회사) 셋팅
var getComp = async function (req, res) {

  query = 'CALL PBS_PG_COMMON_JSON.GET_COMP_LIST(:PI_COMP_CD, :PI_LANG, :CURSOR1)';
  params = stringUtils.setParams(req.body);

  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);

  res.json(result);

}

//콤보박스(공장) 셋팅
var getPlant = async function (req, res) {

  query = 'CALL PBS_PG_COMMON_JSON.GET_PLANT_LIST(:PI_COMP_CD, :PI_PLANT_CD, :PI_LANG, :CURSOR1)';
  params = stringUtils.setParams(req.body);

  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);

  res.json(result);
}

// ID 확인
var frmLogin = async function (req, res) {
  var params = stringUtils.setParams(req.body);
  var database = req.app.get('database');
  var result = await database('mainMapper', 'getfrmLogin', params);
  res.json(result);
}

// ucScanWh
var ucScanWh = async function (req, res) {

  query = 'CALL PBS_PG_WH_JSON.PROC_WHIN(:PI_IBGO_TYP, :PI_COMP_CD,:PI_PLANT_CD, :PI_BAR_CD, :PI_WHIN_SAP_TG_YN, :PI_USER_ID, :PI_IN_GB, :MSG, :CURSOR1)';
  params = stringUtils.setParams(req.body);

  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);

  res.json(result);
};

// ucScanWh
var saveProd = async function (req, res) {
  query = 'CALL PBS_PG_PROD_JSON.SAVE_PROD(:PI_COMP_CD, :PI_PLANT_CD, :PI_WC_CD, :PI_BAR_CD, :PI_PROD_SAP_TG_YN, :PI_USER_ID, :PI_LANG, :MSG, :CURSOR1)';
  params = stringUtils.setParams(req.body);

  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);

  res.json(result);
};

// ucScanListWh
var scanListWh = async function (req, res) {

  query = 'CALL PBS_PG_WH_JSON.PROC_EXAM_SCAN(:PI_COMP_CD, :PI_PLANT_CD, :PI_EXAM_YMD, :PI_USER_ID, :PI_BAR_CD_ARR, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  params["PI_BAR_CD_ARR"] = params["PI_BAR_CD_ARR"].replace(/\[/g, "").replace(/\]/g, "").replace(/\, /g, "|");

  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);

  res.json(result);

};

// ucDlvyOrd
var dlvyOrd = async function (req, res) {

  query = 'CALL PBS_PG_WH_JSON.GET_LD_ORD_HD(:PI_COMP_CD, :PI_PLANT_CD, :PI_TP_YMD, :MSG, :CURSOR1)';
  params = stringUtils.setParams(req.body);

  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);

  res.json(result);

};

// ucDlvy
var getLdOrdDt = async function (req, res) {
  query = 'CALL PBS_PG_WH_JSON.GET_LD_ORD_DT(:PI_COMP_CD, :PI_PLANT_CD, :PI_TP_YMD, :PI_SQ, :PI_CAR_NO, :CURSOR1, :CURSOR2, :CURSOR3)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};


var procLdScan = async function (req, res) {
  query = 'CALL PBS_PG_WH_JSON.PROC_LD_SCAN(:PI_COMP_CD, :PI_PLANT_CD, :PI_TP_YMD, :PI_SQ, :PI_CAR_NO, :PI_BAR_CD, :PI_USER_ID, :MSG, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

var procLdScDel = async function (req, res) {

  query = 'CALL PBS_PG_WH_JSON.PROC_LD_SC_DELETE(:PI_COMP_CD, :PI_PLANT_CD, :PI_TP_YMD, :PI_SQ, :PI_CAR_NO, :PI_BAR_CD, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);

};

var procLdScDelAll = async function (req, res) {

  query = 'CALL PBS_PG_WH_JSON.PROC_LD_SC_DELETE_ALL(:PI_COMP_CD, :PI_PLANT_CD, :PI_TP_YMD, :PI_SQ, :PI_CAR_NO, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);

};

var getMvLdScSum = async function (req, res) {

  query = 'CALL PBS_PG_WH_JSON.GET_MV_LD_SC_SUM(:PI_COMP_CD, :PI_PLANT_CD, :PI_TP_YMD, :PI_SQ, :PI_CAR_NO, :CURSOR1, :CURSOR2)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);

};


var procMvLdScan = async function (req, res) {

  query = 'CALL PBS_PG_WH_JSON.PROC_MV_LD_SCAN(:PI_COMP_CD, :PI_PLANT_CD, :PI_TP_YMD, :PI_SQ, :PI_CAR_NO, :PI_BAR_CD, :PI_USER_ID, :MSG, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);

};


var procMvLdScDel = async function (req, res) {

  query = 'CALL PBS_PG_WH_JSON.PROC_MV_LD_SC_DELETE(:PI_COMP_CD, :PI_PLANT_CD, :PI_TP_YMD, :PI_SQ, :PI_CAR_NO, :PI_BAR_CD, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);

};


var procMvLdScDelAll = async function (req, res) {

  query = 'CALL PBS_PG_WH_JSON.PROC_MV_LD_SC_DELETE_ALL(:PI_COMP_CD, :PI_PLANT_CD, :PI_TP_YMD, :PI_SQ, :PI_CAR_NO, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);

};



var scanListEdiIn = async function (req, res) {

  query = 'CALL EDI_PG_PDA_SCAN_JSON.SEND_TAG(:PI_JOB, :PI_COMP_CD, :PI_PLANT_CD, :PI_USER_ID, :PI_BAR_CD_ARR, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  params["PI_BAR_CD_ARR"] = params["PI_BAR_CD_ARR"].replace(/\[/g, "").replace(/\]/g, "").replace(/\, /g, "|");

  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);

  res.json(result);

};

var scanListEdiExam = async function (req, res) {

  query = 'CALL EDI_PG_PDA_SCAN_JSON.PROC_EXAM_SCAN(:PI_COMP_CD, :PI_PLANT_CD, :PI_EXAM_YMD, :PI_USER_ID, :PI_BAR_CD_ARR, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  params["PI_BAR_CD_ARR"] = params["PI_BAR_CD_ARR"].replace(/\[/g, "").replace(/\]/g, "").replace(/\, /g, "|");

  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);

  res.json(result);


};


var sendTrans = async function (req, res) {

  query = 'CALL EDI_PG_PDA_SCAN_JSON.SEND_TRANS(:PI_COMP_CD, :PI_PLANT_CD, :PI_USER_ID, :PI_BAR_CD, :CURSOR1)';
  params = stringUtils.setParams(req.body);

  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);

  res.json(result);

};



var sendPutMtrl = async function (req, res) {

  query = 'CALL EDI_PG_PDA_SCAN_JSON.SEND_PUT_MTRL(:PI_COMP_CD, :PI_PLANT_CD, :PI_BAR_CD, :PI_USER_ID, :CURSOR1)';
  params = stringUtils.setParams(req.body);

  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);

  res.json(result);

};



var sendPutMtrlCncl = async function (req, res) {

  query = 'CALL EDI_PG_PDA_SCAN_JSON.SEND_PUT_MTRL_CNCL(:PI_COMP_CD, :PI_PLANT_CD, :PI_BAR_CD, :PI_USER_ID, :CURSOR1)';
  params = stringUtils.setParams(req.body);

  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);

  res.json(result);

};


// ucStockFind 재고조회(EDI)
var getStockListBar = async function (req, res) {

  query = 'CALL EDI_PG_PDA_SCAN_JSON.GET_STOCK_LIST_BAR(:PI_COMP_CD, :PI_PLANT_CD, :PI_PART_NO, :PI_BAR_CD, :PI_USER_ID, :CURSOR1, :CURSOR2)';
  params = stringUtils.setParams(req.body);

  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};



// ucStockFind 재고조회(EDI)
var procIbgoScan = async function (req, res) {

  query = 'CALL EDI_PG_PDA_SCAN_JSON.PROC_IBGO_SCAN(:PI_COMP_CD, :PI_PLANT_CD, :PI_BAR_CD, :PI_USER_ID, :CURSOR1, :CURSOR2)';
  params = stringUtils.setParams(req.body);

  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);

  res.json(result);

};


// ucStockFind 재고조회(EDI)
var rtnList = async function (req, res) {

  query = 'CALL EDI_PG_PDA_SCAN_JSON.RTN_LIST(:CURSOR1, :CURSOR2)';
  params = stringUtils.setParams(req.body);

  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);

  res.json(result);

};


var procRtnTag = async function (req, res) {

  query = 'CALL EDI_PG_PDA_SCAN_JSON.PROC_RTN_TAG(:PI_COMP_CD, :PI_PLANT_CD, :PI_USER_ID, :PI_BAR_CD_LIST, :PI_RTN_DIV_LIST, :PI_RTN_RSN_LIST, :CURSOR1)';
  params = stringUtils.setParams(req.body);

  params["PI_BAR_CD_LIST"] = params["PI_BAR_CD_LIST"].replace(/\[/g, "").replace(/\]/g, "").replace(/\, /g, "|");
  params["PI_RTN_DIV_LIST"] = params["PI_RTN_DIV_LIST"].replace(/\[/g, "").replace(/\]/g, "").replace(/\, /g, "|");
  params["PI_RTN_RSN_LIST"] = params["PI_RTN_RSN_LIST"].replace(/\[/g, "").replace(/\]/g, "").replace(/\, /g, "|");

  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);

  res.json(result);

};


var gmsUserInfo = async function (req, res) {

  query = 'CALL GMS_PG_PDA_CHECK_JSON.USER_INFO(:PI_USER_ID, :PI_LANG, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);

};


var gmsEquipInfo = async function (req, res) {

  query = 'CALL GMS_PG_PDA_CHECK_JSON.EQUIP_INFO(:PI_COMP_CD, :PI_PLANT_CD, :PI_EQUIP_NO, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);

};


var gmsGetSuddenList = async function (req, res) {

  query = 'CALL GMS_PG_PDA_CHECK_JSON.GET_SUDDEN_LIST(:PI_COMP_CD, :PI_PLANT_CD, :PI_EQUIP_NO, :PI_ITEM_NO, :PI_USER_ID, :PI_LANG, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);

};


var getWcListProd = async function (req, res) {

  query = 'CALL PBS_PG_COMMON_JSON.GET_WC_LIST(:PI_COMP_CD, :PI_PLANT_CD, :PI_WB_CD, :PI_WC_CD, :PI_LANG, :MSG, :CURSOR1)';
  params = stringUtils.setParams(req.body);

  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);

  res.json(result)
    ;
};


var savePaintInput = async function (req, res) {

  query = 'CALL PBS_PG_PROD_JSON.SAVE_PAINT_INPUT(:PI_COMP_CD, :PI_PLANT_CD, :PI_WC_CD, :PI_BAR_CD, :PI_USER_ID, :PI_LANG, :MSG, :CURSOR1)';
  params = stringUtils.setParams(req.body);

  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);

  res.json(result);
};

var matDeploy = async function (req, res) {

  query = 'CALL PBS_PG_PROD_JSON.PROC_MAT_DEPLOY(:PI_COMP_CD, :PI_PLANT_CD, :PI_WC_CD, :PI_BAR_CD, :PI_USER_ID, :PI_LANG, :MSG, :CURSOR1)';
  params = stringUtils.setParams(req.body);

  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);

  res.json(result);

};

var procLdSampleScan = async function (req, res) {
  query = 'CALL PBS_PG_WH_JSON.PROC_LD_SAMPLE_SCAN(:PI_BAR_CD, :PI_SAMPLE_BAR_CD, :MSG, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};


var getLdSampleList = async function (req, res) {
  query = 'CALL PBS_PG_WH_JSON.GET_LD_SAMPLE_LIST(:PI_BAR_CD, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};


var procLdSampleScDelete = async function (req, res) {
  query = 'CALL PBS_PG_WH_JSON.PROC_LD_SAMPLE_SC_DELETE(:PI_BAR_CD, :PI_BAR_CD_ARR, :MSG, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

var procLdSampleScDeleteAll = async function (req, res) {
  query = 'CALL PBS_PG_WH_JSON.PROC_LD_SAMPLE_SC_DELETE_ALL(:PI_BAR_CD, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};


var gmsCboWoSymptom = async function (req, res) {
  query = 'CALL GMS_PG_PDA_CHECK_JSON.CBO_WO_SYMPTOM(:PI_EQ_KIND, :PI_LANG, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

var gmsDelWorkOrder = async function (req, res) {
  query = 'CALL GMS_PG_PDA_CHECK_JSON.DEL_WORK_ORDER(:PI_COMP_CD, :PI_PLANT_CD, :PI_DESCRIPTION, :PI_EQUIP_NO, :PI_SYMPTOM, :PI_LANG, :PI_USER_ID, :MSG)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

var gmsDelWorkOrderDel = async function (req, res) {
  query = 'CALL GMS_PG_PDA_CHECK_JSON.DEL_WORK_ORDER(:PI_COMP_CD, :PI_PLANT_CD, :PI_WO_NO, :PI_USER_ID, :PI_LANG, :MSG)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

var gmspEquipInfo = async function (req, res) {
  query = 'CALL GMS_PG_PDA_CHECK_JSON.P_EQUIP_INFO(:PI_COMP_CD, :PI_PLANT_CD, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

var gmsGetList = async function (req, res) {
  query = 'CALL GMS_PG_PDA_CHECK_JSON.GET_LIST(:PI_COMP_CD, :PI_PLANT_CD, :PI_EQUIP_NO, :PI_ITEM_NO, :PI_PLAN_DATE_FR, :PI_PLAN_DATE_TO, :PI_P_EQUIP_NO, :PI_LANG, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

var getPartSeq = async function (req, res) {
  query = 'CALL GMS_PG_PDA_JSON.GET_PART_SEQ(:PI_PART_NO, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

var getStockListGms = async function (req, res) {
  query = 'CALL GMS_PG_PDA_JSON.GET_STOCK_LIST(:PI_COMP_CD, :PI_PLANT_CD, :PI_PART_SEQ_NO, :PI_LANG, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

var getNeedHdrList = async function (req, res) {
  query = 'CALL GMS_PG_PDA_JSON.GET_NEED_HDR_LIST(:PI_COMP_CD, :PI_PLANT_CD, :PI_PART_NEED_HDR_NO, :PI_LANG, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

var getWhListGms = async function (req, res) {
  query = 'CALL GMS_PG_PDA_JSON.GET_WAREHOUSE_LIST(:PI_COMP_CD, :PI_PLANT_CD, :PI_LANG, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

var getPtHistTypList = async function (req, res) {
  query = 'CALL GMS_PG_PDA_JSON.GET_PT_HIST_TYP_LIST(:PI_LANG, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

var getStockGms = async function (req, res) {
  query = 'CALL GMS_PG_PDA_JSON.GET_STOCK(:PI_COMP_CD, :PI_PLANT_CD, :PI_PART_SEQ_NO, :PI_WAREHOUSE, :PI_LANG, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

var saveReceiveGms = async function (req, res) {
  query = 'CALL GMS_PG_PDA_JSON.SAVE_RECEIVE(:COMP_CD, :PLANT_CD, :USER_ID, :LANG, :SEQ_NO_ARR, :QTY_ARR, :COST_ARR, :TYPE_ARR, :WH_ARR, :NEED_DTL_NO, :NEED_HDR_NO, :MSG)';
  params = stringUtils.setParams(req.body);

  params["SEQ_NO_ARR"] = params["SEQ_NO_ARR"].replace(/\[/g, "").replace(/\]/g, "").replace(/\, /g, "|");
  params["QTY_ARR"] = params["QTY_ARR"].replace(/\[/g, "").replace(/\]/g, "").replace(/\, /g, "|");
  params["COST_ARR"] = params["COST_ARR"].replace(/\[/g, "").replace(/\]/g, "").replace(/\, /g, "|");
  params["TYPE_ARR"] = params["TYPE_ARR"].replace(/\[/g, "").replace(/\]/g, "").replace(/\, /g, "|");
  params["WH_ARR"] = params["WH_ARR"].replace(/\[/g, "").replace(/\]/g, "").replace(/\, /g, "|");
  params["NEED_DTL_NO"] = params["NEED_DTL_NO"].replace(/\[/g, "").replace(/\]/g, "").replace(/\, /g, "|");

  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

var getExamListGms = async function (req, res) {
  query = 'CALL GMS_PG_PDA_JSON.GET_EXAM_LIST(:PI_COMP_CD, :PI_PLANT_CD, :PI_WAREHOUSE, :PI_PLAN_DATE_FR, :PI_PLAN_DATE_TO, :PI_LANG, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

var getReleaseTypList = async function (req, res) {
  query = 'CALL GMS_PG_PDA_JSON.GET_RELEASE_TYP_LIST(:PI_LANG, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

var getPartTypList = async function (req, res) {
  query = 'CALL GMS_PG_PDA_JSON.GET_PART_TYP_LIST(:PI_LANG, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

var getPartSeqListGms = async function (req, res) {
  query = 'CALL GMS_PG_PDA_JSON.GET_PART_SEQ_LIST(:PI_COMP_CD, :PI_PLANT_CD, :PI_WAREHOUSE, :PI_PART_TYPE, :PI_PART_SEQ_NO, :PI_LANG, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

var gmsSaveRelease = async function (req, res) {
  query = 'CALL GMS_PG_PDA_JSON.SAVE_RELEASE(:COMP_CD, :PLANT_CD, :USER_ID, :LANG, :SEQ_NO_ARR, :RELEASE_QTY_ARR, :WH_ARR, :REL_TYPE_ARR, :BY_ARR, :STATUS_ARR, :MSG)';
  params = stringUtils.setParams(req.body);

  params["SEQ_NO_ARR"] = params["SEQ_NO_ARR"].replace(/\[/g, "").replace(/\]/g, "").replace(/\, /g, "|");
  params["RELEASE_QTY_ARR"] = params["RELEASE_QTY_ARR"].replace(/\[/g, "").replace(/\]/g, "").replace(/\, /g, "|");
  params["WH_ARR"] = params["WH_ARR"].replace(/\[/g, "").replace(/\]/g, "").replace(/\, /g, "|");
  params["REL_TYPE_ARR"] = params["REL_TYPE_ARR"].replace(/\[/g, "").replace(/\]/g, "").replace(/\, /g, "|");
  params["BY_ARR"] = params["BY_ARR"].replace(/\[/g, "").replace(/\]/g, "").replace(/\, /g, "|");
  params["STATUS_ARR"] = params["STATUS_ARR"].replace(/\[/g, "").replace(/\]/g, "").replace(/\, /g, "|");

  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

var gmsGetExamDtlList = async function (req, res) {
  query = 'CALL GMS_PG_PDA_JSON.GET_EXAM_DETAIL_LIST(:PI_COMP_CD, :PI_PLANT_CD, :PI_PART_CONDUCT_NO, :PI_LANG, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

var gmsGetExamStockList = async function (req, res) {
  query = 'CALL GMS_PG_PDA_JSON.GET_EXAM_STOCK_LIST(:PI_COMP_CD, :PI_PLANT_CD, :PI_PART_SEQ_NO, :PI_PART_CONDUCT_NO, :PI_WAREHOUSE, :PI_LANG, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

var gmsSaveConduct = async function (req, res) {
  query = 'CALL GMS_PG_PDA_JSON.SAVE_CONDUCT(:PI_COMP_CD, :PI_PLANT_CD, :PI_USER_ID, :PI_LANG, :PI_PART_SEQ_NO, :PI_PART_STATUS, :PI_CONDUCT_QTY, :PI_WAREHOUSE, :PI_CONDUCT_HDR_NO, :PI_CONDUCT_DTL_NO, :MSG)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

var gmsGetChkList = async function (req, res) {
  query = 'CALL GMS_PG_PDA_CHECK_JSON.GET_CHK_LIST(:PI_COMP_CD, :PI_PLANT_CD, :PI_CHECK_RESULT_HDR_NO, :PI_CHECK_LIST_NO, :PI_LANG, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

// HDR_NO 불러오기
var getNewHdrNo = async function (req, res) {
  var params = stringUtils.setParams(req.body);
  var database = req.app.get('database');
  var result = await database('mainMapper', 'getNewHdrNo', params);
  res.json(result);
}

// GMS 점검항목 임시저장 및 완료
var gmsSaveChk = async function (req, res) {
  query = 'CALL GMS_PG_PDA_CHECK_JSON.SAVE_CHECK(:PI_COMP_CD, :PI_PLANT_CD, :PI_CHECK_RESULT_HDR_NO, :PI_CHECK_RESULT_DTL_NO, :PI_LANG, :PI_USER_ID, :PI_CHECK_VALUE, :PI_CHECK_RESULT, :PI_IS_COMPLETE, :PI_PLAN_DATE, :PI_CHECK_LIST_NO, :PI_CHECK_DETAIL_NO, :PI_REMARK, :PI_EQUIP_NO, :PI_STEP_NUM, :PI_NEW_HDR_NO, :PI_ROW_COUNT, :MSG)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

// SKD 입고 전송
var skdSendDlvyTag = async function (req, res) {
  query = 'CALL SKD_PK_BARPLUS_PDA_JSON.SEND_DLVY_TAG(:PI_JOB, :PI_USER_ID, :PI_CLIENT_IP, :PI_BAR_CD_ARR, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  params["PI_BAR_CD_ARR"] = params["PI_BAR_CD_ARR"].replace(/\[/g, "").replace(/\]/g, "").replace(/\, /g, "|");
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

// SKD 포장 전송
var skdSendStag = async function (req, res) {
  query = 'CALL SKD_PK_BARPLUS_PDA_JSON.SEND_STAG(:PI_JOB, :PI_USER_ID, :PI_CLIENT_IP, :PI_BAR_CD_ARR, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  params["PI_BAR_CD_ARR"] = params["PI_BAR_CD_ARR"].replace(/\[/g, "").replace(/\]/g, "").replace(/\, /g, "|");
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

// SKD 출하 전송
var skdSendLtag = async function (req, res) {
  query = 'CALL SKD_PK_BARPLUS_PDA_JSON.SEND_LTAG(:PI_JOB, :PI_USER_ID, :PI_CLIENT_IP, :PI_BAR_CD_ARR, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  params["PI_BAR_CD_ARR"] = params["PI_BAR_CD_ARR"].replace(/\[/g, "").replace(/\]/g, "").replace(/\, /g, "|");
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params);
  res.json(result);
};

// ---------- ## 코일공장 관련 패키지 ## -----------
// Coil 스캔
var coilProcScanF = async function (req, res) {
  query = 'CALL CPS_PK_PDA_JSON.PROC_SCAN(:PI_JOB, :PI_PLANT, :PI_BARID, :PI_USERID, :PI_CLIENTIP, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params, 2);
  res.json(result);
};

// Coil 위치 변경
var coilProcLocMoveF = async function (req, res) {
  query = 'CALL CPS_PK_PDA_JSON.PROC_LOC_MOVE(:PI_JOB, :PLANT_CD, :PI_BAR_ID, :PI_LOC, :PI_USER_ID, :PI_CLIENTIP, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params, 2);
  res.json(result);
};

var coilGetShipDtl = async function (req, res) {
  query = 'CALL CPS_PK_PDA_JSON.GET_SHIP_DETAIL(:SHIP_INV_NO, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params, 2);
  res.json(result);
};

var coilProShipScan = async function (req, res) {
  query = 'CALL CPS_PK_PDA_JSON.PROC_SHIP_SCAN(:PI_SHIPINVNO, :PI_PROCCOILNO, :PI_USERID, :PI_CLIENTIP, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params, 2);
  res.json(result);
};

var coilProScanExam = async function (req, res) {
  query = 'CALL CPS_PK_PDA_JSON.PROC_SCAN_EXAM(:PI_JOB, :PI_PLANT, :PI_BARID, :PI_LOC, :PI_USERID, :PI_CLIENTIP, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params, 2);
  res.json(result);
};

// ------ EDI 재고실사 추가
var procStockExamPda = async function (req, res) {
  query = 'CALL EDI_PG_PDA_SCAN_JSON.PROC_STOCK_EXAM_PDA(:PI_COMP_CD, :PI_PLANT_CD, :PI_PART_NO, :PI_LANG, :CURSOR1)';
  params = stringUtils.setParams(req.body);
  var database_call = req.app.get('database_call');
  var result = await database_call(query, params)
  res.json(result)
}

module.exports.main = main;
module.exports.login = login;
module.exports.getMenu = getMenu;
module.exports.getComp = getComp;
module.exports.getPlant = getPlant;
module.exports.frmLogin = frmLogin;
module.exports.ucScanWh = ucScanWh;
module.exports.saveProd = saveProd;
module.exports.scanListWh = scanListWh;
module.exports.dlvyOrd = dlvyOrd;
module.exports.getLdOrdDt = getLdOrdDt;
module.exports.procLdScan = procLdScan;
module.exports.procLdScDelAll = procLdScDelAll;
module.exports.procLdScDel = procLdScDel;
module.exports.getMvLdScSum = getMvLdScSum;
module.exports.procMvLdScan = procMvLdScan;
module.exports.procMvLdScDel = procMvLdScDel;
module.exports.procMvLdScDelAll = procMvLdScDelAll;
module.exports.scanListEdiIn = scanListEdiIn;
module.exports.scanListEdiExam = scanListEdiExam;
module.exports.sendTrans = sendTrans;
module.exports.sendPutMtrl = sendPutMtrl;
module.exports.sendPutMtrlCncl = sendPutMtrlCncl;
module.exports.getStockListBar = getStockListBar;
module.exports.procIbgoScan = procIbgoScan;
module.exports.rtnList = rtnList;
module.exports.procRtnTag = procRtnTag;
module.exports.gmsUserInfo = gmsUserInfo;
module.exports.gmsEquipInfo = gmsEquipInfo;
module.exports.gmsGetSuddenList = gmsGetSuddenList;
module.exports.getWcListProd = getWcListProd;
module.exports.savePaintInput = savePaintInput;
module.exports.matDeploy = matDeploy
module.exports.procLdSampleScan = procLdSampleScan;
module.exports.getLdSampleList = getLdSampleList;
module.exports.procLdSampleScDelete = procLdSampleScDelete;
module.exports.procLdSampleScDeleteAll = procLdSampleScDeleteAll;
module.exports.gmsCboWoSymptom = gmsCboWoSymptom;
module.exports.gmsDelWorkOrder = gmsDelWorkOrder;
module.exports.gmsDelWorkOrderDel = gmsDelWorkOrderDel;
module.exports.gmspEquipInfo = gmspEquipInfo;
module.exports.gmsGetList = gmsGetList;
module.exports.getPartSeq = getPartSeq;
module.exports.getStockListGms = getStockListGms;
module.exports.getNeedHdrList = getNeedHdrList;
module.exports.getWhListGms = getWhListGms;
module.exports.getPtHistTypList = getPtHistTypList;
module.exports.getStockGms = getStockGms;
module.exports.saveReceiveGms = saveReceiveGms;
module.exports.getExamListGms = getExamListGms;
module.exports.getReleaseTypList = getReleaseTypList;
module.exports.getPartTypList = getPartTypList;
module.exports.getPartSeqListGms = getPartSeqListGms;
module.exports.gmsSaveRelease = gmsSaveRelease;
module.exports.gmsGetExamDtlList = gmsGetExamDtlList;
module.exports.gmsGetExamStockList = gmsGetExamStockList;
module.exports.gmsSaveConduct = gmsSaveConduct;
module.exports.gmsGetChkList = gmsGetChkList;
module.exports.getNewHdrNo = getNewHdrNo;
module.exports.gmsSaveChk = gmsSaveChk;
module.exports.skdSendDlvyTag = skdSendDlvyTag;
module.exports.skdSendStag = skdSendStag;
module.exports.skdSendLtag = skdSendLtag;
module.exports.coilProcScanF = coilProcScanF;
module.exports.coilProcLocMoveF = coilProcLocMoveF;
module.exports.coilGetShipDtl = coilGetShipDtl;
module.exports.coilProShipScan = coilProShipScan;
module.exports.coilProScanExam = coilProScanExam;
module.exports.procStockExamPda = procStockExamPda;


function doRelease(connection) {
  connection.close(
    function (err) {
      if (err) { console.error(err.message); }
    });
};

