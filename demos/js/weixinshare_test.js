//微信二次分享自定义功能 20170503
function getWeixinJsbridge(weixinJsbridge_title,weixinJsbridge_link,weixinJsbridge_imgUrl,weixinJsbridge_desc){
    var gLocation = window.location.href,
        gRe = /^(http:\/\/|https:\/\/)|([^\/]*\/)/g,
        gArr = gLocation.match(gRe),
        gUrl = gArr[0] + gArr[1] + gArr[2]; 

    weixinJsbridge_title = weixinJsbridge_title||'浙江移动手机营业厅';
    weixinJsbridge_link = weixinJsbridge_link||gUrl + 'downpage.jsp';
    weixinJsbridge_imgUrl = weixinJsbridge_imgUrl||gUrl + 'images/yd_logo_04.png';
    weixinJsbridge_desc = weixinJsbridge_desc||'浙江移动手机营业厅，查话费、查流量、办业务，方便触手可及，赶紧下载我们吧！';

    var date = new Date();
    var shareTime = format(date);
    var url = encodeURIComponent(location.href.split('#')[0]);
    //alert('入参url='+url)
    var url_weixinshare = gUrl + "MicroChannelShare.do?shareTime=" + shareTime + "&url=" + url;
    ajax(url_weixinshare, '')
        .done(function(data, status) {
            //alert('data.result='+data.result)
            if(data.result == '0'){
                var timestamp = data.timestamp;
                var nonceStr = data.nonceStr;
                var signature = data.signature;
                //alert('data.url='+data.url)
                //通过config接口注入权限验证配置
                wx.config({
                        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: 'wx9917d6c3fe97e94b', // 必填，公众号的唯一标识
                        timestamp: timestamp, // 必填，生成签名的时间戳
                        nonceStr: nonceStr, // 必填，生成签名的随机串
                        signature: signature, // 必填，签名，见附录1
                        jsApiList: [ // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage'
                        ]
                    })
                    //通过ready接口处理成功验证
                wx.ready(function() {
                    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。

                    //判断当前客户端版本是否支持指定JS接口
                    wx.checkJsApi({
                        jsApiList: [ // 需要检测的JS接口列表，所有JS接口列表见附录2,
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage'
                        ],
                        success: function(res) {
                            // 以键值对的形式返回，可用的api值true，不可用为false
                            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                            //alert("认证成功");
                        }
                    });

                    //分享接口
                    //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareTimeline({
                        title: weixinJsbridge_title, // 分享标题
                        link: weixinJsbridge_link, // 分享链接
                        imgUrl: weixinJsbridge_imgUrl, // 分享图标
                        success: function() {
                            // 用户确认分享后执行的回调函数
                            //alert('已分享');
                        },
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                            //alert('已取消');
                        }
                    });

                    //获取“分享给朋友”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareAppMessage({
                        title: weixinJsbridge_title, // 分享标题
                        desc: weixinJsbridge_desc, // 分享描述
                        link: weixinJsbridge_link, // 分享链接
                        imgUrl: weixinJsbridge_imgUrl, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function() {
                            // 用户确认分享后执行的回调函数
                            //alert('已分享');
                        },
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                            //alert('已取消');
                        }
                    });
                });
                //通过error接口处理失败验证
                wx.error(function(res) {
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                    //alert(res.errMsg);
                });
            }else{
                console.log(data.msg)
            }
        });
};

//日期格式化方法：
function format(date) {
    var y = date.getFullYear() + "-";
    var m = date.getMonth() + 1 + "-";
    var d = date.getDate() + " ";
    //12:00:00:000  小时格式
    var h = date.getHours();
    h = h < 10 ? "0" + h : "" + h;
    //分钟格式
    var mi = date.getMinutes();
    mi = mi < 10 ? "0" + mi : "" + mi;
    //秒钟格式
    var s = date.getSeconds();
    s = s < 10 ? "0" + s : "" + s;

    var str = y + m + d + h + ":" + mi + ":" + s;
    return str;
}
