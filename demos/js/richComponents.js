// 创建构造器
var Dialog1 = Vue.extend({
    template: '<div class="js_dialog" id="dialog1" style="display: none;">'
        + '<div class="richui-dialog" id="richui-dialog1" style="display:none;">'
        + '<div class="richui-dialog_title">提示</div>'
        + '<div class="richui-dialog_content">正在加载中...</div>'
        + '<div class="richui-dialog_btn">'
        + '<a class="richui-dialog_sure" href="javascript:;" onclick="closeWindow();">确定</a>'
        + '</div>'
        + '</div>'
        + '</div>',
    data: function () {
        return {}
    }
});

var Dialog2 = Vue.extend({
    template: '<div class="js_dialog" id="dialog2" style="display: none;">'
        + '<div class="richui-dialog" id="richui-dialog2" style="display:none;">'
        + '<div class="richui-dialog_title">提示</div>'
        + '<div class="richui-dialog_content">正在加载中...</div>'
        + '<div class="richui-dialog_btn2">'
        + '<a class="richui-dialog_cancel" href="javascript:;" onclick="closeWindow();">取消</a>'
        + '<a class="richui-dialog_sure2" href="javascript:;" @click="doBtn()">确定</a>'
        + '</div>'
        + '</div>'
        + '</div>',
    data: function () {
        return {}
    },
    props: {
        doBtn: {
            type: Function
        }
    },
    methods: {
        // doBtn: function() {
        //     console.log('doBtn')
        // }
    }
});

var Dialog3 = Vue.extend({
    template: '<div class="js_dialog" id="dialog3" style="display: none;">'
        + '<div class="richui-dialog" id="richui-dialog3" style="display:none;">'
        + '<div class="richui-dialog_rightImg"></div>'
        + '<div class="richui-dialog_content">正在加载中...</div>'
        + '<div class="richui-dialog_btn">'
        + '<a class="richui-dialog_sure" href="javascript:;" onclick="closeWindow()">知道了</a>'
        + '</div>'
        + '</div>'
        + '</div>',
    data: function () {
        return {}
    },
    methods: {
        // doBtn: function() {
        //     console.log('doBtn')
        // }
    }
});

var Dialog4 = Vue.extend({
    template: '<div class="js_dialog" id="dialog4" style="display: none;">'
        + '<div class="richui-dialog" id="richui-dialog4" style="display:none;">'
        + '<div class="richui-dialog_errorImg"></div>'
        + '<div class="richui-dialog_content">正在加载中...</div>'
        + '<div class="richui-dialog_btn">'
        + '<a class="richui-dialog_sure" href="javascript:;" onclick="closeWindow()">知道了</a>'
        + '</div>'
        + '</div>'
        + '</div>',
    data: function () {
        return {}
    },
    methods: {
        // doBtn: function() {
        //     console.log('doBtn')
        // }
    }
});
// 创建实例，并添加到body上。
document.body.appendChild(new Dialog1().$mount().$el);
// document.body.appendChild(new Dialog2().$mount().$el);
document.body.appendChild(new Dialog3().$mount().$el);
document.body.appendChild(new Dialog4().$mount().$el);

Vue.prototype.$dialog = function (options) {
    options = options || {}
    if (typeof options === 'string') {
        options = {
            msg: options
        };
    }
    if (options.type == undefined || (options.type !== 'success' && options.type !== 'error')) {
        openWindow1(options.msg);
    } else {
        if (options.type != undefined && options.type == 'success') {
            openWindow3(options.msg);
        }
        if (options.type != undefined && options.type == 'error') {
            openWindow4(options.msg);
        }
    }
}

Vue.component('richinfo-loading', {
    props: {
        showLoading: {
            type: Boolean,
            default: false
        }
    },
    template: '<div id="richui-loading" v-show="showLoading">'
    + '<div class="richui-loadingWrap"></div>'
    + '<div class="richui-loadingTip richui-tipInAnimate">'
    + '<span class="richui-loadingIcon"></span>'
    + '<span class="richui-loadingText">努力加载中…</span>'
    + '</div>'
    + '</div>'
})