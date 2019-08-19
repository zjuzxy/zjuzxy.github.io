// var script = document.createElement("script");
// script.type = "text/javascript";
// script.src = "../../js/common.js";
// document.head.appendChild(script);
var script = document.createElement("script");
script.type = "text/javascript";
// script.src = "../../js/jquery.js";
document.head.appendChild(script);
var script = document.createElement("script");
script.type = "text/javascript";
script.src = "../../js/webtrends_v2/webtrends.load.js";
document.head.appendChild(script);
var ua = navigator.userAgent.toLowerCase();
var  userNumber = '',
     Phone_cid = '';
setTimeout(function () {
    var gLocation = window.location.href,
        gRe = /^(http:\/\/|https:\/\/)|([^\/]*\/)/g,
        gArr = gLocation.match(gRe),
        gUrl = gArr[0] + gArr[1] + gArr[2], // 服务请求地址（生产）  
        gCf = getQueryString("cf"),
        gNonce = getQueryString("nonce"),
        gEncpn = getQueryString("encpn");
        userNumber = getQueryString("num");
    if (userNumber) {
     // Webtrends_Fun(Phone_cid,userNumber)
     var meta = '<meta name="WT.mobile" content='+userNumber+'>';
        $("head").prepend(meta);

    }else{
        if (gEncpn != '') {
            var url = gUrl + "Authentic.do?cf=" + gCf + "&nonce=" + gNonce + "&encpn=" + gEncpn;
            ajax(url, '').done(function (data, status) {
                if (data.result === "0") {
                    userNumber = data.num;
                   // Webtrends_Fun(Phone_cid,userNumber)
                   var meta = '<meta name="WT.mobile" content='+userNumber+'>';
        $("head").prepend(meta);
                } else {
                    //因为部分页面不需要认证。所以报错时不做提示
                }
            });
        }
    }
}, 100);
function Webtrends_Fun(Phone_cid,userNumber) {
    setTimeout( function(){if (window.Webtrends) Webtrends.multiTrack("dcsuri", "mo.gif", "WT.cid", Phone_cid, "WT.mobile", userNumber);}, 600)
}
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

