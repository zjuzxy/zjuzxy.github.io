 var script = document.createElement("script");
 script.type = "text/javascript";
 script.src = "../../js/jquery.js";
 document.head.appendChild(script);
  var script = document.createElement("script");
 script.type = "text/javascript";
 script.src = "../../js/common.js";
 document.head.appendChild(script);

  setTimeout(function () { 
	    var ua = navigator.userAgent.toLowerCase();
		var gLocation = window.location.href,
		    gRe = /^(http:\/\/|https:\/\/)|([^\/]*\/)/g,
		    gArr = gLocation.match(gRe),
		    gUrl = gArr[0] + gArr[1] + gArr[2], // 服务请求地址（生产）  
		    gCf = getQueryString("cf"),
		    gNonce = getQueryString("nonce"),
		    gEncpn = getQueryString("encpn"),
		    userNumber = getQueryString("num");

		if(userNumber){
			nummeta.content = userNumber; 
		}else{
			if (gEncpn != '') {
			    var url = gUrl + "Authentic.do?cf=" + gCf + "&nonce=" + gNonce + "&encpn=" + gEncpn;
			    ajax(url, '').done(function (data, status) {
			        if (data.result === "0") {
			            userNumber = data.num;
			            nummeta.content = userNumber; // 20170619改为通过认证取手机号插码
			        } else {
			            //因为部分页面不需要认证。所以报错时不做提示
			        }
			    });
			}
		}
		function is_android() {
		    if (ua.match(/android/i) == "android") {
		        return true;
		    } else {
		        return false;
		    }
		}
		if (is_android()) {
		    cidmeta.content = window.zjsjyyt.get("imei")
		}
    }, 100);
