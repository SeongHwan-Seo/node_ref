/*
 * login
 * @date 2019-05-07
 * @author LCY
 */
var login = async function(req, res) {

  if( typeof( req.session.user ) != 'undefined' ){
    res.redirect('/main');
  }else{
    res.render('login.ejs', {param:req ,  message:"none"});
  };
  
};


var loginChk = async function(req, res) {

  var p_user_id = (req.body.user_id || req.query.user_id);
  var p_user_pwd = (req.body.user_pwd || req.query.user_pwd);

  var params = { 
    USER_ID: p_user_id ,
    USER_PWD:p_user_pwd
  };

  var database = req.app.get('database');
  var result = await database( 'loginMapper' , 'getLogin' , params );
	console.log(database);
	console.log(result);

  var login_chk = false;
  var return_Params = {}
  var msg = null;

  if (result.length > 0){
    if (result[0].RESULT == "OK") {
      login_chk = true;
      return_Params.user_id = p_user_id;
    }
	else if(result[0].RESULT="undefined") {
		msg = 'db 접속 오류';
	}else{
        msg = '로그인이 실패하였습니다.';
    }
  } else {
    msg = '아이디가 존재하지 않습니다.';
  }

  
  if( login_chk ){
    req.session.user = return_Params;
    
    res.redirect('/main');
  }else{
    res.render('login.ejs', {param:req ,  message:msg});
  }

};

var loginOut = async function(req, res) {

  req.session.destroy(function(){ 
    res.redirect('/');
  });
  
  
};


module.exports.login = login;
module.exports.loginChk = loginChk;
module.exports.loginOut = loginOut;



