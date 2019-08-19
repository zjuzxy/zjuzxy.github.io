 var script = document.createElement("script");
 script.type = "text/javascript";
 script.src = "../../js/common.js";
 document.head.appendChild(script);
 var script = document.createElement("script");
 script.type = "text/javascript";
 script.src = "../../js/richui.js";
 document.head.appendChild(script);
 var script = document.createElement("script");
 script.type = "text/javascript";
 script.src = "../../js/easydialog.min.js";
 document.head.appendChild(script);
 //常规参数
 var ua = navigator.userAgent.toLowerCase();
var gLocation = window.location.href,
    gRe = /^(http:\/\/|https:\/\/)|([^\/]*\/)/g,
    gArr = gLocation.match(gRe),
    gUrl = gArr[0] + gArr[1] + gArr[2], // 服务请求地址（生产）
    gCf = getQueryString("cf"),
    gNonce = getQueryString("nonce"),
    gEncpn = getQueryString("encpn"),
    gSession = getQueryString("session"),
    gActiveId =getQueryString("activeId"),
    gIfSuccess = getQueryString("ifSuccess"),
    gNum=getQueryString("num"),
    ul_scid = getQueryString("ul_scid");
 var wordShare_text = ""; //口令内容
 var versionId = '';
     andVersion = '352', //口令分享要求安卓的客户端版本
     iosVersion = '352', //口令分享要求ios的客户端版本
     // versionId = ua.match(/sjyyt\/(\S*)/)[1],
     // versionIdInt = parseInt(versionId.replace(/\./g, ''));
     versionIdInt = '352';
 function word() {
         gCf = getQueryString("cf"),
             gNonce = getQueryString("nonce"),
             gEncpn = getQueryString("encpn"),
             gDate = getQueryString("date"),
             gSession = getQueryString("session"),
             ul_scid = getQueryString("ul_scid"),
             channelid = "",
             versionid = ''; //手厅版本号
         if (is_android()) {
             channelid = "1";
         };
         if (is_iphone()) {
             channelid = "2";
         };
         if (is_app()) {
             versionid = ua.match(/sjyyt\/(\S*)/)[1]; //获取版本号
         } else {
             versionid = "";
         }

         var url = gUrl + "Authentic.do?cf=" + gCf + "&nonce=" + gNonce + "&encpn=" + gEncpn;
         ajax(url, '').done(function (data, status) {
             if (data.result === "0") {
                 gNum = data.num;
             } else {
                 $("#shareBox").remove();
                 $("#zhezhao").remove();
                 openWindow1(data.msg);
             }
         });
     }
     //分享的内容参数列表:
 var imgUrl_sina = ''; //新浪微博的配图
 var content_sina = ''; //新浪微博分享的文案
 var title_weixin = ''; //微信和朋友圈的标题
 var imgUrl_weixin = ''; //微信和朋友圈的配图 最大32k
 var content_weixin = ''; //微信和朋友圈的内容
 var link_weixin = ''; //微信和朋友圈的链接
 var content_message = ''; //短信的内容
 var link_weixin_wp = '';
 var ua = navigator.userAgent.toLowerCase();
 var updateFlag = true;
 var channel = "";
 var link = $('<link>')
 link.attr('rel', 'stylesheet');
 link.attr('type', 'text/css');
 link.attr('href', '../../css/WordShare.css');
 $('head').append(link);

 function creat_password() {
     console.log(gUrl)
     console.log(activityid)
     var url = gUrl + "OpGenerateCommand.do?num=" + gNum + "&session=" + gSession + "&channelid=" + channelid + "&versionid=" + versionid + "&action=1" + "&activityid=" +  word_share_activityid; //activityid为活动id
     ajax(url, '').done(function (data, status) {
         if (data.result === "0") {
             wordShare_text = '【' + data.name + '】复制此条信息，并打开浙江移动手机营业厅进行办理' + '￥' + data.command + '￥ 短链地址：' + data.shortlink;
             $("#shareBox").hide();
             $(".share_tanwindow .text span").html(wordShare_text);
             $(".share_tanwindow").show();
         } else {
             $("#shareBox").remove();
             $("#zhezhao").remove();
             openWindow1(data.msg);
         }
     });
 }

 function share() {

         if (is_android()) {
             if (typeof window.zjsjyyt == "object" && window.zjsjyyt != null) {
                 versionid_and = window.zjsjyyt.get("versionid"); //获取版本号 1.7.x string
                 if (typeof versionid_and == 'string' && versionid_and != null) {} else {
                     $(".j-upDateBox").show();
                     // 取消升级
                     $(".appUpdate").click(function () {
                         applink();
                     });
                     updateFlag = false;
                 }
             }
         }
         if (is_iphone()) {
             versionid_ios();
         }
         if (updateFlag) {
             //$(".j-closeShare").show();
             $("body").append("<div id='zhezhao'></div>" + "<div id='shareBox'>" + "<div class='yj_share' style='display:none'>" + "<div style='color:#fff44d;font-size:0.85rem;margin-top:0.5rem'>分享有礼：</div>" + "<div class='content'>分享给你的朋友将会得到丰厚大礼。还在等什么</div>" + "<div class='detail'>详情</div>" + "</div>" + "<h1>分享到</h1>" + "<div class='shareIcons'><span class='j-wx'><i></i><b>微信好友</b></span><span class='j-wxq'><i></i><b>微信朋友圈</b></span><span class='j-wb'><i></i><b>新浪微博</b></span><span class='j-xx'><i></i><b>短信好友</b></span></div>" + "<div class='word_shareIcons' style='display:none'><span class='j-wx'><i></i><b>微信好友</b></span><span class='j-wxq'><i></i><b>微信朋友圈</b></span><span class='j-wb'><i></i><b>新浪微博</b></span><span class='j-xx'><i></i><b>短信好友</b></span></div>" + "<div class='warmhint'>温馨提示：如分享遇到问题，请将app升级到最新版本</div>" + "<div class='share_check' style='display:none'><ul>" + "<li class='no_check direct_share_check' style='background-position:25% center;'>直接分享</li>" + "<li class='no_check word_share_check' style='background-position:15% center;'>使用口令分享</li>" + "</ul></div>" + "<div class='closeShare j-closeShare'>取消分享</div>" + "</div>" + "<div id='share_tanwindow' class='share_tanwindow' style='display:none'>" + "<div class='title'>" + '您的口令已经生成' + "</div>" + "<div class='text'><img class='copy_suc' src='../../img/copy_suc.png' alt=''><span></span>" + "</div>" + "<div class='bt'>" + "<a class='cancel' href='javascript:void(0)'>取消</a>" + "<a class='paste' href='javascript:void(0)'>去粘贴</a>" + "</div>" + "</div>" + "<div class='richui-dialog' id='richui-dialog1' style='display:none;'>" + "<div class='richui-dialog_title'>提示</div>" + "<div class='richui-dialog_content'>正在加载中...</div>" + "<div class='richui-dialog_btn'>" + "<a class='richui-dialog_sure' href='javascript:;' onclick='closeWindow();'>确定</a>" + "</div>" + "</div>");
             $(".j-closeShare").click(function () {
                 //$(".j-closeShare").hide();
                 $("#share_tanwindow").remove();
                 $("#shareBox").remove();
                 $("#zhezhao").remove();
                 //插码20170509
                 //     Webtrends.multiTrack({
                 //  args: {"WT.pn" : activityName+"fx","WT.en":"qx"},
                 //   delayTime: 100//delay returning to the caller by 100 milliseconds
                 // });
             });
             //分享朋友圈（wp）wp的图片需手动转换成base64格式
             var friends_wp_content = {
                     title: title_weixin, //需要赋值为分享的标题
                     description: content_weixin, //需要赋值为分享的内容
                     image: link_weixin_wp,
                     url: link_weixin
                 }
                 // app端提供的分享方案
             var operStr_friends = JSON.stringify(friends_wp_content);
             var jsonObj_friends = {
                 operType: 'shareFriendCircleByWeb',
                 operStr: operStr_friends,
                 callback: ''
             };
             //分享到微信(wp)
             var operStr_weixin = JSON.stringify(friends_wp_content);
             var jsonObj_weixin = {
                 operType: 'shareWeChat',
                 operStr: operStr_weixin,
                 callback: ''
             };
             //调用短信分享（wp）
             var jsonObj_message_content = {
                 phone: "", //手机号为空
                 description: content_message, //需要赋值为分享的内容
             }
             var operStr_message = JSON.stringify(jsonObj_message_content);
             var jsonObj_message = {
                 operType: 'SMSShare',
                 operStr: operStr_message,
                 callback: ''
             };
             //获取版本号(wp)
             var jsonObj_version = {
                 operType: 'getVersion',
                 operStr: '',
                 callback: 'getVersionCallback'
             };
             if (is_wp()) {
                 window.external.notify(JSON.stringify(jsonObj_version));
             }
             //不传号码 只传内容
             $('#shareBox .shareIcons .j-xx').click(function () {
                 if (share_type == '3') {//如果是有奖分享则领取奖品
                     var url = gUrl+yj_share_ajaxUrl + "?shareMethod=wxq&num="+gNum+"&session="+gSession+"&transactionId="+yj_share_transactionId;
                     
                     console.log(url)
                     ajax(url, '').done(function (data, status) {
                         if (data.result == 0) {} else {}
                     });
                 }
                 if (is_android()) { // message1 为安卓系统自带的发短信功能 message2 为对话框形式
                     window.stub.jsMethod('com.zjmobile.app.message1', '4', content_message);
                 }
                 if (is_iphone()) {
                     message_ios_share();
                 }
                 if (is_wp()) {
                     window.external.notify(JSON.stringify(jsonObj_message));
                 }
                 // shareCount(channel, 'xx', activityName);
                 //插码20170509
                 Webtrends.multiTrack({
                     args: {
                         "WT.pn": activityName + "zjfx",
                         "WT.en": "xx"
                     },
                     delayTime: 100 //delay returning to the caller by 100 milliseconds
                 });
             })
             $('#shareBox .shareIcons .j-wx').click(function () {
                 if (share_type == '3') {
                     var url = gUrl+yj_share_ajaxUrl + "?shareMethod=wxq&num="+gNum+"&session="+gSession+"&transactionId="+yj_share_transactionId;
                     
                     ajax(url, '').done(function (data, status) {
                         if (data.result == 0) {} else {}
                     });
                 }
                 if (is_android()) {
                     window.stub.jsMethod('com.zjmobile.app.weixin', '4', title_weixin + '&&&' + imgUrl_weixin + '&&&' + content_weixin + '&&&' + link_weixin);
                 }
                 if (is_iphone()) {
                     weixin_ios_share();
                 }
                 if (is_wp()) {
                     window.external.notify(JSON.stringify(jsonObj_weixin));
                 }
                 // shareCount(channel, 'wxhy', activityName);
                 //插码20170509
                 Webtrends.multiTrack({
                     args: {
                         "WT.pn": activityName + "zjfx",
                         "WT.en": "wx"
                     },
                     delayTime: 100 //delay returning to the caller by 100 milliseconds
                 });
             })
             $('#shareBox .shareIcons .j-wxq').click(function () {
                 if (share_type == '3') {
                     var url = gUrl+yj_share_ajaxUrl + "?shareMethod=wxq&num="+gNum+"&session="+gSession+"&transactionId="+yj_share_transactionId;
                     ajax(url, '').done(function (data, status) {
                         if (data.result == 0) {} else {}
                     });
                 }
                 if (is_android()) {
                     window.stub.jsMethod('com.zjmobile.app.friends', '4', content_weixin + '&&&' + imgUrl_weixin + '&&&' + content_weixin + '&&&' + link_weixin);
                 }
                 if (is_iphone()) {
                     friends_ios_share();
                 }
                 if (is_wp()) {
                     window.external.notify(JSON.stringify(jsonObj_friends));
                 }
                 // shareCount(channel, 'wxpyq', activityName);
                 //插码20170509
                 Webtrends.multiTrack({
                     args: {
                         "WT.pn": activityName + "zjfx",
                         "WT.en": "wxq"
                     },
                     delayTime: 100 //delay returning to the caller by 100 milliseconds
                 });
             })
             $('#shareBox .shareIcons .j-wb').click(function () {
                     if (share_type == '3') {
                     var url = gUrl+yj_share_ajaxUrl + "?shareMethod=wxq&num="+gNum+"&session="+gSession+"&transactionId="+yj_share_transactionId;
                         
                         ajax(url, '').done(function (data, status) {
                             if (data.result == 0) {} else {}
                         });
                     }
                     if (is_android()) {
                         window.stub.jsMethod('com.zjmobile.app.sina', '4', content_sina + '&&&' + imgUrl_sina);
                     }
                     if (is_iphone()) {
                         weibo_ios_share();
                     }
                     if (is_wp()) {
                         window.external.notify(JSON.stringify(jsonObj_weibo));
                     }
                     // shareCount(channel, 'xlwb', activityName);
                     //插码20170509
                     Webtrends.multiTrack({
                         args: {
                             "WT.pn": activityName + "zjfx",
                             "WT.en": "wb"
                         },
                         delayTime: 100 //delay returning to the caller by 100 milliseconds
                     });
                 })
                 //口令分享
             if (share_type == "0") {
                 $(".direct_share_check").addClass("check");
                 $(".word_shareIcons").hide();
                 $(".shareIcons").show();
                 $(".share_check").show();
             } else if (share_type == "1") {
                 $(".word_share_check").addClass("check")
                 $(".shareIcons").hide();
                 $(".word_shareIcons").show();
                 $(".share_check").show();
             } else if (share_type == "2") {
                 $(".share_check").hide();
                 $(".word_shareIcons").show();
                 $(".shareIcons").hide();
             } else if (share_type == "3") {
                 $(".yj_share").show();
                 $(".share_check").hide();
                 $(".word_shareIcons").hide();
                 $(".shareIcons").show();
                 $(".yj_share .content").html(yj_share_content);
             } else {
                 $(".share_check").hide();
                 $(".word_shareIcons").hide();
                 $(".shareIcons").show();
             }
             $(".yj_share .detail").click(function () {
                 window.location = yj_share_goUrl + "?num=" + gNum + "&session=" + gSession + "&channelid=" + channelid + "&versionid=" + versionid+"&cf=" + gCf + "&nonce=" + gNonce + "&encpn=" + gEncpn;
             })
             $(".share_check li").click(function () {
                 $(this).addClass("check");
                 $(this).siblings().removeClass("check");
             })
             $(".direct_share_check").click(function () {
                 $(".word_shareIcons").hide();
                 $(".shareIcons").show();
                 //插码20170509
                 Webtrends.multiTrack({
                     args: {
                         "WT.pn": activityName + "fx",
                         "WT.en": "zjfx"
                     },
                     delayTime: 100 //delay returning to the caller by 100 milliseconds
                 });
             })
             $(".word_share_check").click(function () {
                 $(".word_shareIcons").show();
                 $(".shareIcons").hide();
                 //插码20170509
                 Webtrends.multiTrack({
                     args: {
                         "WT.pn": activityName + "fx",
                         "WT.en": "klfx"
                     },
                     delayTime: 100 //delay returning to the caller by 100 milliseconds
                 });
             })
             $(".word_shareIcons span").click(function () {
                 if (is_iphone() && versionIdInt >= iosVersion || is_android() && versionIdInt >= andVersion) {
                     creat_password()
                 } else {
                     openWindow1('很抱歉，当前版本不支持，请您升级至最新版本！');
                 }
             })
             $(".cancel").click(function () {
                 $("#share_tanwindow").hide();
                 $("#shareBox").show();
                 $(".paste").unbind();
                 //插码20170509
                 Webtrends.multiTrack({
                     args: {
                         "WT.pn": activityName + "klfx",
                         "WT.en": "qx"
                     },
                     delayTime: 100 //delay returning to the caller by 100 milliseconds
                 });
             })
             $('#shareBox .word_shareIcons .j-wx').click(function () {
                 if (is_iphone() && versionIdInt >= iosVersion || is_android() && versionIdInt >= andVersion) {
                     //此处使用端能力
                     word_share_wx();
                 }
                 //插码20170509
                 Webtrends.multiTrack({
                     args: {
                         "WT.pn": activityName + "klfx",
                         "WT.en": "wx"
                     },
                     delayTime: 100 //delay returning to the caller by 100 milliseconds
                 });
             })
             $('#shareBox .word_shareIcons .j-wxq').click(function () {
                 if (is_iphone() && versionIdInt >= iosVersion || is_android() && versionIdInt >= andVersion) {
                     //此处使用端能力                               
                     word_share_wxq();
                 }
                 //插码20170509
                 Webtrends.multiTrack({
                     args: {
                         "WT.pn": activityName + "klfx",
                         "WT.en": "wxq"
                     },
                     delayTime: 100 //delay returning to the caller by 100 milliseconds
                 });
             })
             $('#shareBox .word_shareIcons .j-wb').click(function () {
                 if (is_iphone() && versionIdInt >= iosVersion || is_android() && versionIdInt >= andVersion) {
                     //此处使用端能力                               
                     word_share_wb();
                 }
                 //插码20170509
                 Webtrends.multiTrack({
                     args: {
                         "WT.pn": activityName + "klfx",
                         "WT.en": "wb"
                     },
                     delayTime: 100 //delay returning to the caller by 100 milliseconds
                 });
             })
             $('#shareBox .word_shareIcons .j-xx').click(function () {
                 if (is_iphone() && versionIdInt >= iosVersion || is_android() && versionIdInt >= andVersion) {
                     //此处使用端能力                               
                     word_share_xx();
                 }
                 //插码20170509
                 Webtrends.multiTrack({
                     args: {
                         "WT.pn": activityName + "klfx",
                         "WT.en": "xx"
                     },
                     delayTime: 100 //delay returning to the caller by 100 milliseconds
                 });
             })

             function word_share_wx() {
                 $('.paste').click(function () {
                     $(".paste").unbind();
                     $("#share_tanwindow").hide();
                     $("#shareBox").show();
                     if (is_android()) { // 安卓复制至剪切板，并唤醒。第一个为渠道，第二个为口令
                         window.stub.jsCommandShare('com.zjmobile.commandshare.wechat', wordShare_text);
                     }
                     if (is_iphone()) { //ios唤醒及复制至剪切板
                         var json = '{"function":"commandSharetToWeiXinFridens:","argument":"' + wordShare_text + '","callback":""}';
                         webPostnotification(json);
                     }
                     //插码20170509
                     Webtrends.multiTrack({
                         args: {
                             "WT.pn": activityName + "klfx",
                             "WT.en": "qw"
                         },
                         delayTime: 100 //delay returning to the caller by 100 milliseconds
                     });
                 })
             }

             function word_share_wxq() {
                 $('.paste').click(function () {
                     $(".paste").unbind();
                     $("#share_tanwindow").hide();
                     $("#shareBox").show();
                     if (is_android()) { // 安卓复制至剪切板。第一个为渠道，第二个为内容
                         window.stub.jsCommandShare('com.zjmobile.commandshare.wechatmoment', wordShare_text);
                     }
                     if (is_iphone()) { //ios唤醒及复制至剪切板
                         var json = '{"function":"commandSharetToWeiXinFridenCircle:","argument":"' + wordShare_text + '","callback":""}';
                         webPostnotification(json);
                     }
                     //插码20170509
                     Webtrends.multiTrack({
                         args: {
                             "WT.pn": activityName + "klfx",
                             "WT.en": "qw"
                         },
                         delayTime: 100 //delay returning to the caller by 100 milliseconds
                     });
                 })
             }

             function word_share_wb() {
                 $('.paste').click(function () {
                     $(".paste").unbind();
                     $("#share_tanwindow").hide();
                     $("#shareBox").show();
                     if (is_android()) { // 安卓复制至剪切板。第一个为渠道，第二个为内容
                         window.stub.jsCommandShare('com.zjmobile.commandshare.weibo', wordShare_text);
                     }
                     if (is_iphone()) { //ios唤醒及复制至剪切板
                         var json = '{"function":"commandSharetToXinlangWeibo:","argument":"' + wordShare_text + '","callback":""}';
                         webPostnotification(json);
                     }
                     //插码20170509
                     Webtrends.multiTrack({
                         args: {
                             "WT.pn": activityName + "klfx",
                             "WT.en": "qw"
                         },
                         delayTime: 100 //delay returning to the caller by 100 milliseconds
                     });
                 })
             }

             function word_share_xx() {
                 $('.paste').click(function () {
                     $(".paste").unbind();
                     $("#share_tanwindow").hide();
                     $("#shareBox").show();
                     if (is_android()) { // 安卓复制至剪切板。第一个为渠道，第二个为内容
                         window.stub.jsCommandShare('com.zjmobile.commandshare.message', wordShare_text);
                     }
                     if (is_iphone()) { //ios唤醒及复制至剪切板
                         var json = '{"function":"commandSharetToSMSComposerSheetWithPhone:","argument":"' + wordShare_text + '","callback":""}';
                         webPostnotification(json);
                     }
                     //插码20170509
                     Webtrends.multiTrack({
                         args: {
                             "WT.pn": activityName + "klfx",
                             "WT.en": "qw"
                         },
                         delayTime: 100 //delay returning to the caller by 100 milliseconds
                     });
                 })
             }
         }
     }
     //短信分享(ios)

 function message_ios_share() {
         var json = '{"function":"displaySMSComposerSheetWithPhone:","argument":"' + content_message + '","callback":""}';
         webPostnotification(json);
     }
     //微信好友的分享(ios)

 function weixin_ios_share() {
         var json = '{"function":"showWXFriendsView:","argument":"' + title_weixin + '&&&' + imgUrl_weixin + '&&&' + content_weixin + '&&&' + link_weixin + '","callback":""}';
         webPostnotification(json);
     }
     //微信朋友圈的分享(ios)

 function friends_ios_share() {
         var json = '{"function":"showWXFriendCircleView:","argument":"' + content_weixin + '&&&' + imgUrl_weixin + '&&&' + content_weixin + '&&&' + link_weixin + '","callback":""}';
         webPostnotification(json);
     }
     //新浪微博的分享(ios)

 function weibo_ios_share() {
         var json = '{"function":"xinlangWeiboShareButtonPressed:","argument":"' + content_sina + '&' + imgUrl_sina + '","callback":""}';
         webPostnotification(json);
     }
     //版本号判断

 function versionid_ios() {
     var json = '{"function":"getVersionNumOfAPP:","argument":"","callback":"versionid_ios_cbk"}';
     webPostnotification(json);
 }

 function webPostnotification(func) {
     document.location = "webkitpostnotification:" + func;
 }

 function versionid_ios_cbk(info) { //info为版本号 string
     updateFlag = true;
 }

 function getVersionCallback() {
     $('.j-share').show();
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

 function is_wp() {
     if (ua.match(/iemobile/i) == "iemobile") {
         return true;
     } else {
         return false;
     }
 }

 function is_qq() { //qq客户端 
     if (ua.match(/qq\//i) == "qq/") {
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

 function is_weibo() {
     if (ua.match(/Weibo/i) == "weibo") {
         return true;
     } else {
         return false;
     }
 }

 function is_chrome() {
     if (ua.match(/Chrome/i) == "chrome") {
         return true;
     } else {
         return false;
     }
 }

 function is_baidu() {
     if (ua.match(/baidu/i) == "baidu") {
         return true;
     } else {
         return false;
     }
 }

 function is_uc() {
     if (ua.match(/uc/i) == "uc") {
         return true;
     } else {
         return false;
     }
 }

 function is_360() {
     if (ua.match(/360/i) == "360") {
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
     //唤醒app

 function customClickEvent() {
     var clickEvt;
     if (window.CustomEvent) {
         clickEvt = new window.CustomEvent('click', {
             canBubble: true,
             cancelable: true
         });
     } else {
         clickEvt = document.createEvent('Event');
         clickEvt.initEvent('click', true, true);
     }
     return clickEvt;
 }

 function applink() {
         if (is_android()) {
             if (is_weixin() || is_qq()) {
                 window.location = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.example.businesshall';
             } else if (is_baidu()) {
                 window.location = 'intent://platformapi/startapp?#Intent;package=com.example.businesshall;scheme=zjmobile;end;';
                 var clickedAt = +new Date;
                 setTimeout(function () {
                     !window.document.webkitHidden && setTimeout(function () {
                         if (+new Date - clickedAt < 2000) {
                             window.location = gUrl;
                         }
                     }, 500);
                 }, 500)
             } else if (is_uc() || is_360()) {
                 window.location = 'zjmobile://platformapi/startapp';
                 var clickedAt = +new Date;
                 setTimeout(function () {
                     !window.document.webkitHidden && setTimeout(function () {
                         if (+new Date - clickedAt < 2000) {
                             window.location = gUrl;
                         }
                     }, 500);
                 }, 500)
             } else {
                 // android 下 chrome 浏览器通过 谷歌内核特有 intent 协议唤起
                 var intentUrl = 'intent://platformapi/startapp?#Intent;package=com.example.businesshall;scheme=zjmobile;end;';
                 var openIntentLink = document.getElementById('openIntentLink');
                 if (!openIntentLink) {
                     openIntentLink = document.createElement('a');
                     openIntentLink.id = 'openIntentLink';
                     openIntentLink.style.display = 'none';
                     document.body.appendChild(openIntentLink);
                 }
                 openIntentLink.href = intentUrl;
                 // 执行click
                 openIntentLink.dispatchEvent(customClickEvent());
                 window.location = gUrl;
             }
         }
         if (is_iphone()) {
             if (is_qq() || is_weibo()) {
                 window.location = 'https://itunes.apple.com/us/app/zhe-jiang-yi-dong-shou-ji/id898243566';
             } else if (is_weixin()) {
                 window.location = gUrl;
             } else {
                 window.location = 'zjmobile://RootViewController';
                 var clickedAt = +new Date;
                 setTimeout(function () {
                     !window.document.webkitHidden && setTimeout(function () {
                         if (+new Date - clickedAt < 2000) {
                             window.location = 'https://itunes.apple.com/us/app/zhe-jiang-yi-dong-shou-ji/id898243566';
                         }
                     }, 500);
                 }, 500)
             }
         }
         if (is_wp()) {
             window.location = 'zjmobile://platformapi/startapp';
             var clickedAt = +new Date;
             setTimeout(function () {
                 !window.document.webkitHidden && setTimeout(function () {
                     if (+new Date - clickedAt < 2000) {
                         window.location = 'https://www.windowsphone.com/s?appid=c472daf1-0568-4b44-9abd-ead3073d257a';
                     }
                 }, 500);
             }, 500);
         }
     }
     //  分享统计, qudao-渠道, type-分享方式, activity-活动编号
     // function shareCount(qudao, shareTpe, activity) {
     //     if (channel != null && channel != "" && activityName != null && activityName != "") {
     //         // 异步请求
     //         $.ajax({
     //             url: basePath + "/share/shareCount.do?r=" + Math.random(),
     //             type: 'post',
     //             data: {
     //                 "type": qudao + '-' + shareTpe,
     //                 "code": activity
     //             },
     //             async: true, // 异步
     //             timeout: 60000, // 超时时间60s
     //             dataType: 'json', // 返回json
     //             success: function (data) {},
     //                 error: function () {}
     //         });
     //     }
     // };