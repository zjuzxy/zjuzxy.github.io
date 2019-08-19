var gLocation = window.location.href;
gRe = /^(http:\/\/|https:\/\/)|([^\/]*\/)/g,
gArr = gLocation.match(gRe),
gUrl = gArr[0]+gArr[1]+gArr[2],
gCf = getQueryString("cf"),
gNonce = getQueryString("nonce"),
gEncpn = getQueryString("encpn"),
gSession = getQueryString("session"),
ul_scid = getQueryString("ul_scid"),
ch = getQueryString("ch"),
gTelNo = getQueryString("telNo"),
gDevType = getQueryString("devType"),
gProvinceCode = getQueryString("provinceCode"),
gUID = getQueryString("UID"),
gCityCode = getQueryString("cityCode"),
gClientId = getQueryString("clientId"),
gClientVer = getQueryString("clientVer"),
gScnType = getQueryString("scnType"),
gNum = "",
versionid = "",
channelid = "",
ua = navigator.userAgent.toLowerCase(),
gParams = "cf=" + gCf + "&nonce=" + gNonce + "&encpn=" + gEncpn + "&session=" + gSession + "&ul_scid=" + ul_scid + "&ch=" + ch;

if(is_android()){
	channelid = "1";
}
if(is_iphone()){
	channelid = "2";
}
if(is_app()){
	versionid = ua.match(/sjyyt\/(\S*)/)[1];
}
//内部跳转参数列表
var urlInfo = "";//url参数
var gotoUrl = "";//h5跳转地址
var native_args = "";//安卓包的参数
var storyboardname = "";//ios故事版  >=3.1.0 废弃storyboardname
var isnative = "";//是否native 1是 2是h5  int
var mytitle = "";//标题
var islogin = "";//是否需要登录0不需要 1需要 int
var isgesture = "";//是否需要手势密码，0不需要 1需要 int
var viewname = "";//包名（ios/安卓）
var androidNative = "";//安卓包名

function jt_jianquan(sucCbk){
	var url = gUrl + "GroupUserAuth.do?telNo=" + gTelNo+"&ul_scid="+ul_scid+"&ch="+ch+"&devType="+gDevType+"&provinceCode="+gProvinceCode+"&UID="+gUID+"&cityCode="+gCityCode+"&clientId="+gClientId+"&clientVer="+gClientVer+"&scnType="+gScnType;
	ajax(url, "")
	.done(function(data, status){
		if (data.result == 0){
			sucCbk(data);
		}else{
			openWindow1(data.msg);
		}
	});
}
function jianquan(sucCbk){
	var url = gUrl + "Authentic.do?cf=" + gCf + "&nonce=" + gNonce + "&encpn=" + gEncpn;
	ajax(url, "")
	.done(function(data, status) {
		// data={"result":"0","num":"13758923494","marketid":"","mode":"CFCD208495D565EF66E7DFF9F98764DA"}
		if (data.result == 0) {
			sucCbk(data);
		} else{
			openWindow1(data.msg);
		}
	});
}
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return r[2]; return "";
}
function ajax(url, params) {
	// alert(url)
	return $.ajax({
	  dataType: "json",
	  url: url,
	  data: params,
	  cache: false,
	  type: "POST",
	  error: ajaxError
	});
}
function ajax_timeOut(url, params) {
	return $.ajax({
	  dataType: "json",
	  timeout : 20000, //超时时间设置，单位毫秒
	  url: url,
	  data: params,
	  cache: false,
	  type: "POST",
	  error: ajaxError
	});
}
function ajaxError(XMLHttpRequest, textStatus, errorThrown) {
	console.log(errorThrown)
	$("#richui-loading").hide();
	$('#loading').hide();
	$('#loading_tj').hide();
    var message = "";
    switch (errorThrown) {
        case 'Request Time-out':
            message = "请求超时.";
            break;
        case 'Not Found':
            message = "请求失败！";
            break;
        case 'timeout':
            message = "请求超时！";
            break;
        default:
        // alert(errorThrown)
        	message = "网络连接失败！";
	        break;
    }
	openWindow1(message);
	return false;
}
function is_app(){
	if(ua.match(/sjyyt/i) == "sjyyt"){
		return true;
	}else{
		return false;
	}
}
function is_android(){
	if(ua.match(/android/i)=="android") {
		return true;
	}else{
		return false;
	}
}
function is_iphone(){
	if(ua.match(/iphone/i)=="iphone") {
		return true;
	}else{
		return false;
	}
}
function is_weixin(){
	if(ua.match(/MicroMessenger/i) == 'micromessenger'){
		return true;
	}else{
		return false;
	}
}