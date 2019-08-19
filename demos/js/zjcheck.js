/*
* ZJ.Check
* =====================================
* Author: bester
* Creat Date: 2017-06-20 add idcard2
*/
ZJ = window.ZJ || {};
ZJ.Check = {
	//隐藏地址1
	address_hide : function(address){ 
		var address_l = address.substr(0,6);
		var address_r = address.substr(address.length-3,address.length)
		var address_new = address_l + '*********' + address_r;
		return address_new;
	},
	//隐藏地址2
	address_hide2 : function(address){ 
		var address_l = address.substr(0,6);
		var address_r = address.substr(address.length-6,address.length)
		var address_new = address_l + '***' + address_r;
		return address_new;
	},
	//隐藏地址3

	address_hide3 : function(address){ 
		var address_l = address.substr(0,6);
		var address_r = address.substr(address.length-4,address.length)
		var address_new = address_l + '***' + address_r;
		return address_new;
	},
	//隐藏地址4
	address_hide4 : function(address){ 
		var address_l = address.substr(0,6);
		var address_r = address.substr(address.length-12,address.length)
		var address_new = address_l + '****' + address_r;
		return address_new;
	},
	//隐藏姓名
	name_hide : function(name){ 
		var name_new = name.substr(0,1);
		for(var i=1;i<name.length;i++){
			name_new = name_new + '*';
		}
		return name_new;
	},
	//判断手机号码
	mobile_num_easy : function(num){ 
		var re = /^1\d{10}$/;
		return re.test(num);//boolean
	},
	//隐藏手机号
	num_hide : function(num){ 
		var num_l = num.substr(0,3);
		var num_r = num.substr(7,4)
		var num_new = num_l + '****' + num_r;
		return num_new;
	},
	//判断移动手机号码
	mobile_num : function(num){
		var re = /^1(3[4-9]|5[012789]|8[23478]|4[7]|7[8])\d{8}$/;
		return re.test(num);
	},
	//判断浙江移动 wjp20171222
	mobile_num_zj : function(num){ 
		num= num.replace(/[+][8][6]/g, "")
		var s=""
		var pattern = new RegExp("[`~!@#%$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）—|{}【】 \n]") 
    	
     	for (var i = 0; i < num.length; i++) {
        	s =  s+num.substr(i, 1).replace(pattern, '');
    	}
		// var re = /^1(3[4-9]|4[7]|5[0125789]|8[23478]|7[8]|8[23478])\d{8}$/;
		var re = /^1\d{10}$/;
		    if(re.test(s)){
		    	return s;
		    }else{
		    	return "";
		    }		
	},
	//判断电话号码
	phone_num : function(num){ 
		var re = /^0\d{2,3}-?\d{7,8}$/;
		return re.test(num);
	},
	//判断email
	email : function(email){ 
		var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
		return re.test(email);
	},
	//判断邮编
	postcode : function(postcode){ 
		var re = /^[0-9]{6}$/;
		return re.test(postcode);
	},
	//判断身份证
	idcard : function(idcard){ 
    	var re = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;
		return re.test(idcard);
	},
	//判断身份证2
	idcard2 : function(idcard){ 
    	var re = /^\d{14}[\dxX]$|^\d{17}[\dxX]$/;
		return re.test(idcard);
	},
	//匹配字符串中的数字 加上<b></b>
	number_color : function(str){ 
    	var re=/(\d+\.?\d+)/g;
    	return str.replace(re,'<b>$1</b>');
	},
	//ZJ.Check.QueryString('title') 获取url中的参数
	QueryString : function(val){
		var uri = window.location.search;
		var re = new RegExp("" +val+ "=([^\&\?]*)", "ig");
		return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null); 
	},
	//判断是否是安卓
	is_android : function(){ 
		if(ua.match(/android/i)=="android") {
	        return true;
	     } else {
	        return false;
	    }
	},
	//判断是否是苹果
	is_iphone : function(){ 
		if(ua.match(/iphone/i)=="iphone") {
	        return true;
	     } else {
	        return false;
	    }
	},
	//判断是否是微信
	is_weixin : function(){ 
		if(ua.match(/MicroMessenger/i)=="micromessenger") {
	        return true;
	     } else {
	        return false;
	    }
	},	
	//特殊字符过滤
	stripscript : function(s){
		var pattern = new RegExp("[`~!@#%$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）—|{}【】 \n]") 
    	var rs = "";
     	for (var i = 0; i < s.length; i++) {
        	rs =  rs+s.substr(i, 1).replace(pattern, '');
    	}
    	return rs;
	},	
	//判断是否是手厅webview
	is_app : function(){
	  if (ua.match(/sjyyt/i) == "sjyyt"){
	    return true;
	  } else {
	    return false;
	  }
	} 
}