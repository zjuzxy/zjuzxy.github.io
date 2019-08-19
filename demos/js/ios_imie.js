
var ua = navigator.userAgent.toLowerCase();
var versionid = '';//手厅版本号
var imei = '';//安卓手机imei

if(is_app()){
	var versionid = ua.match(/sjyyt\/(\S*)/)[1];//获取版本号
	var versionid_sys = parseInt(versionid.replace(/\./g, ''));
	if(versionid_sys >= 311){
		if(is_iphone()){

    var json ='{"function":"getDeviceInfoIMEI:","argument":"","callback":"getIMEICbk"}';
    document.location ="webkitpostnotification:"+json;

}
	}
}else{

}

function is_iphone(){
    if(ua.match(/iphone/i)=="iphone") {
        return true;
     } else {
        return false;
    }
}
function is_app() {
  if (ua.match(/sjyyt/i) == "sjyyt"){
    return true;
  } else {
    return false;
  }
}
function getIMEICbk(imei){

	cidmeta.content = imei;
}
