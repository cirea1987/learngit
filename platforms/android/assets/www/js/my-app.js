//var hapiurl = 'http://site.yuanjutong.com/investservice/';
var hapiurl = 'http://investsource.org.cn/';
var htoken = "";
var index_list = {};
var now = Date.parse(new Date());
localStorage.index_list = JSON.stringify(index_list);
var zijinload=false;
function appajax(options) {
    $.ajax({
        type: options.type,
        url: options.url,
        data: options.data,
        dataType: options.dtype,
        beforeSend: function (XMLHttpRequest) {
            if (!localStorage.debugC && options.ts){window.plugins.spinnerDialog.show();}
            myApp.showPreloader();
        },
        success: function (msg) {
            options.fun(msg)
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (XMLHttpRequest.readyState == 0) {
                myApp.modal({
                    title: '未登录',
                    text: '请确认选择的网络是否正确',
                    buttons: [{
                        text: '确定',
                        onClick: function () {}
                    }]
                });
            }
            if (!localStorage.debugC){window.plugins.spinnerDialog.hide();}
        },
        complete: function (XMLHttpRequest, textStatus) {
            if (!localStorage.debugC){window.plugins.spinnerDialog.hide();}
            myApp.hidePreloader();
        }
    })
}

var myApp = new Framework7({
    activeState: false,
});
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true,
    ignoreCache: true,

    swipeBackPage: false, //滑动返回上一页关闭

});
myApp.onPageBeforeAnimation('aboutapp', function () {
    $('#ver').html(AppVersion.version)
})
if (localStorage.username != undefined && localStorage.username != "") {
    myApp.closeModal('.login-screen');
}

myApp.onPageBeforeAnimation('index', function () {
    // get_index_data();
});
myApp.onPageInit('about', function (page) {
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});
if(localStorage.uname==undefined || localStorage.uname==''){
 if ((localStorage.expresstime != '') && ( now > localStorage.expresstime)) {
     console.log(1)
        $('#tishi').html("登录已过期请重新登录")
    } else {
        $('#tishi').html("")
    }
    myApp.loginScreen();
}
if ((localStorage.expresstime != '') && (now > localStorage.expresstime)) {
    $('#tishi').html("登录已过期请重新登录")
    myApp.loginScreen();
}
myApp.onPageInit('*', function (page) {
    if(localStorage.uname==undefined || localStorage.uname==''){
    if ((localStorage.expresstime != '') && (now > localStorage.expresstime)) {
       
            $('#tishi').html("登录已过期请重新登录")
        } else {
            $('#tishi').html("")
        }
        myApp.loginScreen();
    }
    if ((localStorage.expresstime != '') && (now > localStorage.expresstime)) {
        $('#tishi').html("登录已过期请重新登录")
        myApp.loginScreen();
    }
});

function closeModals(cssm) {
    myApp.closeModal($$(cssm));
}

function tishi(title) {
    myApp.modal({
        title: '',
        text: title,
        buttons: [{
            text: '确定',
            onClick: function () {

            }
        }]
    });
}

//全局时间结束


myApp.onPageBeforeAnimation("xiangmu", function () {
    $$(".toolbar  .boa").removeClass("active");
    $$(".toolbar  .xq").addClass("active");
    $$(".toolbar  .xq").attr("href", 'javascript:;');
    $$(".toolbar .home").attr("href", 'index.html');
    $$(".toolbar .qsh").attr("href", 'javascript:qushitz();');
    if (localStorage.uname) {
        $$(".toolbar .my").attr("href", 'my.html');
    } else {
        $$(".toolbar .my").attr("href", 'my1.html');
    }

    localStorage.start = "";
    localStorage.end = "";
});
myApp.onPageBeforeAnimation("my", function () {
    $$(".toolbar  .boa").removeClass("active");
    $$(".toolbar  .my").addClass("active");
    $$(".toolbar .xq").attr("href", 'xiangmu.html');
    $$(".toolbar  .my").attr("href", 'javascript:;');
    $$(".toolbar .home").attr("href", 'index.html');
    $$(".toolbar .qsh").attr("href", 'javascript:qushitz();');
    myLogin();
    localStorage.start = "";
    localStorage.end = "";
});
// 回首页
myApp.onPageBeforeAnimation("index", function () {
    $$(".toolbar  .boa").removeClass("active");
    $$(".toolbar  .home").addClass("active");
    $$(".toolbar  .home").attr("href", 'javascript:;');
    $$(".toolbar .xq").attr("href", 'xiangmu.html');
    $$(".toolbar .qsh").attr("href", 'javascript:qushitz();');
    if (localStorage.uname) {
        $$(".toolbar .my").attr("href", 'my.html');
    } else {
        $$(".toolbar .my").attr("href", 'my1.html');
    }
});
//get_index_data();
myApp.onPageBeforeAnimation("qushi", function () {
    if (localStorage.roleid==11) {
        $('.v-hi').css({'visibility':'hidden','height':'0','overflow':'hidden'})
    }
    myApp.showPreloader();
    $$(".toolbar  .boa").removeClass("active");
    $$(".toolbar  .qsh").addClass("active");
    $$(".toolbar  .qsh").attr("href", 'javascript:;');
    $$(".toolbar .xq").attr("href", 'xiangmu.html');
    $$(".toolbar .home").attr("href", 'index.html');
    if (localStorage.uname) {
        $$(".toolbar .my").attr("href", 'my.html');
    } else {
        $$(".toolbar .my").attr("href", 'my1.html');
    }
});
myApp.onPageAfterAnimation("qushi", function () {
   
    setTimeout(myApp.hidePreloader(), 3000)
    var tubiao1 = get_data_qushi('aduit_project'); //总产值
    var tubiao2 = get_data_qushi('country_project'); //规模以上企业工业总产值
    var tubiao3 = get_data_qushi('de_project');
    var tubiao4 = get_data_qushi('country_value');
    tubiao(tubiao1, tubiao2,tubiao3,tubiao4);
    
});

function get_data_qushi(data) {
    tub = [];
    $.ajax({
        type: "post",
        url: hapiurl + "index.php?m=content&c=appapi&a=" + data,
        async: false,
        data: {
            'token': localStorage.token,
            'roleid': localStorage.roleid,
            'userid': localStorage.userid
        },
       
        dataType: "json",
        beforeSend: function () {
            myApp.showPreloader();
        },
        complete: function () {
            myApp.hidePreloader();
        },
        success: function (response) {
            if (response['status'] == "1") {
                if (data == "aduit_project") {

                    tub.push(parseFloat(response['info'][1]['data'][0]['total']))
                    tub.push(parseFloat(response['info'][2]['data'][0]['total']))
                    tub.push(parseFloat(response['info'][3]['data'][0]['total']))
                }
                if (data == "country_project") {

                    tub.push(parseFloat(response['info'][1]['data'][0]['total']))
                    tub.push(parseFloat(response['info'][2]['data'][0]['total']))
                    tub.push(parseFloat(response['info'][3]['data'][0]['total']))
                    tub.push(parseFloat(response['info'][4]['data'][0]['total']))
                    tub.push(parseFloat(response['info'][5]['data'][0]['total']))
                }
                if (data == "de_project") {
                     tub['num']=[];
                     tub['name']=[];
                     $.each(response['info'], function (i, v) { 
                        tub['num'].push(parseFloat(v['badge']));
                        tub['name'].push(v['name']);
                     });
                }
                if(data == "country_value"){
                    tub.push(parseFloat(response['info'][1]['data'][0]['total']))
                    tub.push(parseFloat(response['info'][2]['data'][0]['total']))
                    tub.push(parseFloat(response['info'][3]['data'][0]['total']))
                    tub.push(parseFloat(response['info'][4]['data'][0]['total']))
                    tub.push(parseFloat(response['info'][5]['data'][0]['total']))
                }
            } else {
                tishi('出现错误！')
            }



        }
    });
    return tub;
}
// webview 打开新页面
var inAppBrowserRef;
var inflg;


function inapp(url) {

    var u = navigator.userAgent;
    var ua = navigator.userAgent.toLowerCase();
    if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) { //如果是ios
        var x = "location=no,zoom=no,toolbarposition=top,closebuttoncaption=×";
    }
    if (ua.match(/Android/i) == "android") { //如果是android
        var x = "location=yes,zoom=no";
    }
    //tishi(x)
    // window.plugins.spinnerDialog.show();
    inAppBrowserRef = cordova.InAppBrowser.open(url, '_self', x);
    inAppBrowserRef.addEventListener('loadstart', loadStartCallBack);
    inAppBrowserRef.addEventListener('loadstop', loadStopCallBack);
    inAppBrowserRef.addEventListener('loaderror', loadErrorCallBack);
    inflg = true;
}


function loadStartCallBack() {
    inflg = false;

}

function sthide() {
    window.plugins.spinnerDialog.hide();
}

function loadStopCallBack() {
    //    window.plugins.spinnerDialog.hide();
    // tishi('end')
    inflg = true;
}

function loadErrorCallBack() {
    //    window.plugins.spinnerDialog.hide();
    inflg = true;
}


function tiaozhuan(url) {
    // if(url=="index.html"){
    //     get_index_data();
    // }
    mainView.router.loadPage(url);
}

function xiangmu(id) {
    console.log(id);
    tiaozhuan('xiangmu.html');
    xid = id;
}

myApp.onPageAfterAnimation("xiangmu", function () {
    get_xm_data(xid);
    addbutton = new Vue({
        el: '#addbutton',
        data: {
            roleid: localStorage.roleid,
        },
    });

});

function get_item_more(tab) {
   // qiye_loading = false;
    var page=$('#tab'+tab).attr('data-page');
    page++;
    var options = {
        type: 'POST',
        url: hapiurl + 'index.php?m=content&c=appapi&a=get_items_all', // 登录判断
        data: {
            'userid': localStorage.userid,
            'roleid': localStorage.roleid,
            'token': localStorage.token,
            'page':page
        },
        dtype: 'json',
        ts: "加载中...",
        error: '加载失败',
        fun: function (msg) {
            console.log(msg);
            var data={};
            $.each(msg, function (i, n) { 
             if(n['type']==tab){
                data= n
             }    
            });
            //console.log(data['data']);
            
            if(data['data'].length < 10 ){
              //  qiye_loading = true;
              $('#tab'+tab+" .content-block").hide();
            }
            var str = '';
            $.each(data['data'], function (i, n) {
                str += '<li><a href="javascript:form('+n['id']+',\''+data['name']+'\')" class="item-link"><div class="item-content"><div class="item-media"><img src="image/xq_icon.png"></div> <div class="item-inner"><div class="item-title">'+n['title']+'</div></div></div></a></li>';
            });
            $("#tab"+tab+" #xiangmulist").append(str);
            $('#tab'+tab).attr('data-page',page);
            
        }
    };
    appajax(options);
}

myApp.onPageBeforeAnimation("xiangmu", function () {
  if(localStorage.roleid==12){
    $('#tab-head .button').css({'width':'inherit','margin-bottom': '5px', 'border-left-width':'1px'})
    $('#tab-head').css({'flex-wrap':'wrap','margin-bottom': '-5px'})
}
});
var xid = "";
var dstatus = ""
var form_data=[]
function form(id, status) {
    tiaozhuan('form.html');
    xid = id;
    dstatus = status;
}

myApp.onPageAfterAnimation("form", function () {

    get_item_data(xid, dstatus);

});
myApp.onPageBeforeAnimation("form", function () {
    zijinload= false;
});


function qushitz() {
    if (localStorage.roleid != 11 && localStorage.roleid != 12) {
        tishi('您无权限访问统计页面')
        return false;
    }
    tiaozhuan('qushi.html')
}

//用户登录方法
function login() {
    var flg = true;
    if ($("#unameLog").val() == '') {
        myApp.modal({
            title: '',
            text: '请输入用户名',
            buttons: [{
                text: '确定',
                onClick: function () {}
            }]
        });
        flg = false;
    } else if ($("#upwdLog").val() == '') {
        myApp.modal({
            title: '',
            text: '请输入密码',
            buttons: [{
                text: '确定',
                onClick: function () {}
            }]
        });
        flg = false;
    }
    var nettype = $("#nettype").val();

    if (!flg) {
        return false;
    }
    localStorage.pwd = $("#upwdLog").val();

    var options = {
        type: 'POST',
        url: hapiurl + 'index.php?m=admin&c=index&a=login_ajax', // 登录判断
        data: $('#loginForm').serialize(),
        dtype: 'json',
        ts: '登陆中...',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //myApp.hidePreloader();
            if (XMLHttpRequest.readyState == 0) {
                myApp.modal({
                    title: '未登录',
                    text: '请确认选择的网络是否正确',
                    buttons: [{
                        text: '确定',
                        onClick: function () {}
                    }]
                });
            }
        },
        fun: function (msg1) {
            console.log(msg1)
            if (msg1 == "2") {
                tishi('密码错误，请重新输入');
                return false;
            } else if (msg1 == 0) {
                tishi('没有用户')
                return false;
            }
            var un = msg1['username']
            var tn = msg1['realname']
            localStorage.username = un
            localStorage.userid = msg1['userid']
            localStorage.roleid = msg1['roleid']
            localStorage.token = msg1['token'];
            htoken = msg1['token'];
            myApp.modal({
                title: '',
                text: '登录成功',
                buttons: [{
                    text: '确定',
                    onClick: function () {
                        var myDate = new Date();
                        localStorage.uname = $("#unameLog").val();
                        localStorage.expresstime = Date.parse(new Date()) + 86400000; // 登录过期时间为一天
                        localStorage.un = un;
                        localStorage.tn = tn;
                        myApp.closeModal('.login-screen');
                        $(".modal-overlay").css('display', 'none');
                        $(".popup-overlay").css('display', 'none');
                        //tiaozhuan('index.html')
                        get_index_data()
                        myLogin();
                        isLog();

                    }
                }]
            })
        }
    }
    appajax(options)
}

function logout() {
    myApp.modal({
        title: '',
        text: '是否退出登录？',
        buttons: [{
            text: '确定',
            onClick: function () {
                localStorage.uname = '';
                localStorage.expresstime = '';
                localStorage.type = "";
                localStorage.un = "";
                localStorage.tn = "";
                localStorage.roleid = "";
                localStorage.username = "";
                ip = "";
                $('#tishi').html("");
                tiaozhuan('index.html');
                myApp.loginScreen() //开启登录界面
                $(".modal-overlay").css('display', 'none');
                $(".popup-overlay").css('display', 'none');

            }
        }, {
            text: '取消',
            onClick: function () {}
        }]
    });
}

//获取首页数据
function get_index_data() {
    if (localStorage.roleid && now < localStorage.expresstime) { //当
        var options = {
            type: 'POST',
            url: hapiurl + 'index.php?m=content&c=appapi&a=get_items', // 登录判断
            data: {
                'userid': localStorage.userid,
                'roleid': localStorage.roleid,
                'token': localStorage.token
            },
            dtype: 'json',
            ts: '',
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            },
            fun: function (msg1) {
                index_list = new Vue({
                    el: '#index_list',
                    data: {
                        indexlist: msg1,
                    }
                });
            }
        }
        appajax(options)
    }
}
var items = [];
localStorage.d_id = "";

function get_item_data(id, status) {
   //console.log(status);
    var action = ""
    localStorage.d_id = id;
    if (localStorage.roleid == 9 || status == '未处理' || status == '已打回') {// 分角色url地址不同
        action = 'item';

    } else {
        action = 'item_true';
    }
    var options = {
        type: 'POST',
        url: hapiurl + 'index.php?m=content&c=appapi&a=' + action,
        data: {
            'id': id,
            'token': localStorage.token
        },
        dtype: 'json',
        ts: '',
        error: function (XMLHttpRequest, textStatus, errorThrown) {},
        fun: function (msg1) {
            if(['36','63','133','161','101'].indexOf(msg1['dtype']) != -1){
                zijinload=true;
            }
            var checklist=[];
            if ( action =='item_true') {
            checklist = msg1['status'];
            }
            items = msg1;
            xmcontent = new Vue({
                el: '#xmcontent',
                data: {
                    xmcontent: msg1,
                    roleid: localStorage.roleid,
                    userid: localStorage.userid,
                    action: action,
                    checklist:checklist,
                    zijinload:zijinload
                },
    
            });

            // xmcontent = new Vue({
            //     el: '#xmcontent',
            //     data: {
            //         xmcontent: msg1,
            //         roleid: localStorage.roleid,
            //         userid: localStorage.userid,
            //         action: action
            //     }
            // });
            xmcontent.$forceUpdate()
        }
    }
    appajax(options)
}


function get_xm_data(id) {
    if (localStorage.roleid) {
        var options = {
            type: 'POST',
            url: hapiurl + 'index.php?m=content&c=appapi&a=get_items_all', // 登录判断
            data: {
                'userid': localStorage.userid,
                'roleid': localStorage.roleid,
                'token': localStorage.token
            },
            dtype: 'json',
            ts: '',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //myApp.hidePreloader();

            },
            fun: function (msg1) {
                tabhead_list = new Vue({
                    el: '#tab-head',
                    data: {
                        tablist: msg1,
                    }
                });
                tabbody_list = new Vue({
                    el: '#tab-body',
                    data: {
                        tabbody_list: msg1,
                    },
                    mounted: function () {
                        myApp.showTab('#tab' + xid);
                    }

                });
                myApp.hidePreloader();
            }
        }
        appajax(options)
    }
}

//localStorage.uname="登录"
function myLogin() {
    if (localStorage.uname) {
        $("#Showuname").removeClass('open-login-screen');
        $("#Showuname i").removeClass('fa-user-circle');
        $("#Showuname i").addClass('fa-user-circle-o');
        $("#Showuname").attr('href', 'javascript:tiaozhuan("my.html");');
        $("#my").attr('href', 'my.html');
        $("#ename").html(localStorage.uname);
    }
}
myLogin();



myApp.onPageAfterAnimation("my_delist", function () {
    var uname = localStorage.uname;
    $("#uname").html(localStorage.un);
    $("#truename").html(localStorage.tn);

});

// 设置回退效果和双击退出
function huitui(url) {
    var options = {
        'url': url,
        'force': true
    }
    mainView.router.back(options)
}

function eventBackButton() {
    var view = mainView.activePage.name;
    console.log(view)
    if (view == 'index') {
        window.plugins.toast.showWithOptions({
            message: "请再按一次退出",
            duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself. 
            position: "bottom",
            addPixelsY: -140 // added a negative value to move it up a bit (default 0) 
        });
        // Toast.showShort('再次点击退出程序',2000);
        //3秒后重新注册  
        document.removeEventListener("backbutton", eventBackButton, true); //注销返回键  
        var intervalID = window.setInterval(
            function () {
                window.clearInterval(intervalID);
                document.addEventListener("backbutton", eventBackButton, false); //返回键  
            },
            3000
        );
    } else if (view == 'xiangmu' || view == 'my' || view == 'qushi') {
        tiaozhuan('index.html');
    } else {
        mainView.router.back();
    }
}
document.addEventListener("backbutton", eventBackButton, false);

function isLog() {
    if (!localStorage.debugC) {
        window.JPush.setAlias({
                sequence: 1,
                alias: localStorage.uname
            },
            function (result) {
                // alert(JSON.stringify(result));
            },
            function (error) {
                // alert(JSON.stringify(error));
            }
        );
        var tags = [];
        tags.push(localStorage.uname);
        // if(localStorage.company_name != 'null' && localStorage.company_name != '' && localStorage.company_name != null && localStorage.company_name != undefined ){
        //     tags.push(localStorage.company_name);
        // }
        window.JPush.setTags({
                sequence: 1,
                tags: tags
            },
            function (result) {
                // alert(JSON.stringify(result));
            },
            function (error) {
                // alert(JSON.stringify(error));
            }
        );
    }
}

function shenhe(id) {
    var buttons = [{
            text: '通过',
            bold: true,
            onClick: function () {
                pass(id)
            }
        },
        {
            text: '不通过',
            bold: true,
            onClick: function () {
                nopass(id)
            }
        },
        {
            text: '取消',
            color: 'red'
        },
    ];
    myApp.actions(buttons);

}

function pass(id) {
    shenhe_ajax(id, "", 2);
}
function tuihui(id) { //项目打回
    myApp.confirm('项目打回',
        ['是否打回？'],
        function () {
         nopass(id)  
        },
        function () {
            
        })
}

function nopass(id) {
    myApp.modal({
        title: '添加理由',
        text: '',
        afterText: '<div class="input-field"><textarea id="textarea_value" class="modal-textarea-input modal-textarea-input"></textarea></div>',
        buttons: [{
                text: '确定',
                onClick: function () {
                    shenhe_ajax(id, $$('#textarea_value').val(), 3);
                }
            },
            {
                text: '取消',
                onClick: function () {}
            },

        ]
    })
}

function shenhe_ajax(id, reason, status) {
    $.ajax({
        type: "post",
        url: hapiurl + "index.php?m=content&c=appapi&a=shenhe",
        data: {
            'deid': id,
            'status': status,
            'reason': reason,
            'token': localStorage.token
        },
        beforeSend: function () {
            myApp.showPreloader();
        },
        complete: function () {
            myApp.hidePreloader();
        },
        success: function (response) {
            if (response == 1) {
                tishi('操作成功');
                //myApp.closeModal('.popup-fenpei');
                tiaozhuan('xiangmu.html');
            } else {
                tishi('出现问题，请稍后重试');
            }
        }
    });
}

function zhipai(id) {
    $('#demand_id').val(id);
    var options = {
        type: 'POST',
        url: hapiurl + 'index.php?m=content&c=appapi&a=get_bumen',
        data: {
            'token': localStorage.token
        },
        dtype: 'json',
        ts: '',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //myApp.hidePreloader();

        },
        fun: function (msg1) {

            bumenlist = new Vue({
                el: '#bumenlist',
                data: {
                    bumenlist: msg1,
                },
                methods: {
                    selecet: function (id) {
                        selecet_bumen(id);
                    },

                }
            });
            bumenlist.$forceUpdate();
        }
    }
    appajax(options)
    myApp.popup('.popup-fenpei');
}

function zhuanzhi(id) {
    $('#demand_zhuanzhi_id').val(id);
    var options = {
        type: 'POST',
        url: hapiurl + 'index.php?m=content&c=appapi&a=get_bumen',
        data: {
            'token': localStorage.token
        },
        dtype: 'json',
        ts: '',
        error: function (XMLHttpRequest, textStatus, errorThrown) {},
        fun: function (msg1) {

            zhuanzhi_bumenlist = new Vue({
                el: '#zhuanzhi_bumenlist',
                data: {
                    bumenlist: msg1,
                    userid: localStorage.userid
                },
                methods: {
                    selecet: function (id) {
                        selecet_bumen_zhuanzhi(id);
                    },

                }
            });
        }
    }
    appajax(options)
    myApp.popup('.popup-zhuanzhi');
}
function sub() {
    var userid = "";
    $('#bumenlist select :selected').each(function () {
        if ($(this).val() != "") {
            userid += $(this).val() + ",";
        }
    });
    
    if (userid == "") {
        tishi('请选择办事人员');
        return false;
    } else {
        userid = userid.substr(0, userid.length - 1);
    }
    //    return false;
    $.ajax({
        type: "post",
        url: hapiurl + "index.php?m=content&c=appapi&a=return_kefu",
        data: {
            'deid': $("#demand_id").val(),
            'userid': userid,
            'token': localStorage.token
        },
        beforeSend: function () {

        },
        complete: function () {

        },
        success: function (response) {
            if (response == 1) {
                tishi('分配成功');
                myApp.closeModal('.popup-fenpei');
                //mainView.router.back();
                tiaozhuan('xiangmu.html');
            } else {
                tishi('分配出现问题，请稍后重试');
            }
        }
    });

}
function selecet_bumen(id) {
    // $("input[name='lang']").change(function () {
    // if (!$('#' + id).prop("checked")) {
    //     $('#person_' + id).show();
    // } else {
    //     $('#person_' + id).hide();
    //     $('#userid_' + id).find("option:contains('请选择')").prop("selected", true);
    // }
    $('#person_' + id).toggle();
        console.log($('#person_' + id).is(':hidden'));
        if (!$('#person_' + id).is(':hidden')) {
            $('#userid_' + id).find("option:contains('请选择')").prop("selected", true);
        }
    //  });
}
function selecet_bumen_zhuanzhi(id) {
    // $("input[name='lang']").change(function () {
        //console.log($('#z_' + id).prop("checked"))
    // if (!$('#z' + id).is(':checked')) {
        $('#zperson_' + id).toggle();
        console.log($('#zperson_' + id).is(':hidden'));
        if (!$('#zperson_' + id).is(':hidden')) {
            $('#zuserid_' + id).find("option:contains('请选择')").prop("selected", true);
        }
    // } 
    // if ($('#z' + id).is(':checked')){
    //     $('#zperson_' + id).hide();
    //     $('#zuserid_' + id).find("option:contains('请选择')").prop("selected", true);
    // }
    //  });
}
function sub_zhuanzhi() {
    
    var userid = "";
    $('#zhuanzhi_bumenlist select :selected').each(function () {
        if ($(this).val() != "") {
            userid += $(this).val() + ",";
        }
    });
    
    if (userid == "") {
        tishi('请选择办事人员');
        return false;
    } else {
        userid = userid.substr(0, userid.length - 1);
    }
    //    return false;
    $.ajax({
        type: "post",
        url: hapiurl + "index.php?m=content&c=appapi&a=return_people",
        data: {
            'deid': $("#demand_zhuanzhi_id").val(),
            'userids': userid,
            'userid':localStorage.userid,
            'token': localStorage.token
        },
        beforeSend: function () {

        },
        complete: function () {

        },
        success: function (response) {
            if (response == 1) {
                tishi('转指成功');
                myApp.closeModal('.popup-zhuanzhi');
                tiaozhuan('xiangmu.html');
            } else {
                tishi('转指出现问题，请稍后重试');
            }
        }
    });

}


function addxm() {
    myApp.popup('.popup-addxm');
    add_content1(1)
}

var chuli_type=""
var dataclear=[]
function chuli(id) {
    chuli_type=1 //
    tiaozhuan('editxm.html');
    $('#type').val("chuli");
    $('#tuisong').show();
    var options = {
        type: 'POST',
        async:false,
        url: hapiurl + 'index.php?m=content&c=appapi&a=item', // 登录判断
        data: {
            'id': id,
            'token': localStorage.token
        },
        dtype: 'json',
        ts: '',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //myApp.hidePreloader();

        },
        fun: function (msg1) {
            dataclear = msg1;
            // dataclear['time']='';
            chulixm = new Vue({
                el: '#chulixm',
                data: {
                    items: dataclear,
                    checklist: [],
                   // selcted:dataclear['dtype']
                },
                methods: {
                    on_sub: function (id) {
                        sub_chuli();
                    },
                }
               
            });
            Vue.set(chulixm.items, 'time', Date.parse(new Date()))

            chulixm.$forceUpdate()
            add_content(msg1.country)
            //findCkey(dataclear['dtype'])
        }
    }
    appajax(options)
}

function bianji(id) {
    chuli_type=2
    tiaozhuan('editxm.html');
    var options = {
        type: 'POST',
        url: hapiurl + 'index.php?m=content&c=appapi&a=item_true', // 登录判断
        data: {
            'id': id,
            'token': localStorage.token
        },
        dtype: 'json',
        ts: '',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //myApp.hidePreloader();

        },
        fun: function (msg1) {
            dataclear = msg1;
            console.log(msg1.status);
            chulixm = new Vue({
                el: '#chulixm',
                data: {
                    items: msg1,
                    checklist: msg1.status,
                    selcted:dataclear['dtype']
                },
                methods: {
                    on_sub: function (id) {
                        sub_chuli();
                    },
                }
            });

            add_content(msg1.country)
            //findCkey(dataclear['dtype'])
        }
    }
    appajax(options)
 
}
myApp.onPageBeforeAnimation('editxm', function () {
   if (chuli_type==2) {
    $('#type').val("bian");
    // $('#hezuo').hide();
    // $('#laiyuan').hide();
    // $('#hangye').hide();
    $('#tuisong').hide();
   }
})

function jindu_xiu(id) { 
    //console.log(items['status']);
    zijinload=false;
    tiaozhuan('xmjindu.html');
    var options = {
        type: 'POST',
        url: hapiurl + 'index.php?m=content&c=appapi&a=demand_amount&id='+id, // 
        data: {
            'id': id,
            'token': localStorage.token
        },
        dtype: 'json',
        ts: '',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
           

        },
        fun: function (msg1) {
            if(items['status']!=null){
                var cl=items['status'];
            }else{
                var cl=[]; 
            }
            jindu = new Vue({
                el: '#jindu',
                data: {
                    checklist: cl
                },
               
            });
            in_amount = new Vue({
                el: '#in_amount',
                data: {
                    amout_items:msg1 ,
                  
                },
                
               
            });
            demand_id = new Vue({
                el: '#demand_id',
                data: {
                    id:id ,
                  
                },
               
            });
            // in_amount.$forceUpdate()
            //  jindu.$forceUpdate()
        }
    }
    appajax(options)
    // myApp.popup('.popup-jindu');
 }

myApp.onPageAfterAnimation('xmjindu', function () {
    
 })

//增加其他语言版本的需求
function add_content(lan) {
    //将语言标识先赋进去
    $('#lan').val(lan);
    console.log( $('#lan').val())
    console.log(dataclear)
    //获取合作类型
    $.post(hapiurl + 'index.php?m=content&c=appapi&a=getCate', {
        lan: lan,
        "token": localStorage.token
    }, function (re) {
        if (re.status == 1) {
            var data = re.info;
            $('#dtype').html("");
            var dataHtml = '';
            for (var key in data) {
                if(data[key]['catid']==dataclear['dtype']){
                    
                dataHtml = '<option selected value="' + data[key]['catid'] + '">' + data[key]['catname'] + '</option>';
                }else{
               dataHtml = '<option value="' + data[key]['catid'] + '">' + data[key]['catname'] + '</option>';
                }
                
                $('#dtype').append(dataHtml);
            }
        }
        findCkey();
    }, 'json');
    //输入项目来源
    $('#area_select').html("");
    //输入行业类型
    $('#industry_type').html("");
    var area=[]
    var insdustry=[]
    var area_select="",
        industry_type="";
    if (lan == 1) {
        area=['境内','境外'];
        insdustry=['消费电子产业','汽车产业','化工新材料产业','生物医药与健康产业','节能环保产业','智能制造产业','化工新材料产业','半导体产业','海洋科技产业','大数据与云计算产业','新能源产业']
    } else if (lan == 2) {
        area=['Domestic investment','Overseas investment'];
        insdustry=['Consumer electronics industry','automobile industry','New material industry of chemical industry','Biomedicine and health industry','Energy saving and environmental protection industry','Intelligent manufacturing industry','New material industry of chemical industry','Semiconductor industry','Marine Science and technology industry','Big data and cloud computing industry','New energy industry']
       
    } else if (lan == 3) {
        area=['Inlandszusammenarbeit','Auslandszusammenarbeit'];
        insdustry=['Die unterhaltungselektronik - industrie','Die auto - industrie','NeUe Chemische stoffe - industrie','Biomedizin und Gesundheit - industrie','Energieeinsparung und Umweltschutz','Intelligente der verarbeitenden industrie','NeUe Chemische stoffe - industrie','Die halbleiter - industrie','Meereswissenschaft und - Technologie - industrie','Big data und cloud - Computing - industrie','NeUe energie und industrie']
        // $('#area_select').append('<option value=\"Inlandszusammenarbeit\">Inlandszusammenarbeit</option><option value=\"Auslandszusammenarbeit\">Auslandszusammenarbeit</option>');
        // $('#industry_type').append('<option value=\"Die unterhaltungselektronik - industrie\">Die unterhaltungselektronik - industrie</option><option value=\"Die auto - industrie\">Die auto - industrie</option><option value=\"NeUe Chemische stoffe - industrie\">NeUe Chemische stoffe - industrie</option><option value=\"Biomedizin und Gesundheit - industrie\">Biomedizin und Gesundheit - industrie</option><option value=\"Energieeinsparung und Umweltschutz\">Energieeinsparung und Umweltschutz</option><option value=\"Intelligente der verarbeitenden industrie\">Intelligente der verarbeitenden industrie</option><option value=\"NeUe Chemische stoffe - industrie\">NeUe Chemische stoffe - industrie</option><option value=\"Die halbleiter - industrie\">Die halbleiter - industrie</option><option value=\"Meereswissenschaft und - Technologie - industrie\">Meereswissenschaft und - Technologie - industrie</option><option value=\"Big data und cloud - Computing - industrie\">Big data und cloud - Computing - industrie</option><option value=\"NeUe energie und industrie\">NeUe energie und industrie</option>');
    } else if (lan == 4) {
        area =['국내 합작','해외 합작']
        insdustry=['소비전자 산업','자동차 산업','화공 신재료 산업','생물 의약과 건강 산업','에너지 절약 환경 보호 산업','지능 제조 산업','화공 신재료 산업','반도체 산업','해양 과학 기술 산업','큰 데이터 와 운산 계산 산업','신에너지 산업']

    } else if (lan == 5) {
        area =['国内投資','海外投資']
      
        insdustry=['消費電子産業','自動車産業','化学工業の新材料産業','生物医薬と健康産業','省エネ産業','インテリジェント製造産業','化学工業の新材料産業','半導体産業','海洋科学技術産業','大データと雲の計算産業','新エネルギー産業']
    }
    $.each(area, function (i, v) {
        if(v==dataclear['area_select']){
        area_select +='<option selected value="'+v+'">'+v+'</option>'
        }else{
        area_select +='<option value="'+v+'">'+v+'</option>'
        } 
       
    });

    $.each(insdustry, function (i, v) { 
        if(v==dataclear['industry_type']){
            industry_type +='<option selected value="'+v+'">'+v+'</option>'
            }else{
            industry_type +='<option value="'+v+'">'+v+'</option>'
            } 
    });

    $('#area_select').append(area_select);
    $('#industry_type').append(industry_type);

}
//寻找其合作类型附属字段		
function findCkey() {
    $('.go_no').remove();
    var dtype = $('#dtype').val();
    console.log(dataclear['select_array'])

    $.post(hapiurl + 'index.php?m=content&c=appapi&a=getKeyByDtype', {
        'dtype': dtype,
        'token': localStorage.token
    }, function (re) {
        if (re.status == 1) {
            var rdata = re.info;
            var html = "";
            for (var rkey in rdata) {
                //制作小项	
                var khtml = "";
                var kdata = rdata[rkey]['k_value'];
               // console.log(kdata);
                for (var kkey in kdata) {
                   if( dataclear['select_array'].indexOf(kdata[kkey]) > -1){
                    khtml += "<option value=\"" + kdata[kkey] + "\" selected>" + kdata[kkey] + "</option>";
                   }else{
                    khtml += "<option value=\"" + kdata[kkey] + "\">" + kdata[kkey] + "</option>";
                   }

                   
                }
                //制作大项
                // html += "<tr class=\"go_no\"><th width=\"200\">"+rdata[rkey]['ctname']+"</th><td><input type=\"hidden\" name=\"dkinfo["+rkey+"]["+rdata[rkey]['id']+"][ct_id]\" value=\""+rdata[rkey]['id']+"\" /><select  name=\"dkinfo["+rkey+"]["+rdata[rkey]['id']+"][content]\">"+khtml+"</select></td></tr>";
                html += '<li  class="go_no"><div class="item-content">' +
                    '<div class="item-media"><i class="icon icon-form-gender"></i></div>' +
                    '<div class="item-inner">' +
                    '<div class="item-title label">' + rdata[rkey]['ctname'] + '</div>' +
                    '<div class="item-input"><input type=\"hidden\" name=\"dkinfo[' + rkey + '][' + rdata[rkey]['id'] + '][ct_id]" value="' + rdata[rkey]['id'] + '" />' +
                    '<select name="dkinfo['+rkey+']['+rdata[rkey]['id']+'][content]">' +
                    khtml +
                    '</select>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</li>'
            }
            $('#chulixm ul').append(html);
        }
    }, 'json');

}

function add_content1(lan) {
    //将语言标识先赋进去
    $('#lan1').val(lan);
    //获取合作类型
    $.post(hapiurl + 'index.php?m=content&c=appapi&a=getCate', {
        lan: lan,
        "token": localStorage.token
    }, function (re) {
        if (re.status == 1) {
            var data = re.info;
            $('#dtype1').html("");
            var dataHtml = '';
            for (var key in data) {
                dataHtml = '<option value="' + data[key]['catid'] + '">' + data[key]['catname'] + '</option>';
                $('#dtype1').append(dataHtml);
            }
        }
        findCkey1();
    }, 'json');
    //输入项目来源
    $('#area_select1').html("");
    //输入行业类型
    $('#industry_type1').html("");
    if (lan == 1) {
        $('#area_select1').append('<option value=\"境内\">境内</option><option value=\"境外\">境外</option>');
        $('#industry_type1').append('<option value=\"消费电子产业\">消费电子产业</option><option value=\"汽车产业\">汽车产业</option><option value=\"化工新材料产业\">化工新材料产业</option><option value=\"生物医药与健康产业\">生物医药与健康产业</option><option value=\"节能环保产业\">节能环保产业</option><option value=\"智能制造产业\">智能制造产业</option><option value=\"化工新材料产业\">化工新材料产业</option><option value=\"半导体产业\">半导体产业</option><option value=\"海洋科技产业\">海洋科技产业</option><option value=\"大数据与云计算产业\">大数据与云计算产业</option><option value=\"新能源产业\">新能源产业</option>');
    } else if (lan == 2) {
        $('#area_select1').append('<option value=\"Domestic investment\">Domestic investment</option><option value=\"Overseas investment\">Overseas investment</option>');
        $('#industry_type1').append('<option value=\"Consumer electronics industry\">Consumer electronics industry</option><option value=\"automobile industry\">automobile industry</option><option value=\"New material industry of chemical industry\">New material industry of chemical industry</option><option value=\"Biomedicine and health industry\">Biomedicine and health industry</option><option value=\"Energy saving and environmental protection industry\">Energy saving and environmental protection industry</option><option value=\"Intelligent manufacturing industry\">Intelligent manufacturing industry</option><option value=\"New material industry of chemical industry\">New material industry of chemical industry</option><option value=\"Semiconductor industry\">Semiconductor industry</option><option value=\"Marine Science and technology industry\">Marine Science and technology industry</option><option value=\"Big data and cloud computing industry\">Big data and cloud computing industry</option><option value=\"New energy industry\">New energy industry</option>');
    } else if (lan == 3) {
        $('#area_select1').append('<option value=\"Inlandszusammenarbeit\">Inlandszusammenarbeit</option><option value=\"Auslandszusammenarbeit\">Auslandszusammenarbeit</option>');
        $('#industry_type1').append('<option value=\"Die unterhaltungselektronik - industrie\">Die unterhaltungselektronik - industrie</option><option value=\"Die auto - industrie\">Die auto - industrie</option><option value=\"NeUe Chemische stoffe - industrie\">NeUe Chemische stoffe - industrie</option><option value=\"Biomedizin und Gesundheit - industrie\">Biomedizin und Gesundheit - industrie</option><option value=\"Energieeinsparung und Umweltschutz\">Energieeinsparung und Umweltschutz</option><option value=\"Intelligente der verarbeitenden industrie\">Intelligente der verarbeitenden industrie</option><option value=\"NeUe Chemische stoffe - industrie\">NeUe Chemische stoffe - industrie</option><option value=\"Die halbleiter - industrie\">Die halbleiter - industrie</option><option value=\"Meereswissenschaft und - Technologie - industrie\">Meereswissenschaft und - Technologie - industrie</option><option value=\"Big data und cloud - Computing - industrie\">Big data und cloud - Computing - industrie</option><option value=\"NeUe energie und industrie\">NeUe energie und industrie</option>');
    } else if (lan == 4) {
        $('#area_select1').append('<option value=\"국내 합작\">국내 합작</option><option value=\"해외 합작\">해외 합작</option>');
        $('#industry_type1').append('<option value=\"소비전자 산업\">소비전자 산업</option><option value=\"자동차 산업\">자동차 산업</option><option value=\"화공 신재료 산업\">화공 신재료 산업</option><option value=\"생물 의약과 건강 산업\">생물 의약과 건강 산업</option><option value=\"에너지 절약 환경 보호 산업\">에너지 절약 환경 보호 산업</option><option value=\"지능 제조 산업\">지능 제조 산업</option><option value=\"화공 신재료 산업\">화공 신재료 산업</option><option value=\"반도체 산업\">반도체 산업</option><option value=\"해양 과학 기술 산업\">해양 과학 기술 산업</option><option value=\"큰 데이터 와 운산 계산 산업\">큰 데이터 와 운산 계산 산업</option><option value=\"신에너지 산업\">신에너지 산업</option>');

    } else if (lan == 5) {
        $('#area_select1').append('<option value=\"国内投資\">国内投資</option><option value=\"海外投資\">海外投資</option>');
        $('#industry_type1').append('<option value=\"消費電子産業\">消費電子産業</option><option value=\"自動車産業\">自動車産業</option><option value=\"化学工業の新材料産業\">化学工業の新材料産業</option><option value=\"生物医薬と健康産業\">生物医薬と健康産業</option><option value=\"省エネ産業\">省エネ産業</option><option value=\"インテリジェント製造産業\">インテリジェント製造産業</option><option value=\"化学工業の新材料産業\">化学工業の新材料産業</option><option value=\"半導体産業\">半導体産業</option><option value=\"海洋科学技術産業\">海洋科学技術産業</option><option value=\"大データと雲の計算産業\">大データと雲の計算産業</option><option value=\"新エネルギー産業\">新エネルギー産業</option>');
    }


}
//寻找其合作类型附属字段		ADD.LUCY.20181115
function findCkey1() {
    $('.go_no1').remove();
    var dtype = $('#dtype1').val();
    console.log(dtype)
    $.post(hapiurl + 'index.php?m=content&c=appapi&a=getKeyByDtype', {
        'dtype': dtype,
        'token': localStorage.token
    }, function (re) {
        if (re.status == 1) {
            var rdata = re.info;
            var html = "";
            for (var rkey in rdata) {
                //制作小项	
                var khtml = "";
                var kdata = rdata[rkey]['k_value'];
                console.log(kdata);
                for (var kkey in kdata) {
                    khtml += "<option value=\"" + kdata[kkey] + "\">" + kdata[kkey] + "</option>";
                }

                //制作大项
                // html += "<tr class=\"go_no\"><th width=\"200\">"+rdata[rkey]['ctname']+"</th><td><input type=\"hidden\" name=\"dkinfo["+rkey+"]["+rdata[rkey]['id']+"][ct_id]\" value=\""+rdata[rkey]['id']+"\" /><select  name=\"dkinfo["+rkey+"]["+rdata[rkey]['id']+"][content]\">"+khtml+"</select></td></tr>";
                html += '<li  class="go_no1"><div class="item-content">' +
                    '<div class="item-media"><i class="icon icon-form-gender"></i></div>' +
                    '<div class="item-inner">' +
                    '<div class="item-title label">' + rdata[rkey]['ctname'] + '</div>' +
                    '<div class="item-input"><input type=\"hidden\" name=\"dkinfo[' + rkey + '][' + rdata[rkey]['id'] + '][ct_id]" value="' + rdata[rkey]['id'] + '" />' +
                    '<select name="dkinfo['+rkey+']['+rdata[rkey]['id']+'][content]">' +
                    khtml +
                    '</select>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</li>'
            }
            $('#addxm ul').append(html);
        }
    }, 'json');

}


function sub_chuli() {
    var type = $('#type').val()
    if (type == "chuli") {
        action = "demand_make"

    } else {
        action = "demand_edit"
    }

    var chuli_data = $('#sub_chuli').serialize();
    $.ajax({
        type: "post",
        url: hapiurl + 'index.php?m=content&c=appapi&a=' + action + '&token=' + localStorage.token + '&userid=' + localStorage.userid,
        data: chuli_data,
        success: function (response) {
            if (response == 1) {
                tishi('处理成功')
                myApp.closeModal('.popup-chulixm')
                tiaozhuan('xiangmu.html');
            }
            console.log(response);
        }
    });
}

function sub_create() {
    var chuli_data = $('#sub_create').serialize();
    $.ajax({
        type: "post",
        url: hapiurl + 'index.php?m=content&c=appapi&a=demand_make&token=' + localStorage.token + '&userid=' + localStorage.userid,
        data: chuli_data,
        success: function (response) {
            if (response == 1) {
                tishi('处理成功')
                myApp.closeModal('.popup-addxm')
                tiaozhuan('xiangmu.html');
            }
            //console.log(response);
        }
    });
}


function delamout(id){
    $('.del_'+id).remove();
}
//添加一笔资金
function add_amount(){
    var num = $('#jindu_num').val();
    $('#in_amount').append('<div class=\"del_'+num+'\" style="border: 1px solid #dddddd;padding: 3px;margin: 3px 0;"><div class="jine"><span>金额：</span><input type=\"text\" name=\"adata['+num+'][amout]\" value=\"\" />万元</div><div  class="daozhang"><span>到账时间：</span><input id=\"start_time_'+num+'\" type=\"date\" name=\"adata['+num+'][get_time]\" value=\"\" /><button class="button button-fill button-raised shanchu" type=\"button\" onclick=\"delamout('+num+')\">删除</button></div></div> ');
    // date_chajian(num);
    num++;
    // console.log(num)
    $('#jindu_num').val(num);
}

function sub_jindu(){
    $("#in_amount input[type='text']").each(function () {
        if ($(this).val() == "") {
            tishi("请填写资金信息");
            return false;
        }
    })
    $("#in_amount input[type='date']").each(function () {
        if ($(this).val() == "") {
            tishi("请填写日期");
            return false;
        }
    })
    var data = $('#jindu_form').serialize();
    var id=$('#demand_id').val();
    $.ajax({
        type: "post",
        url: hapiurl + 'index.php?m=content&c=appapi&a=demand_amount&token=' + localStorage.token + '&userid=' + localStorage.userid+'&dosubmit=1&id='+id,
        data: data,
        success: function (response) {
            if (response == 1) {
                tishi('修改成功')
                mainView.router.back()
             //   tiaozhuan('xiangmu.html');
            }
            
        }
    });

}
//领导批示
var pishiid="";
function pishi(id) {
   pishiid=id;
   tiaozhuan('ldpishi.html');
   
  }
  myApp.onPageBeforeAnimation('ldpishi',function () { 
    get_pishilist(pishiid)
   })
  myApp.onPageAfterAnimation("ldpishi", function () {
    $("#pid").val(pishiid);
  
 });
 

function  pishtj(){
  var pid="",
     content="";
    pid=$('#pid').val();
    content=$('#ly_content').val();
    if (content=="") {
     tishi('请输入批示内容！');
     return false;
    } 
     var options = {
        type: 'POST',
        url: hapiurl + 'index.php?m=content&c=appapi&a=ly', // 
        data: {
            'token': localStorage.token,
            'pid':pid,
            'content':content,
            'userid':localStorage.userid,
            'username':localStorage.username

        },
        dtype: 'json',
        ts: '',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        },
        fun: function (msg1) {
           if(msg1=="1"){
            tishi('批示完成')
            mainView.router.back()
           }else{
            tishi('错误，请重试')
           }
           
        }
    } 
    appajax(options)
}
function get_pishilist(id){
    var options = {
        type: 'POST',
        url: hapiurl + 'index.php?m=content&c=appapi&a=ly_list',// 
        data: {
            'pid': id,
            'token': localStorage.token,
           },
        dtype: 'json',
        ts: '',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        },
        fun: function (msg1) {
           //console.log(msg1);
             pishilist = new Vue({
                 el: '#pishilist',
                 data: {
                    pishilist:msg1 ,
                    flag:-1
                  },
                  methods: {
                    change_zhan:function(index) {
                        this.flag=index;
                       // this.flag = !this.flag
                    },
                }
               
             });
             pishilist.$forceUpdate()
        }
    } 
    appajax(options);
 } 
// function get_lylist_more() {
//      var page=$('#pagenum').attr('data-page');
//      page++;
//      var options = {
//          type: 'POST',
//          url: hapiurl + 'index.php?m=content&c=appapi&a=ly_list', // 登录判断
//          data: {
//             'pid': id,
//             'token': localStorage.token,
//             'page':page
//          },
//          dtype: 'json',
//          ts: "加载中...",
//          error: '加载失败',
//          fun: function (msg) {
//              if(msg.length < 10 ){
//                //  qiye_loading = true;
//                $('#tab'+tab+" .content-block").hide();
//              }
//              var str = '';
//              $.each(msg, function (i, n) {
//                  str += '<li><a href="javascript:form()" class="item-link"><div class="item-content"><div class="item-media"><img src="image/xq_icon.png"></div> <div class="item-inner"><div class="item-title"></div></div></div></a></li>';
//              });
//              $("#pishilist").append(str);
//              $('#pagenum').attr('data-page',page);
             
//          }
//      };
//      appajax(options);
//  }