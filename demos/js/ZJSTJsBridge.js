/*
* ZJSTJsBridge v2.0.0
* =======================
* Author: bester
* Create Date: 2017-12-19
* Date: 2017-12-26 
*/
ZJST = window.ZJST || {};
ZJST.JsBridge = {
    //关闭webview
    closeWebview: function(){
        if(is_android()){
            window.stub.closeWebView();
        }
        if(is_iphone()){
            var json ='{"function":"doClose:","argument":"","callback":""}';
            webPostnotification(json);
        }
    },
    //webview后退
    returnWebview: function(){
        if(is_android()){
            window.stub.goBack();
        }
        if(is_iphone()){
            var json ='{"function":"doReturn:","argument":"","callback":""}';
            webPostnotification(json);
        }
    },
    //网络类型检测
    getNetType: function(){
        if(is_android()){
            window.stub.getNetworkState();
        }
        if(is_iphone()){
            var json ='{"function":"getNetStatus:","argument":"","callback":"nettypeCbk"}';
            webPostnotification(json);
        }
    },
    //扫一扫调用
    scanQRCodeForText: function(){
        if(is_android()){
            window.stub.scanQRCodeForText();
        }
        if(is_iphone()){
            var json ='{"function":"doScannerByZbar:","argument":"","callback":"doQrcodeCbk"}';
            webPostnotification(json);
        }
    },
    //内部跳转
    goToWebview: function(urlInfo, gotoUrl, native_args, storyboardname, isnative, mytitle, islogin, isgesture, viewname, androidNative){
        if (isnative == 2) { //h5  
            this.goweb(islogin, isgesture, gotoUrl, isnative, mytitle, urlInfo);
        } else { //native：安卓: viewname+&+native_args（如果有native_args）; ios: storyboardname+&+viewname（如果有viewname）
            if (is_android()) {
                var andr = "";
                if (native_args == "") {
                    andr = androidNative;
                    urlInfo = '';
                } else {
                    andr = androidNative;
                    urlInfo = native_args;
                }
                this.goweb(islogin, isgesture, andr, isnative, mytitle, urlInfo);
            }
            if (is_iphone()) {
                var ios = "";
                if (storyboardname == "") {
                    ios = viewname;
                } else {
                    ios = storyboardname + "&" + viewname;
                }
                this.goweb(islogin, isgesture, ios, isnative, mytitle, urlInfo);
            }
        }
    },
    goweb: function(islogin,isgesture,gotoUrl,isnative,mytitle,urlInfo){
      if(is_android()){
          window.stub.gotowebview(islogin,isnative,gotoUrl,urlInfo,mytitle,isgesture);
      }
      if(is_iphone()){
          var json ='{"function":"webloginAndJump:","title":"'+mytitle+'","targetLink":"'+gotoUrl+'","webArg":"'+urlInfo+'","needLogin":"'+islogin+'","needGesture":"'+isgesture+'"}';
          webPostnotification(json);
      }
    },
    //h5跳转插件（安卓）
    goToPlugin: function(){
        if(is_android()){
            window.stub.gotoPlugin(parseInt(login),pluginPackageName,pluginName,pluginDownloadUrl,pluginFileSize,pluginMD5,pluginVersion,pluginCjNo,parseInt(needGesture));
        }
    },
    //通讯录读取（单条）
    getAddressListSingle: function(){
        if(is_android()){
            window.stub.jsMethod('contactlist','5','');
        }
        if(is_iphone()){
            var json ='{"function":"showAddressBook:","argument":"","callback":"getcontactinfo"}';
            webPostnotification(json);
        }
    },
    //通讯录读取（所有）
    getAddressListAll: function(){
        if(is_android()){
            window.stub.showcontacts();
        }
        if(is_iphone()){
            var json ='{"function":"getAllPeoplesAddressInfo:","argument":"","callback":"getcontactinfoall"}';
            webPostnotification(json);
        }
    },
    //短信分享（无号码）
    shortMessageShare: function(){
        if(is_android()){
            window.stub.jsMethod('com.zjmobile.app.message1','4',content_message);
        }
        if(is_iphone()){
            var json ='{"function":"displaySMSComposerSheetWithPhone:","argument":"'+content_message+'","callback":""}';       
            webPostnotification(json); 
        }
    },
    //短信分享（有号码）
    shortMessageShareMore: function(){
        if(is_android()){
            window.stub.jsMethod('com.zjmobile.app.message1','4',num_message+'&&&'+content_message);
        }
        if(is_iphone()){
            var json ='{"function":"displaySMSComposerSheetWithPhoneMore:","argument":"'+content_message+'&&&'+num_message+'","callback":""}';
            webPostnotification(json);
        }
    },
    //微信好友分享
    weChatShare: function(){
        if(is_android()){
            window.stub.jsMethod('com.zjmobile.app.weixin','4',title_weixin+'&&&'+imgUrl_weixin+'&&&'+content_weixin+'&&&'+link_weixin);
        }
        if(is_iphone()){
            var json ='{"function":"showWXFriendsView:","argument":"'+title_weixin+'&&&'+imgUrl_weixin+'&&&'+content_weixin+'&&&'+link_weixin+'","callback":"weChatShareCbk"}';    
            webPostnotification(json);
        }
    },
    //朋友圈分享
    friendCircleShare: function(){
        if(is_android()){
            window.stub.jsMethod('com.zjmobile.app.friends','4',content_weixin+'&&&'+imgUrl_weixin+'&&&'+content_weixin+'&&&'+link_weixin);
        }
        if(is_iphone()){
            var json ='{"function":"showWXFriendCircleView:","argument":"'+content_weixin+'&&&'+imgUrl_weixin+'&&&'+content_weixin+'&&&'+link_weixin+'","callback":"friendCircleShareCbk"}';     
            webPostnotification(json);
        }
    },
    //微博分享
    weiboShare: function(){
        if(is_android()){
            window.stub.jsMethod('com.zjmobile.app.sina','4',content_sina+'&&&'+imgUrl_sina);
        }
        if(is_iphone()){
            var json ='{"function":"xinlangWeiboShareButtonPressed:","argument":"'+content_sina+'&'+imgUrl_sina+'","callback":"weiboShareCbk"}';                  
            webPostnotification(json);  
        }
    },
    //QQ好友分享
    qqFriendShare: function(){
        if(is_android()){
            window.stub.jsMethod('com.zjmobile.app.qqfriend','4',title_qq+'&&&'+imgUrl_qq+'&&&'+content_qq+'&&&'+link_qq);
        }
        if(is_iphone()){
            var json ='{"function":"showQQAPIFriendCircleView:","argument":"'+title_qq+'&&&'+imgUrl_qq+'&&&'+content_qq+'&&&'+link_qq+'","callback":"qqFriendShareCbk"}';     
            webPostnotification(json);
        }
    },
    //QQ空间分享
    qqZoneShare: function(){
        if(is_android()){
            window.stub.jsMethod('com.zjmobile.app.qqzone','4',title_qq+'&&&'+imgUrl_qq+'&&&'+content_qq+'&&&'+link_qq);
        }
        if(is_iphone()){
            var json ='{"function":"showQQAPICtrlFlagQZoneShareView:","argument":"'+title_qq+'&&&'+imgUrl_qq+'&&&'+content_qq+'&&&'+link_qq+'","callback":"qqZoneShareCbk"}';     
            webPostnotification(json);  
        }
    },
    //安卓获取短信中的验证码
    getVerifyCode: function(messageNum,codeLength,preStr,postStr){
        if(is_android()){
            window.stub.getVerifyCode(messageNum,codeLength,preStr,postStr);
        }
    },
    //语音识别
    speechRecognition: function(){
        if(is_android()){
            window.stub.speechRecognition();
        }
        if(is_iphone()){
            var json ='{"function":"speechRecognition:","argument":"","callback":"speechRecognitionCbk"}';
            webPostnotification(json); 
        }
    },
    //摇一摇
    openShake: function(){
        if(is_android()){
            window.stub.openShake();
        }
        if(is_iphone()){
            var json ='{"function":"openShake:","argument":"","callback":"shakeCbk"}';
            webPostnotification(json);
        }
    },
    //获取手机imei
    getImei: function(){
        if(is_android()){
            imei = window.zjsjyyt.get("imei");
            getIMEICbk(imei);
        }
        if(is_iphone()){
            var json ='{"function":"getDeviceInfoIMEI:","argument":"","callback":"getIMEICbk"}';
            webPostnotification(json);
        }
    },
    //获取地理位置信息
    getLocation: function(){
        if(is_android()){
            window.stub.getLocation();
        }
        if(is_iphone()){
            var json ='{"function":"getLocation:","argument":"","callback":"getLocationCbk"}';
            webPostnotification(json);
        }
    },
    //获取本机相册
    getPhoto: function(width){
        if(is_android()){
            window.stub.chooseFile(width);
        }
    },
    //获取本机拍照
    getCamara: function(width){
        if(is_android()){
            window.stub.openCapture(width);
        }
    },
    //安卓升级
    checkVersion: function(){
        if(is_android()){
            window.stub.jsMethod("",7,"");
        }
    },
    //后退按钮截取
    needInterruptBackPress: function(type){
        if(is_android()){
            window.stub.needInterruptBackPress(type);
        }
        if(is_iphone()){
            var json ='{"function":"needInterruptBackPress:","argument":"'+type+'","callback":""}';
            webPostnotification(json);
        }
    },
    //打开微信小程序
    openWXMiniProgram: function (id, path) {
        if (is_android()) {
            window.stub.startWechatApp(id, path);
        }
        if (is_iphone()) {
            var json = '{"function":"startWechatApp:","argument":"' + id + '&&&' + path + '","callback":""}';
            webPostnotification(json);
        }
    }
}

function webPostnotification(func){
    document.location ="webkitpostnotification:"+func;
}
function is_android(){
    if(ua.match(/android/i)=="android"&&ua.match(/iemobile/i)!="iemobile"){
         return true;
    }else{
         return false;
    }
}
function is_iphone(){
    if(ua.match(/iphone/i)=="iphone"&&ua.match(/iemobile/i)!="iemobile"){
         return true;
    }else{
         return false;
   }
}
function is_app(){
    if(ua.match(/sjyyt/i)=="sjyyt"){
        return true;
    }else{
        return false;
    }
}