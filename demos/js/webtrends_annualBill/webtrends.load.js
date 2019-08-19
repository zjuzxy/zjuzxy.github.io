window.webtrendsAsyncInit=function(){
    var dcsid_nw;
    var domain_nw;
    var http_nw;
    var host_nw = window.location.host;
    if(host_nw == 'wap.zj.10086.cn'||host_nw == 'app.m.zj.chinamobile.com') {
        dcsid_nw = "dsc8ybb94kyti5lydw2ihyedo_7p1m"; //需修改为实际dcsid
        domain_nw = "xwfx.zj.chinamobile.com";
        http_nw = "";
    }else {
        dcsid_nw = "webtrends";
        domain_nw = "218.205.68.247:80";
        http_nw = "//wap.zj.10086.cn";
    }

    var dcs=new Webtrends.dcs().init({
        dcsid:dcsid_nw,
        domain:domain_nw,
        timezone:8,
        i18n:true,
        fpcdom:".chinamobile.com",
        fpc:"WT_FPCN",
        metanames: "",
        paidsearchparams: "gclid,ad_id",
        adimpressions:true,
        adsparam:"WT.ac",
        dcsdelay: 2000,
        plugins:{
            hm:{src:"http://wap.zj.10086.cn/js/public/plugincode/webtrends.hm.js"} //修改实际引用地址
        }
    });

    dcs.WT.branch="zj";
    //get phonenumber
    var mobile ="";
    var metas = window.parent.document.getElementsByTagName("meta");
    for(i=0;i<metas.length;i++)
    {
        if(metas[i].getAttribute("name")=="WT.mobile")
            mobile = metas[i].getAttribute("content");
    }
    if(mobile){
        document.cookie = "mobile="+encode_mobile(mobile)+";path=/;domain="+window.location.host.split(':')[0];
        //set_cookie(mobile,encode_mobile(mobile),10)
    }else{
        //mobile = get_cookie(mobile);
        mobile = document.cookie.replace(/(?:(?:^|.*;\s*)mobile\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if(mobile){
            if(is_mobile(mobile)){
                mobile = mobile;
            }else if( is_mobile(decode_mobile(mobile))){
                mobile = decode_mobile(mobile);
            }
        }
    }
    if(mobile!='' && mobile!=undefined && is_mobile(mobile)){
        //TODO dcs.WT.mobile = mobile;
        dcs.WT.mobile = mobile;
    }
    dcs.track();

};

(function(){
    var http_nw;
    var host_nw = window.location.host;
    if(host_nw == 'wap.zj.10086.cn') {
        http_nw = "";
    }else {
        http_nw = "//wap.zj.10086.cn";
    }
    var s=document.createElement("script"); s.async=true; s.src="../../js/webtrends_v2/webtrends.min.js"; //修改实际引用地址
    var s2=document.getElementsByTagName("script")[0]; s2.parentNode.insertBefore(s,s2);
}());

function is_mobile(mobile){
    //check phonenumber
    var reg=/^(\+[0-9]{2,}-?)?1(3[0-9]|5[0-35-9]|8[0-9]|4[57]|7[678])[0-9]{8}$/;
    return reg.test(mobile);
}

function get_a_random(){
    //get0~9a~f random number
    var a=new Array('0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f');
    return String(a[parseInt(Math.random()*(15+1),10)]);
}

function pre_fix_integer(num, n) {
    //before string put 0
    return (Array(n).join(0) + num).slice(-n);
}

function encode_mobile(mobile){
    //encrypyion
    var key='abcdef';
    var mobile=String(mobile);

    mobile=mobile.substring(0,2)+get_a_random()+get_a_random()+mobile.substring(2,5)+get_a_random()+get_a_random()+mobile.substring(5,8)+get_a_random()+mobile.substring(8,11);

    var m1=String(parseInt('0x'+String(mobile.substring(0,4)))^key);
    var m2=String(parseInt('0x'+String(mobile.substring(4,8)))^key);
    var m3=String(parseInt('0x'+String(mobile.substring(8,12)))^key);
    var m4=String(parseInt('0x'+String(mobile.substring(12,16)))^key);
    return m3+'-'+m4+'-'+m1+'-'+m2;
}

function decode_mobile(str){
    //decode
    var key='abcdef';
    str=str.split("-");
    var m3=pre_fix_integer(Number(str[0]^key).toString(16),4);
    var m4=pre_fix_integer(Number(str[1]^key).toString(16),4);
    var m1=pre_fix_integer(Number(str[2]^key).toString(16),4);
    var m2=pre_fix_integer(Number(str[3]^key).toString(16),4);
    var m5=m1+m2+m3+m4;
    return m5.substring(0,2)+m5.substring(4,7)+m5.substring(9,12)+m5.substring(13,17);
}

