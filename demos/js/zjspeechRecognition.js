/*
* Author: bester
* 获取手厅语音识别
* Creat Date: 2017-12-12
*/
ZJ = window.ZJ || {};
ZJ.speechRecognition = {
	ua : navigator.userAgent.toLowerCase(),
	speechRecognition : function(){
		if(this.is_android()){
			window.stub.speechRecognition();
		}
		if(this.is_iphone()){
			this.speechRecognition_ios();
		}
	},
	speechRecognition_ios : function(){ 
	    var json ='{"function":"speechRecognition:","argument":"","callback":"speechRecognitionCbk"}';
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