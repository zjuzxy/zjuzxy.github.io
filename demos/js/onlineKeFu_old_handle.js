


var gLocation = window.location.href,
    gRe = /^(http:\/\/|https:\/\/)|([^\/]*\/)/g,
    gArr = gLocation.match(gRe),
    gUrl = gArr[0] + gArr[1] + gArr[2],
    ul_scid = getQueryString("ul_scid");
var ua = navigator.userAgent.toLowerCase();

var pathsUrl=gLocation.replace(gUrl,'');
	if(pathsUrl.indexOf("?") != -1){
		pathsUrl=pathsUrl.split("?")[0];
　　}

var link = $('<link>')
	link.attr('rel','stylesheet');
	link.attr('type','text/css');
	link.attr('href','../css/onlineKF.css');
	$('head').append(link);

var kfHtml="<div class='barrage' id='barrage'><a class='tubiaoa' href='javascript:;' urlInfo='' gotoUrl='' native_args='' storyboardname='' isnative='' mytitle='' isgesture='' viewname='' androidNative=''><div class='barrage_name' id='barrage_name'><img src='../img/zxkf.png' /></div></a></div>"



function onlineKeFu(){
	$('#loading').show();
	var url = gUrl + "OnlineCustomerConfig.do?curUrl="+pathsUrl;
	ajax(url,'')
	.done(function(data, status){
		if(data.result == "0"){
			$('#loading').hide();
			if(data.ifShowButton=="1"){
				if(is_app()){
				  // $("#barrage").show();
				  $("body").append(kfHtml);
				  var state=0;
				  var question=data.keyWord;
				  var rucan="question="+question; //问题入参
				  $(".tubiaoa").click(function(e){
				    document.getElementById("barrage").removeEventListener('touchmove', touchMove,false);
				    // e.stopPropagation();
				    if(state==0){
				      $(".barrage").css("right","0");
				      $(".barrage").css("-webkit-transition","right 500ms");
				      state=1;
				    }else{
				      //webLink(gUrl+"sjyytv3/xiaoi/consult.html",rucan,"在线客服");
				      webLink("https://wap.zj.10086.cn/new/mobileStore/customerService/toCustomerService.do",rucan,"在线客服");//20170714 关于在线客服整体迁移至在线公司客服系统的需求 by bester
				    }
				    setTimeout(function(){
				        $(".barrage").css("right","-52px");
				        state=0;
				        document.getElementById("barrage").addEventListener('touchmove', touchMove,false);
				      },4000);
				  });
				    addEvent();

			// function getEvent(event){
		//       return event||window.event;
		//     }
			// 在线客服图标移动
			var startY, //触摸时的坐标
			    y;		//滑动的距离  
			var inner=document.getElementById("barrage");
			var wHeight=$(document).height(); //屏幕的高
			    function touchSatrt(e){//触摸
			      // e.preventDefault();
			      var touch=e.touches[0];
			      startY = touch.clientY-inner.offsetTop;   //刚触摸时的坐标            
			    } 
			    function touchMove(e){//滑动          
			      e.preventDefault();     
			      var touch = e.touches[0];               
			      y = touch.clientY - startY;//滑动的距离
			      if(y<=115){
			        inner.style.top=115;
			      }else if(y>=wHeight-100){
			        inner.style.top=wHeight-100+"px";
			      }else{
			        inner.style.top=y+"px";
			      }                        
			    }
			    function touchEnd(e){//手指离开屏幕
			      // e.preventDefault();                 
			  	}

		//在线客服图标end
	    function addEvent(){
	      document.getElementById("barrage").addEventListener('touchstart', touchSatrt,false);  
	      document.getElementById("barrage").addEventListener('touchmove', touchMove,false);  
	      document.getElementById("barrage").addEventListener('touchend', touchEnd,false);
	    }

				}else{
				  $("#barrage").hide();
				}
			}else{
				$("#barrage").hide();
			}

		}else{
			$('#loading').hide();
			$("#barrage").hide();
			alert(data.msg);
		}
	});
}	



function goweb(islogin,isgesture,gotoUrl,isnative,mytitle,urlInfo){
  if(is_android()){
    window.stub.gotowebview(islogin,isnative,gotoUrl,urlInfo,mytitle,isgesture);//第一个参数：0为默认正常情况 不需要登录 1为网址无参 需要登录 2为网址有参session过期; 第二个参数： 1 native 2 h5  最后一个1是需要手势，0则不需要手势。
  }
  if(is_iphone()){
    gotowebview_ios(mytitle,gotoUrl,urlInfo,islogin,isgesture);
  }
}
function webLink(url,canshu,title){
  urlInfo = canshu; //参数
  gotoUrl = url;
  isnative = 2;//2为h5 1为native
  mytitle = title;
  islogin = 1;//1需要登录 0不需要
  isgesture = 0;//1需要手势 0不需要手势
  goweb(islogin,isgesture,gotoUrl,isnative,mytitle,urlInfo);
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
function is_app() {
  if (ua.match(/sjyyt/i) == "sjyyt"){
    return true;
  } else {
    return false;
  }
}  