/*
* Author: bester
* 手厅关闭和后退功能
* Creat Date: 2016-06-01
*/
ZJ = {
	ua : navigator.userAgent.toLowerCase(),
	doClose : function(){
		if(this.is_android()){
			window.stub.closeWebView();
		}
		if(this.is_iphone()){
			this.doClose_ios();
		}
	},
	doClose_ios : function(){ 
	    var json ='{"function":"doClose:","argument":"","callback":""}';
	    this.webPostnotification(json);
	},
	doReturn : function(){
		if(this.is_android()){
			window.stub.goBack();
		}
		if(this.is_iphone()){
			this.doReturn_ios();
		}
	},
	doReturn_ios : function(){ 
	    var json ='{"function":"doReturn:","argument":"","callback":""}';
	    this.webPostnotification(json);
	},
	webPostnotification : function(func){
    	document.location ="webkitpostnotification:"+func;
	},
	is_android : function(){ 
		if(this.ua.match(/android/i)=="android") {
	        return true;
	     } else {
	        return false;
	    }
	},
	is_iphone : function(){ 
		if(this.ua.match(/iphone/i)=="iphone") {
	        return true;
	     } else {
	        return false;
	    }
	}
}