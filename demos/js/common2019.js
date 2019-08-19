var gLocation = window.location.href;
gRe = /^(http:\/\/|https:\/\/)|([^\/]*\/)/g,
    gArr = gLocation.match(gRe),
    gDomain = window.location.host;//域名
    gUrl = gArr[0] + gArr[1] + gArr[2],
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

if (is_android()) {
    channelid = "1";
}
if (is_iphone()) {
    channelid = "2";
}
if (is_app()) {
    versionid = ua.match(/sjyyt\/(\S*)/)[1];
}


//内部跳转参数列表
var urlInfo = ""; //url参数
var gotoUrl = ""; //h5跳转地址
var native_args = ""; //安卓包的参数
var storyboardname = ""; //ios故事版  >=3.1.0 废弃storyboardname
var isnative = ""; //是否native 1是 2是h5  int
var mytitle = ""; //标题
var islogin = ""; //是否需要登录0不需要 1需要 int
var isgesture = ""; //是否需要手势密码，0不需要 1需要 int
var viewname = ""; //包名（ios/安卓）
var androidNative = ""; //安卓包名
//集团skd的uid参数
var leadeonUid = '';

function authentication(type, sucCbkData) { //type 1：走集团sdk认证或手厅认证 2：走集团手机号加密认证或手厅认证 其他：只走手厅认证
    if (type == 1) {
        if (ua.match(/leadeon/i) == "leadeon") {
            //在集团手机营业厅的webview内
            jt_jianquan2(sucCbkData)
        } else {
            //不在集团手机营业厅的webview内
            jianquan(sucCbkData)
        }
    } else if (type == 2) {
        if (ch == "54" && ul_scid == "b7d9c5" && gSession == "" && gNonce == "") {
            jt_jianquan(sucCbkData)
        } else {
            jianquan(sucCbkData)
        }
    } else {
        jianquan(sucCbkData)
    }

}
function jt_jianquan(sucCbk) {
    var url = gUrl + "GroupUserAuth.do?telNo=" + gTelNo + "&ul_scid=" + ul_scid + "&ch=" + ch + "&devType=" + gDevType + "&provinceCode=" + gProvinceCode + "&UID=" + gUID + "&cityCode=" + gCityCode + "&clientId=" + gClientId + "&clientVer=" + gClientVer + "&scnType=" + gScnType;
    ajax(url, "")
        .done(function (data, status) {
            if (data.result == 0) {
                sucCbk(data);
            } else {
                openWindow1(data.msg);
            }
        });
}

function jt_jianquan2(sucCbk) {
    var leadeonData = {
        /**
         * 用于记录登录状态
         */
        status: 0,
        /**
         * 用于存储用户信息
         */
        jsons: {
            "CID": "123",
            "EN": "1",
            "TOKEN": "",
            "SN": "1",
            "VERSION": "123",
            "ST": "33",
            "SV": "555",
            "SP": "2222",
            "USERPHONENUM": "18717359790",
            "PROVINCE": "100",
            "CITY": "100"
        },

        // 获取uid
        getUid: function (token) {
            return token.match(/UID=\w+/g)[0];
        }
    };
    $(function () {

        //当客户端给H5页面注入js完毕以后会主动去调用leadeon.init()，所以需要给init赋值
        leadeon.init = function () {
            //把页面需要一进来就执行的js放入这里，让客户端主动去调用他
            //获取用户信息
            leadeon.getUserInfo({
                debug: false,
                success: function (res1) {
                        //吧用户信息存起来
                        leadeonData.jsons = res1;
                            //判断是否有token
                        if (!!leadeonData.jsons.token) {
                                //Uid有效性校验 V4.7.0新增
                            leadeon.checkUID({
                                debug: false,
                                // domain: "http://111.20.119.234:9080",     //域名
                                domain: gArr[0]+gDomain,
                                chanelId: "20571", //渠道号
                                success: function (res) {
                                        var uid = res.uid; //rsa加密后的uid
                                        leadeonUid = encodeURIComponent(res.uid);
                                            //4.7.20	用户Assertion查询(UID)
                                          var url = gUrl + "GroupLevelUid.do?uid=" + leadeonUid;
									        ajax(url, "")
									        .done(function(data, status){
									        	if (data.result == 0){
									        		sucCbk(data);
									        	}else{
									        		openWindow1(data.msg);
									        	}
									        });
                                    },
                                    error: function (res) {
                                        console.log(1)
                                    }
                            });
                        } else {
                            //拉起登录
                            leadeon.showLogin();
                        }
                    },
                    error: function (res1) {}
            });
        }
    });


}

function jianquan(sucCbk) {
    var url = gUrl + "Authentic.do?cf=" + gCf + "&nonce=" + gNonce + "&encpn=" + gEncpn;
    ajax(url, "")
        .done(function (data, status) {
            if (data.result == 0) {
                sucCbk(data);
            } else {
                openWindow1(data.msg);
            }
        });
}



function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2];
    return "";
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
        timeout: 20000, //超时时间设置，单位毫秒
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
        message = "系统异常，请稍后再试。错误码：" + XMLHttpRequest.status;
        break;
    }
    openWindow1(message);
    return false;
}

function is_app() {
    if (ua.match(/sjyyt/i) == "sjyyt") {
        return true;
    } else {
        return false;
    }
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

function is_weixin() {
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

function is_blocApp() {//集团app
    if (ua.match(/leadeon/i) == "leadeon") {
        return true;
    } else {
        return false;
    }
}