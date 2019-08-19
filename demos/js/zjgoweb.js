/*
* zjgoweb 手厅内部跳转方法
* =====================================
* Author: bester
* Creat Date: 2016-05-17
*/

function goweb_rdy(urlInfo, gotoUrl, native_args, storyboardname, isnative, mytitle, islogin, isgesture, viewname, androidNative) {
    if (isnative == 2) { // 1 native 2 h5
        goweb(islogin, isgesture, gotoUrl, isnative, mytitle, urlInfo);
    } else { //native：安卓: viewname+&+native_args（如果有native_args）; ios: storyboardname+&+viewname（如果有viewname）
        if (is_android()) {
            var andr = "";
            if (native_args == "") {
                andr = androidNative;
                urlInfo = "";//20171213修改
            } else {
                andr = androidNative;
                urlInfo = native_args;//20160517修改
            }
            goweb(islogin, isgesture, andr, isnative, mytitle, urlInfo);
        }
        if (is_iphone()) {
            var ios = "";
            if (storyboardname == "") {
                ios = viewname;
            } else {
                ios = storyboardname + "&" + viewname;
            }
            goweb(islogin, isgesture, ios, isnative, mytitle, urlInfo);
        }
    }
}

function goweb(islogin,isgesture,gotoUrl,isnative,mytitle,urlInfo){
  if(is_android()){
    window.stub.gotowebview(islogin,isnative,gotoUrl,urlInfo,mytitle,isgesture);//第一个参数：0为默认正常情况 不需要登录 1为网址无参 需要登录 2为网址有参session过期; 第二个参数： 1 native 2 h5  最后一个1是需要手势，0则不需要手势。
  }
  if(is_iphone()){
    gotowebview_ios(mytitle,gotoUrl,urlInfo,islogin,isgesture);
  }
}
function gotowebview_ios(mytitle,gotoUrl,urlInfo,islogin,isgesture){
  //var json ='{"function":"webloginAndJump:","targetLink":"'+gotoUrl+'","webArg":"'+urlInfo+'","title":"'+mytitle+'"}';
  var json ='{"function":"webloginAndJump:","title":"'+mytitle+'","targetLink":"'+gotoUrl+'","webArg":"'+urlInfo+'","needLogin":"'+islogin+'","needGesture":"'+isgesture+'"}';
    webPostnotification(json);
}
function webPostnotification(func){  
    document.location ="webkitpostnotification:"+func;
}
//判断环境
function is_android(){
    if(ua.match(/android/i)=="android"&&ua.match(/iemobile/i)!="iemobile") {
         return true;
    } else {
         return false;
    }
}
function is_iphone(){
    if(ua.match(/iphone/i)=="iphone"&&ua.match(/iemobile/i)!="iemobile") {
         return true;
    } else {
         return false;
   }
}