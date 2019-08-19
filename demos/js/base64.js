function enCodeStr(str){

  if( str == null || str == "" || str == undefined ){
    return str;
  }else{
    // var str="姓名:123456:123455;李四:12345:1245677;33333:123456";
    var str2=encodeURIComponent(str);//先转码，避免中文乱码问题
    
    var str3 = encode64(str2);  //再base加密，也可以说转码
       // alert("base64 encode:" +str3);
        console.info(str3);  
     return str3;
  }
}

// base64加密开始  
var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv"  
            + "wxyz0123456789+/" + "=";  
      
function encode64(input) {  
   var output = "";  
   var chr1, chr2, chr3 = "";  
   var enc1, enc2, enc3, enc4 = "";  
   var i = 0;  
   do {  
     chr1 = input.charCodeAt(i++);  
     chr2 = input.charCodeAt(i++);  
     chr3 = input.charCodeAt(i++);  
     enc1 = chr1 >> 2;  
     enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
     enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
     enc4 = chr3 & 63;  
     if (isNaN(chr2)) {  
        enc3 = enc4 = 64;  
     } else if (isNaN(chr3)) {  
        enc4 = 64;  
     }  
     output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2)+ keyStr.charAt(enc3) + keyStr.charAt(enc4);  
     chr1 = chr2 = chr3 = "";  
     enc1 = enc2 = enc3 = enc4 = "";  
} while (i < input.length);  
return output;  
} 

