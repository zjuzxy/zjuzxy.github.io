
//分享的内容参数列表:
var imgUrl_sina = '';//新浪微博的配图
var content_sina = '';//新浪微博分享的文案
var title_weixin = '';//微信和朋友圈的标题
var imgUrl_weixin = '';//微信和朋友圈的配图 最大32k
var content_weixin = '';//微信和朋友圈的内容
var link_weixin = '';//微信和朋友圈的链接
var content_message = '';//短信的内容

var ua = navigator.userAgent.toLowerCase();
var channel = "";
var activityName = "";
var gLocation = window.location.href,
gRe = /^(http:\/\/|https:\/\/)|([^\/]*\/)/g,
gArr = gLocation.match(gRe),
gUrl = gArr[0] + gArr[1] + gArr[2];
var link = $('<link>')
	link.attr('rel','stylesheet');
	link.attr('type','text/css');
	link.attr('href','../../css/share.css');
	$('head').append(link);

function share(){
	$("body").append(
		"<div id='zhezhao'></div>"
		+ "<div id='shareBox'>"
		+ "<h1>分享到</h1>"
		+ "<div class='shareIcons'><span class='j-wx'><i></i><b>微信好友</b></span><span class='j-wxq'><i></i><b>微信朋友圈</b></span><span class='j-wb'><i></i><b>新浪微博</b></span><span class='j-xx'><i></i><b>短信好友</b></span></div>"
		+"<div class='warmhint'>温馨提示：如分享遇到问题，请将app升级到最新版本</div>"
		+ "<div class='closeShare j-closeShare'>取消分享</div>"
	);
	$(".j-closeShare").click(function() {
		$("#zhezhao,#shareBox").remove();
	});
	//不传号码 只传内容
	$('#shareBox .j-xx').click(function(){ 
		$("#zhezhao,#shareBox").remove();
        if(is_android()){ // message1 为安卓系统自带的发短信功能 message2 为对话框形式
            window.stub.jsMethod('com.zjmobile.app.message1','4',content_message);
        }		    
		if(is_iphone()){ 
			message_ios_share();
		}
	})	
	$('#shareBox .j-wx').click(function(){ 
		$("#zhezhao,#shareBox").remove();		
        if(is_android()){ 
            window.stub.jsMethod('com.zjmobile.app.weixin','4',title_weixin+'&&&'+imgUrl_weixin+'&&&'+content_weixin+'&&&'+link_weixin);
        }
		if(is_iphone()){ 
			weixin_ios_share();
		}
	})
	$('#shareBox .j-wxq').click(function(){			
		$("#zhezhao,#shareBox").remove();
        if(is_android()){ 
            window.stub.jsMethod('com.zjmobile.app.friends','4',content_weixin+'&&&'+imgUrl_weixin+'&&&'+content_weixin+'&&&'+link_weixin);
        }
		if(is_iphone()){ 
			friends_ios_share();
		}
	})
	$('#shareBox .j-wb').click(function(){ 
		$("#zhezhao,#shareBox").remove();			
        if(is_android()){ 
            window.stub.jsMethod('com.zjmobile.app.sina','4',content_sina+'&&&'+imgUrl_sina);
        }
		if(is_iphone()){ 
			weibo_ios_share();
		}
	})
}
//短信分享(ios)
function message_ios_share(){ 
    var json ='{"function":"displaySMSComposerSheetWithPhone:","argument":"'+content_message+'","callback":""}';       
    webPostnotification(json);	
}
//微信好友的分享(ios)
function weixin_ios_share(){ 
    var json ='{"function":"showWXFriendsView:","argument":"'+title_weixin+'&&&'+imgUrl_weixin+'&&&'+content_weixin+'&&&'+link_weixin+'","callback":""}';    
    webPostnotification(json);	
}
//微信朋友圈的分享(ios)
function friends_ios_share(){ 
    var json ='{"function":"showWXFriendCircleView:","argument":"'+content_weixin+'&&&'+imgUrl_weixin+'&&&'+content_weixin+'&&&'+link_weixin+'","callback":""}';     
    webPostnotification(json);	
}
//新浪微博的分享(ios)
function weibo_ios_share(){ 
    var json ='{"function":"xinlangWeiboShareButtonPressed:","argument":"'+content_sina+'&'+imgUrl_sina+'","callback":""}';          
    webPostnotification(json);	
}
function webPostnotification(func){
    document.location ="webkitpostnotification:"+func;   
}
function is_android(){
    if(ua.match(/android/i)=="android") {
        return true;
     } else {
        return false;
    }
}
function is_iphone(){
    if(ua.match(/iphone/i)=="iphone") {
        return true;
     } else {
        return false;
    }
}
