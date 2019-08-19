/*
* zjversion 手厅版本号
* =====================================
* Author: bester
* Creat Date: 2016-04-07
*/
ZJ = window.ZJ || {};
ZJ.Version = {
	ua : navigator.userAgent.toLowerCase(),
	versionid : function(){
		if(this.is_android()){
			var versionid_and = null;
			if (typeof window.zjsjyyt == "object" && window.zjsjyyt != null) {
				versionid_and = window.zjsjyyt.get("versionid");
				return versionid_and;
			}
		}
		if(this.is_iphone()){
			this.versionid_ios();
		}
	},
	versionid_ios : function(){ 
	    var json ='{"function":"getVersionNumOfAPP:","argument":"","callback":"versionid_ios_cbk"}';
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
	//判断是否是苹果
	is_iphone : function(){ 
		if(this.ua.match(/iphone/i)=="iphone") {
	        return true;
	     } else {
	        return false;
	    }
	}
}
function versionid_ios_cbk(versionid_ios){
	versionid = versionid_ios;
}