window.webtrendsAsyncInit=function(){ 
	var dcs=new Webtrends.dcs().init({ 
		dcsid:"dcsoubt9sdjgi982wkuvknaio_9g6e",
		domain:"xwfx.zj.chinamobile.com", 
		timezone:8, 
		i18n:true, 
		fpc:"WT_FPC",
		metanames: "",
		paidsearchparams: "gclid,ad_id",
		adimpressions:true,
		adsparam:"WT.ac",
		dcsdelay: 500,
        
	});

	dcs.WT.branch="app";
	var ua = navigator.userAgent.toLowerCase();
	var  userNumber = '',
		Phone_cid = '';
	//获取手机号
	var gLocation = window.location.href,
		gRe = /^(http:\/\/|https:\/\/)|([^\/]*\/)/g,
		gArr = gLocation.match(gRe),
		gUrl = gArr[0] + gArr[1] + gArr[2], // 服务请求地址（生产）
		gCf = getQueryString("cf"),
		gNonce = getQueryString("nonce"),
		gEncpn = getQueryString("encpn");
	userNumber = getQueryString("num");

	if (is_app()) {
		var versionid = ua.match(/sjyyt\/(\S*)/)[1]; //获取版本号
		var versionid_sys = parseInt(versionid.replace(/\./g, ''));
		if (versionid_sys >= 311) {
			if (is_iphone()) {
				var json = '{"function":"getDeviceInfoIMEI:","argument":"","callback":"getIMEICbk"}';
				document.location = "webkitpostnotification:" + json;
			}
		}
		if (is_android()) {
			Phone_cid = window.zjsjyyt.get("imei");
		}
	} else {}
	var meta2 = '<meta name="WT.cid" content='+Phone_cid+'>';
	$("head").prepend(meta2);

	if (userNumber) {
		var meta = '<meta name="WT.mobile" content='+userNumber+'>';
		$("head").prepend(meta);
	}else{
		if (gEncpn != '') {
			var url = gUrl + "Authentic.do?cf=" + gCf + "&nonce=" + gNonce + "&encpn=" + gEncpn;
			ajax(url, '').done(function (data, status) {
				if (data.result === "0") {
					userNumber = data.num;
					var meta = '<meta name="WT.mobile" content='+userNumber+'>';
					$("head").prepend(meta);
				} else {
					//因为部分页面不需要认证。所以报错时不做提示
				}
			});
		}
	}



	dcs.track();

};

function getIMEICbk(imei) {
	Phone_cid=imei;
}
function is_android() {
	if (ua.match(/android/i) == "android") {
		return true;
	} else {
		return false;
	}
}
function is_iphone() {
	if (ua.match(/iphone/i) == "iphone") {
		return true;
	} else {
		return false;
	}
}
function is_app() {
	if (ua.match(/sjyyt/i) == "sjyyt") {
		return true;
	} else {
		return false;
	}
}

(function(){
	var s=document.createElement("script"); s.async=true; s.src="../../js/webtrends/webtrends.min.js";
	var s2=document.getElementsByTagName("script")[0]; s2.parentNode.insertBefore(s,s2);
}());
