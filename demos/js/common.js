// 获取URL中指定字符串的值
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return r[2]; return "";
};
// ajax_test
function ajax_test(url, params) {
	return $.ajax({
		type: "get",//jquey是不支持post方式跨域的
		async: false,
		url: url,//跨域请求的URL
		dataType: "jsonp",//传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
		jsonp: "jsoncallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
		jsonpCallback: "jsoncallback",//成功获取跨域服务器上的json数据后,会动态执行这个callback函数
	  	error: ajaxError
		// success: function(json) {
		// 	alert(json.result);
		// }
	});
};
// ajax
function ajax(url, params) {
	return $.ajax({
	  dataType: "json",
	  url: url,
	  data: params,
	  cache: false,
	  type: "POST",
	  error: ajaxError
	});
};
// ajax_timeOut
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
};

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
        	//console.log(errorThrown);
        	message = "网络连接失败！";
	        break;
    }
 //    $("#tan_window1 .content").html(message);
 //    easyDialog.open({
	// 	container : 'tan_window1'
	// });

	$("#richui-dialog1 .richui-dialog_content").html(message);
    easyDialog.open({
        container : 'richui-dialog1'
    });
	return false;
};