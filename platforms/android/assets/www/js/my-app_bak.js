var ip = "";
if (localStorage.type == "nei") {
    ip = "192.168.6.213";
} else {
    ip = "101.230.193.93";
}

var hapiurl = 'http://' + ip + ':8080/baoshan/'

function appajax(options) {
    $.ajax({
        type: options.type,
        url: options.url,
        data: options.data,
        dataType: options.dtype,
        beforeSend: function (XMLHttpRequest) {
            if (!localStorage.debugC && options.ts)(window.plugins.spinnerDialog.show())
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
            if (!localStorage.debugC)(window.plugins.spinnerDialog.hide())
        },
        complete: function (XMLHttpRequest, textStatus) {
            if (!localStorage.debugC)(window.plugins.spinnerDialog.hide())
        }
    })
}




var myApp = new Framework7();
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true,
    ignoreCache: true,
    activeState: false,
    swipeBackPage: false //滑动返回上一页关闭

});
myApp.onPageBeforeAnimation('aboutapp', function () {
    $('#ver').html(AppVersion.version)
})
myApp.onPageInit('about', function (page) {
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});
myApp.onPageInit('*', function (page) {
    if (!localStorage.uname || localStorage.uname == '') {
        if ((localStorage.expresstime != '') && (now > localStorage.expresstime)) {
            $('#tishi').html("登录已过期请重新登录")
        } else {
            $('#tishi').html("")
        }
        myApp.loginScreen()
        return false;
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
//设置全局时间
var myDate = new Date();
var thisyear = myDate.getFullYear();
var month = myDate.getMonth();
var thisjidu = ""; // 当前季度
var thisniandu = ""; //当前半年
var thisyear_bannian = ""

if (month < 6) {
    thisniandu = "上半年";
} else {
    thisniandu = "下半年";
}
var lastniandu = "";
var lastniandu_months = "";
if (thisniandu == "下半年") {
    lastniandu_months = "1-6月";
    lastniandu = "上半年"
    thisyear_bannian = thisyear
} else {
    thisyear_bannian = thisyear - 1;
    lastniandu = "下半年";
    lastniandu_months = "7-12月";
}
if (month < 3) {
    thisjidu = 1
} else if (month < 6) {
    thisjidu = 2
} else if (month < 9) {
    thisjidu = 3
} else if (month < 12) {
    thisjidu = 4
}
var thismonth = ""; //当前月份
if (month >= 9) {
    thismonth = month + 1;
} else {
    thismonth = "0" + (month + 1);
}
var lastjidu = "";
var thisyear_jidu = ""
if (thisjidu > 1) {
    lastjidu = thisjidu - 1;
    thisyear_jidu = thisyear
} else {
    thisyear_jidu = thisyear - 1
    lastjidu = 4;
}
var lastmon = ""; //前一个月
var thisyear1 = thisyear;
if (month >= 10) {
    lastmon = month;
} else if (month == 0) {
    lastmon = "12";
    thisyear1 = thisyear - 1;
} else {
    lastmon = "0" + month;
}
var firstDay = thisyear1 + "-" + lastmon + "-" + "01"; //上个月的第一天

var lastDate = new Date(thisyear1, lastmon, 0);
var lastDay = thisyear1 + "-" + lastmon + "-" + lastDate.getDate(); //上个月的最后一天
console.log(thisyear1);
console.log(lastDay)
//全局时间结束


myApp.onPageBeforeAnimation("xiangqing", function () {
    $$(".toolbar  .boa").removeClass("active");
    $$(".toolbar  .xq").addClass("active");
    $$(".toolbar  .xq").attr("href", 'javascript:;');
    $$(".toolbar .home").attr("href", 'index.html');
    $$(".toolbar .qsh").attr("href", 'qushi.html');
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
    $$(".toolbar .xq").attr("href", 'xiangqing.html');
    $$(".toolbar  .my").attr("href", 'javascript:;');
    $$(".toolbar .home").attr("href", 'index.html');
    $$(".toolbar .qsh").attr("href", 'qushi.html');
    myLogin();
    localStorage.start = "";
    localStorage.end = "";
});
// 回首页
myApp.onPageBeforeAnimation("index", function () {
    $$(".toolbar  .boa").removeClass("active");
    $$(".toolbar  .home").addClass("active");
    $$(".toolbar  .home").attr("href", 'javascript:;');
    $$(".toolbar .xq").attr("href", 'xiangqing.html');
    $$(".toolbar .qsh").attr("href", 'qushi.html');
    if (localStorage.uname) {
        $$(".toolbar .my").attr("href", 'my.html');
    } else {
        $$(".toolbar .my").attr("href", 'my1.html');
    }
    localStorage.start = "";
    localStorage.end = "";
});
myApp.onPageBeforeAnimation("qushi", function () {
    myApp.showPreloader();
    $$(".toolbar  .boa").removeClass("active");
    $$(".toolbar  .qsh").addClass("active");
    $$(".toolbar  .qsh").attr("href", 'javascript:;');
    $$(".toolbar .xq").attr("href", 'xiangqing.html');
    $$(".toolbar .home").attr("href", 'index.html');
    if (localStorage.uname) {
        $$(".toolbar .my").attr("href", 'my.html');
    } else {
        $$(".toolbar .my").attr("href", 'my1.html');
    }
})
myApp.onPageAfterAnimation("qushi", function () {
    setTimeout(myApp.hidePreloader(), 3000)

    //  var search='<div class="item-content1" style="width:60%">'
    //                   +'<input type="text" placeholder="选择月份" onfocus="(this.type=&apos;month&apos;)"  id="month">'
    //                    +'</div>'
    //               +'<div class="item-content2"><button onclick="get_date1()" class="button button-blue">搜索</butto></div>'
    //  $("#qushitime").html(search);
    //1.2.1
    var tubiao1 = get_data_qushi(thisyear, "gyzyzbqkbyb502", "t_gyzyzbqkbyb502_kssj2", 73, "1"); //总产值
    var tubiao2 = get_data_qushi(thisyear, "gyzyzbqkbyb502", "t_gyzyzbqkbyb502_kssj2", 73, "2"); //规模以上企业工业总产值
    var tubiao3 = get_data_qushi(thisyear, "gyzyzbqkbyb502", "t_gyzyzbqkbyb502_kssj2", 73, "3"); //战略性新兴产业（制造业）工业总产值
    //1.3.4  
    var tubiao4 = get_data_qushi(thisyear, "syzyzbqkbyb510", "t_syzyzbqkbyb510_kssj2", 59, "1"); //商品销售额
    var tubiao5 = get_data_qushi(thisyear, "syzyzbqkbyb510", "t_syzyzbqkbyb510_kssj2", 59, "2"); //社会消费品零售总额

    tubiao(tubiao1, tubiao2, tubiao3, tubiao4, tubiao5);
    qushidatalay();
});
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

    //tishi('start');
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
    mainView.router.loadPage(url);
}

var xid;

function xiangqing(id) {
    tiaozhuan('xiangqing.html');
    xid = id;
}
myApp.onPageAfterBack("xiangqing", function () {
    $("#catname").text("");
    $("#xiangqinglist").html('')
});
myApp.onPageAfterAnimation("xiangqing", function () {
    var catname;
    if (xid == "1") {
        catname = "经济发展板块"
    }
    if (xid == "2") {
        catname = "生态治理板块"
    }
    if (xid == "3") {
        catname = "重大工程板块"
    }
    if (xid == "4") {
        catname = "民生保障板块"
    }
    if (xid == "5") {
        catname = "政府改革板块"
    }
    // console.log(xid);
    // console.log(catname)
    $("#catname").html(catname);
});

myApp.onPageAfterAnimation("xiangqing", function () {
    var html;
    if (xid == "1") {

        html = '<li><a href="javascript:form(2,\'gjzyqqyjyqkbyb517\')" class="item-link">' +
            '<div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            ' <div class="item-inner">' +
            '  <div class="item-title">1.1.1各街镇园区企业经营情况表（月报）</div>' +
            '</div>' +
            '</div></a></li>' +
            '<li><a href="javascript:form(3,\'gjzyqzsyzzlbyb518\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            ' <div class="item-inner">' +
            '<div class="item-title">1.1.2各街镇园区招商引资质量表（月报）</div>' +
            ' </div>' +
            ' </div></a></li>' +
            '<li><a href="javascript:form(52,\'gjzyqzhjzlbyb501\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">1.1.3各街镇园区综合竞争力表（月报）</div>' +
            ' </div></div></a></li>'
        html += '<li><a href="javascript:form(73,\'gyzyzbqkbyb502\')" class="item-link">' +
            '<div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            ' <div class="item-inner">' +
            '  <div class="item-title">1.2.1工业主要指标情况表(月报)</div>' +
            '</div>' +
            '</div></a></li>' +
            '<li><a href="javascript:form(54,\'gyqyqkbyb503\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            ' <div class="item-inner">' +
            '<div class="item-title">1.2.2工业企业情况表(月报)</div>' +
            ' </div>' +
            ' </div></a></li>' +
            '<li><a href="javascript:form(74,\'ggyyqztqkbyb504\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">1.2.3各工业园区载体情况表(月报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(4,\'gyxmqkbyb505\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">1.2.4工业项目情况表(月报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(75,\'clgytdphqkbyb506\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">1.2.5存量工业土地盘活情况表(月报)</div>' +
            ' </div></div></a></li>'

        html += '<li><a href="javascript:form(56,\'fwyssqkbyb507\')" class="item-link">' +
            '<div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            ' <div class="item-inner">' +
            '  <div class="item-title">1.3.1服务业税收情况表(月报)</div>' +
            '</div>' +
            '</div></a></li>' +
            '<li><a href="javascript:form(57,\'shfwyzyzbqkbyb508\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            ' <div class="item-inner">' +
            '<div class="item-title">1.3.2社会服务业主要指标情况表(月报)</div>' +
            ' </div>' +
            ' </div></a></li>' +
            '<li><a href="javascript:form(76,\'shfwyqyqkbyb509\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">1.3.3社会服务业企业情况表(月报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(59,\'syzyzbqkbyb510\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">1.3.4商业主要指标情况表(月报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(60,\'syqyqkbyb511\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">1.3.5商业企业情况表(月报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(6,\'sylyqkbyb512\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">1.3.6商业旅游情况表(月报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(77,\'sxfwyztqkbyb513\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">1.3.7“三线”服务业载体情况表(月报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(78,\'bsqkcqkbyb514\')" class="item-link">' +
            '<div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            ' <div class="item-inner">' +
            '  <div class="item-title">1.4宝山区科创情况表(年报)</div>' +
            '</div>' +
            '</div></a></li>'

        html += '<li><a href="javascript:form(9,\'yljjfzqkbyb515\')" class="item-link">' +
            '<div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            ' <div class="item-inner">' +
            '  <div class="item-title">1.5邮轮经济发展情况表(月报)</div>' +
            '</div>' +
            '</div></a></li>'

        html += '<li><a href="javascript:form(79,\'gzjgqkbnb516\')" class="item-link">' +
            '<div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            ' <div class="item-inner">' +
            '  <div class="item-title">1.6国资结构情况表(年报)</div>' +
            '</div>' +
            '</div></a></li>'
    }
    if (xid == "2") {
        html = '<li><a href="javascript:form(81,\'bsqhdqknd605\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">2.1 宝山区河道情况(年度)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(82,\'bsqejgwjsqkyd597\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">2.2 宝山区二级管网建设情况(月度)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(83,\'bsqpsxtjsqkyd598\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">2.3宝山区排水系统建设情况(月度)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(84,\'bsqhbqkyd599\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">2.4 空气质量情况(月度)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(85,\'bsqkhdmjcqkyb600\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">2.5 地表水质量情况(月报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(86,\'bsqlhjbjsqknb601\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">2.6宝山区绿化基本建设情况(年报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(87,\'bsqsngzqkyb604\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">2.7宝山区三农工作情况(月报)</div>' +
            ' </div></div></a></li>'
    }
    if (xid == "3") {
        html = '<li><a href="javascript:form(19,\'bsqtdjbqknb606\')" class="item-link">' +
            '<div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            ' <div class="item-inner">' +
            '  <div class="item-title">3.1宝山区土地基本情况(年报)</div>' +
            '</div>' +
            '</div></a></li>' +
            '<li><a href="javascript:form(89,\'bsqclgyydphgzssqkyb607\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">3.2宝山区存量工业用地盘活工作实施情况(月报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(21,\'bsqdlqknb608\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">3.3宝山区道路情况(年报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(22,\'bsqqlqknb609\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">3.4宝山区桥梁情况(年报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(24,\'nddqghjbqkbjb610\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">3.5.1南大地区规划基本情况表(季报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(90,\'wgyqjbqkjb611\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">3.5.2吴淞工业区基本情况(季报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(91,\'bsqczcgzjbqkjb612\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">3.6宝山区"城中村"改造基本情况(季报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(45,\'bsqdxjzsqjbqkjb613\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">3.7宝山区大型居住社区基本情况(季报)</div>' +
            ' </div></div></a></li>'
    }
    if (xid == "4") {
        html = '<li><a href="javascript:form(94,\'bsqrlzyhshbzqkyb681\')" class="item-link">' +
            '<div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            ' <div class="item-inner">' +
            '  <div class="item-title">4.1宝山区人力资源和社会保障情况(月报)</div>' +
            '</div>' +
            '</div></a></li>' +
            '<li><a href="javascript:form(95,\'bsqsydwrlzyqkyb653\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">4.1.1宝山区事业单位人力资源情况(月报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(96,\'bsqmzgzqkyb718\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">4.2宝山区民政工作情况(月报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(97,\'bsqzymsxyczzcqknb655\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">4.3.1宝山区主要民生行业财政支出情况(年报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(98,\'bsqjyqkbnb719\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">4.3.2宝山区教育情况(半年报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(99,\'bsqylqknb727\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">4.4宝山区医疗情况(年报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(100,\'bsqwhqkbnb685\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">4.5宝山区文化情况(半年报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(101,\'bsqtyqkbnb686\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">4.6宝山区体育情况(半年报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(102,\'bsqcsglgzqkbyb725\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">4.7.1宝山区城市管理工作情况表(月报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(103,\'bsqpasfcjqkbnb661\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">4.7.2宝山区“平安示范”创建情况表(年报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(104,\'bsqrkqkbyb722\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">4.7.3宝山区人口情况表(月报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(105,\'bsqspjkqkbnb689\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">4.7.4宝山区视频监控情况表(年报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(106,\'bsqaqscqkbbnb690\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">4.8.1宝山区安全生产情况表(半年报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(107,\'bsqyzjdqkbbnb665\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">4.8.2宝山区“一重九多”情况表(半年报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(108,\'bsqajqkbyb666\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">4.8.3宝山区案件情况表(月报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(109,\'bsqsyrkjlqkbnb723\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">4.8.4宝山区实有人口警力情况表(年报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(110,\'bsqhzsgqkbyb668\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">4.8.5宝山区火灾事故情况表(月报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(111,\'bsqjtsgqkbnb669\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">4.8.6宝山区交通事故情况表(年报)</div>' +
            ' </div></div></a></li>' +
            '<li><a href="javascript:form(112,\'bsqspaqqkbyb670\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">4.8.7宝山区食品安全情况表(月报)</div>' +
            ' </div></div></a></li>'

    }
    if (xid == "5") {
        html = '<li><a href="javascript:form(114,\'bsqspsxfwsxsjblhsjbljbqkyb728\')" class="item-link">' +
            '<div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            ' <div class="item-inner">' +
            '  <div class="item-title">5.1宝山区审批事项、服务事项三级办理和四级办理基本情况(月报)</div>' +
            '</div>' +
            '</div></a></li>' +
            '<li><a href="javascript:form(115,\'bsqljzldwjbqkjb729\')" class="item-link">' +
            ' <div class="item-content">' +
            ' <div class="item-media"><img src="image/xq_icon.png"/></div>' +
            '<div class="item-inner">' +
            ' <div class="item-title">5.2宝山区两集中、两到位基本情况(季报)</div>' +
            ' </div></div></a></li>'
    }

    $("#xiangqinglist").html(html)
});


function get_date() {
    var search_condition = [];
    var end = $('#enddate').val();
    var ziduan = $('#get-data').data('time')
    var mid = $('#get-data').data('mid')
    var alias = $('#get-data').data('alias')
    var nian2 = end.slice(0, 4);
    var yue2 = end.slice(5, 7);
    if (end == "") {
        tishi('请选择日期');
        return false;
    }

    if (yue2[0] == "0") {
        yue2 = yue2[1];
    } else {
        yue2 = yue2;
    }
    $("#yearmonthse").html(nian2 + "年 1月" + "-" + yue2 + "月");
    search_condition['jszd'] = $('#get-data').data('time');
    if(yue2 < 10){
        yue2="0"+yue2
    }
   var day = new Date(nian2, yue2, 0);
   
    var lastdate = nian2 + '-' + yue2 + '-' + day.getDate();
    search_condition['jsrq'] = lastdate;
    console.log(search_condition);
    // return false;
    get_data_search(end, ziduan, mid, alias, search_condition);
}

function get_data_search(end, ziduan, moduleId, alias, search_condition) {
    if (search_condition['jszd'] != null) {
        url = hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + search_condition['jszd'] + '=' + search_condition['jsrq'] + '&token=' + localStorage.token
    } else {
        url = hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?token=' + localStorage.token
    }

    $.ajax({
        type: "POST",
        url: url,
        data: {
            bpmDataTemplatep: '1',
            bpmDataTemplatez: '1000',
            bpmDataTemplateoz: '1000',
            bpmDataTemplate__ns__: 't_' + alias + '_ID',
            bpmDataTemplateo: "ASC"
        },
        dataType: 'json',
        beforeSend: function () {
            myApp.showPreloader();
        },
        complete: function () {
            myApp.hidePreloader();
        },
        success: function (data) {
            console.log(data)
            if (data.bpmDataTemplate != null) {
                // console.log(data.data)
                var data = data.bpmDataTemplate.list;
                var str = "";
                if (moduleId == "2") {

                    $.each(data, function (i, n) { 
                        if(n['t_gjzyqqyjyqkbyb517_shzt']!=="已审核"){
                        
                             n['t_gjzyqqyjyqkbyb517_ldxzddqysg5']=""
                            n['t_gjzyqqyjyqkbyb517_ldxzddzczddg6']=""
                             n['t_gjzyqqyjyqkbyb517_ldxzddnszewy7']=""
                             n['t_gjzyqqyjyqkbyb517_zczddqysg8']=""
                            n['t_gjzyqqyjyqkbyb517_zczddzdjyg9']=""
                             n['t_gjzyqqyjyqkbyb517_zczddqyszdcssjssg10']=""
                             n['t_gjzyqqyjyqkbyb517_zczddnszewy11']=""
                             n['t_gjzyqqyjyqkbyb517_qyzszcwzcdldx12']=""
                            // console.log(ii);
                         
                        }  
                     });
                     //计算总计
                     var zongji={}
                     zongji['ldxzddqysg5']=0;
                     zongji['ldxzddzczddg6']=0;
                     zongji['ldxzddnszewy7']=0;
                     zongji['zczddqysg8']=0;
                     zongji['zczddzdjyg9']=0;
                     zongji['zczddqyszdcssjssg10']=0;
                     zongji['zczddnszewy11']=0;
                     zongji['qyzszcwzcdldx12']=0;
                    $.each(data, function (i, n) { 
                     zongji['ldxzddqysg5'] += Number(n['t_gjzyqqyjyqkbyb517_ldxzddqysg5'])*100
                     zongji['ldxzddzczddg6'] += Number(n['t_gjzyqqyjyqkbyb517_ldxzddzczddg6'])*100
                     zongji['ldxzddnszewy7'] += Number(n['t_gjzyqqyjyqkbyb517_ldxzddnszewy7'])*100
                     zongji['zczddqysg8'] += Number(n['t_gjzyqqyjyqkbyb517_zczddqysg8'])*100
                     zongji['zczddzdjyg9'] += Number(n['t_gjzyqqyjyqkbyb517_zczddzdjyg9'])*100
                     zongji['zczddqyszdcssjssg10'] += Number(n['t_gjzyqqyjyqkbyb517_zczddqyszdcssjssg10'])*100
                     zongji['zczddnszewy11'] += Number(n['t_gjzyqqyjyqkbyb517_zczddnszewy11'])*100
                     zongji['qyzszcwzcdldx12'] += Number(n['t_gjzyqqyjyqkbyb517_qyzszcwzcdldx12'])*100
                    });
                    // 重新排序
                    var data_sort=[]
                    $.each(data, function (i, n) { 
                         if (n['t_gjzyqqyjyqkbyb517_jzyq4']=="罗店镇") {
                            data_sort.push(n);
                         }
                        })
                         $.each(data, function (i, n) {
                         if (n['t_gjzyqqyjyqkbyb517_jzyq4']=="大场镇") {
                            data_sort.push(n);
                         }
                        })
                         $.each(data, function (i, n) {
                         if (n['t_gjzyqqyjyqkbyb517_jzyq4']=="杨行镇") {
                            data_sort.push(n);
                         }
                        })
                         $.each(data, function (i, n) {
                         if (n['t_gjzyqqyjyqkbyb517_jzyq4']=="月浦镇") {
                            data_sort.push(n);
                         }
                        })
                         $.each(data, function (i, n) {
                         if (n['t_gjzyqqyjyqkbyb517_jzyq4']=="罗泾镇") {
                            data_sort.push(n);
                         }
                        })
                         $.each(data, function (i, n) {
                         if (n['t_gjzyqqyjyqkbyb517_jzyq4']=="顾村镇") {
                            data_sort.push(n);
                         }
                        })
                         $.each(data, function (i, n) {
                         if (n['t_gjzyqqyjyqkbyb517_jzyq4']=="高境镇") {
                            data_sort.push(n);
                         }
                        })
                         $.each(data, function (i, n) {
                         if (n['t_gjzyqqyjyqkbyb517_jzyq4']=="庙行镇") {
                            data_sort.push(n);
                         }
                        })
                         $.each(data, function (i, n) {
                         if (n['t_gjzyqqyjyqkbyb517_jzyq4']=="淞南镇") {
                            data_sort.push(n);
                         }
                        })
                         $.each(data, function (i, n) {
                         if (n['t_gjzyqqyjyqkbyb517_jzyq4']=="城市工业园区") {
                            data_sort.push(n);
                         }
                        })
                         $.each(data, function (i, n) {
                         if (n['t_gjzyqqyjyqkbyb517_jzyq4']=="宝山工业园区") {
                            data_sort.push(n);
                         }
                        })
                         $.each(data, function (i, n) {
                         if (n['t_gjzyqqyjyqkbyb517_jzyq4']=="航运") {
                            data_sort.push(n);
                         }
                        });
                  
                    $.each(data_sort, function (i, n) {
                        // console.log(n[ziduan].slice(0,7))
                        if (n[ziduan].slice(0, 7) == end) {
                            str += '<tr><td class="label-cell">' + n['t_gjzyqqyjyqkbyb517_jzyq4'] + '</td><td class="numeric-cell">' + n['t_gjzyqqyjyqkbyb517_ldxzddqysg5'] + '</td><td class="numeric-cell">' + n['t_gjzyqqyjyqkbyb517_ldxzddzczddg6'] + '</td><td class="numeric-cell">' + n['t_gjzyqqyjyqkbyb517_ldxzddnszewy7'] + '</td><td class="numeric-cell">' + n['t_gjzyqqyjyqkbyb517_zczddqysg8'] + '</td><td class="label-cell">' + n['t_gjzyqqyjyqkbyb517_zczddzdjyg9'] + '</td><td class="numeric-cell">' + n['t_gjzyqqyjyqkbyb517_zczddqyszdcssjssg10'] + '</td><td class="numeric-cell">' + n['t_gjzyqqyjyqkbyb517_zczddnszewy11'] + '</td><td class="numeric-cell">' + n['t_gjzyqqyjyqkbyb517_qyzszcwzcdldx12'] + '</td></tr>';
                        }
                    });
                    str += '<tr><td class="label-cell">合计</td><td class="numeric-cell">' + zongji['ldxzddqysg5']/100 + '</td><td class="numeric-cell">' + zongji['ldxzddzczddg6']/100 + '</td><td class="numeric-cell">' + zongji['ldxzddnszewy7']/100 + '</td><td class="numeric-cell">' + zongji['zczddqysg8']/100 + '</td><td class="label-cell">' + zongji['zczddzdjyg9']/100 + '</td><td class="numeric-cell">' + zongji['zczddqyszdcssjssg10']/100 + '</td><td class="numeric-cell">' + zongji['zczddnszewy11']/100 + '</td><td class="numeric-cell">' + zongji['qyzszcwzcdldx12']/100 + '</td></tr>';
                }
                if (moduleId == "3") {
                    $.each(data, function (i, n) {
                        if (n[ziduan].slice(0, 7) == end) {
                            str += '<tr><td class="label-cell">' + n['t_gjzyqzsyzzlbyb518_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzsyzzlbyb518_xzcqysg5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzsyzzlbyb518_jnxzcqyznsqysg6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzsyzzlbyb518_jnxzcqynszewy7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzsyzzlbyb518_xqczwqqysg8'] + '</td>' +
                                '<td class="label-cell">' + n['t_gjzyqzsyzzlbyb518_jnqcqyznsqysg9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzsyzzlbyb518_jnqcqynszewy10'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzsyzzlbyb518_jzqysg11'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzsyzzlbyb518_jzqydsszcgxd12'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzsyzzlbyb518_bz13'] + '</td></tr>'
                        }

                    });
                }

                if (moduleId == "52") {
                    $.each(data, function (i, n) {
                        if (n[ziduan].slice(0, 7) == end) {
                            str += '<tr><td class="label-cell">' + n['t_gjzyqzhjzlbyb501_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzhjzlbyb501_sssrwy5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzhjzlbyb501_gxjsqysl6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzhjzlbyb501_gxjsqyslzb7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzhjzlbyb501_gxjsqycz8'] + '</td>' +
                                '<td class="label-cell">' + n['t_gjzyqzhjzlbyb501_gxjsqyczzb9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzhjzlbyb501_zbssqyg10'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzhjzlbyb501_xsbssqyg11'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzhjzlbyb501_zls12'] + '</td></tr>'
                        }
                    });
                }

                if (moduleId == "54") {
                    $.each(data, function (i, n) {
                        if (n[ziduan].slice(0, 7) == end) {
                            str += '<tr><td class="label-cell">' + n['t_gyqyqkbyb503_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gyqyqkbyb503_gyzczyy5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gyqyqkbyb503_gsgyqyzsh6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gyqyqkbyb503_gsgyqygyzczyy7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gyqyqkbyb503_zlxxxcyqyzsh8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gyqyqkbyb503_zlxxxcyqygyzczyy9'] + '</td></tr>'
                        }
                    });
                }

                //1.2.4
                if (moduleId == "4") {
                    $.each(data, function (i, n) {
                        if (n[ziduan].slice(0, 7) == end) {
                            if (n['t_gyxmqkbyb505_jzyq4'] == "全区") {
                                str += '<tr><td class="label-cell">' + n['t_gyxmqkbyb505_jzyq4'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_nqdxmsg5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_nqdxmtzlwy6'] + '</td>'

                                    +
                                    '<td class="label-cell">' + n['t_gyxmqkbyb505_zjxmsg9'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_zjxmtzlwy10'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_kgxmsg7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_kgxmtzlwy8'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_jgtcxmsg11'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_jgtcxmtzlwy12'] + '</td></tr>'
                            }
                        }
                    })
                    $.each(data, function (i, n) {
                        if (n[ziduan].slice(0, 7) == end) {
                            if (n['t_gyxmqkbyb505_jzyq4'] != "全区") {
                                str += '<tr><td class="label-cell">' + n['t_gyxmqkbyb505_jzyq4'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_nqdxmsg5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_nqdxmtzlwy6'] + '</td>'

                                    +
                                    '<td class="label-cell">' + n['t_gyxmqkbyb505_zjxmsg9'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_zjxmtzlwy10'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_kgxmsg7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_kgxmtzlwy8'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_jgtcxmsg11'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_jgtcxmtzlwy12'] + '</td></tr>'
                            }
                        }
                    });
                }



                /*t_shfwyqyqkbyb509_ID项目不确定*/
                if (moduleId == "76") {
                    $.each(data, function (i, n) {
                        if (n[ziduan].slice(0, 7) == end) {
                            str += '<tr><td class="label-cell">' + n['t_shfwyqyqkbyb509_ID'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_shfwyqyqkbyb509_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_shfwyqyqkbyb509_gsqyzsh5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_shfwyqyqkbyb509_gsqyyysryy6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_shfwyqyqkbyb509_7'] + '</td></tr>'
                        }
                    });
                }



                if (moduleId == "60") {
                    $.each(data, function (i, n) {
                        if (n[ziduan].slice(0, 7) == end) {
                            str += '<tr><td class="label-cell">' + n['t_syqyqkbyb511_ID'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_syqyqkbyb511_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_syqyqkbyb511_spxsewy5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_syqyqkbyb511_spxse6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_syqyqkbyb511_shxfplszewy7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_syqyqkbyb511_shxfplsze8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_syqyqkbyb511_gslsqyzsh9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_syqyqkbyb511_gslsqylsewy10'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_syqyqkbyb511_gslsqylse11'] + '</td></tr>'
                        }
                    });
                }




                if (moduleId == "77") {
                    $.each(data, function (i, n) {
                        if (n[ziduan].slice(0, 7) == end) {
                            str += '<tr><td class="label-cell">' + n['t_sxfwyztqkbyb513_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_sxfwyztqkbyb513_qyzsh5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_sxfwyztqkbyb513_zsssrwy6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_sxfwyztqkbyb513_zssdwmjccypfm7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_sxfwyztqkbyb513_ztzs8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_sxfwyztqkbyb513_ldqyzcl9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_sxfwyztqkbyb513_rzl10'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_sxfwyztqkbyb513_sssryyysztg11'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_sxfwyztqkbyb513_sssrwysztg12'] + '</td></tr>'
                        }
                    });
                }





                if (moduleId == "79") {
                    $.each(data, function (i, n) {
                        if (n[ziduan].slice(0, 7) == end) {
                            str += '<tr><td class="label-cell">' + n['t_gzjgqkbnb516_lb4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gzjgqkbnb516_qys5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gzjgqkbnb516_zczeyy6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gzjgqkbnb516_jzcyy7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gzjgqkbnb516_jlryy8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gzjgqkbnb516_lrzeyy9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gzjgqkbnb516_gyyd10'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gzjgqkbnb516_cf11'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gzjgqkbnb516_zg12'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gzjgqkbnb516_bz13'] + '</td></tr>'
                        }
                    });
                }

                //2.2
                if (moduleId == "82") {
                    //console.log("data的长度"+len);
                    $.each(data, function (i, n) {
                        if (n[ziduan].slice(0, 7) == end) {
                            str += '<tr>' +
                                '<td class="label-cell" rowspan="2">区级</td>' +
                                '<td class="numeric-cell">区水务局</td>' +
                                '<td class="numeric-cell">' + n['t_bsqejgwjsqkyd597_qswjyjcdkm4'] + '</td></tr>' +
                                '<tr><td class="numeric-cell">区建交委</td>' +
                                '<td class="numeric-cell">' + n['t_bsqejgwjsqkyd597_qjjwyjcdkm5'] + '</td></tr>' +
                                '<tr><td class="numeric-cell" colspan="2">街镇园区</td>' +
                                '<td class="numeric-cell">' + n['t_bsqejgwjsqkyd597_jzyqyjcdkm6'] + '</td></tr>' +
                                '<tr><td class="numeric-cell" colspan="2">合计</td>' +
                                '<td class="numeric-cell">' + n['t_bsqejgwjsqkyd597_hjyjcdkm7'] + '</td></tr>'
                        }
                        //   else{
                        //     str +='<tr>'
                        //             +'<td class="label-cell" rowspan="2">区级</td>'
                        //             +'<td class="numeric-cell">区水务局</td>'
                        //             +'<td class="numeric-cell"></td></tr>'
                        //         +'<tr><td class="numeric-cell">区建交委</td>'
                        //         +'<td class="numeric-cell"></td></tr>'
                        //         +'<tr><td class="numeric-cell" colspan="2">街镇园区</td>'
                        //         +'<td class="numeric-cell"></td></tr>'
                        //         +'<tr><td class="numeric-cell" colspan="2">合计</td>'
                        //             +'<td class="numeric-cell"></td></tr>'
                        //   }
                    });
                }
                //2.3
                if (moduleId == "83") {
                    $.each(data, function (i, n) {
                        if (n[ziduan].slice(0, 7) == end) {
                            str += '<tr>' +
                                '<td class="label-cell" rowspan="2">已建情况</td>' +
                                '<td class="numeric-cell">数量</td>' +
                                '<td class="numeric-cell">外环内</td>' +
                                '<td class="numeric-cell">外环外</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">' + n['t_bsqpsxtjsqkyd598_yjqksl4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqpsxtjsqkyd598_yjqkwhn5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqpsxtjsqkyd598_yjqkwhw6'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell" rowspan="2">在建情况</td>' +
                                '<td class="numeric-cell">5+1排水系统进度</td>' +
                                '<td class="numeric-cell" colspan="2">2018年军工路、杨盛东、月浦城区3个排水系统进度</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">' + n['t_bsqpsxtjsqkyd598_psxtjd14'] + '</td>' +
                                '<td class="numeric-cell" colspan="2">' + n['t_bsqpsxtjsqkyd598_jglysdypcqjd15'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell" rowspan="4">未建（缺口）情况</td>' +
                                '<td class="numeric-cell" rowspan="2">外环内</td>' +
                                '<td class="numeric-cell" >数量</td>' +
                                '<td class="numeric-cell">分布区域</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">' + n['t_bsqpsxtjsqkyd598_whnwjqkqksl10'] + '</td>' +
                                '<td class="numeric-cell" colspan="2">' + n['t_bsqpsxtjsqkyd598_whnwjqkqkfbqy11'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell" rowspan="2">外环外</td>' +
                                '<td class="numeric-cell" >数量</td>' +
                                '<td class="numeric-cell">分布区域</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">' + n['t_bsqpsxtjsqkyd598_whwwjqkqksl12'] + '</td>' +
                                '<td class="numeric-cell" colspan="2">' + n['t_bsqpsxtjsqkyd598_whwwjqkqkfbqy13'] + '</td>' +
                                '</tr>'
                        }
                    });
                }
                //3.2
                if (moduleId == "89") {
                    $.each(data, function (i, n) {
                        if (n[ziduan].slice(0, 7) == end) {
                            str += '<tr>' +
                                '<td class="numeric-cell">' + n['t_bsqclgyydphgzssqkyb607_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqclgyydphgzssqkyb607_mb5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqclgyydphgzssqkyb607_yph6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqclgyydphgzssqkyb607_wph7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqclgyydphgzssqkyb607_phjd8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqclgyydphgzssqkyb607_jzqk9'] + '</td>' +
                                '</tr>'
                        }
                    });
                }

                //5.1
                if (moduleId == "114") {
                    $.each(data, function (i, n) {
                        if (n[ziduan].slice(0, 7) == end) {
                            str += '<tr>' +
                                '<td class="label-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_ID'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_bmck4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_swsxzssp5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_swsxzsfw6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_sjblsxssp7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_sjblsxsfw8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_sjblsxssp9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_sjblsxsfw10'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_sjsjsxszb11'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_sjsjsxbllsp12'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_sjsjsxbllfw13'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_sjsjsxwsbllsp14'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_sjsjsxwsbllfw15'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_sjsjtxxtwblsp16'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_sjsjtxxtwblfw17'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_wsbllzb18'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_zzpwkdsdjs19'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_zzpwkdsdzb20'] + '</td>' +
                                '</tr>'
                        }
                    });
                }
                str = str.replace(/undefined/g, "");
                $('#form-body').html(str);
            }

        },
        error: function (data, type, err) {
            myApp.hidePreloader();
            tishi("出现错误");

        }
    });
}


var yearse;
var monthse;

function get_date1() {
    var search_condition = [];
    var date = $('#semonth').val();
    var yearse = date.slice(0, 4);
    var monthse = date.slice(5, 7);
    var lastyear = yearse - 1;
    var month1;
    var ziduan = $('#get-data').data('time')
    var mid = $('#get-data').data('mid')
    var alias = $('#get-data').data('alias')
    if (yearse == "" || monthse == "") {
        tishi('请选择要查询的年月')
        return false;
    }
    month1 = monthse;
    $("#lastyearselect").html(lastyear + "年");
    $("#yearselect").html(yearse + "年");
    $("#yearselect1").html(yearse + "年");
    $("#thismonth").html(month1 + "月");
    $("#thismonths").html("01-" + month1 + "月");


    $(".lastyearselect").html(lastyear + "年");
    $(".yearselect").html(yearse + "年");
    $(".yearselect1").html(yearse + "年");
    $(".thismonth").html(month1 + "月");
    $(".thismonths").html("01-" + month1 + "月");

    $("#thismonthes").html(yearse + '年' + month1 + "月");
    $("#thismonthses").html(yearse + "年01-" + month1 + "月");
    // console.log(yearse,monthse,ziduan,mid)
    search_condition['jszd'] = $('#get-data').data('time');
    var day = new Date(yearse, month1, 0);
    var lastdate = yearse + '-' + month1 + '-' + day.getDate();
    search_condition['jsrq'] = lastdate;
    search_condition['kszd'] = $('#get-data').data('kstime');
    //     console.log(search_condition);
    //  return false;
    get_data_search1(yearse, monthse, ziduan, mid, alias, search_condition);
}

function get_data_search1(yearse, monthse, ziduan, moduleId, alias, search_condition) {
    if (search_condition['jszd'] != null) {
        url = hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + search_condition['jszd'] + '=' + search_condition['jsrq'] + '&token=' + localStorage.token
    } else {
        url = hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?&token=' + localStorage.token
    }
    console.log(url)
    $.ajax({
        type: "POST",
        url: url,
        //contentType:"json",
        data: {
            bpmDataTemplatep: '1',
            bpmDataTemplatez: '1000',
            bpmDataTemplateoz: '1000',
            bpmDataTemplate__ns__: 't_' + alias + '_ID',
            bpmDataTemplateo: "ASC"

        },
        dataType: 'json',
        beforeSend: function () {
            myApp.showPreloader();
        },
        complete: function () {
            myApp.hidePreloader();
        },
        success: function (data) {
            // console.log(data)
            if (data.bpmDataTemplate != null) {

                //   console.log(data.data)
                var data = data.bpmDataTemplate.list;
                var str = "";

                // 1.2.1
                if (moduleId == "73") {
                    var lastyear = [];
                    var thisyearm = [];
                    var thisyearms = [];
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + search_condition['jszd'] + '=' + search_condition['jsrq'] + '&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_gyzyzbqkbyb502_kssj2'] == yearse - 1 + '-01-01' && n['t_gyzyzbqkbyb502_jssj3'] == yearse - 1 + '-12-31') {
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_updown34']));
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_zczzxzf5']));
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_xsczyy6']));
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_xsczzxzf7']));
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_gmysqyyy8']));
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_gmysqyzxzf9']));
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_zlxxxcyzzybfyy10']));
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_zlxxxcyzzybfzxzf11']));
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_xnyyy12']));
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_xnyzxzf13']));
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_gdzbzzyy14']));
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_gdzbzzzxzf15']));
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_swyy16']));
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_swzxzf17']));
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_xydxxjsyy18']));
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_xydxxjszxzf19']));
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_xclyy20']));
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_xclzxzf21']));
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_xnyqcyy22']));
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_xnyqczxzf23']));
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_jnhbyy24']));
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_jnhbzxzf25']));
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_zssyy26']));
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_zsszxzf27']));
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_qjssyy28']));
                                    lastyear.push(parseFloat(lastyedata[i]['t_gyzyzbqkbyb502_qjsszxzf29']));
                                }
                            });

                        }
                    })
                    $.each(data, function (i, n) {
                        var year = data[i]['t_gyzyzbqkbyb502_jssj3'].slice(0, 4);
                        var mon1 = data[i]['t_gyzyzbqkbyb502_kssj2'].slice(5, 7);
                        var mon2 = data[i]['t_gyzyzbqkbyb502_jssj3'].slice(5, 7);
                        if (year == yearse) {
                            if (mon1 == mon2 && mon2 == monthse) {
                                thisyearm.push(parseFloat(data[i]['t_gyzyzbqkbyb502_updown34']));
                                thisyearm.push(parseFloat(data[i]['t_gyzyzbqkbyb502_xsczyy6']));
                                thisyearm.push(parseFloat(data[i]['t_gyzyzbqkbyb502_gmysqyyy8']));
                                thisyearm.push(parseFloat(data[i]['t_gyzyzbqkbyb502_zlxxxcyzzybfyy10']));
                                thisyearm.push(parseFloat(data[i]['t_gyzyzbqkbyb502_xnyyy12']));
                                thisyearm.push(parseFloat(data[i]['t_gyzyzbqkbyb502_gdzbzzyy14']));
                                thisyearm.push(parseFloat(data[i]['t_gyzyzbqkbyb502_swyy16']));
                                thisyearm.push(parseFloat(data[i]['t_gyzyzbqkbyb502_xydxxjsyy18']));
                                thisyearm.push(parseFloat(data[i]['t_gyzyzbqkbyb502_xclyy20']));
                                thisyearm.push(parseFloat(data[i]['t_gyzyzbqkbyb502_xnyqcyy22']));
                                thisyearm.push(parseFloat(data[i]['t_gyzyzbqkbyb502_jnhbyy24']));
                                thisyearm.push(parseFloat(data[i]['t_gyzyzbqkbyb502_zssyy26']));
                                thisyearm.push(parseFloat(data[i]['t_gyzyzbqkbyb502_qjssyy28']));
                            }
                            if (mon1 == "01" && mon2 == monthse) {

                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_updown34']));
                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_zczzxzf5']));
                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_xsczyy6']));
                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_xsczzxzf7']));
                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_gmysqyyy8']));
                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_gmysqyzxzf9']));
                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_zlxxxcyzzybfyy10']));
                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_zlxxxcyzzybfzxzf11']));
                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_xnyyy12']));
                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_xnyzxzf13']));
                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_gdzbzzyy14']));
                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_gdzbzzzxzf15']));
                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_swyy16']));
                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_swzxzf17']));
                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_xydxxjsyy18']));
                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_xydxxjszxzf19']));
                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_xclyy20']));
                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_xclzxzf21']));
                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_xnyqcyy22']));
                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_xnyqczxzf23']));
                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_jnhbyy24']));
                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_jnhbzxzf25']));
                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_zssyy26']));
                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_zsszxzf27']));
                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_qjssyy28']));
                                thisyearms.push(parseFloat(data[i]['t_gyzyzbqkbyb502_qjsszxzf29']));
                            }
                        }


                    });

                    str += '<tr><td class="label-cell" colspan="2">总产值</td>' +
                        '<td class="numeric-cell">' + lastyear[0] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[1] + '</td>'
                        // +'<td class="numeric-cell">'+thisyearm[0]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[0] + '</td>' +
                        '<td class="label-cell">' + thisyearms[1] + '</td>' +
                        '</tr>' +
                        '<tr><td class="label-cell" colspan="2">销售产值</td>' +
                        '<td class="numeric-cell">' + lastyear[2] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[3] + '</td>'
                        //  +'<td class="numeric-cell">'+thisyearm[1]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[2] + '</td>' +
                        '<td class="label-cell">' + thisyearms[3] + '</td>' +
                        '</tr>' +
                        '<tr><td class="label-cell" colspan="2">规模以上企业工业总产值</td>' +
                        '<td class="numeric-cell">' + lastyear[4] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[5] + '</td>'
                        //  +'<td class="numeric-cell">'+thisyearm[2]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[4] + '</td>' +
                        '<td class="label-cell">' + thisyearms[5] + '</td>' +
                        '</tr>' +
                        '<tr><td class="label-cell" colspan="2">战略性新兴产业(制造业部分)工业总产值</td>' +
                        '<td class="numeric-cell">' + lastyear[6] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[7] + '</td>'
                        //  +'<td class="numeric-cell">'+thisyearm[3]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[6] + '</td>' +
                        '<td class="label-cell">' + thisyearms[7] + '</td>' +
                        '</tr>' +
                        '<tr><td class="label-cell" rowspan="7">其中</td>' +
                        '<td class="numeric-cell">新能源</td>' +
                        '<td class="numeric-cell">' + lastyear[8] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[9] + '</td>'
                        //  +'<td class="numeric-cell">'+thisyearm[4]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[8] + '</td>' +
                        '<td class="label-cell">' + thisyearms[9] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">高端装备制造</td>' +
                        '<td class="numeric-cell">' + lastyear[10] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[11] + '</td>'
                        //  +'<td class="numeric-cell">'+thisyearm[5]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[10] + '</td>' +
                        '<td class="label-cell">' + thisyearms[11] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">生物</td>' +
                        '<td class="numeric-cell">' + lastyear[12] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[13] + '</td>'
                        //  +'<td class="numeric-cell">'+thisyearm[6]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[12] + '</td>' +
                        '<td class="label-cell">' + thisyearms[13] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">新一代信息技术</td>' +
                        '<td class="numeric-cell">' + lastyear[14] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[15] + '</td>'
                        // +'<td class="numeric-cell">'+thisyearm[7]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[14] + '</td>' +
                        '<td class="label-cell">' + thisyearms[15] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">新材料</td>' +
                        '<td class="numeric-cell">' + lastyear[16] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[17] + '</td>'
                        //  +'<td class="numeric-cell">'+thisyearm[8]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[16] + '</td>' +
                        '<td class="label-cell">' + thisyearms[17] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">新能源汽车</td>' +
                        '<td class="numeric-cell">' + lastyear[18] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[19] + '</td>'
                        //  +'<td class="numeric-cell">'+thisyearm[9]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[18] + '</td>' +
                        '<td class="label-cell">' + thisyearms[19] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">节能环保</td>' +
                        '<td class="numeric-cell">' + lastyear[20] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[21] + '</td>'
                        //  +'<td class="numeric-cell">'+thisyearm[10]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[20] + '</td>' +
                        '<td class="label-cell">' + thisyearms[21] + '</td>' +
                        '</tr>' +
                        '<tr><td class="label-cell" colspan="2">总税收</td>' +
                        '<td class="numeric-cell">' + lastyear[22] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[23] + '</td>'
                        //  +'<td class="numeric-cell">'+thisyearm[11]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[22] + '</td>' +
                        '<td class="label-cell">' + thisyearms[23] + '</td>' +
                        '</tr>' +
                        '<tr><td class="label-cell" colspan="2">区级税收</td>' +
                        '<td class="numeric-cell">' + lastyear[24] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[25] + '</td>'
                        // +'<td class="numeric-cell">'+thisyearm[12]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[24] + '</td>' +
                        '<td class="label-cell">' + thisyearms[25] + '</td>' +
                        '</tr>'

                }

                //1.2.3
                if (moduleId == "74") {
                    var lastyear = [];
                    var thisyearm = [];
                    var thisyearms = [];
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + search_condition['jszd'] + '=' + search_condition['jsrq'] + '&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_ggyyqztqkbyb504_kssj2'] == yearse - 1 + '-01-01' && n['t_ggyyqztqkbyb504_jssj3'] == yearse - 1 + '-12-31') {
                                    lastyear.push(lastyedata[i]);
                                }
                            });

                        }
                    })
                    $.each(data, function (i, n) {
                        var year = data[i]['t_ggyyqztqkbyb504_jssj3'].slice(0, 4);
                        var mon1 = data[i]['t_ggyyqztqkbyb504_kssj2'].slice(5, 7);
                        var mon2 = data[i]['t_ggyyqztqkbyb504_jssj3'].slice(5, 7);
                        // alert("year"+year);
                        // if (year == yearse - 1 && mon1 == "01" && mon2 == "12") {
                        //     lastyear.push(data[i]);
                        // }
                        if (year == yearse) {

                            //if(mon1=="01" && mon2==lastmon){
                            if (mon1 == "01" && mon2 == monthse) {
                                thisyearms.push((data[i]));
                            }
                        }

                    });

                    $.each(thisyearms, function (i, n) {
                        $.each(lastyear, function (ii, nn) {
                            if (thisyearms[i]['t_ggyyqztqkbyb504_gyyq4'] == lastyear[ii]['t_ggyyqztqkbyb504_gyyq4']) {
                                thisyearms[i]['qunianzong'] = lastyear[ii]["t_ggyyqztqkbyb504_ljzczyy6"]
                                thisyearms[i]['qunianzeng'] = lastyear[ii]["t_ggyyqztqkbyb504_ljzcz7"]
                                thisyearms[i]['qunianshui'] = lastyear[ii]["t_ggyyqztqkbyb504_ljsssryy8"]
                                thisyearms[i]['qunianshuizeng'] = lastyear[ii]["t_ggyyqztqkbyb504_ljsssr9"]
                            }
                        });
                    });

                    $.each(thisyearms, function (i, v) {
                        str += '<tr><td class="label-cell">' + v['t_ggyyqztqkbyb504_gyyq4'] + '</td>' +
                            '<td class="numeric-cell">' + v['t_ggyyqztqkbyb504_mjwpfm5'] + '</td>' +
                            '<td class="numeric-cell">' + v['qunianzong'] + '</td>' +
                            '<td class="numeric-cell">' + v['qunianzeng'] + '</td>' +
                            '<td class="numeric-cell">' + v['t_ggyyqztqkbyb504_dyzczyy10'] + '</td>' +
                            '<td class="numeric-cell">' + v['t_ggyyqztqkbyb504_dyzcz11'] + '</td>' +
                            '<td class="numeric-cell">' + v['t_ggyyqztqkbyb504_ljzczyy6'] + '</td>' +
                            '<td class="label-cell">' + v['t_ggyyqztqkbyb504_ljzcz7'] + '</td>'

                            +
                            '</tr>'
                    });
                    if (thisyearms.length >= 1) {
                        var strhead = '<tr>' +
                            ' <td class="label-cell" colspan="2" style="font-weight:bold;">类别</td>' +
                            '<td class="label-cell" style="font-weight:bold;">税收收入</td>' +
                            '<td class="numeric-cell" style="font-weight:bold;">±%</td>' +
                            '<td class="label-cell" style="font-weight:bold;">税收收入</td>' +
                            '<td class="numeric-cell" style="font-weight:bold;">±%</td>' +
                            '<td class="label-cell" style="font-weight:bold;">税收收入</td>' +
                            '<td class="numeric-cell" style="font-weight:bold;">±%</td>' +
                            '</tr>';
                    }
                    $.each(thisyearms, function (i, v) {
                        strhead += '<tr>' +
                            '<td class="label-cell" colspan="2">' + v['t_ggyyqztqkbyb504_gyyq4'] + '</td>' +
                            ' <td class="numeric-cell">' + v['qunianshui'] + '</td>' +
                            '<td class="numeric-cell">' + v['qunianshuizeng'] + '</td>' +
                            '<td class="numeric-cell">' + v['t_ggyyqztqkbyb504_dysssryy12'] + '</td>' +
                            '<td class="numeric-cell">' + v['t_ggyyqztqkbyb504_dysssr13'] + '</td>' +
                            '<td class="numeric-cell">' + v['t_ggyyqztqkbyb504_ljsssryy8'] + '</td>' +
                            '<td class="numeric-cell">' + v['t_ggyyqztqkbyb504_ljsssr9'] + '</td>' +
                            '</tr>'
                    });


                    str += strhead;
                }
                //1.2.4
                //     if(moduleId=="4"){
                //         $.each(data, function(i, n){
                //             if(n['t_gyxmqkbyb505_jssj3'].slice(0,7)==thisyear1+"-"+lastmon && n['t_gyxmqkbyb505_kssj2'].slice(0,7)==thisyear1+"-01"){
                //             if(n['t_gyxmqkbyb505_jzyq4']=="全区"){
                //                 console.log(n['t_gyxmqkbyb505_jzyq4'])
                //           str +='<tr><td class="label-cell">'+n['t_gyxmqkbyb505_jzyq4']+'</td>'
                //                 +'<td class="numeric-cell">'+n['t_gyxmqkbyb505_nqdxmsg5']+'</td>'
                //                 +'<td class="numeric-cell">'+n['t_gyxmqkbyb505_nqdxmtzlwy6']+'</td>'

                //                 +'<td class="label-cell">'+n['t_gyxmqkbyb505_zjxmsg9']+'</td>'
                //                 +'<td class="numeric-cell">'+n['t_gyxmqkbyb505_zjxmtzlwy10']+'</td>'
                //                 +'<td class="numeric-cell">'+n['t_gyxmqkbyb505_kgxmsg7']+'</td>'
                //                 +'<td class="numeric-cell">'+n['t_gyxmqkbyb505_kgxmtzlwy8']+'</td>'
                //                 +'<td class="numeric-cell">'+n['t_gyxmqkbyb505_jgtcxmsg11']+'</td>'
                //                 +'<td class="numeric-cell">'+n['t_gyxmqkbyb505_jgtcxmtzlwy12']+'</td></tr>'
                //               }
                //             }
                //         })
                //       $.each(data, function(i, n){
                //         if(n['t_gyxmqkbyb505_jssj3'].slice(0,7)==thisyear1+"-"+lastmon && n['t_gyxmqkbyb505_kssj2'].slice(0,7)==thisyear1+"-01"){
                //             if(n['t_gyxmqkbyb505_jzyq4'] !="全区"){
                //                 str +='<tr><td class="label-cell">'+n['t_gyxmqkbyb505_jzyq4']+'</td>'
                //               +'<td class="numeric-cell">'+n['t_gyxmqkbyb505_nqdxmsg5']+'</td>'
                //               +'<td class="numeric-cell">'+n['t_gyxmqkbyb505_nqdxmtzlwy6']+'</td>'

                //               +'<td class="label-cell">'+n['t_gyxmqkbyb505_zjxmsg9']+'</td>'
                //               +'<td class="numeric-cell">'+n['t_gyxmqkbyb505_zjxmtzlwy10']+'</td>'
                //               +'<td class="numeric-cell">'+n['t_gyxmqkbyb505_kgxmsg7']+'</td>'
                //               +'<td class="numeric-cell">'+n['t_gyxmqkbyb505_kgxmtzlwy8']+'</td>'
                //               +'<td class="numeric-cell">'+n['t_gyxmqkbyb505_jgtcxmsg11']+'</td>'
                //               +'<td class="numeric-cell">'+n['t_gyxmqkbyb505_jgtcxmtzlwy12']+'</td></tr>'
                //             }
                //         }
                //             // console.log(str)
                //       });
                // }    
                //1.2.5
                if (moduleId == "75") {
                    var thismonth = [];
                    var thismonths = [];

                    $.each(data, function (i, n) {
                        if ((n[ziduan].slice(0, 7) == (yearse + "-" + monthse)) && (n['t_clgytdphqkbyb506_kssj2'].slice(0, 7) == yearse + "-01")) {
                            thismonths.push(data[i]);
                        }
                    });


                    $.each(thismonths, function (i, n) {
                        if (n['t_clgytdphqkbyb506_jzyq4'] == "全区") {

                            str += '<tr><td class="label-cell">' + n['t_clgytdphqkbyb506_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_clgytdphqkbyb506_qnphms8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_clgytdphqkbyb506_bnmbphms9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_clgytdphqkbyb506_dyms11'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_clgytdphqkbyb506_ljms5'] + '</td>' +
                                '<td class="label-cell">' + n['t_clgytdphqkbyb506_pm6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_clgytdphqkbyb506_wcjd7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_clgytdphqkbyb506_wcjdpm10'] + '</td></tr>'
                        }
                    });
                    $.each(thismonths, function (i, n) {
                        if (n['t_clgytdphqkbyb506_jzyq4'] != "全区") {
                            str += '<tr><td class="label-cell">' + n['t_clgytdphqkbyb506_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_clgytdphqkbyb506_qnphms8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_clgytdphqkbyb506_bnmbphms9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_clgytdphqkbyb506_dyms11'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_clgytdphqkbyb506_ljms5'] + '</td>' +
                                '<td class="label-cell">' + n['t_clgytdphqkbyb506_pm6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_clgytdphqkbyb506_wcjd7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_clgytdphqkbyb506_wcjdpm10'] + '</td></tr>'
                        }
                    });
                }

                //1.3.1
                if (moduleId == "56") {

                    var lastyear = [];
                    var thisyearm = [];
                    var thisyear = [];
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + search_condition['jszd'] + '=' + search_condition['jsrq'] + '&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_fwyssqkbyb507_kssj2'] == yearse - 1 + '-01-01' && n['t_fwyssqkbyb507_jssj3'] == yearse - 1 + '-12-31') {
                                    lastyear.push(lastyedata[i]);
                                }
                            });

                        }
                    })
                    //alert(yearse);
                    $.each(data, function (i, n) {

                        var year = data[i]['t_fwyssqkbyb507_jssj3'].slice(0, 4);
                        var mon1 = data[i]['t_fwyssqkbyb507_kssj2'].slice(5, 7);
                        var mon2 = data[i]['t_fwyssqkbyb507_jssj3'].slice(5, 7);
                        // alert("year"+year);
                        // if (year == yearse - 1 && mon1 == "01" && mon2 == "12") {
                        //     lastyear.push(data[i]);
                        // }
                        if (year == yearse) {
                            //if(mon1==mon2 && mon2==monthse){}
                            if (mon1 == "01" && mon2 == monthse) {
                                thisyear.push(data[i]);
                            }
                        }

                    });
                    $.each(thisyear, function (i, v) {
                        $.each(lastyear, function (ii, vv) {
                            if (thisyear[i]['t_fwyssqkbyb507_xm4'] == lastyear[ii]['t_fwyssqkbyb507_xm4']) {
                                thisyear[i]['qunianzong'] = lastyear[ii]['t_fwyssqkbyb507_ljz7'];
                                thisyear[i]['qunianzeng'] = lastyear[ii]['t_fwyssqkbyb507_lj8'];
                            }
                        });
                    });

                    $.each(thisyear, function (i, n) {
                        str += '<tr><td class="label-cell">' + n['t_fwyssqkbyb507_xm4'] + '</td>' +
                            '<td class="numeric-cell">' + n['qunianzong'] + '</td>' +
                            '<td class="numeric-cell">' + n['qunianzeng'] + '</td>'
                            // +'<td class="numeric-cell">'+n['t_fwyssqkbyb507_dyz5']+'</td>'
                            // +'<td class="numeric-cell">'+n['t_fwyssqkbyb507_6']+'</td>'
                            +
                            '<td class="numeric-cell">' + n['t_fwyssqkbyb507_ljz7'] + '</td>' +
                            '<td class="numeric-cell">' + n['t_fwyssqkbyb507_lj8'] + '</td></tr>'
                    });
                }

                //1.3.2
                if (moduleId == "57") {
                    var lastyear = [];
                    var thisyearm = [];
                    var thisyearms = [];
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + search_condition['jszd'] + '=' + search_condition['jsrq'] + '&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_shfwyzyzbqkbyb508_kssj2'] == yearse - 1 + '-01-01' && n['t_shfwyzyzbqkbyb508_jssj3'] == yearse - 1 + '-12-31') {
                                    lastyear.push(lastyedata[i]);
                                }
                            });

                        }
                    })
                    $.each(data, function (i, n) {
                        var year = data[i]['t_shfwyzyzbqkbyb508_jssj3'].slice(0, 4);
                        var mon1 = data[i]['t_shfwyzyzbqkbyb508_kssj2'].slice(5, 7);
                        var mon2 = data[i]['t_shfwyzyzbqkbyb508_jssj3'].slice(5, 7);
                        // if (year == yearse - 1 && mon1 == "01" && mon2 == "12") {
                        //     lastyear.push(data[i]);
                        // }
                        if (year == yearse) {
                            if (mon1 == "01" && mon2 == monthse) {
                                thisyearms.push(data[i]);
                            }
                        }
                    });
                    $.each(thisyearms, function (i, v) {
                        $.each(lastyear, function (ii, vv) {
                            if (thisyearms[i]['t_shfwyzyzbqkbyb508_xm4'] == lastyear[ii]['t_shfwyzyzbqkbyb508_xm4']) {
                                thisyearms[i]['qunianzong'] = lastyear[ii]['t_shfwyzyzbqkbyb508_ljz7'];
                                thisyearms[i]['qunianzeng'] = lastyear[ii]['t_shfwyzyzbqkbyb508_lj8'];
                            }
                        });
                    });
                    $.each(thisyearms, function (i, n) {
                        if (n['t_shfwyzyzbqkbyb508_xm4'] == "总营业收入(规上)") {
                            str += '<tr><td class="label-cell" colspan="2">' + n['t_shfwyzyzbqkbyb508_xm4'] + '</td>' +
                                '<td class="numeric-cell">' + n['qunianzong'] + '</td>' +
                                '<td class="numeric-cell">' + n['qunianzeng'] + '</td>'
                                // +'<td class="numeric-cell">'+n['t_shfwyzyzbqkbyb508_dyz5']+'</td>'
                                // +'<td class="numeric-cell">'+n['t_shfwyzyzbqkbyb508_6']+'</td>'
                                +
                                '<td class="label-cell">' + n['t_shfwyzyzbqkbyb508_ljz7'] + '</td>' +
                                '<td class="label-cell">' + n['t_shfwyzyzbqkbyb508_lj8'] + '</td>' +
                                '</tr>'
                        }
                    });
                    $.each(thisyearms, function (i, n) {
                        if (n['t_shfwyzyzbqkbyb508_xm4'] == "信传软件和信息技术服务业") {
                            str += '<tr><td class="label-cell" rowspan="8">其中</td>' +
                                '<td class="numeric-cell">' + n['t_shfwyzyzbqkbyb508_xm4'] + '</td>' +
                                '<td class="numeric-cell">' + n['qunianzong'] + '</td>' +
                                '<td class="numeric-cell">' + n['qunianzeng'] + '</td>'
                                //    +'<td class="numeric-cell">'+n['t_shfwyzyzbqkbyb508_dyz5']+'</td>'
                                //    +'<td class="numeric-cell">'+n['t_shfwyzyzbqkbyb508_6']+'</td>'
                                +
                                '<td class="label-cell">' + n['t_shfwyzyzbqkbyb508_ljz7'] + '</td>' +
                                '<td class="label-cell">' + n['t_shfwyzyzbqkbyb508_lj8'] + '</td>' +
                                '</tr>'
                        }
                    });
                    $.each(thisyearms, function (i, n) {
                        if (n['t_shfwyzyzbqkbyb508_xm4'] != "信传软件和信息技术服务业" && n['t_shfwyzyzbqkbyb508_xm4'] != "总营业收入(规上)") {
                            str += '<td class="numeric-cell">' + n['t_shfwyzyzbqkbyb508_xm4'] + '</td>' +
                                '<td class="numeric-cell">' + n['qunianzong'] + '</td>' +
                                '<td class="numeric-cell">' + n['qunianzeng'] + '</td>'
                                //    +'<td class="numeric-cell">'+n['t_shfwyzyzbqkbyb508_dyz5']+'</td>'
                                //    +'<td class="numeric-cell">'+n['t_shfwyzyzbqkbyb508_6']+'</td>'
                                +
                                '<td class="label-cell">' + n['t_shfwyzyzbqkbyb508_ljz7'] + '</td>' +
                                '<td class="label-cell">' + n['t_shfwyzyzbqkbyb508_lj8'] + '</td>' +
                                '</tr>'
                        }
                    });

                }

                //1.3.4
                if (moduleId == "59") {

                    var lastyear = [];
                    var thisyearm = [];
                    var thisyearms = [];
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + search_condition['jszd'] + '=' + search_condition['jsrq'] + '&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_syzyzbqkbyb510_kssj2'] == yearse - 1 + '-01-01' && n['t_syzyzbqkbyb510_jssj3'] == yearse - 1 + '-12-31') {
                                    lastyear.push(lastyedata[i]);
                                }
                            });

                        }
                    })
                    $.each(data, function (i, n) {
                        var year = data[i]['t_syzyzbqkbyb510_jssj3'].slice(0, 4);
                        var mon1 = data[i]['t_syzyzbqkbyb510_kssj2'].slice(5, 7);
                        var mon2 = data[i]['t_syzyzbqkbyb510_jssj3'].slice(5, 7);

                        // if (year == yearse - 1 && mon1 == "01" && mon2 == "12") {
                        //     lastyear.push(data[i]);
                        // }
                        if (year == yearse) {
                            if (mon1 == "01" && mon2 == monthse) {
                                thisyearms.push(data[i]);
                            }
                        }
                    });
                    $.each(thisyearms, function (i, v) {
                        $.each(lastyear, function (ii, vv) {
                            if (thisyearms[i]['t_syzyzbqkbyb510_xm4'] == lastyear[ii]['t_syzyzbqkbyb510_xm4']) {
                                thisyearms[i]['qunianzong'] = lastyear[ii]['t_syzyzbqkbyb510_dyjeyy7'];
                                thisyearms[i]['qunianzeng'] = lastyear[ii]['t_syzyzbqkbyb510_dy8'];
                            }
                        });
                    })
                    $.each(thisyearms, function (i, n) {
                        if (n['t_syzyzbqkbyb510_xm4'] == "商品销售额" || n['t_syzyzbqkbyb510_xm4'] == "社会消费品零售总额") {
                            str += '<tr><td class="label-cell" colspan="2">' + n['t_syzyzbqkbyb510_xm4'] + '</td>' +
                                '<td class="numeric-cell">' + n['qunianzong'] + '</td>' +
                                '<td class="numeric-cell">' + n['qunianzeng'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_syzyzbqkbyb510_dyjeyy7'] + '</td>'
                                // +'<td class="numeric-cell">'+n['t_syzyzbqkbyb510_dy8']+'</td>'
                                +
                                '<td class="label-cell">' + n['t_syzyzbqkbyb510_ljjeyy5'] + '</td>' +
                                '<td class="label-cell">' + n['t_syzyzbqkbyb510_lj6'] + '</td>' +
                                '</tr>'
                        }
                        if (n['t_syzyzbqkbyb510_xm4'] == "批发零售业") {
                            str += '<tr><td class="label-cell" rowspan="2">其中</td>' +
                                '<td class="label-cell">' + n['t_syzyzbqkbyb510_xm4'] + '</td>' +
                                '<td class="numeric-cell">' + n['qunianzong'] + '</td>' +
                                '<td class="numeric-cell">' + n['qunianzeng'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_syzyzbqkbyb510_dyjeyy7'] + '</td>'
                                // +'<td class="numeric-cell">'+n['t_syzyzbqkbyb510_dy8']+'</td>'
                                +
                                '<td class="label-cell">' + n['t_syzyzbqkbyb510_ljjeyy5'] + '</td>' +
                                '<td class="label-cell">' + n['t_syzyzbqkbyb510_lj6'] + '</td>' +
                                '</tr>'
                        }
                        if (n['t_syzyzbqkbyb510_xm4'] == "住宿和餐饮业") {
                            str += '<tr><td class="numeric-cell">' + n['t_syzyzbqkbyb510_xm4'] + '</td>' +
                                '<td class="numeric-cell">' + n['qunianzong'] + '</td>' +
                                '<td class="numeric-cell">' + n['qunianzeng'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_syzyzbqkbyb510_dyjeyy7'] + '</td>'
                                // +'<td class="numeric-cell">'+n['t_syzyzbqkbyb510_dy8']+'</td>'
                                +
                                '<td class="label-cell">' + n['t_syzyzbqkbyb510_ljjeyy5'] + '</td>' +
                                '<td class="label-cell">' + n['t_syzyzbqkbyb510_lj6'] + '</td>' +
                                '</tr>'
                        }

                    });

                }



                //1.3.6
                if (moduleId == "6") {
                    var lastyear = [];
                    var thisyearm = [];
                    var thisyearms = [];
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + search_condition['jszd'] + '=' + search_condition['jsrq'] + '&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_sylyqkbyb512_kssj2'] == yearse - 1 + '-01-01' && n['t_sylyqkbyb512_jssj3'] == yearse - 1 + '-12-31') {
                                    lastyear.push(lastyedata[i]);
                                }
                            });

                        }
                    })
                    $.each(data, function (i, n) {
                        var year = data[i]['t_sylyqkbyb512_jssj3'].slice(0, 4);
                        var mon1 = data[i]['t_sylyqkbyb512_kssj2'].slice(5, 7);
                        var mon2 = data[i]['t_sylyqkbyb512_jssj3'].slice(5, 7);

                        // if (n['t_sylyqkbyb512_jssj3'].slice(0, 7) == (yearse - 1) + "-12" && n['t_sylyqkbyb512_kssj2'].slice(0, 7) == (yearse - 1) + "-01") {
                        //     lastyear.push(data[i]);
                        // }

                        if (n['t_sylyqkbyb512_jssj3'].slice(0, 7) == yearse + '-' + monthse && n['t_sylyqkbyb512_kssj2'].slice(0, 7) == yearse + '-' + monthse) {
                            thisyearm.push(data[i]);
                        }
                        if (n['t_sylyqkbyb512_jssj3'].slice(0, 7) == yearse + '-' + monthse && n['t_sylyqkbyb512_kssj2'].slice(0, 7) == yearse + "-01") {
                            thisyearms.push(data[i]);
                        }
                    });
                    $.each(lastyear, function (i, n) {
                        $.each(thisyearms, function (ii, nn) {
                            if (lastyear[i]['t_sylyqkbyb512_jzyq4'] == thisyearms[ii]['t_sylyqkbyb512_jzyq4']) {
                                lastyear[i]['jinniansc'] = thisyearms[ii]["t_sylyqkbyb512_dxscsl5"]

                                lastyear[i]['jinnianxjly'] = thisyearms[ii]["t_sylyqkbyb512_xjlyfdsl6"]

                                lastyear[i]['jinnianajly'] = thisyearms[ii]["t_sylyqkbyb512_ajlyjqdsl7"]

                                lastyear[i]['jinnianjdyk'] = thisyearms[ii]["t_sylyqkbyb512_jdyksrc8"]

                                lastyear[i]['jinnianlyzs'] = thisyearms[ii]["t_sylyqkbyb512_lyzsrwy9"]
                                lastyear[i]['benyuelyzs'] = thisyearms[ii]["t_sylyqkbyb512_dylyzsrwy10"]

                            }
                        });

                    });
                    $.each(lastyear, function (i, n) {
                        str += '<tr><td class="label-cell">' + lastyear[i]['t_sylyqkbyb512_jzyq4'] + '</td>' +
                            '<td class="numeric-cell">' + lastyear[i]['jinniansc'] + '</td>' +
                            '<td class="numeric-cell">' + lastyear[i]['jinnianxjly'] + '</td>' +
                            '<td class="numeric-cell">' + lastyear[i]['jinnianajly'] + '</td>' +
                            '<td class="numeric-cell">' + lastyear[i]['jinnianjdyk'] + '</td>' +
                            '<td class="numeric-cell">' + lastyear[i]['t_sylyqkbyb512_lyzsrwy9'] + '</td>' +
                            '<td class="numeric-cell">' + lastyear[i]['benyuelyzs'] + '</td>' +
                            '<td class="numeric-cell">' + lastyear[i]['jinnianlyzs'] + '</td></tr>'

                    });
                }
                //1.5
                if (moduleId == "9") {
                    var lastyear = [];
                    var thisyearm = [];
                    var thisyearms = [];
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + search_condition['jszd'] + '=' + search_condition['jsrq'] + '&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_yljjfzqkbyb515_kssj2'] == yearse - 1 + '-01-01' && n['t_yljjfzqkbyb515_jssj3'] == yearse - 1 + '-12-31') {
                                    lastyear.push(lastyedata[i]['t_yljjfzqkbyb515_kbylsc4']);
                                    lastyear.push(lastyedata[i]['t_yljjfzqkbyb515_kbylzc5']);
                                    lastyear.push(lastyedata[i]['t_yljjfzqkbyb515_crjykrc6']);
                                    lastyear.push(lastyedata[i]['t_yljjfzqkbyb515_crjykzc7']);
                                    lastyear.push(lastyedata[i]['t_yljjfzqkbyb515_mgykrc8']);
                                    lastyear.push(lastyedata[i]['t_yljjfzqkbyb515_fwgykrc9']);
                                    lastyear.push(lastyedata[i]['t_yljjfzqkbyb515_jwykrc10']);
                                    lastyear.push(lastyedata[i]['t_yljjfzqkbyb515_zcqysl11']);
                                    lastyear.push(lastyedata[i]['t_yljjfzqkbyb515_zcqyzc12']);
                                    lastyear.push(lastyedata[i]['t_yljjfzqkbyb515_ssnszeyy13']);
                                    lastyear.push(lastyedata[i]['t_yljjfzqkbyb515_cghzyy15']);
                                    lastyear.push(lastyedata[i]['t_yljjfzqkbyb515_zdqyyysrzlyy17']);
                                    lastyear.push(lastyedata[i]['t_yljjfzqkbyb515_zdqyyysrzc18']);
                                    lastyear.push(lastyedata[i]['t_yljjfzqkbyb515_zdqylrzezlyy19']);
                                    lastyear.push(lastyedata[i]['t_yljjfzqkbyb515_zdqylrzezc20']);
                                    lastyear.push(lastyedata[i]['t_yljjfzqkbyb515_zdqyjlrzlyy21']);
                                    lastyear.push(lastyedata[i]['t_yljjfzqkbyb515_zdqyjlrzc22']);
                                    lastyear.push(lastyedata[i]['t_yljjfzqkbyb515_zdqynsezlyy23']);
                                    lastyear.push(lastyedata[i]['t_yljjfzqkbyb515_zdqynsezc24']);
                                    lastyear.push((lastyedata[i]['t_yljjfzqkbyb515_sszc14']));
                                    lastyear.push((lastyedata[i]['t_yljjfzqkbyb515_cgzc16']));
                                }
                            });

                        }
                    })
                    $.each(data, function (i, n) {
                        var year = data[i]['t_yljjfzqkbyb515_jssj3'].slice(0, 4);
                        var mon1 = data[i]['t_yljjfzqkbyb515_kssj2'].slice(5, 7);
                        var mon2 = data[i]['t_yljjfzqkbyb515_jssj3'].slice(5, 7);

                        // if (year == yearse - 1) {
                        //     lastyear.push(data[i]['t_yljjfzqkbyb515_kbylsc4']);
                        //     lastyear.push(data[i]['t_yljjfzqkbyb515_kbylzc5']);
                        //     lastyear.push(data[i]['t_yljjfzqkbyb515_crjykrc6']);
                        //     lastyear.push(data[i]['t_yljjfzqkbyb515_crjykzc7']);
                        //     lastyear.push(data[i]['t_yljjfzqkbyb515_mgykrc8']);
                        //     lastyear.push(data[i]['t_yljjfzqkbyb515_fwgykrc9']);
                        //     lastyear.push(data[i]['t_yljjfzqkbyb515_jwykrc10']);
                        //     lastyear.push(data[i]['t_yljjfzqkbyb515_zcqysl11']);
                        //     lastyear.push(data[i]['t_yljjfzqkbyb515_zcqyzc12']);
                        //     lastyear.push(data[i]['t_yljjfzqkbyb515_ssnszeyy13']);
                        //     lastyear.push(data[i]['t_yljjfzqkbyb515_cghzyy15']);
                        //     lastyear.push(data[i]['t_yljjfzqkbyb515_zdqyyysrzlyy17']);
                        //     lastyear.push(data[i]['t_yljjfzqkbyb515_zdqyyysrzc18']);
                        //     lastyear.push(data[i]['t_yljjfzqkbyb515_zdqylrzezlyy19']);
                        //     lastyear.push(data[i]['t_yljjfzqkbyb515_zdqylrzezc20']);
                        //     lastyear.push(data[i]['t_yljjfzqkbyb515_zdqyjlrzlyy21']);
                        //     lastyear.push(data[i]['t_yljjfzqkbyb515_zdqyjlrzc22']);
                        //     lastyear.push(data[i]['t_yljjfzqkbyb515_zdqynsezlyy23']);
                        //     lastyear.push(data[i]['t_yljjfzqkbyb515_zdqynsezc24']);
                        //     lastyear.push((data[i]['t_yljjfzqkbyb515_sszc14']));
                        //     lastyear.push((data[i]['t_yljjfzqkbyb515_cgzc16']));
                        // }
                        if (year == yearse) {
                            // if(mon1==mon2 && mon2==monthse){}

                            if (mon1 == "01" && mon2 == monthse) {
                                thisyearms.push(parseFloat(data[i]['t_yljjfzqkbyb515_kbylsc4']));
                                thisyearms.push(parseFloat(data[i]['t_yljjfzqkbyb515_kbylzc5']));
                                thisyearms.push(parseFloat(data[i]['t_yljjfzqkbyb515_crjykrc6']));
                                thisyearms.push(parseFloat(data[i]['t_yljjfzqkbyb515_crjykzc7']));
                                thisyearms.push(parseFloat(data[i]['t_yljjfzqkbyb515_mgykrc8']));
                                thisyearms.push(parseFloat(data[i]['t_yljjfzqkbyb515_fwgykrc9']));
                                thisyearms.push(parseFloat(data[i]['t_yljjfzqkbyb515_jwykrc10']));
                                thisyearms.push(parseFloat(data[i]['t_yljjfzqkbyb515_zcqysl11']));
                                thisyearms.push(parseFloat(data[i]['t_yljjfzqkbyb515_zcqyzc12']));
                                thisyearms.push(parseFloat(data[i]['t_yljjfzqkbyb515_ssnszeyy13']));
                                thisyearms.push(parseFloat(data[i]['t_yljjfzqkbyb515_cghzyy15']));
                                thisyearms.push(parseFloat(data[i]['t_yljjfzqkbyb515_zdqyyysrzlyy17']));
                                thisyearms.push(parseFloat(data[i]['t_yljjfzqkbyb515_zdqyyysrzc18']));
                                thisyearms.push(parseFloat(data[i]['t_yljjfzqkbyb515_zdqylrzezlyy19']));
                                thisyearms.push(parseFloat(data[i]['t_yljjfzqkbyb515_zdqylrzezc20']));
                                thisyearms.push(parseFloat(data[i]['t_yljjfzqkbyb515_zdqyjlrzlyy21']));
                                thisyearms.push(parseFloat(data[i]['t_yljjfzqkbyb515_zdqyjlrzc22']));
                                thisyearms.push(parseFloat(data[i]['t_yljjfzqkbyb515_zdqynsezlyy23']));
                                thisyearms.push(parseFloat(data[i]['t_yljjfzqkbyb515_zdqynsezc24']));
                                thisyearms.push((data[i]['t_yljjfzqkbyb515_sszc14']));
                                thisyearms.push((data[i]['t_yljjfzqkbyb515_cgzc16']));
                            }
                            if (mon1 == monthse && mon2 == monthse) {
                                thisyearm.push((data[i]['t_yljjfzqkbyb515_kbylsc4']));
                                thisyearm.push((data[i]['t_yljjfzqkbyb515_kbylzc5']));
                                thisyearm.push((data[i]['t_yljjfzqkbyb515_crjykrc6']));
                                thisyearm.push((data[i]['t_yljjfzqkbyb515_crjykzc7']));
                                thisyearm.push((data[i]['t_yljjfzqkbyb515_mgykrc8']));
                                thisyearm.push((data[i]['t_yljjfzqkbyb515_fwgykrc9']));
                                thisyearm.push((data[i]['t_yljjfzqkbyb515_jwykrc10']));
                                thisyearm.push((data[i]['t_yljjfzqkbyb515_zcqysl11']));
                                thisyearm.push((data[i]['t_yljjfzqkbyb515_zcqyzc12']));
                                thisyearm.push((data[i]['t_yljjfzqkbyb515_ssnszeyy13']));
                                thisyearm.push((data[i]['t_yljjfzqkbyb515_cghzyy15']));
                                thisyearm.push((data[i]['t_yljjfzqkbyb515_zdqyyysrzlyy17']));
                                thisyearm.push((data[i]['t_yljjfzqkbyb515_zdqyyysrzc18']));
                                thisyearm.push((data[i]['t_yljjfzqkbyb515_zdqylrzezlyy19']));
                                thisyearm.push((data[i]['t_yljjfzqkbyb515_zdqylrzezc20']));
                                thisyearm.push((data[i]['t_yljjfzqkbyb515_zdqyjlrzlyy21']));
                                thisyearm.push((data[i]['t_yljjfzqkbyb515_zdqyjlrzc22']));
                                thisyearm.push((data[i]['t_yljjfzqkbyb515_zdqynsezlyy23']));
                                thisyearm.push((data[i]['t_yljjfzqkbyb515_zdqynsezc24']));
                                thisyearm.push((data[i]['t_yljjfzqkbyb515_sszc14']));
                                thisyearm.push((data[i]['t_yljjfzqkbyb515_cgzc16']));
                            }

                        }


                    });
                    str += '<tr><td class="label-cell" rowspan="7">港口运营</td>' +
                        '<td class="numeric-cell" rowspan="2">靠泊游轮</td>' +
                        '<td class="numeric-cell">艘次</td>' +
                        '<td class="numeric-cell">' + lastyear[0] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[0] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[0] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">增长</td>' +
                        '<td class="numeric-cell">' + lastyear[1] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[1] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[1] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell" rowspan="2">出入境游客</td>' +
                        '<td class="numeric-cell">人次</td>' +
                        '<td class="numeric-cell">' + lastyear[2] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[2] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[2] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">增长</td>' +
                        '<td class="numeric-cell">' + lastyear[3] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[3] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[3] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">母港游客</td>' +
                        '<td class="numeric-cell">人次</td>' +
                        '<td class="numeric-cell">' + lastyear[4] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[4] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[4] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">访问港游客</td>' +
                        '<td class="numeric-cell">人次</td>' +
                        '<td class="numeric-cell">' + lastyear[5] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[5] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[5] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">境外游客</td>' +
                        '<td class="numeric-cell">人次</td>' +
                        '<td class="numeric-cell">' + lastyear[6] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[6] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[6] + '</td>' +
                        '</tr>' +
                        '<tr><td class="label-cell" rowspan="6">产业延伸</td>' +
                        '<td class="numeric-cell" rowspan="2">注册企业</td>' +
                        '<td class="numeric-cell">数量</td>' +
                        '<td class="numeric-cell">' + lastyear[7] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[7] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[7] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">增长</td>' +
                        '<td class="numeric-cell">' + lastyear[8] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[8] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[8] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell" rowspan="2">税收</td>' +
                        '<td class="numeric-cell">纳税总额</td>' +
                        '<td class="numeric-cell">' + lastyear[9] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[9] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[9] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">增长</td>' +
                        '<td class="numeric-cell">' + lastyear[19] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[19] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[19] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell" rowspan="2">船供</td>' +
                        '<td class="numeric-cell">货值</td>' +
                        '<td class="numeric-cell">' + lastyear[10] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[10] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[10] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">增长</td>' +
                        '<td class="numeric-cell">' + lastyear[20] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[20] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[20] + '</td>' +
                        '</tr>' +
                        '<tr><td class="label-cell" rowspan="8">重点企业</td>' +
                        '<td class="numeric-cell" rowspan="2">营业收入</td>' +
                        '<td class="numeric-cell">总量</td>' +
                        '<td class="numeric-cell">' + lastyear[11] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[11] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[11] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">增长</td>' +
                        '<td class="numeric-cell">' + lastyear[12] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[12] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[12] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell" rowspan="2">利润总额</td>' +
                        '<td class="numeric-cell">总量</td>' +
                        '<td class="numeric-cell">' + lastyear[13] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[13] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[13] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">增长</td>' +
                        '<td class="numeric-cell">' + lastyear[14] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[14] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[14] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell" rowspan="2">净利润</td>' +
                        '<td class="numeric-cell">总量</td>' +
                        '<td class="numeric-cell">' + lastyear[15] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[15] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[15] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">增长</td>' +
                        '<td class="numeric-cell">' + lastyear[16] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[16] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[16] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell" rowspan="2">纳税额</td>' +
                        '<td class="numeric-cell">总量</td>' +
                        '<td class="numeric-cell">' + lastyear[17] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[17] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[17] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">增长</td>' +
                        '<td class="numeric-cell">' + lastyear[18] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[18] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[18] + '</td>' +
                        '</tr>'
                }
                //2.4
                if (moduleId == "84") {

                    var lastarr = {},
                        thismons = {};
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + search_condition['jszd'] + '=' + search_condition['jsrq'] + '&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_bsqhbqkyd599_kssj2'] == yearse - 1 + '-01-01' && n['t_bsqhbqkyd599_jssj3'] == yearse - 1 + '-12-31') {
                                    lastarr = n;
                                }
                            });

                        }
                    })
                    $.each(data, function (i, n) {
                        var year = data[i]['t_bsqhbqkyd599_jssj3'].slice(0, 4);
                        var mon1 = data[i]['t_bsqhbqkyd599_kssj2'].slice(5, 7);
                        var mon2 = data[i]['t_bsqhbqkyd599_jssj3'].slice(5, 7);
                        // if (n['t_bsqhbqkyd599_kssj2'].slice(0, 4) == yearse - 1) {
                        //     lastarr = n;
                        // }
                        if (year == yearse) {
                            if (mon1 == "01" && mon2 == monthse) {
                                thismons = n;
                            }
                        }
                    });
                    str += '<tr>' +
                        '<td class="label-cell">空气质量指数(AQI)优良率(%)</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqhbqkyd599_kqzlyllaqi4'] + '</td>' +
                        '<td class="numeric-cell">' + thismons['t_bsqhbqkyd599_kqzlyllaqi4'] + '</td>' +
                        '<td class="numeric-cell">' + thismons['t_bsqhbqkyd599_aqitb7'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">PM2.5浓度(微克/立方米)</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqhbqkyd599_pmnd5'] + '</td>' +
                        '<td class="numeric-cell">' + thismons['t_bsqhbqkyd599_pmnd5'] + '</td>' +
                        '<td class="numeric-cell">' + thismons['t_bsqhbqkyd599_tb6'] + '</td>' +
                        '</tr>'
                }
                //2.5
                if (moduleId == "85") {
                    var last = [],
                        thismonth = [],
                        lastyearmonth = [];

                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-01-01";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + search_condition['kszd'] + '=' + search_condition['jsrq'] + '&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_bsqkhdmjcqkyb600_jssj3'].slice(0, 7) == (yearse - 1) + "-12" && n['t_bsqkhdmjcqkyb600_kssj2'].slice(0, 7) == (yearse - 1) + "-01") {
                                    last.push(lastyedata[i]);
                                }
                                // if (n['t_bsqkhdmjcqkyb600_jssj3'].slice(0, 7) == (yearse - 1) + "-" + monthse && n['t_bsqkhdmjcqkyb600_kssj2'].slice(0, 7) == (yearse - 1) + "-01") {
                                //     lastyearmonth.push(lastyedata[i]);
                                // }
                            });

                        }
                    })
                    $.each(data, function (i, n) {
                        // if (n['t_bsqkhdmjcqkyb600_jssj3'].slice(0, 7) == (yearse - 1) + "-12" && n['t_bsqkhdmjcqkyb600_kssj2'].slice(0, 7) == (yearse - 1) + "-01") {
                        //     last.push(data[i]);
                        // }

                        if (n['t_bsqkhdmjcqkyb600_jssj3'].slice(0, 7) == yearse + "-" + monthse && n['t_bsqkhdmjcqkyb600_kssj2'].slice(0, 7) == yearse + "-01") {
                            thismonth.push(data[i]);
                        }
                        
                    });
                    $.each(last, function (i, n) {
                        $.each(thismonth, function (ii, nn) {
                            if (last[i]['t_bsqkhdmjcqkyb600_jcdmc4'] == thismonth[ii]['t_bsqkhdmjcqkyb600_jcdmc4']) {
                                last[i]['jinnianshuizhi'] = thismonth[ii]["t_bsqkhdmjcqkyb600_szlb6"]
                                last[i]['qunianshuzhi'] = thismonth[ii]["t_bsqkhdmjcqkyb600_qntq"]
                            }

                        });

                    });
                    // $.each(last, function (i, n) {
                    //     $.each(lastyearmonth, function (ii, nn) {
                    //         if (last[i]['t_bsqkhdmjcqkyb600_jcdmc4'] == lastyearmonth[ii]['t_bsqkhdmjcqkyb600_jcdmc4']) {
                    //             last[i]['qunianshuzhi'] = lastyearmonth[ii]["t_bsqkhdmjcqkyb600_szlb6"]
                    //         }
                    //     });
                    // });
                    $.each(last, function (i, n) {
                        str += '<tr>' +
                            '<td class="label-cell">' + n['t_bsqkhdmjcqkyb600_jcdmc4'] + '</td>' +
                            '<td class="numeric-cell">' + n['t_bsqkhdmjcqkyb600_ssjz5'] + '</td>' +
                            '<td class="numeric-cell">' + n['t_bsqkhdmjcqkyb600_szlb6'] + '</td>' +
                            '<td class="numeric-cell">' + n['qunianshuzhi'] + '</td>' +
                            '<td class="label-cell">' + n['jinnianshuizhi'] + '</td>' +
                            '</tr>'

                    });

                }
                //4.1宝山人力资源
                if (moduleId == "94") {
                    var lastarr = {};
                    var thismonthes = {};
                    var thismonth = {};
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + search_condition['jszd'] + '=' + search_condition['jsrq'] + '&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_bsqrlzyhshbzqkyb681_date3'] == (yearse - 1) + "-12-31" && n['t_bsqrlzyhshbzqkyb681_date2'] == (yearse - 1) + "-01-01") {
                                    lastarr = lastyedata[i];
                                }
                            });

                        }
                    })
                    $.each(data, function (i, n) {
                        // if (data[i]['t_bsqrlzyhshbzqkyb681_date3'].slice(0, 4) == (yearse - 1)) {
                        //     lastarr = data[i];
                        //     console.log(lastarr)
                        // }
                        if (data[i]['t_bsqrlzyhshbzqkyb681_date3'].slice(0, 7) == (yearse + '-' + monthse) && data[i]['t_bsqrlzyhshbzqkyb681_date2'] == (yearse + '-01-01')) {

                            thismonthes = data[i];
                            console.log(thismonthes)
                        }
                        if (data[i]['t_bsqrlzyhshbzqkyb681_date3'].slice(0, 7) == (yearse + '-' + monthse) && data[i]['t_bsqrlzyhshbzqkyb681_date2'].slice(0, 7) == (yearse + '-' + monthse)) {
                            thismonth = data[i];
                            console.log(thismonth)
                        }
                    });
                    if ($.isEmptyObject(lastarr)) {
                        for (var i in data[0]) {
                            lastarr[i] = ""
                        }
                    }

                    if ($.isEmptyObject(thismonthes)) {
                        //var thismonthes=[]
                        for (var i in data[0]) {
                            thismonthes[i] = ""
                        }
                    }
                    if ($.isEmptyObject(thismonth)) {
                        //  thismonth=data[0];
                        // var thismonth=[]
                        for (var i in data[0]) {
                            thismonth[i] = "";
                        }
                    }
                    str = '<tr>' +
                        '<td class="label-cell">1</td>' +
                        '<td class="numeric-cell" rowspan="8">就业创业</td>' +
                        '<td class="numeric-cell">全年城镇登记失业人数/市下达控制数</td>' +
                        '<td class="numeric-cell">人/人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_qnczdjsyrssxdkzs4'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_qnczdjsyrssxdkzs4'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_qnczdjsyrssxdkzs4'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">2</td>' +
                        '<td class="numeric-cell">帮扶引领创业人数</td>' +
                        '<td class="numeric-cell">人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_bfylcyrs5'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_bfylcyrs5'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_bfylcyrs5'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">3</td>' +
                        '  <td class="numeric-cell">长期失业青年实现就业创业</td>' +
                        '<td class="numeric-cell">人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_cqsyqnsxjycy6'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_cqsyqnsxjycy6'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_cqsyqnsxjycy6'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">4</td>' +
                        '<td class="numeric-cell">就业困难人员安置数</td>' +
                        '<td class="numeric-cell">人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_jyknryazs7'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_jyknryazs7'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_jyknryazs7'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">5</td>' +
                        '<td class="numeric-cell">零就业家庭安置数</td>' +
                        '<td class="numeric-cell">户</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_ljyjtazs8'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_ljyjtazs8'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_ljyjtazs8'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">6</td>' +
                        '<td class="numeric-cell">就业困难人员按时安置率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_jyknryasazl9'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_jyknryasazl9'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_jyknryasazl9'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">7</td>' +
                        '<td class="numeric-cell">发放创业贷款担保</td>' +
                        '<td class="numeric-cell">笔</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_ffcydkdb10'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_ffcydkdb10'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_ffcydkdb10'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">8</td>' +
                        ' <td class="numeric-cell">发放创业贷款担保金额</td>' +
                        ' <td class="numeric-cell">元</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_ffcydkdbje11'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_ffcydkdbje11'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_ffcydkdbje11'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">9</td>' +
                        '<td class="numeric-cell" rowspan="6">社会保障</td>' +
                        ' <td class="numeric-cell">城乡居保参保缴费人数</td>' +
                        '<td class="numeric-cell">人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_cxjbcbjfrs12'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_cxjbcbjfrs12'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_cxjbcbjfrs12'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">10</td>' +
                        '<td class="numeric-cell">城乡居保续缴费率</td>' +
                        ' <td class="numeric-cell">%</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_cxjbxjfl13'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_cxjbxjfl13'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_cxjbxjfl13'] + '</td>' +
                        ' </tr>' +
                        '<tr>' +
                        ' <td class="numeric-cell">11</td>' +
                        ' <td class="numeric-cell">办理征地项目</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_blzdxm14'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_blzdxm14'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_blzdxm14'] + '</td>' +
                        '</tr>' +
                        ' <tr>' +
                        ' <td class="numeric-cell">12</td>' +
                        ' <td class="numeric-cell">办理征地项目落实保障人数</td>' +
                        '<td class="numeric-cell">人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_blzdxmlsbzrs15'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_blzdxmlsbzrs15'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_blzdxmlsbzrs15'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        ' <td class="numeric-cell">13</td>' +
                        ' <td class="numeric-cell">征地养老区级统筹管理人员数</td>' +
                        '<td class="numeric-cell">人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_zdylqjtcglrys16'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_zdylqjtcglrys16'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_zdylqjtcglrys16'] + '</td>' +
                        '</tr>' +
                        ' <tr>' +
                        '<td class="numeric-cell">14</td>' +
                        '<td class="numeric-cell">符合条件的长护险参保老年人居家照护服务供应量</td>' +
                        '<td class="numeric-cell">人次</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_fhtjdchxcblnrjjzhfwgyl17'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_fhtjdchxcblnrjjzhfwgyl17'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_fhtjdchxcblnrjjzhfwgyl17'] + '</td>' +
                        '</tr>' +
                        ' <tr>' +
                        '<td class="label-cell">15</td>' +
                        ' <td class="numeric-cell" rowspan="9">劳动关系</td>' +
                        '<td class="numeric-cell">辖区内“上海市和谐劳动关系达标企业”数</td>' +
                        '<td class="numeric-cell">家</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_xqshshxldgxdbqys18'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_xqshshxldgxdbqys18'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_xqshshxldgxdbqys18'] + '</td>' +
                        ' </tr>' +
                        '<tr>' +
                        ' <td class="numeric-cell">16</td>' +
                        '<td class="numeric-cell">年度和谐劳动关系创建符合区级达标标准</td>' +
                        '<td class="numeric-cell">家</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_ndhxldgxcjfhqjdbbz19'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_ndhxldgxcjfhqjdbbz19'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_ndhxldgxcjfhqjdbbz19'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        ' <td class="numeric-cell">17</td>' +
                        ' <td class="numeric-cell">劳动人事争议仲裁案件按期办结率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_ldrszyzcajaqbjl20'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_ldrszyzcajaqbjl20'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_ldrszyzcajaqbjl20'] + '</td>' +
                        '</tr>' +
                        ' <tr>' +
                        ' <td class="numeric-cell">18</td>' +
                        '<td class="numeric-cell">年度劳动人事争议综合调解率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_ndldrszyzhdjl21'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_ndldrszyzhdjl21'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_ndldrszyzhdjl21'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">19</td>' +
                        '<td class="numeric-cell">调解组织和仲裁机构受理案件</td>' +
                        ' <td class="numeric-cell">件</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_djzzhzcjgslaj22'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_djzzhzcjgslaj22'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_djzzhzcjgslaj22'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        ' <td class="numeric-cell">20</td>' +
                        '<td class="numeric-cell">调解组织和仲裁机构办结案件</td>' +
                        ' <td class="numeric-cell">件</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_djzzhzcjgbjaj23'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_djzzhzcjgbjaj23'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_djzzhzcjgbjaj23'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        ' <td class="numeric-cell">21</td>' +
                        '<td class="numeric-cell">重大突发及10人以上群体性劳资纠纷</td>' +
                        ' <td class="numeric-cell">起</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_zdtfjrysqtxlzjf24'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_zdtfjrysqtxlzjf24'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_zdtfjrysqtxlzjf24'] + '</td>' +
                        '</tr>' +
                        ' <tr>' +
                        ' <td class="numeric-cell">22</td>' +
                        '<td class="numeric-cell">重大突发及10人以上群体性劳资纠纷涉及人数</td>' +
                        ' <td class="numeric-cell">人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_zdtfjrysqtxlzjfsjrs25'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_zdtfjrysqtxlzjfsjrs25'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_zdtfjrysqtxlzjfsjrs25'] + '</td>' +
                        ' </tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">23</td>' +
                        '<td class="numeric-cell">重大突发及10人以上群体性劳资纠纷涉及金额</td>' +
                        '<td class="numeric-cell">万元</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_zdtfjrysqtxlzjfsjje26'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_zdtfjrysqtxlzjfsjje26'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_zdtfjrysqtxlzjfsjje26'] + '</td>' +
                        ' </tr>' +
                        '<tr>' +
                        ' <td class="label-cell">24</td>' +
                        '<td class="numeric-cell" rowspan="2">人力资源</td>' +
                        '<td class="numeric-cell">*全区社区工作者人数</td>' +
                        ' <td class="numeric-cell">人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_qqsqgzzrs27'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_qqsqgzzrs27'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_qqsqgzzrs27'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        ' <td class="numeric-cell">25</td>' +
                        ' <td class="numeric-cell">全区社区工作者薪酬水平人均</td>' +
                        ' <td class="numeric-cell">元/年</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_qqsqgzzxcsprj28'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_qqsqgzzxcsprj28'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_qqsqgzzxcsprj28'] + '</td>' +
                        '</tr>'
                }
                //2.7
                if (moduleId == "87") {
                    var lastarr = {},
                        thismonth = {},
                        thismonthes = {};
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + search_condition['jszd'] + '=' + search_condition['jsrq'] + '&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_bsqsngzqkyb604_jssj3'] == (yearse - 1) + "-12-31" && n['t_bsqsngzqkyb604_kssj2'] == (yearse - 1) + "-01-01") {
                                    lastarr = data[i];
                                }
                            });

                        }
                    })
                    $.each(data, function (i, n) {
                        if (data[i]['t_bsqsngzqkyb604_jssj3'].slice(0, 4) == (yearse - 1)) {
                            lastarr = data[i];
                        }
                        if (data[i]['t_bsqsngzqkyb604_jssj3'].slice(0, 7) == (yearse + '-' + monthse) && data[i]['t_bsqsngzqkyb604_kssj2'] == (yearse + '-01-01')) {
                            thismonthes = data[i];
                        }
                        if (data[i]['t_bsqsngzqkyb604_jssj3'].slice(0, 7) == (yearse + '-' + monthse) && data[i]['t_bsqsngzqkyb604_kssj2'].slice(0, 7) == (yearse + '-' + monthse)) {
                            thismonth = data[i];
                        }
                    });
                    str += '<tr>' +
                        '<td class="label-cell" rowspan="10">1</td>' +
                        '<td class="numeric-cell" rowspan="13">基础数据</td>' +
                        '<td class="numeric-cell" colspan="2">行政村数总数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_xzcszs4'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_xzcszs4'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_xzcszs4'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell"><div style="width:30px">1.1</div></td>' +
                        '<td class="numeric-cell">杨行镇</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_xzcsyxz5'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_xzcsyxz5'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_xzcsyxz5'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">1.2</td>' +
                        '<td class="numeric-cell">月浦镇</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_xzcsypz6'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_xzcsypz6'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_xzcsypz6'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">1.3</td>' +
                        '<td class="numeric-cell">罗店镇</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_xzcsldz7'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_xzcsldz7'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_xzcsldz7'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">1.4</td>' +
                        '<td class="numeric-cell">罗泾镇</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_xzcslz8'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_xzcslz8'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_xzcslz8'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">1.5</td>' +
                        '<td class="numeric-cell">顾村镇</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_xzcsgcz9'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_xzcsgcz9'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_xzcsgcz9'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">1.6</td>' +
                        '<td class="numeric-cell">大场镇</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_xzcsdcz10'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_xzcsdcz10'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_xzcsdcz10'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">1.7</td>' +
                        '<td class="numeric-cell">庙行镇</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_xzcsmxz11'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_xzcsmxz11'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_xzcsmxz11'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">1.8</td>' +
                        '<td class="numeric-cell">友谊路街道</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_xzcsyyljd12'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_xzcsyyljd12'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_xzcsyyljd12'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">1.9</td>' +
                        '<td class="numeric-cell">城市工业园区</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_xzcscsgyyq13'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_xzcscsgyyq13'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_xzcscsgyyq13'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">2</td>' +
                        '<td class="numeric-cell" colspan="2">市级美丽乡村示范村创建成功数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_sjmlxcsfccjcgs14'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_sjmlxcsfccjcgs14'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_sjmlxcsfccjcgs14'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3</td>' +
                        '<td class="numeric-cell" colspan="2">无实际耕作土地行政村数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_wsjgztdxzcs15'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_wsjgztdxzcs15'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_wsjgztdxzcs15'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">4</td>' +
                        '<td class="numeric-cell" colspan="2">农业户籍人口</td>' +
                        '<td class="numeric-cell">万人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_nyhjrk16'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_nyhjrk16'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_nyhjrk16'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="6">5</td>' +
                        '<td class="numeric-cell" rowspan="6">农业可耕地面积</td>' +
                        '<td class="numeric-cell" colspan="2">全区总面积</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_nykgdzmj17'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_nykgdzmj17'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_nykgdzmj17'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">5.1</td>' +
                        '<td class="numeric-cell">杨行镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_nykgdmjyxz18'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_nykgdmjyxz18'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_nykgdmjyxz18'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">5.2</td>' +
                        '<td class="numeric-cell">月浦镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_nykgdmjypz19'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_nykgdmjypz19'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_nykgdmjypz19'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">5.3</td>' +
                        '<td class="numeric-cell">罗店镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_nykgdmjldz20'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_nykgdmjldz20'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_nykgdmjldz20'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">5.4</td>' +
                        '<td class="numeric-cell">罗泾镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_nykgdmjlz21'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_nykgdmjlz21'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_nykgdmjlz21'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">5.5</td>' +
                        '<td class="numeric-cell">顾村镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_nykgdmjgcz22'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_nykgdmjgcz22'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_nykgdmjgcz22'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="6">6</td>' +
                        '<td class="numeric-cell" rowspan="6">粮食功能区</td>' +
                        '<td class="numeric-cell" colspan="2">全区总面积</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_lsgnqzmj23'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_lsgnqzmj23'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_lsgnqzmj23'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">6.1</td>' +
                        '<td class="numeric-cell">杨行镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_lsgnqyxz24'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_lsgnqyxz24'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_lsgnqyxz24'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">6.2</td>' +
                        '<td class="numeric-cell">月浦镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_lsgnqypz25'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_lsgnqypz25'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_lsgnqypz25'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">6.3</td>' +
                        '<td class="numeric-cell">罗店镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_lsgnqldz26'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_lsgnqldz26'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_lsgnqldz26'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">6.4</td>' +
                        '<td class="numeric-cell">罗泾镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_lsgnqlz27'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_lsgnqlz27'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_lsgnqlz27'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">6.5</td>' +
                        '<td class="numeric-cell">顾村镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_lsgnqgcz28'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_lsgnqgcz28'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_lsgnqgcz28'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="6">7</td>' +
                        '<td class="numeric-cell" rowspan="6">蔬菜保护区</td>' +
                        '<td class="numeric-cell" colspan="2">全区总面积</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_scbhqzmj29'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_scbhqzmj29'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_scbhqzmj29'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">7.1</td>' +
                        '<td class="numeric-cell">杨行镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_scbhqyxz30'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_scbhqyxz30'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_scbhqyxz30'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">7.2</td>' +
                        '<td class="numeric-cell">月浦镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_scbhqypz31'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_scbhqypz31'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_scbhqypz31'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">7.3</td>' +
                        '<td class="numeric-cell">罗店镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_scbhqldz32'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_scbhqldz32'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_scbhqldz32'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">7.4</td>' +
                        '<td class="numeric-cell">罗泾镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_scbhqlz33'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_scbhqlz33'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_scbhqlz33'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">7.5</td>' +
                        '<td class="numeric-cell">顾村镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_scbhqgcz34'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_scbhqgcz34'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_scbhqgcz34'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">8</td>' +
                        '<td class="numeric-cell" rowspan="8">农村经济</td>' +
                        '<td class="numeric-cell" colspan="2">农村承包地确权完成数/总数</td>' +
                        '<td class="numeric-cell">个/个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_nccbdqqwcszs35'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_nccbdqqwcszs35'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_nccbdqqwcszs35'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">9</td>' +
                        '<td class="numeric-cell" colspan="2">镇、村、队三级集体经济组织总资产</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_zcdsjjtjjzzzzc36'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_zcdsjjtjjzzzzc36'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_zcdsjjtjjzzzzc36'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">10</td>' +
                        '<td class="numeric-cell" colspan="2">镇级产权制度改革完成数/总数</td>' +
                        '<td class="numeric-cell">个/个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_zjcqzdggwcszs37'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_zjcqzdggwcszs37'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_zjcqzdggwcszs37'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">11</td>' +
                        '<td class="numeric-cell" colspan="2">村级产权制度改革完成数/总数</td>' +
                        '<td class="numeric-cell">个/个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_cjcqzdggwcszs38'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_cjcqzdggwcszs38'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_cjcqzdggwcszs38'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">12</td>' +
                        '<td class="numeric-cell" colspan="2">村分账管理工作/总数</td>' +
                        '<td class="numeric-cell">个/个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_cfzglgzzs39'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_cfzglgzzs39'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_cfzglgzzs39'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">13</td>' +
                        '<td class="numeric-cell" colspan="2">农村的农业户籍数</td>' +
                        '<td class="numeric-cell">户</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_ncdnyhjs40'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_ncdnyhjs40'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_ncdnyhjs40'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">14</td>' +
                        '<td class="numeric-cell" colspan="2">农村居民家庭人均可支配收入</td>' +
                        '<td class="numeric-cell">万元</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_ncjmjtrjkzpsr41'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_ncjmjtrjkzpsr41'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_ncjmjtrjkzpsr41'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">15</td>' +
                        '<td class="numeric-cell" colspan="2">农民人均纯收入</td>' +
                        '<td class="numeric-cell">万元</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_nmrjcsr42'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_nmrjcsr42'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_nmrjcsr42'] + '</td>' +
                        '</tr>'

                }
                //4.1.1
                if (moduleId == "95") {
                    var myDate = new Date();
                    var year = myDate.getFullYear();
                    var lastyear = year - 1;
                    var lastarr = {};
                    var thismonthes = {};
                    var thismonth = {};
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + search_condition['jszd'] + '=' + search_condition['jsrq'] + '&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_bsqsydwrlzyqkyb653_date3'] == (yearse - 1) + "-12-31" && n['t_bsqsydwrlzyqkyb653_date2'] == (yearse - 1) + "-01-01") {
                                    lastarr = lastyedata[i];
                                }
                            });

                        }
                    })
                    $.each(data, function (i, n) {
                        // if (data[i]['t_bsqsydwrlzyqkyb653_date3'] == ((yearse - 1) + "-12-31")) {
                        //     lastarr = data[i];

                        // }
                        if (data[i]['t_bsqsydwrlzyqkyb653_date3'].slice(0, 7) == (yearse + '-' + monthse) && data[i]['t_bsqsydwrlzyqkyb653_date2'] == (yearse + '-01-01')) {

                            thismonthes = data[i];

                        }
                        if (data[i]['t_bsqsydwrlzyqkyb653_date2'].slice(0, 7) == (yearse + '-' + monthse) && data[i]['t_bsqsydwrlzyqkyb653_date2'].slice(0, 7) == (yearse + '-' + monthse)) {
                            thismonth = data[i];

                        }
                    });
                    str += '<tr>' +
                        '<td class="label-cell">1</td>' +
                        '<td class="numeric-cell">全区事业单位数</td>' +
                        '<td class="numeric-cell">家</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsydwrlzyqkyb653_qqsydws4'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsydwrlzyqkyb653_qqsydws4'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsydwrlzyqkyb653_qqsydws4'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">2</td>' +
                        '<td class="numeric-cell">全区事业编制人员数</td>' +
                        '<td class="numeric-cell">人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsydwrlzyqkyb653_qqsybzrys5'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsydwrlzyqkyb653_qqsybzrys5'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsydwrlzyqkyb653_qqsybzrys5'] + '</td>' +
                        '</tr>'
                }
                //4.2
                if (moduleId == "96") {
                    var lastarr = {};
                    var thismonthes = {};
                    var thismonth = {};
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + search_condition['jszd'] + '=' + search_condition['jsrq'] + '&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_bsqmzgzqkyb718_date3'] == (yearse - 1) + "-12-31" && n['t_bsqmzgzqkyb718_date2'] == (yearse - 1) + "-01-01") {
                                    lastarr = n;
                                }
                            });

                        }
                    })
                    $.each(data, function (i, n) {

                        // if (n['t_bsqmzgzqkyb718_date3'].slice(0, 4) == (yearse - 1)) {
                        //     lastarr = n;
                        // }

                        if (n['t_bsqmzgzqkyb718_date3'].slice(0, 7) == (yearse + '-' + monthse) && n['t_bsqmzgzqkyb718_date2'] == (yearse + '-01-01')) {
                            thismonthes = n;
                        }
                        if (n['t_bsqmzgzqkyb718_date3'].slice(0, 7) == (yearse + '-' + monthse) && n['t_bsqmzgzqkyb718_date2'].slice(0, 7) == (yearse + '-' + monthse)) {
                            thismonth = n;
                        }
                    })
                    if ($.isEmptyObject(lastarr)) {
                        for (var i in data[0]) {
                            lastarr[i] = ""
                        }
                    }

                    if ($.isEmptyObject(thismonthes)) {
                        //var thismonthes=[]
                        for (var i in data[0]) {
                            thismonthes[i] = ""
                        }
                    }
                    if ($.isEmptyObject(thismonth)) {
                        //  thismonth=data[0];
                        // var thismonth=[]
                        for (var i in data[0]) {
                            thismonth[i] = "";
                        }
                    }

                    str = ' <tr>' +
                        '<td class="label-cell">1</td>' +
                        ' <td class="numeric-cell" rowspan="5">救济救灾</td>' +
                        '<td class="numeric-cell" colspan="2">城乡低保总人数</td>' +
                        '<td class="numeric-cell">人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_cxdbzrs4'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_cxdbzrs4'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_cxdbzrs4'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        ' <td class="label-cell">2</td>' +
                        ' <td class="numeric-cell" colspan="2">城镇低保人数</td>' +
                        ' <td class="numeric-cell">人</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_czdbrs5'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_czdbrs5'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_czdbrs5'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        '  <td class="label-cell">3</td>' +
                        ' <td class="numeric-cell" colspan="2">农村低保人数</td>' +
                        ' <td class="numeric-cell">人</td>' +
                        '  <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ncdbrs6'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ncdbrs6'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ncdbrs6'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">4</td>' +
                        ' <td class="numeric-cell" colspan="2">年内累计救助人次</td>' +
                        ' <td class="numeric-cell">人次</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_nnljjzrc7'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_nnljjzrc7'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_nnljjzrc7'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        '<td class="label-cell">5</td>' +
                        '  <td class="numeric-cell" colspan="2">年内累计支出救助资金</td>' +
                        '<td class="numeric-cell">万元</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_nnljzcjzzj8'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_nnljzcjzzj8'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_nnljzcjzzj8'] + '</td>' +
                        ' </tr>' +
                        '<tr>' +
                        '<td class="label-cell">6</td>' +
                        '<td class="numeric-cell" rowspan="36">养老服务</td>' +
                        '<td class="numeric-cell" colspan="2">户籍老年人数（60岁以上）</td>' +
                        '<td class="numeric-cell">万人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_hjlnrssys9'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_hjlnrssys9'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_hjlnrssys9'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">7</td>' +
                        '<td class="numeric-cell" colspan="2">户籍老年人数（60岁以上）占户籍人口比例</td>' +
                        ' <td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_hjlnrssyszhjrkbl10'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_hjlnrssyszhjrkbl10'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_hjlnrssyszhjrkbl10'] + '</td>' +
                        '</tr>' +
                        '  <tr>' +
                        ' <td class="label-cell" rowspan="14">8</td>' +
                        ' <td class="numeric-cell" colspan="2">公办/民办养老机构数总数</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_gbmbyljgszs11'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_gbmbyljgszs11'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_gbmbyljgszs11'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">8-1</td>' +
                        ' <td class="numeric-cell">杨行镇</td>' +
                        '  <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgsyxz12'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgsyxz12'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgsyxz12'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        '<td class="label-cell">8-2</td>' +
                        ' <td class="numeric-cell">月浦镇</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgsypz13'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgsypz13'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgsypz13'] + '</td>' +
                        ' </tr>' +
                        '  <tr>' +
                        ' <td class="label-cell">8-3</td>' +
                        '  <td class="numeric-cell">罗店镇</td>' +
                        '  <td class="numeric-cell">个</td>' +
                        '  <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgsldz14'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgsldz14'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgsldz14'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">8-4</td>' +
                        ' <td class="numeric-cell">罗泾镇</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '   <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgslz15'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgslz15'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgslz15'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        '   <td class="label-cell">8-5</td>' +
                        ' <td class="numeric-cell">顾村镇</td>' +
                        '  <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgsgcz16'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgsgcz16'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgsgcz16'] + '</td>' +
                        '   </tr>' +
                        ' <tr>' +
                        '  <td class="label-cell">8-6</td>' +
                        '<td class="numeric-cell">大场镇</td>' +
                        '   <td class="numeric-cell">个</td>' +
                        '  <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgsdcz17'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgsdcz17'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgsdcz17'] + '</td>' +
                        '   </tr>' +
                        '  <tr>' +
                        ' <td class="label-cell">8-7</td>' +
                        ' <td class="numeric-cell">庙行镇</td>' +
                        '  <td class="numeric-cell">个</td>' +
                        '   <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgsmxz18'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgsmxz18'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgsmxz18'] + '</td>' +
                        ' </tr>' +
                        '  <tr>' +
                        ' <td class="label-cell">8-8</td>' +
                        '  <td class="numeric-cell">淞南镇</td>' +
                        '   <td class="numeric-cell">个</td>' +
                        '  <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgsnz19'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgsnz19'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgsnz19'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">8-9</td>' +
                        ' <td class="numeric-cell">高境镇</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgsgjz20'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgsgjz20'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgsgjz20'] + '</td>' +
                        ' </tr>' +
                        ' <td class="label-cell">8-10</td>' +
                        ' <td class="numeric-cell">友谊路街道</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgsyyljd21'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgsyyljd21'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgsyyljd21'] + '</td>' +
                        '</tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">8-11</td>' +
                        ' <td class="numeric-cell">吴淞街道</td>' +
                        '  <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgswjd22'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgswjd22'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgswjd22'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">8-12</td>' +
                        ' <td class="numeric-cell">张庙街道</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        '  <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgszmjd23'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgszmjd23'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgszmjd23'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">8-13</td>' +
                        ' <td class="numeric-cell">区福利院</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgsqfly24'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgsqfly24'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgsqfly24'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell" rowspan="14">9</td>' +
                        ' <td class="numeric-cell" colspan="2">公办/民办养老床位总数</td>' +
                        ' <td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_gbmbylcwzs25'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_gbmbylcwzs25'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_gbmbylcwzs25'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        '<td class="label-cell">8-1</td>' +
                        ' <td class="numeric-cell">杨行镇</td>' +
                        ' <td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwsyxz26'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwsyxz26'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwsyxz26'] + '</td>' +
                        '</tr>' +
                        ' <tr>' +
                        '<td class="label-cell">8-2</td>' +
                        ' <td class="numeric-cell">月浦镇</td>' +
                        '<td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwsypz27'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwsypz27'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwsypz27'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">8-3</td>' +
                        ' <td class="numeric-cell">罗店镇</td>' +
                        '<td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwsldz28'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwsldz28'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwsldz28'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        ' <td class="label-cell">8-4</td>' +
                        ' <td class="numeric-cell">罗泾镇</td>' +
                        ' <td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwslz29'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwslz29'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwslz29'] + '</td>' +
                        ' </tr>' +
                        '<tr>' +
                        ' <td class="label-cell">8-5</td>' +
                        ' <td class="numeric-cell">顾村镇</td>' +
                        ' <td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwsgcz30'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwsgcz30'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwsgcz30'] + '</td>' +
                        '</tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">8-6</td>' +
                        ' <td class="numeric-cell">大场镇</td>' +
                        ' <td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwsdcz31'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwsdcz31'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwsdcz31'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        ' <td class="label-cell">8-7</td>' +
                        ' <td class="numeric-cell">庙行镇</td>' +
                        ' <td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwsmxz32'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwsmxz32'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwsmxz32'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        '<td class="label-cell">8-8</td>' +
                        ' <td class="numeric-cell">淞南镇</td>' +
                        '<td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwsnz33'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwsnz33'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwsnz33'] + '</td>' +
                        ' </tr>' +
                        '  <tr>' +
                        ' <td class="label-cell">8-9</td>' +
                        ' <td class="numeric-cell">高境镇</td>' +
                        ' <td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwsgjz34'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwsgjz34'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwsgjz34'] + '</td>' +
                        '</tr>' +
                        ' <tr>' +
                        '<td class="label-cell">8-10</td>' +
                        ' <td class="numeric-cell">友谊路街道</td>' +
                        ' <td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwsyyljd35'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwsyyljd35'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwsyyljd35'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">8-11</td>' +
                        ' <td class="numeric-cell">吴淞街道</td>' +
                        ' <td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwswjd36'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwswjd36'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwswjd36'] + '</td>' +
                        ' </tr>' +
                        '<tr>' +
                        ' <td class="label-cell">8-12</td>' +
                        '  <td class="numeric-cell">张庙街道</td>' +
                        ' <td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwszmjd37'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwszmjd37'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwszmjd37'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">8-13</td>' +
                        ' <td class="numeric-cell">区福利院</td>' +
                        ' <td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwsqfly38'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwsqfly38'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwsqfly38'] + '</td>' +
                        '  </tr>' +
                        '<tr>' +
                        ' <td class="label-cell">10</td>' +
                        ' <td class="numeric-cell" colspan="2">床位数/户籍老年人口数</td>' +
                        ' <td class="numeric-cell">%</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_cwshjlnrks39'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_cwshjlnrks39'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_cwshjlnrks39'] + '</td>' +
                        '</tr>' +
                        '  <tr>' +
                        '<td class="label-cell">11</td>' +
                        '<td class="numeric-cell" colspan="2">长者照护之家总数</td>' +
                        '<td class="numeric-cell">家</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_czzhzjzs40'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_czzhzjzs40'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_czzhzjzs40'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">12</td>' +
                        ' <td class="numeric-cell" colspan="2">养老机构设置内设医疗机构</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgsznsyljg41'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgsznsyljg41'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgsznsyljg41'] + '</td>' +
                        ' </tr>' +
                        '<tr>' +
                        '<td class="label-cell">13</td>' +
                        '<td class="numeric-cell" colspan="2">老年人日间照料中心总数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_lnrrjzlzxzs42'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_lnrrjzlzxzs42'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_lnrrjzlzxzs42'] + '</td>' +
                        ' </tr>' +
                        '   <tr>' +
                        ' <td class="label-cell">14</td>' +
                        ' <td class="numeric-cell" colspan="2">居家养老服务对象</td>' +
                        ' <td class="numeric-cell">人</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_jjylfwdxr43'] + '(人)<br>' + lastarr['t_bsqmzgzqkyb718_jjylfwdxrc44'] + '（人次）</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_jjylfwdxr43'] + '(人)<br>' + thismonth['t_bsqmzgzqkyb718_jjylfwdxrc44'] + '（人次）</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_jjylfwdxr43'] + '(人)<br>' + thismonthes['t_bsqmzgzqkyb718_jjylfwdxrc44'] + '（人次）</td>' +
                        '</tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">15</td>' +
                        ' <td class="numeric-cell" colspan="2">社区综合为老服务中心个数</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_sqzhwlfwzxgs45'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_sqzhwlfwzxgs45'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_sqzhwlfwzxgs45'] + '</td>' +
                        '</tr>' +
                        '  <tr>' +
                        ' <td class="label-cell">16</td>' +
                        ' <td class="label-cell" rowspan="8">社会治理</td>' +
                        ' <td class="numeric-cell" colspan="2">正式居委会总数</td>' +
                        '  <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_zsjwhzs46'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_zsjwhzs46'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_zsjwhzs46'] + '</td>' +
                        '</tr>' +
                        '  <tr>' +
                        ' <td class="label-cell">17</td>' +
                        ' <td class="numeric-cell" colspan="2">村委会总数</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_cwhzs47'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_cwhzs47'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_cwhzs47'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">18</td>' +
                        ' <td class="numeric-cell" colspan="2">社区事务受理服务中心总数</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_sqswslfwzxzs48'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_sqswslfwzxzs48'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_sqswslfwzxzs48'] + '</td>' +
                        '</tr>' +
                        '  <tr>' +
                        ' <td class="label-cell">19</td>' +
                        '  <td class="numeric-cell" colspan="2">社区事务受理服务分中心总数</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        '  <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_sqswslfwfzxzs49'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_sqswslfwfzxzs49'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_sqswslfwfzxzs49'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">20</td>' +
                        ' <td class="numeric-cell" colspan="2">社区事务受理服务延伸服务点总数</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_sqswslfwysfwdzs50'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_sqswslfwysfwdzs50'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_sqswslfwysfwdzs50'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        '<td class="label-cell" rowspan="3">21</td>' +
                        '<td class="numeric-cell" colspan="2">社会组织总数（民非、社团）</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_shzzzsmfst51'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_shzzzsmfst51'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_shzzzsmfst51'] + '</td>' +
                        '</tr>' +
                        ' <tr>' +
                        ' <td class="numeric-cell">21-1</td>' +
                        ' <td class="numeric-cell">民非社会组织</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_mfshzz52'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_mfshzz52'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_mfshzz52'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="numeric-cell">21-2</td>' +
                        ' <td class="numeric-cell">社团社会组织</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_stshzz53'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_stshzz53'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_stshzz53'] + '</td>' +
                        ' </tr>';

                }

                //4.7.1
                if (moduleId == "102") {
                    var lastyear = [];
                    var thisyearm = [];
                    var thisyearms = [];
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + search_condition['jszd'] + '=' + search_condition['jsrq'] + '&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_bsqcsglgzqkbyb725_date3'] == (yearse - 1) + "-12-31" && n['t_bsqcsglgzqkbyb725_date2'] == (yearse - 1) + "-01-01") {
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qqwggldyzsg4']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qqqyglmjzqqcshmjbl5']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qqqyglmjzsk6']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjyxzk7']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjypzk8']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjldzk9']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjlzk10']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjgczk11']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjdczk12']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjmxzk13']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjnzk14']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjgjzk15']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjyyljdk16']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjwjdk17']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjzmjdk18']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjbsgyyqk19']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjcsgyqqk20']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qwgycyzsr21']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qqjcgzzzsg22']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_slwgajsj23']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_slwgajjal24']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_slwgajjsl25']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_slrxgdsj26']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_slrxgdxxlxl27']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_slrxgdsjjjl28']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_slrxgdpdjsl29']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_slrxgdpdzql30']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_slrxgdhfl31']);
                                }
                            });

                        }
                    })
                    $.each(data, function (i, n) {
                        var year = data[i]['t_bsqcsglgzqkbyb725_date3'].slice(0, 4);
                        var mon1 = data[i]['t_bsqcsglgzqkbyb725_date2'].slice(5, 7);
                        var mon2 = data[i]['t_bsqcsglgzqkbyb725_date3'].slice(5, 7);
                        // if (year == yearse - 1) {
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qqwggldyzsg4']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qqqyglmjzqqcshmjbl5']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qqqyglmjzsk6']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjyxzk7']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjypzk8']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjldzk9']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjlzk10']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjgczk11']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjdczk12']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjmxzk13']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjnzk14']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjgjzk15']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjyyljdk16']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjwjdk17']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjzmjdk18']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjbsgyyqk19']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjcsgyqqk20']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qwgycyzsr21']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qqjcgzzzsg22']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_slwgajsj23']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_slwgajjal24']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_slwgajjsl25']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdsj26']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdxxlxl27']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdsjjjl28']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdpdjsl29']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdpdzql30']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdhfl31']);
                        // }
                        if (year == yearse) {
                            if (mon1 == mon2 && mon2 == monthse) {
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qqwggldyzsg4']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qqqyglmjzqqcshmjbl5']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qqqyglmjzsk6']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjyxzk7']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjypzk8']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjldzk9']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjlzk10']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjgczk11']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjdczk12']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjmxzk13']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjnzk14']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjgjzk15']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjyyljdk16']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjwjdk17']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjzmjdk18']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjbsgyyqk19']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjcsgyqqk20']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qwgycyzsr21']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qqjcgzzzsg22']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_slwgajsj23']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_slwgajjal24']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_slwgajjsl25']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdsj26']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdxxlxl27']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdsjjjl28']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdpdjsl29']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdpdzql30']);
                                thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdhfl31']);
                            }
                            if (mon1 == "01" && mon2 == monthse) {
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qqwggldyzsg4']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qqqyglmjzqqcshmjbl5']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qqqyglmjzsk6']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjyxzk7']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjypzk8']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjldzk9']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjlzk10']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjgczk11']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjdczk12']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjmxzk13']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjnzk14']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjgjzk15']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjyyljdk16']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjwjdk17']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjzmjdk18']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjbsgyyqk19']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjcsgyqqk20']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qwgycyzsr21']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qqjcgzzzsg22']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_slwgajsj23']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_slwgajjal24']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_slwgajjsl25']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdsj26']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdxxlxl27']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdsjjjl28']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdpdjsl29']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdpdzql30']);
                                thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdhfl31']);
                            }
                        }
                    });
                    str += '<tr>' +
                        '<td class="label-cell">1</td>' +
                        '<td class="numeric-cell" colspan="2">全区网格管理单元总数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[0] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[0] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[0] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">2</td>' +
                        '<td class="numeric-cell" colspan="2">全区区域管理面积占全区城市化面积比例</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[1] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[1] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[1] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="15">3</td>' +
                        '<td class="numeric-cell" colspan="2">全区区域管理面积总数</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[2] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[2] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[2] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-1</td>' +
                        '<td class="numeric-cell">杨行镇</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[3] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[3] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[3] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-2</td>' +
                        '<td class="numeric-cell">月浦镇</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[4] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[4] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[4] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-3</td>' +
                        '<td class="numeric-cell">罗店镇</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[5] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[5] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[5] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-4</td>' +
                        '<td class="numeric-cell">罗泾镇</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[6] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[6] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[6] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-5</td>' +
                        '<td class="numeric-cell">顾村镇</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[7] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[7] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[7] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-6</td>' +
                        '<td class="numeric-cell">大场镇</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[8] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[8] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[8] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-7</td>' +
                        '<td class="numeric-cell">庙行镇</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[9] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[9] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[9] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-8</td>' +
                        '<td class="numeric-cell">淞南镇</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[10] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[10] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[10] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-9</td>' +
                        '<td class="numeric-cell">高境镇</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[11] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[11] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[11] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-10</td>' +
                        '<td class="numeric-cell">友谊路街道</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[12] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[12] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[12] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-11</td>' +
                        '<td class="numeric-cell">吴淞街道</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[13] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[13] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[13] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-12</td>' +
                        '<td class="numeric-cell">张庙街道</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[14] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[14] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[14] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-13</td>' +
                        '<td class="numeric-cell">宝山工业园区</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[15] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[15] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[15] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-14</td>' +
                        '<td class="numeric-cell">城市工业全区</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[16] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[16] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[16] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">4</td>' +
                        '<td class="numeric-cell" colspan="2">区网格巡查员总数</td>' +
                        '<td class="numeric-cell">人</td>' +
                        '<td class="numeric-cell">' + lastyear[17] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[17] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[17] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">5</td>' +
                        '<td class="numeric-cell" colspan="2">全区居村工作站总数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[18] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[18] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[18] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">6</td>' +
                        '<td class="numeric-cell" colspan="2">受理网格案件数</td>' +
                        '<td class="numeric-cell">件</td>' +
                        '<td class="numeric-cell">' + lastyear[19] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[19] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[19] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">7</td>' +
                        '<td class="numeric-cell" colspan="2">受理网格案件结案率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[20] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[20] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[20] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">8</td>' +
                        '<td class="numeric-cell" colspan="2">受理网格案件及时率</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[21] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[21] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[21] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">9</td>' +
                        '<td class="numeric-cell" colspan="2">受理热线工单数</td>' +
                        '<td class="numeric-cell">件</td>' +
                        '<td class="numeric-cell">' + lastyear[22] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[22] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[22] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">10</td>' +
                        '<td class="numeric-cell" colspan="2">受理热线工单先行联系率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[23] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[23] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[23] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">11</td>' +
                        '<td class="numeric-cell" colspan="2">受理热线工单实际解决率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[24] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[24] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[24] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">12</td>' +
                        '<td class="numeric-cell" colspan="2">受理热线工单派单及时率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[25] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[25] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[25] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">13</td>' +
                        '<td class="numeric-cell" colspan="2">受理热线工单派单准确率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[26] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[26] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[26] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">14</td>' +
                        '<td class="numeric-cell" colspan="2">受理热线工单回访率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[27] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[27] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[27] + '</td>' +
                        '</tr>'
                }
                // 4.7.3
                if (moduleId == "104") {
                    var lastar = {};
                    var thismonthes = {};
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + search_condition['jszd'] + '=' + search_condition['jsrq'] + '&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_bsqrkqkbyb722_date3'] == (yearse - 1) + "-12-31" && n['t_bsqrkqkbyb722_date2'] == (yearse - 1) + "-01-01") {
                                    lastar = lastyedata[i];
                                }
                            });

                        }
                    })
                    $.each(data, function (i, n) {
                        // if (data[i]['t_bsqrkqkbyb722_date3'] == (yearse - 1) + "-12-31" && data[i]['t_bsqrkqkbyb722_date2'] == (yearse - 1) + '-01-01') {
                        //     lastar = data[i];
                        // }
                        if (data[i]['t_bsqrkqkbyb722_date3'].slice(0, 7) == yearse + "-" + monthse && data[i]['t_bsqrkqkbyb722_date2'].slice(0, 7) == yearse + "-01") {
                            thismonthes = data[i];
                        }
                    });
                    str += '<tr>' +
                        '<td class="label-cell" rowspan="3">全区</td>' +
                        '<td class="numeric-cell">' + (yearse - 1) + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrksqq4'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhrysqq20'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + yearse + '年1-' + monthse + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrksqq4'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhrysqq20'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">杨行镇</td>' +
                        '<td class="numeric-cell">' + (yearse - 1) + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrksyxz5'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhrysyxz21'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + yearse + '年1-' + monthse + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrksyxz5'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhrysyxz21'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">月浦镇</td>' +
                        '<td class="numeric-cell">' + (yearse - 1) + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrksypz6'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhrysypz22'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + yearse + '年1-' + monthse + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrksypz6'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhrysypz22'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">罗泾镇</td>' +
                        '<td class="numeric-cell">' + (yearse - 1) + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrkslz7'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhryslz23'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + yearse + '年1-' + monthse + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrkslz7'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhryslz23'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">宝山工业园区</td>' +
                        '<td class="numeric-cell">' + (yearse - 1) + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrksbsgyyq8'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhrysbsgyyq24'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + yearse + '年1-' + monthse + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrksbsgyyq8'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhrysbsgyyq24'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">罗店镇</td>' +
                        '<td class="numeric-cell">' + (yearse - 1) + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrksldz9'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhrysldz25'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + yearse + '年1-' + monthse + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrksldz9'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhrysldz25'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">顾村镇</td>' +
                        '<td class="numeric-cell">' + (yearse - 1) + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrksgcz10'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhrysgcz26'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + yearse + '年1-' + monthse + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrksgcz10'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhrysgcz26'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">庙行镇</td>' +
                        '<td class="numeric-cell">' + (yearse - 1) + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrksmxz11'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhrysmxz27'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + yearse + '年1-' + monthse + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrksmxz11'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhrysmxz27'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">淞南镇</td>' +
                        '<td class="numeric-cell">' + (yearse - 1) + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrksnz12'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhrysnz28'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + yearse + '年1-' + monthse + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrksnz12'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhrysnz28'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">高境镇</td>' +
                        '<td class="numeric-cell">' + (yearse - 1) + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrksgjz13'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhrysgjz29'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + yearse + '年1-' + monthse + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrksgjz13'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhrysgjz29'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">友谊路街道</td>' +
                        '<td class="numeric-cell">' + (yearse - 1) + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrksyyljd14'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhrysyyljd30'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + yearse + '年1-' + monthse + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrksyyljd14'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhrysyyljd30'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">吴淞街道</td>' +
                        '<td class="numeric-cell">' + (yearse - 1) + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrkswjd15'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhryswjd31'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + yearse + '年1-' + monthse + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrkswjd15'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhryswjd31'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">张庙街道</td>' +
                        '<td class="numeric-cell">' + (yearse - 1) + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrkszmjd16'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhryszmjd32'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + yearse + '年1-' + monthse + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrkszmjd16'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhryszmjd32'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">大场镇</td>' +
                        '<td class="numeric-cell">' + (yearse - 1) + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrksdcz17'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhrysdcz33'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + yearse + '年1-' + monthse + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrksdcz17'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhrysdcz33'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">城市工业园区</td>' +
                        '<td class="numeric-cell">' + (yearse - 1) + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrkscsgyyq18'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhryscsgyyq34'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + yearse + '年1-' + monthse + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrkscsgyyq18'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhryscsgyyq34'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">农场</td>' +
                        '<td class="numeric-cell">' + (yearse - 1) + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrksnc19'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhrysnc35'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + yearse + '年1-' + monthse + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrksnc19'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhrysnc35'] + '</td>' +
                        '</tr>'
                }
                //4.8.3
                if (moduleId == "108") {
                    var lastarr = {};
                    var thisyear = {};
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-" + search_condition['jsrq'].substr(5, 10);
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + search_condition['jszd'] + '=' + search_condition['jsrq'] + '&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_bsqajqkbyb666_date3'].slice(0, 4) == (yearse - 1) && n['t_bsqajqkbyb666_date3'].slice(5, 7) == monthse) {
                                    lastarr = lastyedata[i];

                                }
                            });

                        }
                    })
                    beizhu = "备注："
                    $.each(data, function (i, n) {
                        if (n['t_bsqajqkbyb666_date3'].slice(0, 4) == (yearse - 1) && n['t_bsqajqkbyb666_date3'].slice(5, 7) == monthse) {
                            lastarr = data[i];

                        }
                        if (n['t_bsqajqkbyb666_date3'].slice(0, 4) == yearse && n['t_bsqajqkbyb666_date3'].slice(5, 7) == monthse) {
                            thisyear = data[i];
                            //console.log(thismonthes)
                        }
                    });
                    if ($.isEmptyObject(lastarr)) {
                        for (var i in data[0]) {
                            lastarr[i] = ""
                        }
                    }
                    if ($.isEmptyObject(thisyear)) {
                        for (var i in data[0]) {
                            thisyear[i] = ""
                        }
                    }
                    str += '<tr>' +
                        '<td class="label-cell"  rowspan="2">全区</td>' +
                        '<td class="numeric-cell">' + (yearse - 1) + '.' + monthse + '</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqajqkbyb666_xsajsj4'] + '</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqajqkbyb666_maxsajsj5'] + '</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqajqkbyb666_maxsajphl6'] + '</td>' +
                        '</tr>'

                    str += '<tr>' +
                        '<td class="numeric-cell">' + yearse + '.' + monthse + '</td>' +
                        ' <td class="numeric-cell">' + thisyear['t_bsqajqkbyb666_xsajsj4'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqajqkbyb666_maxsajsj5'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqajqkbyb666_maxsajphl6'] + '</td>' +
                        '</tr>'
                    beizhu += thisyear['t_bsqajqkbyb666_bz7'];
                }
                //4.8.5
                if (moduleId == "110") {
                    var last = {},
                        thismonth = {};
                    var num1 = 0,
                        num2 = 0;
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + search_condition['jszd'] + '=' + search_condition['jsrq'] + '&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_bsqhzsgqkbyb668_date2'] == (yearse - 1) + "-01-01" && n['t_bsqhzsgqkbyb668_date3'] == (yearse - 1) + "-12-31") {
                                    last[i] = n

                                }
                            });

                        }
                    })
                    $.each(data, function (i, n) {
                        // if (n['t_bsqhzsgqkbyb668_date2'] == (yearse - 1) + "-01-01" && n['t_bsqhzsgqkbyb668_date3'] == (yearse - 1) + "-12-31") {
                        //     last[num1] = n
                        //     num1++
                        // }
                        if (n['t_bsqhzsgqkbyb668_date2'].slice(0, 7) == yearse + "-01" && n['t_bsqhzsgqkbyb668_date3'].slice(0, 7) == yearse + "-" + monthse) {
                            thismonth[num2] = n;
                            num2++
                        }
                    });
                    var empty = $.isEmptyObject(thismonth); // 判断是否为空
                    var empty1 = $.isEmptyObject(last);
                    if (empty1 && !empty) {
                        $.each(thismonth, function (i, n) {

                            str += '<tr>' +
                                '<td class="label-cell" rowspan="2" colspan="2">' + n['t_bsqhzsgqkbyb668_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + (yearse - 1) + '年</td>' +
                                '<td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '</tr>'
                            str += '<tr>' +
                                '<td class="numeric-cell">' + yearse + "年1月-" + monthse + '月</td>' +
                                '<td class="numeric-cell">' + n['t_bsqhzsgqkbyb668_hzsgsj5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqhzsgqkbyb668_hzyhzgsc6'] + '</td>' +
                                '</tr>'

                        });
                    } else {
                        $.each(last, function (i, n) {
                            if (empty) {
                                str += '<tr>' +
                                    '<td class="label-cell" rowspan="2" colspan="2">' + n['t_bsqhzsgqkbyb668_jzyq4'] + '</td>' +
                                    '<td class="numeric-cell">' + (yearse - 1) + '年</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqhzsgqkbyb668_hzsgsj5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqhzsgqkbyb668_hzyhzgsc6'] + '</td>' +
                                    '</tr>'
                                str += '<tr>' +
                                    '<td class="numeric-cell">' + yearse + "年1月-" + monthse + '月</td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '</tr>'
                            } else {
                                str += '<tr>' +
                                    '<td class="label-cell" rowspan="2" colspan="2">' + n['t_bsqhzsgqkbyb668_jzyq4'] + '</td>' +
                                    '<td class="numeric-cell">' + (yearse - 1) + '年</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqhzsgqkbyb668_hzsgsj5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqhzsgqkbyb668_hzyhzgsc6'] + '</td>' +
                                    '</tr>'
                                str += '<tr>' +
                                    '<td class="numeric-cell">' + yearse + "年1月-" + monthse + '月</td>' +
                                    '<td class="numeric-cell">' + thismonth[i]['t_bsqhzsgqkbyb668_hzsgsj5'] + '</td>' +
                                    '<td class="numeric-cell">' + thismonth[i]['t_bsqhzsgqkbyb668_hzyhzgsc6'] + '</td>' +
                                    '</tr>'
                            }
                        });
                    }
                }
                //4.8.7
                if (moduleId == "112") {

                    var last = {},
                        thismonth = {};
                    var num1 = 0,
                        num2 = 0;
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + search_condition['jszd'] + '=' + search_condition['jsrq'] + '&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_bsqspaqqkbyb670_date2'] == (yearse - 1) + "-01-01" && n['t_bsqspaqqkbyb670_date3'] == (yearse - 1) + "-12-31") {
                                    last[i] = n

                                }
                            });

                        }
                    })
                    $.each(data, function (i, n) {
                        // if (n['t_bsqspaqqkbyb670_date2'] == (yearse - 1) + "-01-01" && n['t_bsqspaqqkbyb670_date3'] == (yearse - 1) + "-12-31") {
                        //     last[num1] = n
                        //     num1++
                        // }
                        if (n['t_bsqspaqqkbyb670_date2'].slice(0, 7) == yearse + "-01" && n['t_bsqspaqqkbyb670_date3'].slice(0, 7) == yearse + "-" + monthse) {
                            thismonth[num2] = n;
                            num2++
                        }
                    });
                    var empty = $.isEmptyObject(thismonth); // 判断是否为空
                    var empty1 = $.isEmptyObject(last);
                    if (empty1 && !empty) {
                        $.each(thismonth, function (i, n) {

                            str += '<tr>' +
                                '<td class="label-cell" rowspan="2" colspan="2">' + n['t_bsqspaqqkbyb670_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + (yearse - 1) + '年</td>' +
                                '<td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '</tr>'
                            str += '<tr>' +
                                '<td class="numeric-cell">' + yearse + '年1-' + monthse + '月</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_splajsj5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_spscqysh6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_zzxcwzwzspscjyhsh7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_zyspfxjccys8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_ypzljdxcjcys9'] + '</td>' +
                                '</tr>'
                        });
                    } else {
                        $.each(last, function (i, n) {
                            if (empty) {
                                str += '<tr>' +
                                    '<td class="label-cell" rowspan="2" colspan="2">' + n['t_bsqspaqqkbyb670_jzyq4'] + '</td>' +
                                    '<td class="numeric-cell">' + (yearse - 1) + '年</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_splajsj5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_spscqysh6'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_zzxcwzwzspscjyhsh7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_zyspfxjccys8'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_ypzljdxcjcys9'] + '</td>' +
                                    '</tr>'
                                str += '<tr>' +
                                    '<td class="numeric-cell">' + yearse + '年1-' + monthse + '月</td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '</tr>'
                            } else {
                                str += '<tr>' +
                                    '<td class="label-cell" rowspan="2" colspan="2">' + n['t_bsqspaqqkbyb670_jzyq4'] + '</td>' +
                                    '<td class="numeric-cell">' + (yearse - 1) + '年</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_splajsj5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_spscqysh6'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_zzxcwzwzspscjyhsh7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_zyspfxjccys8'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_ypzljdxcjcys9'] + '</td>' +
                                    '</tr>'
                                str += '<tr>' +
                                    '<td class="numeric-cell">' + yearse + '年1-' + monthse + '月</td>' +
                                    '<td class="numeric-cell">' + thismonth[i]['t_bsqspaqqkbyb670_splajsj5'] + '</td>' +
                                    '<td class="numeric-cell">' + thismonth[i]['t_bsqspaqqkbyb670_spscqysh6'] + '</td>' +
                                    '<td class="numeric-cell">' + thismonth[i]['t_bsqspaqqkbyb670_zzxcwzwzspscjyhsh7'] + '</td>' +
                                    '<td class="numeric-cell">' + thismonth[i]['t_bsqspaqqkbyb670_zyspfxjccys8'] + '</td>' +
                                    '<td class="numeric-cell">' + thismonth[i]['t_bsqspaqqkbyb670_ypzljdxcjcys9'] + '</td>' +
                                    '</tr>'
                            }
                        });
                    }
                }
                //console.log(str)        
                str = str.replace(/undefined/g, "");
                str = str.replace(/NaN/g, "");
                if (moduleId == "108") {
                    $('#beizhu').html(beizhu);
                }
                $('#form-body').html(str);
            }

        },
        error: function (data, type, err) {
            myApp.hidePreloader();
            tishi("出现错误");

        }
    });
}
// var lastyedata = [];
// function get_data_lastyear(moduleId, alias,search_condition={}){
//     //var lastyedata = [];
//     var jsziduan=search_condition['jszd'];
//     console.log(search_condition['jsrq'])
//     search_condition['jsrq']=(search_condition['jsrq'].substr(0, 4)-1)+"-12-31";
//     console.log(jsziduan)
//     var sh='t_'+alias+'_shzt';
//      $.ajax({
//         type: "POST",
//         async:false,
//         url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?'+jsziduan+'='+search_condition['jsrq']+'&token=' + localStorage.token,
//         //contentType:"json",
//      data: {
//             bpmDataTemplatep: '1',
//              bpmDataTemplatez: '1000',
//             bpmDataTemplateoz: '1000',
//             bpmDataTemplate__ns__:'t_'+alias+'_ID',
//             bpmDataTemplateo:"ASC",

//         },
//         dataType: 'json',
//         beforeSend: function () {
//             myApp.showPreloader();
//         },
//         complete: function () {
//             myApp.hidePreloader();
//         },
//         success: function (data) {
//             var data = data.bpmDataTemplate.list;
//             lastyedata=data;


//         }
//     })
// }
function get_data(moduleId, alias, search_condition = {}) {
    var jsziduan = search_condition['jszd'];
    if (search_condition['jszd'] != null) {
        url = hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + jsziduan + '=' + search_condition['jsrq'] + '&token=' + localStorage.token
    } else {
        url = hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?token=' + localStorage.token
    }
    var sh = 't_' + alias + '_shzt';
    $.ajax({
        type: "POST",
        url: url,
        //contentType:"json",
        data: {
            bpmDataTemplatep: '1',
            bpmDataTemplatez: '1000',
            bpmDataTemplateoz: '1000',
            bpmDataTemplate__ns__: 't_' + alias + '_ID',
            bpmDataTemplateo: "ASC",

        },
        dataType: 'json',
        beforeSend: function () {
            myApp.showPreloader();
        },
        complete: function () {
            myApp.hidePreloader();
        },
        success: function (data) {
            // console.log(url);
            console.log(data);
            if (data.bpmDataTemplate != null) {
                // console.log(data.data);
                var data = data.bpmDataTemplate.list;
                var str = "";
                var strbody = "";
                var strhead = "";
                var lastyear = [];
                var thisyearm = [];
                var thisyearms = [];
                var year = "";
                var mon1 = "";
                var mon2 = "";
                //设置全局时间
                var myDate = new Date();
                var thisyear = myDate.getFullYear();
                var month = myDate.getMonth();
                var thisjidu = ""; // 当前季度
                var thisniandu = ""; //当前半年
                var thisyear_bannian = ""
                if (month < 6) {
                    thisniandu = "上半年";
                } else {
                    thisniandu = "下半年";
                }
                var lastniandu = "";
                var lastniandu_months = "";
                if (thisniandu == "下半年") {
                    lastniandu_months = "1-6月";
                    lastniandu = "上半年"
                    thisyear_bannian = thisyear
                } else {
                    thisyear_bannian = thisyear - 1;
                    lastniandu = "下半年";
                    lastniandu_months = "7-12月";
                }
                if (month < 3) {
                    thisjidu = 1
                } else if (month < 6) {
                    thisjidu = 2
                } else if (month < 9) {
                    thisjidu = 3
                } else if (month < 12) {
                    thisjidu = 4
                }
                var lastjidu = "";

                if (thisjidu > 1) {
                    lastjidu = thisjidu - 1;
                    thisyear_jidu = thisyear
                } else {
                    thisyear_jidu = thisyear - 1
                    lastjidu = 4;
                }

                var thismonth = ""; //当前月份
                if (month >= 9) {
                    thismonth = month + 1;
                } else {
                    thismonth = "0" + (month + 1);
                }
                var lastmon = ""; //前一个月
                var thisyear1 = thisyear;
                if (month >= 10) {
                    lastmon = month;
                } else if (month == 0) {
                    lastmon = "12";
                    thisyear1 = thisyear - 1;
                } else {
                    lastmon = "0" + month;
                }
                //全局时间结束

                if (moduleId == "2") {
                    
                    $.each(data, function (i, n) { 
                       if(n['t_gjzyqqyjyqkbyb517_shzt']!=="已审核"){
                       
                            n['t_gjzyqqyjyqkbyb517_ldxzddqysg5']=""
                           n['t_gjzyqqyjyqkbyb517_ldxzddzczddg6']=""
                            n['t_gjzyqqyjyqkbyb517_ldxzddnszewy7']=""
                            n['t_gjzyqqyjyqkbyb517_zczddqysg8']=""
                           n['t_gjzyqqyjyqkbyb517_zczddzdjyg9']=""
                            n['t_gjzyqqyjyqkbyb517_zczddqyszdcssjssg10']=""
                            n['t_gjzyqqyjyqkbyb517_zczddnszewy11']=""
                            n['t_gjzyqqyjyqkbyb517_qyzszcwzcdldx12']=""
                           // console.log(ii);
                        
                       }  
                    });
                    //计算总计
                    var zongji={}
                    zongji['ldxzddqysg5']=0;
                    zongji['ldxzddzczddg6']=0;
                    zongji['ldxzddnszewy7']=0;
                    zongji['zczddqysg8']=0;
                    zongji['zczddzdjyg9']=0;
                    zongji['zczddqyszdcssjssg10']=0;
                    zongji['zczddnszewy11']=0;
                    zongji['qyzszcwzcdldx12']=0;
                   $.each(data, function (i, n) { 
                  // console.log(Number(n['t_gjzyqqyjyqkbyb517_ldxzddnszewy7'])) 
                    zongji['ldxzddqysg5'] += Number(n['t_gjzyqqyjyqkbyb517_ldxzddqysg5'])*100
                    zongji['ldxzddzczddg6'] += Number(n['t_gjzyqqyjyqkbyb517_ldxzddzczddg6'])*100
                    zongji['ldxzddnszewy7'] += Number(n['t_gjzyqqyjyqkbyb517_ldxzddnszewy7'])*100
                    zongji['zczddqysg8'] += Number(n['t_gjzyqqyjyqkbyb517_zczddqysg8'])*100
                    zongji['zczddzdjyg9'] += Number(n['t_gjzyqqyjyqkbyb517_zczddzdjyg9'])*100
                    zongji['zczddqyszdcssjssg10'] += Number(n['t_gjzyqqyjyqkbyb517_zczddqyszdcssjssg10'])*100
                    zongji['zczddnszewy11'] += Number(n['t_gjzyqqyjyqkbyb517_zczddnszewy11'])*100
                    zongji['qyzszcwzcdldx12'] += Number(n['t_gjzyqqyjyqkbyb517_qyzszcwzcdldx12'])*100
                   });
                   var data_sort=[]
                   $.each(data, function (i, n) { 
                        if (n['t_gjzyqqyjyqkbyb517_jzyq4']=="罗店镇") {
                           data_sort.push(n);
                        }
                       })
                        $.each(data, function (i, n) {
                        if (n['t_gjzyqqyjyqkbyb517_jzyq4']=="大场镇") {
                           data_sort.push(n);
                        }
                       })
                        $.each(data, function (i, n) {
                        if (n['t_gjzyqqyjyqkbyb517_jzyq4']=="杨行镇") {
                           data_sort.push(n);
                        }
                       })
                        $.each(data, function (i, n) {
                        if (n['t_gjzyqqyjyqkbyb517_jzyq4']=="月浦镇") {
                           data_sort.push(n);
                        }
                       })
                        $.each(data, function (i, n) {
                        if (n['t_gjzyqqyjyqkbyb517_jzyq4']=="罗泾镇") {
                           data_sort.push(n);
                        }
                       })
                        $.each(data, function (i, n) {
                        if (n['t_gjzyqqyjyqkbyb517_jzyq4']=="顾村镇") {
                           data_sort.push(n);
                        }
                       })
                        $.each(data, function (i, n) {
                        if (n['t_gjzyqqyjyqkbyb517_jzyq4']=="高境镇") {
                           data_sort.push(n);
                        }
                       })
                        $.each(data, function (i, n) {
                        if (n['t_gjzyqqyjyqkbyb517_jzyq4']=="庙行镇") {
                           data_sort.push(n);
                        }
                       })
                        $.each(data, function (i, n) {
                        if (n['t_gjzyqqyjyqkbyb517_jzyq4']=="淞南镇") {
                           data_sort.push(n);
                        }
                       })
                        $.each(data, function (i, n) {
                        if (n['t_gjzyqqyjyqkbyb517_jzyq4']=="城市工业园区") {
                           data_sort.push(n);
                        }
                       })
                        $.each(data, function (i, n) {
                        if (n['t_gjzyqqyjyqkbyb517_jzyq4']=="宝山工业园区") {
                           data_sort.push(n);
                        }
                       })
                        $.each(data, function (i, n) {
                        if (n['t_gjzyqqyjyqkbyb517_jzyq4']=="航运") {
                           data_sort.push(n);
                        }
                       });
                   //console.log(zongji['ldxzddqysg5']);
                    $.each(data_sort, function (i, n) {
                        if (n['t_gjzyqqyjyqkbyb517_jssj3'].slice(0, 7) == thisyear1 + "-" + lastmon && n['t_gjzyqqyjyqkbyb517_kssj2'].slice(0, 7) == thisyear1 + "-01") {
                            str += '<tr><td class="label-cell">' + n['t_gjzyqqyjyqkbyb517_jzyq4'] + '</td><td class="numeric-cell">' + n['t_gjzyqqyjyqkbyb517_ldxzddqysg5'] + '</td><td class="numeric-cell">' + n['t_gjzyqqyjyqkbyb517_ldxzddzczddg6'] + '</td><td class="numeric-cell">' + n['t_gjzyqqyjyqkbyb517_ldxzddnszewy7'] + '</td><td class="numeric-cell">' + n['t_gjzyqqyjyqkbyb517_zczddqysg8'] + '</td><td class="label-cell">' + n['t_gjzyqqyjyqkbyb517_zczddzdjyg9'] + '</td><td class="numeric-cell">' + n['t_gjzyqqyjyqkbyb517_zczddqyszdcssjssg10'] + '</td><td class="numeric-cell">' + n['t_gjzyqqyjyqkbyb517_zczddnszewy11'] + '</td><td class="numeric-cell">' + n['t_gjzyqqyjyqkbyb517_qyzszcwzcdldx12'] + '</td></tr>';
                        }
                    });
                    str += '<tr><td class="label-cell">合计</td><td class="numeric-cell">' + zongji['ldxzddqysg5']/100 + '</td><td class="numeric-cell">' + zongji['ldxzddzczddg6']/100 + '</td><td class="numeric-cell">' + (zongji['ldxzddnszewy7']/100) + '</td><td class="numeric-cell">' + zongji['zczddqysg8']/100 + '</td><td class="label-cell">' + zongji['zczddzdjyg9']/100 + '</td><td class="numeric-cell">' + zongji['zczddqyszdcssjssg10']/100 + '</td><td class="numeric-cell">' + zongji['zczddnszewy11']/100 + '</td><td class="numeric-cell">' + zongji['qyzszcwzcdldx12']/100 + '</td></tr>';

                }
                if (moduleId == "3") {
                    $.each(data, function (i, n) {
                        if (n['t_gjzyqzsyzzlbyb518_jssj3'].slice(0, 7) == thisyear1 + "-" + lastmon && n['t_gjzyqzsyzzlbyb518_kssj2'].slice(0, 7) == thisyear1 + "-01") {
                            str += '<tr><td class="label-cell">' + n['t_gjzyqzsyzzlbyb518_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzsyzzlbyb518_xzcqysg5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzsyzzlbyb518_jnxzcqyznsqysg6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzsyzzlbyb518_jnxzcqynszewy7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzsyzzlbyb518_xqczwqqysg8'] + '</td>' +
                                '<td class="label-cell">' + n['t_gjzyqzsyzzlbyb518_jnqcqyznsqysg9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzsyzzlbyb518_jnqcqynszewy10'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzsyzzlbyb518_jzqysg11'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzsyzzlbyb518_jzqydsszcgxd12'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzsyzzlbyb518_bz13'] + '</td></tr>'
                        }
                    });
                }

                if (moduleId == "52") {

                    $.each(data, function (i, n) {
                        if (n['t_gjzyqzhjzlbyb501_jssj3'].slice(0, 7) == thisyear1 + "-" + lastmon && n['t_gjzyqzhjzlbyb501_kssj2'].slice(0, 7) == thisyear1 + "-01") {
                            str += '<tr><td class="label-cell">' + n['t_gjzyqzhjzlbyb501_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzhjzlbyb501_sssrwy5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzhjzlbyb501_gxjsqysl6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzhjzlbyb501_gxjsqyslzb7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzhjzlbyb501_gxjsqycz8'] + '</td>' +
                                '<td class="label-cell">' + n['t_gjzyqzhjzlbyb501_gxjsqyczzb9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzhjzlbyb501_zbssqyg10'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzhjzlbyb501_xsbssqyg11'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gjzyqzhjzlbyb501_zls12'] + '</td></tr>'
                        }
                    });
                }

                // 1.2.1
                if (moduleId == "73") {
                    var lastyear = [];
                    var thisyearm = [];
                    var thisyearms = [];
                    // get_data_lastyear(moduleId, alias,search_condition)
                    // console.log(lastyedata);
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + jsziduan + '=' + search_condition['jsrq'] + '&' + 't_' + alias + '_shzt=已审核&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_updown34']);
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_zczzxzf5']);
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_xsczyy6']);
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_xsczzxzf7']);
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_gmysqyyy8']);
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_gmysqyzxzf9']);
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_zlxxxcyzzybfyy10']);
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_zlxxxcyzzybfzxzf11']);
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_xnyyy12']);
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_xnyzxzf13']);
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_gdzbzzyy14']);
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_gdzbzzzxzf15']);
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_swyy16']);
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_swzxzf17']);
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_xydxxjsyy18']);
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_xydxxjszxzf19']);
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_xclyy20']);
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_xclzxzf21']);
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_xnyqcyy22']);
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_xnyqczxzf23']);
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_jnhbyy24']);
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_jnhbzxzf25']);
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_zssyy26']);
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_zsszxzf27']);
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_qjssyy28']);
                                lastyear.push(lastyedata[i]['t_gyzyzbqkbyb502_qjsszxzf29']);
                            });
                            console.log(lastyear)
                        }
                    })
                    $.each(data, function (i, n) {
                        var year = data[i]['t_gyzyzbqkbyb502_jssj3'].slice(0, 4);
                        var mon1 = data[i]['t_gyzyzbqkbyb502_kssj2'].slice(5, 7);
                        var mon2 = data[i]['t_gyzyzbqkbyb502_jssj3'].slice(5, 7);

                        // if (year == (thisyear - 1)) {
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_updown34']);
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_zczzxzf5']);
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_xsczyy6']);
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_xsczzxzf7']);
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_gmysqyyy8']);
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_gmysqyzxzf9']);
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_zlxxxcyzzybfyy10']);
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_zlxxxcyzzybfzxzf11']);
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_xnyyy12']);
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_xnyzxzf13']);
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_gdzbzzyy14']);
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_gdzbzzzxzf15']);
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_swyy16']);
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_swzxzf17']);
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_xydxxjsyy18']);
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_xydxxjszxzf19']);
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_xclyy20']);
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_xclzxzf21']);
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_xnyqcyy22']);
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_xnyqczxzf23']);
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_jnhbyy24']);
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_jnhbzxzf25']);
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_zssyy26']);
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_zsszxzf27']);
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_qjssyy28']);
                        //     lastyear.push(data[i]['t_gyzyzbqkbyb502_qjsszxzf29']);
                        // }
                        if (year == thisyear1) {
                            if (mon1 == lastmon && mon2 == lastmon) {
                                thisyearm.push(data[i]['t_gyzyzbqkbyb502_updown34']);
                                thisyearm.push((data[i]['t_gyzyzbqkbyb502_xsczyy6']));
                                thisyearm.push((data[i]['t_gyzyzbqkbyb502_gmysqyyy8']));
                                thisyearm.push((data[i]['t_gyzyzbqkbyb502_zlxxxcyzzybfyy10']));
                                thisyearm.push((data[i]['t_gyzyzbqkbyb502_xnyyy12']));
                                thisyearm.push((data[i]['t_gyzyzbqkbyb502_gdzbzzyy14']));
                                thisyearm.push((data[i]['t_gyzyzbqkbyb502_swyy16']));
                                thisyearm.push((data[i]['t_gyzyzbqkbyb502_xydxxjsyy18']));
                                thisyearm.push((data[i]['t_gyzyzbqkbyb502_xclyy20']));
                                thisyearm.push((data[i]['t_gyzyzbqkbyb502_xnyqcyy22']));
                                thisyearm.push((data[i]['t_gyzyzbqkbyb502_jnhbyy24']));
                                thisyearm.push((data[i]['t_gyzyzbqkbyb502_zssyy26']));
                                thisyearm.push((data[i]['t_gyzyzbqkbyb502_qjssyy28']));
                            }
                            if (mon1 == "01" && mon2 == lastmon) {
                                thisyearms.push((data[i]['t_gyzyzbqkbyb502_zczzxzf5']));
                                thisyearms.push((data[i]['t_gyzyzbqkbyb502_xsczyy6']));
                                thisyearms.push((data[i]['t_gyzyzbqkbyb502_xsczzxzf7']));
                                thisyearms.push((data[i]['t_gyzyzbqkbyb502_gmysqyyy8']));
                                thisyearms.push((data[i]['t_gyzyzbqkbyb502_gmysqyzxzf9']));
                                thisyearms.push((data[i]['t_gyzyzbqkbyb502_zlxxxcyzzybfyy10']));
                                thisyearms.push((data[i]['t_gyzyzbqkbyb502_zlxxxcyzzybfzxzf11']));
                                thisyearms.push((data[i]['t_gyzyzbqkbyb502_xnyyy12']));
                                thisyearms.push((data[i]['t_gyzyzbqkbyb502_xnyzxzf13']));
                                thisyearms.push((data[i]['t_gyzyzbqkbyb502_gdzbzzyy14']));
                                thisyearms.push((data[i]['t_gyzyzbqkbyb502_gdzbzzzxzf15']));
                                thisyearms.push((data[i]['t_gyzyzbqkbyb502_swyy16']));
                                thisyearms.push((data[i]['t_gyzyzbqkbyb502_swzxzf17']));
                                thisyearms.push((data[i]['t_gyzyzbqkbyb502_xydxxjsyy18']));
                                thisyearms.push((data[i]['t_gyzyzbqkbyb502_xydxxjszxzf19']));
                                thisyearms.push((data[i]['t_gyzyzbqkbyb502_xclyy20']));
                                thisyearms.push((data[i]['t_gyzyzbqkbyb502_xclzxzf21']));
                                thisyearms.push((data[i]['t_gyzyzbqkbyb502_xnyqcyy22']));
                                thisyearms.push((data[i]['t_gyzyzbqkbyb502_xnyqczxzf23']));
                                thisyearms.push((data[i]['t_gyzyzbqkbyb502_jnhbyy24']));
                                thisyearms.push((data[i]['t_gyzyzbqkbyb502_jnhbzxzf25']));
                                thisyearms.push((data[i]['t_gyzyzbqkbyb502_zssyy26']));
                                thisyearms.push((data[i]['t_gyzyzbqkbyb502_zsszxzf27']));
                                thisyearms.push((data[i]['t_gyzyzbqkbyb502_qjssyy28']));
                                thisyearms.push((data[i]['t_gyzyzbqkbyb502_qjsszxzf29']));
                            }
                        }


                    });
                    console.log(lastyear[0]);

                    str += '<tr><td class="label-cell" colspan="2">总产值</td>' +
                        '<td class="numeric-cell">' + lastyear[0] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[1] + '</td>'
                        //  +'<td class="numeric-cell">'+thisyearm[0]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[0] + '</td>' +
                        '<td class="label-cell">' + thisyearms[1] + '</td>' +
                        '</tr>' +
                        '<tr><td class="label-cell" colspan="2">销售产值</td>' +
                        '<td class="numeric-cell">' + lastyear[2] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[3] + '</td>'
                        // +'<td class="numeric-cell">'+thisyearm[1]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[2] + '</td>' +
                        '<td class="label-cell">' + thisyearms[3] + '</td>' +
                        '</tr>' +
                        '<tr><td class="label-cell" colspan="2">规模以上企业工业总产值</td>' +
                        '<td class="numeric-cell">' + lastyear[4] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[5] + '</td>'
                        //  +'<td class="numeric-cell">'+thisyearm[2]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[4] + '</td>' +
                        '<td class="label-cell">' + thisyearms[5] + '</td>' +
                        '</tr>' +
                        '<tr><td class="label-cell" colspan="2">战略性新兴产业(制造业部分)工业总产值</td>' +
                        '<td class="numeric-cell">' + lastyear[6] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[7] + '</td>'
                        // +'<td class="numeric-cell">'+thisyearm[3]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[6] + '</td>' +
                        '<td class="label-cell">' + thisyearms[7] + '</td>' +
                        '</tr>' +
                        '<tr><td class="label-cell" rowspan="7">其中</td>' +
                        '<td class="numeric-cell">新能源</td>' +
                        '<td class="numeric-cell">' + lastyear[8] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[9] + '</td>'
                        //  +'<td class="numeric-cell">'+thisyearm[4]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[8] + '</td>' +
                        '<td class="label-cell">' + thisyearms[9] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">高端装备制造</td>' +
                        '<td class="numeric-cell">' + lastyear[10] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[11] + '</td>'
                        // +'<td class="numeric-cell">'+thisyearm[5]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[10] + '</td>' +
                        '<td class="label-cell">' + thisyearms[11] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">生物</td>' +
                        '<td class="numeric-cell">' + lastyear[12] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[13] + '</td>'
                        //  +'<td class="numeric-cell">'+thisyearm[6]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[12] + '</td>' +
                        '<td class="label-cell">' + thisyearms[13] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">新一代信息技术</td>' +
                        '<td class="numeric-cell">' + lastyear[14] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[15] + '</td>'
                        // +'<td class="numeric-cell">'+thisyearm[7]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[14] + '</td>' +
                        '<td class="label-cell">' + thisyearms[15] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">新材料</td>' +
                        '<td class="numeric-cell">' + lastyear[16] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[17] + '</td>'
                        //  +'<td class="numeric-cell">'+thisyearm[8]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[16] + '</td>' +
                        '<td class="label-cell">' + thisyearms[17] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">新能源汽车</td>' +
                        '<td class="numeric-cell">' + lastyear[18] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[19] + '</td>'
                        //  +'<td class="numeric-cell">'+thisyearm[9]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[18] + '</td>' +
                        '<td class="label-cell">' + thisyearms[19] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">节能环保</td>' +
                        '<td class="numeric-cell">' + lastyear[20] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[21] + '</td>'
                        //  +'<td class="numeric-cell">'+thisyearm[10]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[20] + '</td>' +
                        '<td class="label-cell">' + thisyearms[21] + '</td>' +
                        '</tr>' +
                        '<tr><td class="label-cell" colspan="2">总税收</td>' +
                        '<td class="numeric-cell">' + lastyear[22] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[23] + '</td>'
                        //  +'<td class="numeric-cell">'+thisyearm[11]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[22] + '</td>' +
                        '<td class="label-cell">' + thisyearms[23] + '</td>' +
                        '</tr>' +
                        '<tr><td class="label-cell" colspan="2">区级税收</td>' +
                        '<td class="numeric-cell">' + lastyear[24] + '</td>' +
                        '<td class="numeric-cell">' + lastyear[25] + '</td>'
                        //  +'<td class="numeric-cell">'+thisyearm[12]+'</td>'
                        +
                        '<td class="numeric-cell">' + thisyearms[24] + '</td>' +
                        '<td class="label-cell">' + thisyearms[25] + '</td>' +
                        '</tr>'

                }



                if (moduleId == "54") {
                    $.each(data, function (i, n) {
                        if (n['t_gyqyqkbyb503_jssj3'].slice(0, 7) == thisyear1 + "-" + lastmon && n['t_gyqyqkbyb503_kssj2'] == thisyear1 + "-01") {
                            str += '<tr><td class="label-cell">' + n['t_gyqyqkbyb503_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gyqyqkbyb503_gyzczyy5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gyqyqkbyb503_gsgyqyzsh6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gyqyqkbyb503_gsgyqygyzczyy7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gyqyqkbyb503_zlxxxcyqyzsh8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gyqyqkbyb503_zlxxxcyqygyzczyy9'] + '</td></tr>'
                        }
                    });
                }
                //1.2.3
                if (moduleId == "74") {

                    var lastyear = [];
                    var thisyearm = [];
                    var thisyearms = [];
                    $.each(data, function (i, n) {
                        var year = data[i]['t_ggyyqztqkbyb504_jssj3'].slice(0, 4);
                        var mon1 = data[i]['t_ggyyqztqkbyb504_kssj2'].slice(5, 7);
                        var mon2 = data[i]['t_ggyyqztqkbyb504_jssj3'].slice(5, 7);
                        // alert("year"+year);
                        search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                        $.ajax({
                            type: "POST",
                            async: false,
                            url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + jsziduan + '=' + search_condition['jsrq'] + '&' + 't_' + alias + '_shzt=已审核&token=' + localStorage.token,
                            //contentType:"json",
                            data: {
                                bpmDataTemplatep: '1',
                                bpmDataTemplatez: '1000',
                                bpmDataTemplateoz: '1000',
                                bpmDataTemplate__ns__: 't_' + alias + '_ID',
                                bpmDataTemplateo: "ASC",

                            },
                            dataType: 'json',
                            beforeSend: function () {
                                myApp.showPreloader();
                            },
                            complete: function () {
                                myApp.hidePreloader();
                            },
                            success: function (data1) {
                                var data1 = data1.bpmDataTemplate.list;
                                console.log(data1);
                                lastyedata = data1;
                                $.each(lastyedata, function (i, n) {
                                    lastyear.push(lastyedata[i]);
                                });
                                console.log(lastyear)
                            }
                        })
                        if (year == (thisyear - 1) && mon1 == "01" && mon2 == "12") {

                        }
                        if (year == thisyear1) {

                            //if(mon1=="01" && mon2==lastmon){
                            if (mon1 == "01" && mon2 == lastmon) {
                                thisyearms.push((data[i]));
                            }
                        }

                    });
                    //  if(thisyearms.length==0){
                    //      thisyearms = lastyear;
                    //    $.each(thisyearms, function (i, v) { 
                    //         v['t_ggyyqztqkbyb504_ljzczyy6']="";
                    //         v['t_ggyyqztqkbyb504_ljzcz7']="";
                    //         v['t_ggyyqztqkbyb504_ljsssryy8']="";
                    //         v['t_ggyyqztqkbyb504_ljsssr9']="";
                    //    });
                    //  }
                    //console.log(lastyear);
                    $.each(thisyearms, function (i, n) {
                        $.each(lastyear, function (ii, nn) {
                            if (thisyearms[i]['t_ggyyqztqkbyb504_gyyq4'] == lastyear[ii]['t_ggyyqztqkbyb504_gyyq4']) {
                                thisyearms[i]['qunianzong'] = lastyear[ii]["t_ggyyqztqkbyb504_ljzczyy6"]
                                thisyearms[i]['qunianzeng'] = lastyear[ii]["t_ggyyqztqkbyb504_ljzcz7"]
                                thisyearms[i]['qunianshui'] = lastyear[ii]["t_ggyyqztqkbyb504_ljsssryy8"]
                                thisyearms[i]['qunianshuizeng'] = lastyear[ii]["t_ggyyqztqkbyb504_ljsssr9"]
                            }
                        });
                    });

                    $.each(thisyearms, function (i, v) {
                        str += '<tr><td class="label-cell">' + v['t_ggyyqztqkbyb504_gyyq4'] + '</td>' +
                            '<td class="numeric-cell">' + v['t_ggyyqztqkbyb504_mjwpfm5'] + '</td>' +
                            '<td class="numeric-cell">' + v['qunianzong'] + '</td>' +
                            '<td class="numeric-cell">' + v['qunianzeng'] + '</td>' +
                            '<td class="numeric-cell">' + v['t_ggyyqztqkbyb504_dyzczyy10'] + '</td>' +
                            '<td class="numeric-cell">' + v['t_ggyyqztqkbyb504_dyzcz11'] + '</td>' +
                            '<td class="numeric-cell">' + v['t_ggyyqztqkbyb504_ljzczyy6'] + '</td>' +
                            '<td class="label-cell">' + v['t_ggyyqztqkbyb504_ljzcz7'] + '</td>' +
                            '</tr>'
                    });
                    if (thisyearms.length >= 1) {
                        var strhead = '<tr>' +
                            ' <td class="label-cell" colspan="2" style="font-weight:bold;">类别</td>' +
                            '<td class="label-cell" style="font-weight:bold;">税收收入</td>' +
                            '<td class="numeric-cell" style="font-weight:bold;">±%</td>' +
                            '<td class="label-cell" style="font-weight:bold;">税收收入</td>' +
                            '<td class="numeric-cell" style="font-weight:bold;">±%</td>' +
                            '<td class="label-cell" style="font-weight:bold;">税收收入</td>' +
                            '<td class="numeric-cell" style="font-weight:bold;">±%</td>' +
                            '</tr>';
                    }
                    $.each(thisyearms, function (i, v) {
                        strhead += '<tr>' +
                            '<td class="label-cell" colspan="2">' + v['t_ggyyqztqkbyb504_gyyq4'] + '</td>' +
                            ' <td class="numeric-cell">' + v['qunianshui'] + '</td>' +
                            '<td class="numeric-cell">' + v['qunianshuizeng'] + '</td>' +
                            '<td class="numeric-cell">' + v['t_ggyyqztqkbyb504_dysssryy12'] + '</td>' +
                            '<td class="numeric-cell">' + v['t_ggyyqztqkbyb504_dysssr13'] + '</td>' +
                            '<td class="numeric-cell">' + v['t_ggyyqztqkbyb504_ljsssryy8'] + '</td>' +
                            '<td class="numeric-cell">' + v['t_ggyyqztqkbyb504_ljsssr9'] + '</td>' +
                            '</tr>'
                    });


                    str += strhead;
                }
                //1.2.4
                if (moduleId == "4") {
                    $.each(data, function (i, n) {
                        if (n['t_gyxmqkbyb505_jssj3'].slice(0, 7) == thisyear1 + "-" + lastmon && n['t_gyxmqkbyb505_kssj2'].slice(0, 7) == thisyear1 + "-01") {
                            if (n['t_gyxmqkbyb505_jzyq4'] == "全区") {
                                console.log(n['t_gyxmqkbyb505_jzyq4'])
                                str += '<tr><td class="label-cell">' + n['t_gyxmqkbyb505_jzyq4'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_nqdxmsg5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_nqdxmtzlwy6'] + '</td>'

                                    +
                                    '<td class="label-cell">' + n['t_gyxmqkbyb505_zjxmsg9'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_zjxmtzlwy10'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_kgxmsg7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_kgxmtzlwy8'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_jgtcxmsg11'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_jgtcxmtzlwy12'] + '</td></tr>'
                            }
                        }
                    })
                    $.each(data, function (i, n) {
                        if (n['t_gyxmqkbyb505_jssj3'].slice(0, 7) == thisyear1 + "-" + lastmon && n['t_gyxmqkbyb505_kssj2'].slice(0, 7) == thisyear1 + "-01") {
                            if (n['t_gyxmqkbyb505_jzyq4'] != "全区") {
                                str += '<tr><td class="label-cell">' + n['t_gyxmqkbyb505_jzyq4'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_nqdxmsg5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_nqdxmtzlwy6'] + '</td>'

                                    +
                                    '<td class="label-cell">' + n['t_gyxmqkbyb505_zjxmsg9'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_zjxmtzlwy10'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_kgxmsg7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_kgxmtzlwy8'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_jgtcxmsg11'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gyxmqkbyb505_jgtcxmtzlwy12'] + '</td></tr>'
                            }
                        }
                        // console.log(str)
                    });
                }

                if (moduleId == "75") {
                    var thismonth = [];
                    var thismonths = [];
                    // $.each(data, function(i, n){
                    // if((n['t_clgytdphqkbyb506_jssj3'].slice(0,7) == (thisyear1+"-"+lastmon)) &&( n['t_clgytdphqkbyb506_kssj2'].slice(0,7)==thisyear1+"-"+lastmon) ){
                    //     thismonth.push(data[i]);
                    //       }
                    //     });
                    $.each(data, function (i, n) {
                        if ((n['t_clgytdphqkbyb506_jssj3'].slice(0, 7) == (thisyear1 + "-" + lastmon)) && (n['t_clgytdphqkbyb506_kssj2'].slice(0, 7) == thisyear1 + "-01")) {
                            thismonths.push(data[i]);
                        }
                    });
                    //  $.each(thismonths, function (i, n) { 
                    //      $.each(thismonth, function (ii, nn) { 
                    //       if(thismonths[i]['t_clgytdphqkbyb506_jzyq4']==thismonth[ii]['t_clgytdphqkbyb506_jzyq4']){
                    //         thismonths[i]['benyue']=  thismonth[ii]["t_clgytdphqkbyb506_ms5"] 
                    //          }
                    //     });

                    //            });

                    $.each(thismonths, function (i, n) {
                        if (n['t_clgytdphqkbyb506_jzyq4'] == "全区") {

                            str += '<tr><td class="label-cell">' + n['t_clgytdphqkbyb506_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_clgytdphqkbyb506_qnphms8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_clgytdphqkbyb506_bnmbphms9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_clgytdphqkbyb506_dyms11'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_clgytdphqkbyb506_ljms5'] + '</td>' +
                                '<td class="label-cell">' + n['t_clgytdphqkbyb506_pm6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_clgytdphqkbyb506_wcjd7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_clgytdphqkbyb506_wcjdpm10'] + '</td></tr>'
                        }
                    });
                    $.each(thismonths, function (i, n) {
                        if (n['t_clgytdphqkbyb506_jzyq4'] != "全区") {
                            str += '<tr><td class="label-cell">' + n['t_clgytdphqkbyb506_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_clgytdphqkbyb506_qnphms8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_clgytdphqkbyb506_bnmbphms9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_clgytdphqkbyb506_dyms11'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_clgytdphqkbyb506_ljms5'] + '</td>' +
                                '<td class="label-cell">' + n['t_clgytdphqkbyb506_pm6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_clgytdphqkbyb506_wcjd7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_clgytdphqkbyb506_wcjdpm10'] + '</td></tr>'
                        }
                    });

                }
                //1.3.1
                if (moduleId == "56") {

                    var lastyear = [];
                    var thisyear = [];
                    var thisyearm = [];
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + jsziduan + '=' + search_condition['jsrq'] + '&' + 't_' + alias + '_shzt=已审核&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            console.log(data);
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_fwyssqkbyb507_kssj2'].slice(0, 7) == (thisyear - 1) + "-01" && n['t_fwyssqkbyb507_jssj3'].slice(0, 7) == (thisyear - 1) + "-12") {
                                    lastyear.push(lastyedata[i]);

                                }
                            });
                            console.log(lastyear)
                        }
                    })
                    $.each(data, function (i, n) {
                        var year = data[i]['t_fwyssqkbyb507_jssj3'];
                        var mon1 = data[i]['t_fwyssqkbyb507_kssj2'].slice(5, 7);
                        var mon2 = data[i]['t_fwyssqkbyb507_jssj3'].slice(5, 7);
                        // alert("year"+year);
                        // if (n['t_fwyssqkbyb507_kssj2'].slice(0, 7) == (thisyear - 1) + "-01" && n['t_fwyssqkbyb507_jssj3'].slice(0, 7) == (thisyear - 1) + "-12") {
                        //     lastyear.push(data[i]);

                        // }
                        if (n['t_fwyssqkbyb507_kssj2'].slice(0, 7) == (thisyear1) + "-01" && n['t_fwyssqkbyb507_jssj3'].slice(0, 7) == (thisyear1) + "-" + lastmon) {
                            thisyear.push(data[i]);

                        }

                        //alert(lastyear[0]);
                    });
                    $.each(thisyear, function (i, v) {
                        $.each(lastyear, function (ii, vv) {
                            if (thisyear[i]['t_fwyssqkbyb507_xm4'] == lastyear[ii]['t_fwyssqkbyb507_xm4']) {
                                thisyear[i]['qunianzong'] = lastyear[ii]['t_fwyssqkbyb507_ljz7'];
                                thisyear[i]['qunianzeng'] = lastyear[ii]['t_fwyssqkbyb507_lj8'];
                            }
                        });
                    });

                    $.each(thisyear, function (i, n) {
                        str += '<tr><td class="label-cell">' + n['t_fwyssqkbyb507_xm4'] + '</td>' +
                            '<td class="numeric-cell">' + n['qunianzong'] + '</td>' +
                            '<td class="numeric-cell">' + n['qunianzeng'] + '</td>'
                            // +'<td class="numeric-cell">'+n['t_fwyssqkbyb507_dyz5']+'</td>'
                            // +'<td class="numeric-cell">'+n['t_fwyssqkbyb507_6']+'</td>'
                            +
                            '<td class="numeric-cell">' + n['t_fwyssqkbyb507_ljz7'] + '</td>' +
                            '<td class="numeric-cell">' + n['t_fwyssqkbyb507_lj8'] + '</td></tr>'
                    });
                }

                //1.3.2
                if (moduleId == "57") {

                    var lastyear = [];
                    var thisyearm = [];
                    var thisyearms = [];
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + jsziduan + '=' + search_condition['jsrq'] + '&' + 't_' + alias + '_shzt=已审核&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            console.log(data1);
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {

                                if (n['t_shfwyzyzbqkbyb508_kssj2'].slice(0, 7) == (thisyear - 1) + "-01" && n['t_shfwyzyzbqkbyb508_jssj3'].slice(0, 7) == (thisyear - 1) + "-12") {
                                    lastyear.push((lastyedata[i]));



                                }
                            });

                        }
                    })
                    $.each(data, function (i, n) {
                        var year = data[i]['t_shfwyzyzbqkbyb508_jssj3'].slice(0, 4);
                        var mon1 = data[i]['t_shfwyzyzbqkbyb508_kssj2'].slice(5, 7);
                        var mon2 = data[i]['t_shfwyzyzbqkbyb508_jssj3'].slice(5, 7);


                        if (n['t_shfwyzyzbqkbyb508_kssj2'].slice(0, 7) == (thisyear1) + "-01" && n['t_shfwyzyzbqkbyb508_jssj3'].slice(0, 7) == (thisyear1) + "-" + lastmon) {

                            thisyearms.push((data[i]));

                        }
                    });
                    $.each(thisyearms, function (i, v) {
                        $.each(lastyear, function (ii, vv) {
                            if (thisyearms[i]['t_shfwyzyzbqkbyb508_xm4'] == lastyear[ii]['t_shfwyzyzbqkbyb508_xm4']) {
                                thisyearms[i]['qunianzong'] = lastyear[ii]['t_shfwyzyzbqkbyb508_ljz7'];
                                thisyearms[i]['qunianzeng'] = lastyear[ii]['t_shfwyzyzbqkbyb508_lj8'];
                            }
                        });
                    });
                    $.each(thisyearms, function (i, n) {
                        if (n['t_shfwyzyzbqkbyb508_xm4'] == "总营业收入(规上)") {
                            str += '<tr><td class="label-cell" colspan="2">' + n['t_shfwyzyzbqkbyb508_xm4'] + '</td>' +
                                '<td class="numeric-cell">' + n['qunianzong'] + '</td>' +
                                '<td class="numeric-cell">' + n['qunianzeng'] + '</td>'
                                // +'<td class="numeric-cell">'+n['t_shfwyzyzbqkbyb508_dyz5']+'</td>'
                                // +'<td class="numeric-cell">'+n['t_shfwyzyzbqkbyb508_6']+'</td>'
                                +
                                '<td class="label-cell">' + n['t_shfwyzyzbqkbyb508_ljz7'] + '</td>' +
                                '<td class="label-cell">' + n['t_shfwyzyzbqkbyb508_lj8'] + '</td>' +
                                '</tr>'
                        }
                    });
                    $.each(thisyearms, function (i, n) {
                        if (n['t_shfwyzyzbqkbyb508_xm4'] == "信传软件和信息技术服务业") {
                            str += '<tr><td class="label-cell" rowspan="8">其中</td>' +
                                '<td class="numeric-cell">' + n['t_shfwyzyzbqkbyb508_xm4'] + '</td>' +
                                '<td class="numeric-cell">' + n['qunianzong'] + '</td>' +
                                '<td class="numeric-cell">' + n['qunianzeng'] + '</td>'
                                //    +'<td class="numeric-cell">'+n['t_shfwyzyzbqkbyb508_dyz5']+'</td>'
                                //    +'<td class="numeric-cell">'+n['t_shfwyzyzbqkbyb508_6']+'</td>'
                                +
                                '<td class="label-cell">' + n['t_shfwyzyzbqkbyb508_ljz7'] + '</td>' +
                                '<td class="label-cell">' + n['t_shfwyzyzbqkbyb508_lj8'] + '</td>' +
                                '</tr>'
                        }
                    });
                    $.each(thisyearms, function (i, n) {
                        if (n['t_shfwyzyzbqkbyb508_xm4'] != "信传软件和信息技术服务业" && n['t_shfwyzyzbqkbyb508_xm4'] != "总营业收入(规上)") {
                            str += '<td class="numeric-cell">' + n['t_shfwyzyzbqkbyb508_xm4'] + '</td>' +
                                '<td class="numeric-cell">' + n['qunianzong'] + '</td>' +
                                '<td class="numeric-cell">' + n['qunianzeng'] + '</td>'
                                //    +'<td class="numeric-cell">'+n['t_shfwyzyzbqkbyb508_dyz5']+'</td>'
                                //    +'<td class="numeric-cell">'+n['t_shfwyzyzbqkbyb508_6']+'</td>'
                                +
                                '<td class="label-cell">' + n['t_shfwyzyzbqkbyb508_ljz7'] + '</td>' +
                                '<td class="label-cell">' + n['t_shfwyzyzbqkbyb508_lj8'] + '</td>' +
                                '</tr>'
                        }
                    });


                    //   str +='<tr><td class="label-cell" colspan="2">总营业收入(规上)</td>'
                    //           +'<td class="numeric-cell">'+lastyear[0]+'</td>'
                    //           +'<td class="numeric-cell">'+lastyear[1]+'</td>'
                    //           +'<td class="numeric-cell">'+thisyearm[0]+'</td>'
                    //           +'<td class="numeric-cell">'+thisyearm[1]+'</td>'
                    //         +'<td class="label-cell">'+thisyearms[0]+'</td>'
                    //         +'<td class="label-cell">'+thisyearms[1]+'</td>'
                    //       +'</tr>'
                    //       +'<tr><td class="label-cell" rowspan="4">其中</td>'
                    //           +'<td class="numeric-cell">信传软件和信息技术服务业</td>'
                    //           +'<td class="numeric-cell">'+lastyear[2]+'</td>'
                    //           +'<td class="numeric-cell">'+lastyear[3]+'</td>'
                    //           +'<td class="numeric-cell">'+thisyearm[2]+'</td>'
                    //           +'<td class="numeric-cell">'+thisyearm[3]+'</td>'
                    //         +'<td class="label-cell">'+thisyearms[2]+'</td>'
                    //         +'<td class="label-cell">'+thisyearms[3]+'</td>'
                    //       +'</tr>'
                    //       +'<tr><td class="numeric-cell">租赁和商务服务业</td>'
                    //           +'<td class="numeric-cell">'+lastyear[4]+'</td>'
                    //           +'<td class="numeric-cell">'+lastyear[5]+'</td>'
                    //           +'<td class="numeric-cell">'+thisyearm[4]+'</td>'
                    //           +'<td class="numeric-cell">'+thisyearm[5]+'</td>'
                    //         +'<td class="label-cell">'+thisyearms[4]+'</td>'
                    //         +'<td class="label-cell">'+thisyearms[5]+'</td>'
                    //       +'</tr>'
                    //       +'<tr><td class="numeric-cell">科学研究和技术服务业</td>'
                    //           +'<td class="numeric-cell">'+lastyear[6]+'</td>'
                    //           +'<td class="numeric-cell">'+lastyear[7]+'</td>'
                    //           +'<td class="numeric-cell">'+thisyearm[6]+'</td>'
                    //           +'<td class="numeric-cell">'+thisyearm[7]+'</td>'
                    //         +'<td class="label-cell">'+thisyearms[6]+'</td>'
                    //         +'<td class="label-cell">'+thisyearms[7]+'</td>'
                    //       +'</tr>'
                    //       +'<tr><td class="numeric-cell">其他</td>'
                    //           +'<td class="numeric-cell">'+lastyear[8]+'</td>'
                    //           +'<td class="numeric-cell">'+lastyear[9]+'</td>'
                    //           +'<td class="numeric-cell">'+thisyearm[8]+'</td>'
                    //           +'<td class="numeric-cell">'+thisyearm[9]+'</td>'
                    //         +'<td class="label-cell">'+thisyearms[8]+'</td>'
                    //         +'<td class="label-cell">'+thisyearms[9]+'</td>'
                    //       +'</tr>'
                }

                /*t_shfwyqyqkbyb509_ID项目不确定*/
                if (moduleId == "76") {
                    $.each(data, function (i, n) {
                        if (n['t_shfwyqyqkbyb509_jssj3'].slice(0, 7) == thisyear1 + "-" + lastmon && n['t_shfwyqyqkbyb509_kssj2'].slice(0, 7) == thisyear1 + "-01") {
                            str += '<tr><td class="label-cell">' + n['t_shfwyqyqkbyb509_ID'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_shfwyqyqkbyb509_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_shfwyqyqkbyb509_gsqyzsh5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_shfwyqyqkbyb509_gsqyyysryy6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_shfwyqyqkbyb509_7'] + '</td></tr>'
                        }
                    });
                }
                //1.3.4
                if (moduleId == "59") {

                    var lastyear = [];
                    var thisyearm = [];
                    var thisyearms = [];
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + jsziduan + '=' + search_condition['jsrq'] + '&' + 't_' + alias + '_shzt=已审核&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            //console.log(data);
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_syzyzbqkbyb510_jssj3'].slice(0, 7) == (thisyear - 1) + "-12" && n['t_syzyzbqkbyb510_kssj2'].slice(0, 7) == (thisyear - 1) + "-01") {
                                    lastyear.push(lastyedata[i]);

                                }
                            });

                        }
                    })
                    $.each(data, function (i, n) {
                        var year = data[i]['t_syzyzbqkbyb510_jssj3'].slice(0, 4);
                        var mon1 = data[i]['t_syzyzbqkbyb510_kssj2'].slice(5, 7);
                        var mon2 = data[i]['t_syzyzbqkbyb510_jssj3'].slice(5, 7);

                        // if (n['t_syzyzbqkbyb510_jssj3'].slice(0, 7) == (thisyear - 1) + "-12" && n['t_syzyzbqkbyb510_kssj2'].slice(0, 7) == (thisyear - 1) + "-01") {
                        //     lastyear.push(data[i]);

                        // }
                        if (n['t_syzyzbqkbyb510_jssj3'].slice(0, 7) == thisyear1 + "-" + lastmon && n['t_syzyzbqkbyb510_kssj2'].slice(0, 7) == thisyear1 + "-01") {
                            thisyearms.push(data[i]);
                        }
                    });

                    $.each(thisyearms, function (i, v) {
                        $.each(lastyear, function (ii, vv) {
                            if (thisyearms[i]['t_syzyzbqkbyb510_xm4'] == lastyear[ii]['t_syzyzbqkbyb510_xm4']) {
                                thisyearms[i]['qunianzong'] = lastyear[ii]['t_syzyzbqkbyb510_dyjeyy7'];
                                thisyearms[i]['qunianzeng'] = lastyear[ii]['t_syzyzbqkbyb510_dy8'];
                            }
                        });
                    })
                    $.each(thisyearms, function (i, n) {
                        if (n['t_syzyzbqkbyb510_xm4'] == "商品销售额" || n['t_syzyzbqkbyb510_xm4'] == "社会消费品零售总额") {
                            str += '<tr><td class="label-cell" colspan="2">' + n['t_syzyzbqkbyb510_xm4'] + '</td>' +
                                '<td class="numeric-cell">' + n['qunianzong'] + '</td>' +
                                '<td class="numeric-cell">' + n['qunianzeng'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_syzyzbqkbyb510_dyjeyy7'] + '</td>'
                                // +'<td class="numeric-cell">'+n['t_syzyzbqkbyb510_dy8']+'</td>'
                                +
                                '<td class="label-cell">' + n['t_syzyzbqkbyb510_ljjeyy5'] + '</td>' +
                                '<td class="label-cell">' + n['t_syzyzbqkbyb510_lj6'] + '</td>' +
                                '</tr>'
                        }
                        if (n['t_syzyzbqkbyb510_xm4'] == "批发零售业") {
                            str += '<tr><td class="label-cell" rowspan="2">其中</td>' +
                                '<td class="label-cell">' + n['t_syzyzbqkbyb510_xm4'] + '</td>' +
                                '<td class="numeric-cell">' + n['qunianzong'] + '</td>' +
                                '<td class="numeric-cell">' + n['qunianzeng'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_syzyzbqkbyb510_dyjeyy7'] + '</td>'
                                // +'<td class="numeric-cell">'+n['t_syzyzbqkbyb510_dy8']+'</td>'
                                +
                                '<td class="label-cell">' + n['t_syzyzbqkbyb510_ljjeyy5'] + '</td>' +
                                '<td class="label-cell">' + n['t_syzyzbqkbyb510_lj6'] + '</td>' +
                                '</tr>'
                        }
                        if (n['t_syzyzbqkbyb510_xm4'] == "住宿和餐饮业") {
                            str += '<tr><td class="numeric-cell">' + n['t_syzyzbqkbyb510_xm4'] + '</td>' +
                                '<td class="numeric-cell">' + n['qunianzong'] + '</td>' +
                                '<td class="numeric-cell">' + n['qunianzeng'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_syzyzbqkbyb510_dyjeyy7'] + '</td>'
                                //+'<td class="numeric-cell">'+n['t_syzyzbqkbyb510_dy8']+'</td>'
                                +
                                '<td class="label-cell">' + n['t_syzyzbqkbyb510_ljjeyy5'] + '</td>' +
                                '<td class="label-cell">' + n['t_syzyzbqkbyb510_lj6'] + '</td>' +
                                '</tr>'
                        }

                    });
                }

                if (moduleId == "60") {
                    $.each(data, function (i, n) {
                        if (n['t_syqyqkbyb511_jssj3'].slice(0, 7) == thisyear1 + "-" + lastmon && n['t_syqyqkbyb511_kssj2'].slice(0, 7) == thisyear1 + "-01") {
                            str += '<tr><td class="label-cell">' + n['t_syqyqkbyb511_ID'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_syqyqkbyb511_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_syqyqkbyb511_spxsewy5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_syqyqkbyb511_spxse6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_syqyqkbyb511_shxfplszewy7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_syqyqkbyb511_shxfplsze8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_syqyqkbyb511_gslsqyzsh9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_syqyqkbyb511_gslsqylsewy10'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_syqyqkbyb511_gslsqylse11'] + '</td></tr>'
                        }
                    });
                }

                //1.3.6
                if (moduleId == "6") {
                    var lastyear = [];
                    var thisyearm = [];
                    var thisyearms = [];
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + jsziduan + '=' + search_condition['jsrq'] + '&' + 't_' + alias + '_shzt=已审核&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            //console.log(data);
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_sylyqkbyb512_jssj3'].slice(0, 7) == (thisyear - 1) + "-12" && n['t_sylyqkbyb512_kssj2'].slice(0, 7) == (thisyear - 1) + "-01") {
                                    lastyear.push(lastyedata[i]);
                                }
                            });

                        }
                    })
                    $.each(data, function (i, n) {
                        var year = data[i]['t_sylyqkbyb512_jssj3'].slice(0, 4);
                        var mon1 = data[i]['t_sylyqkbyb512_kssj2'].slice(5, 7);
                        var mon2 = data[i]['t_sylyqkbyb512_jssj3'].slice(5, 7);

                        // if (n['t_sylyqkbyb512_jssj3'].slice(0, 7) == (thisyear - 1) + "-12" && n['t_sylyqkbyb512_kssj2'].slice(0, 7) == (thisyear - 1) + "-01") {
                        //     lastyear.push(data[i]);
                        // }

                        if (n['t_sylyqkbyb512_jssj3'].slice(0, 7) == thisyear1 + "-" + lastmon && n['t_sylyqkbyb512_kssj2'].slice(0, 7) == thisyear1 + "-" + lastmon) {
                            thisyearm.push(data[i]);
                        }
                        if (n['t_sylyqkbyb512_jssj3'].slice(0, 7) == thisyear1 + "-" + lastmon && n['t_sylyqkbyb512_kssj2'].slice(0, 7) == thisyear1 + "-01") {
                            thisyearms.push(data[i]);
                        }
                    });
                    $.each(lastyear, function (i, n) {
                        $.each(thisyearms, function (ii, nn) {
                            if (lastyear[i]['t_sylyqkbyb512_jzyq4'] == thisyearms[ii]['t_sylyqkbyb512_jzyq4']) {
                                lastyear[i]['jinniansc'] = thisyearms[ii]["t_sylyqkbyb512_dxscsl5"]

                                lastyear[i]['jinnianxjly'] = thisyearms[ii]["t_sylyqkbyb512_xjlyfdsl6"]

                                lastyear[i]['jinnianajly'] = thisyearms[ii]["t_sylyqkbyb512_ajlyjqdsl7"]

                                lastyear[i]['jinnianjdyk'] = thisyearms[ii]["t_sylyqkbyb512_jdyksrc8"]

                                lastyear[i]['jinnianlyzs'] = thisyearms[ii]["t_sylyqkbyb512_lyzsrwy9"]
                                lastyear[i]['benyuelyzs'] = thisyearms[ii]["t_sylyqkbyb512_dylyzsrwy10"]
                            }
                        });

                    });

                    $.each(lastyear, function (i, n) {
                        str += '<tr><td class="label-cell">' + lastyear[i]['t_sylyqkbyb512_jzyq4'] + '</td>' +
                            '<td class="numeric-cell">' + lastyear[i]['jinniansc'] + '</td>' +
                            '<td class="numeric-cell">' + lastyear[i]['jinnianxjly'] + '</td>' +
                            '<td class="numeric-cell">' + lastyear[i]['jinnianajly'] + '</td>' +
                            '<td class="numeric-cell">' + lastyear[i]['jinnianjdyk'] + '</td>' +
                            '<td class="numeric-cell">' + lastyear[i]['t_sylyqkbyb512_lyzsrwy9'] + '</td>' +
                            '<td class="numeric-cell">' + lastyear[i]['benyuelyzs'] + '</td>' +
                            '<td class="numeric-cell">' + lastyear[i]['jinnianlyzs'] + '</td></tr>'

                    });



                }


                if (moduleId == "77") {
                    $.each(data, function (i, n) {
                        if (n['t_sxfwyztqkbyb513_jssj3'].slice(0, 7) == thisyear1 + "-" + lastmon && n['t_sxfwyztqkbyb513_kssj2'].slice(0, 7) == thisyear1 + "-01") {

                            str += '<tr><td class="label-cell">' + n['t_sxfwyztqkbyb513_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_sxfwyztqkbyb513_qyzsh5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_sxfwyztqkbyb513_zsssrwy6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_sxfwyztqkbyb513_zssdwmjccypfm7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_sxfwyztqkbyb513_ztzs8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_sxfwyztqkbyb513_ldqyzcl9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_sxfwyztqkbyb513_rzl10'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_sxfwyztqkbyb513_sssryyysztg11'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_sxfwyztqkbyb513_sssrwysztg12'] + '</td></tr>'
                        }
                    });
                }


                if (moduleId == "78") {
                    $.each(data, function (i, n) {
                        //if (n['t_bsqkcqkbyb514_jssj3'].slice(0, 4) == thisyear1 + "-" + lastmon && n['t_bsqkcqkbyb514_kssj2'].slice(0, 7) == thisyear1 + "-01") {
                        if (n['t_bsqkcqkbyb514_jssj3'].slice(0, 4) == thisyear1) {
                            str += '<tr><td class="label-cell">' + n['t_bsqkcqkbyb514_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqkcqkbyb514_sqzjyxms5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqkcqkbyb514_sqlxs6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqkcqkbyb514_sqzjsjzjzcwy7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqkcqkbyb514_tryfqdrd8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqkcqkbyb514_sjkjxjrqys9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqkcqkbyb514_sckjsqzsjys10'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqkcqkbyb514_yszjgzz11'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqkcqkbyb514_zlsql12'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqkcqkbyb514_yffytrzgdpbz13'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqkcqkbyb514_sjcxdsrwqys14'] + '</td></tr>'
                        }
                    });
                }
                //1.5
                if (moduleId == "9") {

                    var lastyear = [];
                    var thisyearm = [];
                    var thisyearms = [];
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + jsziduan + '=' + search_condition['jsrq'] + '&' + 't_' + alias + '_shzt=已审核&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            //console.log(data);
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_yljjfzqkbyb515_jssj3'].slice(0, 7) == (thisyear - 1) + "-12" && n['t_yljjfzqkbyb515_kssj2'].slice(0, 7) == (thisyear - 1) + "-01") {
                                    lastyear.push((lastyedata[i]['t_yljjfzqkbyb515_kbylsc4']));
                                    lastyear.push((lastyedata[i]['t_yljjfzqkbyb515_kbylzc5']));
                                    lastyear.push((lastyedata[i]['t_yljjfzqkbyb515_crjykrc6']));
                                    lastyear.push((lastyedata[i]['t_yljjfzqkbyb515_crjykzc7']));
                                    lastyear.push((lastyedata[i]['t_yljjfzqkbyb515_mgykrc8']));
                                    lastyear.push((lastyedata[i]['t_yljjfzqkbyb515_fwgykrc9']));
                                    lastyear.push((lastyedata[i]['t_yljjfzqkbyb515_jwykrc10']));
                                    lastyear.push((lastyedata[i]['t_yljjfzqkbyb515_zcqysl11']));
                                    lastyear.push((lastyedata[i]['t_yljjfzqkbyb515_zcqyzc12']));
                                    lastyear.push((lastyedata[i]['t_yljjfzqkbyb515_ssnszeyy13']));
                                    lastyear.push((lastyedata[i]['t_yljjfzqkbyb515_cghzyy15']));
                                    lastyear.push((lastyedata[i]['t_yljjfzqkbyb515_zdqyyysrzlyy17']));
                                    lastyear.push((lastyedata[i]['t_yljjfzqkbyb515_zdqyyysrzc18']));
                                    lastyear.push((lastyedata[i]['t_yljjfzqkbyb515_zdqylrzezlyy19']));
                                    lastyear.push((lastyedata[i]['t_yljjfzqkbyb515_zdqylrzezc20']));
                                    lastyear.push((lastyedata[i]['t_yljjfzqkbyb515_zdqyjlrzlyy21']));
                                    lastyear.push((lastyedata[i]['t_yljjfzqkbyb515_zdqyjlrzc22']));
                                    lastyear.push((lastyedata[i]['t_yljjfzqkbyb515_zdqynsezlyy23']));
                                    lastyear.push((lastyedata[i]['t_yljjfzqkbyb515_zdqynsezc24']));
                                    lastyear.push((lastyedata[i]['t_yljjfzqkbyb515_sszc14']));
                                    lastyear.push((lastyedata[i]['t_yljjfzqkbyb515_cgzc16']));
                                }
                            });

                        }
                    })
                    $.each(data, function (i, n) {
                        var year = data[i]['t_yljjfzqkbyb515_jssj3'].slice(0, 4);
                        var mon1 = data[i]['t_yljjfzqkbyb515_kssj2'].slice(5, 7);
                        var mon2 = data[i]['t_yljjfzqkbyb515_jssj3'].slice(5, 7);

                        // if (n['t_yljjfzqkbyb515_jssj3'].slice(0, 7) == (thisyear - 1) + "-12" && n['t_yljjfzqkbyb515_kssj2'].slice(0, 7) == (thisyear - 1) + "-01") {
                        //     lastyear.push((data[i]['t_yljjfzqkbyb515_kbylsc4']));
                        //     lastyear.push((data[i]['t_yljjfzqkbyb515_kbylzc5']));
                        //     lastyear.push((data[i]['t_yljjfzqkbyb515_crjykrc6']));
                        //     lastyear.push((data[i]['t_yljjfzqkbyb515_crjykzc7']));
                        //     lastyear.push((data[i]['t_yljjfzqkbyb515_mgykrc8']));
                        //     lastyear.push((data[i]['t_yljjfzqkbyb515_fwgykrc9']));
                        //     lastyear.push((data[i]['t_yljjfzqkbyb515_jwykrc10']));
                        //     lastyear.push((data[i]['t_yljjfzqkbyb515_zcqysl11']));
                        //     lastyear.push((data[i]['t_yljjfzqkbyb515_zcqyzc12']));
                        //     lastyear.push((data[i]['t_yljjfzqkbyb515_ssnszeyy13']));
                        //     lastyear.push((data[i]['t_yljjfzqkbyb515_cghzyy15']));
                        //     lastyear.push((data[i]['t_yljjfzqkbyb515_zdqyyysrzlyy17']));
                        //     lastyear.push((data[i]['t_yljjfzqkbyb515_zdqyyysrzc18']));
                        //     lastyear.push((data[i]['t_yljjfzqkbyb515_zdqylrzezlyy19']));
                        //     lastyear.push((data[i]['t_yljjfzqkbyb515_zdqylrzezc20']));
                        //     lastyear.push((data[i]['t_yljjfzqkbyb515_zdqyjlrzlyy21']));
                        //     lastyear.push((data[i]['t_yljjfzqkbyb515_zdqyjlrzc22']));
                        //     lastyear.push((data[i]['t_yljjfzqkbyb515_zdqynsezlyy23']));
                        //     lastyear.push((data[i]['t_yljjfzqkbyb515_zdqynsezc24']));
                        //     lastyear.push((data[i]['t_yljjfzqkbyb515_sszc14']));
                        //     lastyear.push((data[i]['t_yljjfzqkbyb515_cgzc16']));
                        // }
                        if (n['t_yljjfzqkbyb515_jssj3'].slice(0, 7) == (thisyear1) + "-" + lastmon && n['t_yljjfzqkbyb515_kssj2'].slice(0, 7) == (thisyear1) + "-01") {


                            thisyearms.push((data[i]['t_yljjfzqkbyb515_kbylsc4']));
                            thisyearms.push((data[i]['t_yljjfzqkbyb515_kbylzc5']));
                            thisyearms.push((data[i]['t_yljjfzqkbyb515_crjykrc6']));
                            thisyearms.push((data[i]['t_yljjfzqkbyb515_crjykzc7']));
                            thisyearms.push((data[i]['t_yljjfzqkbyb515_mgykrc8']));
                            thisyearms.push((data[i]['t_yljjfzqkbyb515_fwgykrc9']));
                            thisyearms.push((data[i]['t_yljjfzqkbyb515_jwykrc10']));
                            thisyearms.push((data[i]['t_yljjfzqkbyb515_zcqysl11']));
                            thisyearms.push((data[i]['t_yljjfzqkbyb515_zcqyzc12']));
                            thisyearms.push((data[i]['t_yljjfzqkbyb515_ssnszeyy13']));
                            thisyearms.push((data[i]['t_yljjfzqkbyb515_cghzyy15']));
                            thisyearms.push((data[i]['t_yljjfzqkbyb515_zdqyyysrzlyy17']));
                            thisyearms.push((data[i]['t_yljjfzqkbyb515_zdqyyysrzc18']));
                            thisyearms.push((data[i]['t_yljjfzqkbyb515_zdqylrzezlyy19']));
                            thisyearms.push((data[i]['t_yljjfzqkbyb515_zdqylrzezc20']));
                            thisyearms.push((data[i]['t_yljjfzqkbyb515_zdqyjlrzlyy21']));
                            thisyearms.push((data[i]['t_yljjfzqkbyb515_zdqyjlrzc22']));
                            thisyearms.push((data[i]['t_yljjfzqkbyb515_zdqynsezlyy23']));
                            thisyearms.push((data[i]['t_yljjfzqkbyb515_zdqynsezc24']));
                            thisyearms.push((data[i]['t_yljjfzqkbyb515_sszc14']));
                            thisyearms.push((data[i]['t_yljjfzqkbyb515_cgzc16']));
                        }
                        if (n['t_yljjfzqkbyb515_jssj3'].slice(0, 7) == (thisyear1) + "-" + lastmon && n['t_yljjfzqkbyb515_kssj2'].slice(0, 7) == (thisyear1) + "-" + lastmon) {
                            thisyearm.push((data[i]['t_yljjfzqkbyb515_kbylsc4']));
                            thisyearm.push((data[i]['t_yljjfzqkbyb515_kbylzc5']));
                            thisyearm.push((data[i]['t_yljjfzqkbyb515_crjykrc6']));
                            thisyearm.push((data[i]['t_yljjfzqkbyb515_crjykzc7']));
                            thisyearm.push((data[i]['t_yljjfzqkbyb515_mgykrc8']));
                            thisyearm.push((data[i]['t_yljjfzqkbyb515_fwgykrc9']));
                            thisyearm.push((data[i]['t_yljjfzqkbyb515_jwykrc10']));
                            thisyearm.push((data[i]['t_yljjfzqkbyb515_zcqysl11']));
                            thisyearm.push((data[i]['t_yljjfzqkbyb515_zcqyzc12']));
                            thisyearm.push((data[i]['t_yljjfzqkbyb515_ssnszeyy13']));
                            thisyearm.push((data[i]['t_yljjfzqkbyb515_cghzyy15']));
                            thisyearm.push((data[i]['t_yljjfzqkbyb515_zdqyyysrzlyy17']));
                            thisyearm.push((data[i]['t_yljjfzqkbyb515_zdqyyysrzc18']));
                            thisyearm.push((data[i]['t_yljjfzqkbyb515_zdqylrzezlyy19']));
                            thisyearm.push((data[i]['t_yljjfzqkbyb515_zdqylrzezc20']));
                            thisyearm.push((data[i]['t_yljjfzqkbyb515_zdqyjlrzlyy21']));
                            thisyearm.push((data[i]['t_yljjfzqkbyb515_zdqyjlrzc22']));
                            thisyearm.push((data[i]['t_yljjfzqkbyb515_zdqynsezlyy23']));
                            thisyearm.push((data[i]['t_yljjfzqkbyb515_zdqynsezc24']));
                            thisyearm.push((data[i]['t_yljjfzqkbyb515_sszc14']));
                            thisyearm.push((data[i]['t_yljjfzqkbyb515_cgzc16']));

                        }


                    });

                    str += '<tr><td class="label-cell" rowspan="7">港口运营</td>' +
                        '<td class="numeric-cell" rowspan="2">靠泊游轮</td>' +
                        '<td class="numeric-cell">艘次</td>' +
                        '<td class="numeric-cell">' + lastyear[0] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[0] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[0] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">增长</td>' +
                        '<td class="numeric-cell">' + lastyear[1] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[1] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[1] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell" rowspan="2">出入境游客</td>' +
                        '<td class="numeric-cell">人次</td>' +
                        '<td class="numeric-cell">' + lastyear[2] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[2] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[2] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">增长</td>' +
                        '<td class="numeric-cell">' + lastyear[3] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[3] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[3] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">母港游客</td>' +
                        '<td class="numeric-cell">人次</td>' +
                        '<td class="numeric-cell">' + lastyear[4] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[4] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[4] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">访问港游客</td>' +
                        '<td class="numeric-cell">人次</td>' +
                        '<td class="numeric-cell">' + lastyear[5] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[5] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[5] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">境外游客</td>' +
                        '<td class="numeric-cell">人次</td>' +
                        '<td class="numeric-cell">' + lastyear[6] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[6] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[6] + '</td>' +
                        '</tr>' +
                        '<tr><td class="label-cell" rowspan="6">产业延伸</td>' +
                        '<td class="numeric-cell" rowspan="2">注册企业</td>' +
                        '<td class="numeric-cell">数量</td>' +
                        '<td class="numeric-cell">' + lastyear[7] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[7] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[7] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">增长</td>' +
                        '<td class="numeric-cell">' + lastyear[8] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[8] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[8] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell" rowspan="2">税收</td>' +
                        '<td class="numeric-cell">纳税总额</td>' +
                        '<td class="numeric-cell">' + lastyear[9] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[9] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[9] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">增长</td>' +
                        '<td class="numeric-cell">' + lastyear[19] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[19] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[19] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell" rowspan="2">船供</td>' +
                        '<td class="numeric-cell">货值</td>' +
                        '<td class="numeric-cell">' + lastyear[10] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[10] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[10] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">增长</td>' +
                        '<td class="numeric-cell">' + lastyear[20] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[20] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[20] + '</td>' +
                        '</tr>' +
                        '<tr><td class="label-cell" rowspan="8">重点企业</td>' +
                        '<td class="numeric-cell" rowspan="2">营业收入</td>' +
                        '<td class="numeric-cell">总量</td>' +
                        '<td class="numeric-cell">' + lastyear[11] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[11] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[11] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">增长</td>' +
                        '<td class="numeric-cell">' + lastyear[12] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[12] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[12] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell" rowspan="2">利润总额</td>' +
                        '<td class="numeric-cell">总量</td>' +
                        '<td class="numeric-cell">' + lastyear[13] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[13] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[13] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">增长</td>' +
                        '<td class="numeric-cell">' + lastyear[14] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[14] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[14] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell" rowspan="2">净利润</td>' +
                        '<td class="numeric-cell">总量</td>' +
                        '<td class="numeric-cell">' + lastyear[15] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[15] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[15] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">增长</td>' +
                        '<td class="numeric-cell">' + lastyear[16] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[16] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[16] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell" rowspan="2">纳税额</td>' +
                        '<td class="numeric-cell">总量</td>' +
                        '<td class="numeric-cell">' + lastyear[17] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[17] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[17] + '</td>' +
                        '</tr>' +
                        '<tr><td class="numeric-cell">增长</td>' +
                        '<td class="numeric-cell">' + lastyear[18] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[18] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[18] + '</td>' +
                        '</tr>'
                }
                //1.6
                if (moduleId == "79") {
                    // console.log("data的长度"+len);
                    var qita1 = "",
                        qita2 = "",
                        qita3 = "";
                    $.each(data, function (i, n) {
                        if (n['t_gzjgqkbnb516_kssj2'] == (thisyear - 1)) {
                            if (n['t_gzjgqkbnb516_lb4'] == "其他(直管)") {
                                qita1 = '<tr><td class="label-cell">' + n['t_gzjgqkbnb516_lb4'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_qys5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_zczeyy6'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_jzcyy7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_jlryy8'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_lrzeyy9'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_gyyd10'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_cf11'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_zg12'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_bz13'] + '</td></tr>'
                            }
                            if (n['t_gzjgqkbnb516_lb4'] == "其他(区属)") {
                                qita2 = '<tr><td class="label-cell">' + n['t_gzjgqkbnb516_lb4'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_qys5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_zczeyy6'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_jzcyy7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_jlryy8'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_lrzeyy9'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_gyyd10'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_cf11'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_zg12'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_bz13'] + '</td></tr>'
                            }
                            if (n['t_gzjgqkbnb516_lb4'] == "其他(委托监管)") {
                                qita3 = '<tr><td class="label-cell">' + n['t_gzjgqkbnb516_lb4'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_qys5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_zczeyy6'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_jzcyy7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_jlryy8'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_lrzeyy9'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_gyyd10'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_cf11'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_zg12'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_bz13'] + '</td></tr>'
                            }
                        }
                    })
                    $.each(data, function (i, n) {
                        if (n['t_gzjgqkbnb516_lb4'].indexOf("其他") == -1) {
                            str += '<tr><td class="label-cell">' + n['t_gzjgqkbnb516_lb4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gzjgqkbnb516_qys5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gzjgqkbnb516_zczeyy6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gzjgqkbnb516_jzcyy7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gzjgqkbnb516_jlryy8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gzjgqkbnb516_lrzeyy9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gzjgqkbnb516_gyyd10'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gzjgqkbnb516_cf11'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gzjgqkbnb516_zg12'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_gzjgqkbnb516_bz13'] + '</td></tr>'
                        }
                        if (i == 1) {
                            str += '<tr><td class="label-cell">总计</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[0]['t_gzjgqkbnb516_qys5']) + parseFloat(data[1]['t_gzjgqkbnb516_qys5'])) + '</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[0]['t_gzjgqkbnb516_zczeyy6']) + parseFloat(data[1]['t_gzjgqkbnb516_zczeyy6'])) + '</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[0]['t_gzjgqkbnb516_jzcyy7']) + parseFloat(data[1]['t_gzjgqkbnb516_jzcyy7'])) + '</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[0]['t_gzjgqkbnb516_jlryy8']) + parseFloat(data[1]['t_gzjgqkbnb516_jlryy8'])) + '</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[0]['t_gzjgqkbnb516_lrzeyy9']) + parseFloat(data[1]['t_gzjgqkbnb516_lrzeyy9'])) + '</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[0]['t_gzjgqkbnb516_gyyd10']) + parseFloat(data[1]['t_gzjgqkbnb516_gyyd10'])) + '</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[0]['t_gzjgqkbnb516_cf11']) + parseFloat(data[1]['t_gzjgqkbnb516_cf11'])) + '</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[0]['t_gzjgqkbnb516_zg12']) + parseFloat(data[1]['t_gzjgqkbnb516_zg12'])) + '</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[0]['t_gzjgqkbnb516_bz13']) + parseFloat(data[1]['t_gzjgqkbnb516_bz13'])) + '</td></tr>'
                            str += qita2
                        }
                        if (i == 4) {
                            str += '<tr><td class="label-cell">总计</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[3]['t_gzjgqkbnb516_qys5']) + parseFloat(data[4]['t_gzjgqkbnb516_qys5'])) + '</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[3]['t_gzjgqkbnb516_zczeyy6']) + parseFloat(data[4]['t_gzjgqkbnb516_zczeyy6'])) + '</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[3]['t_gzjgqkbnb516_jzcyy7']) + parseFloat(data[4]['t_gzjgqkbnb516_jzcyy7'])) + '</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[3]['t_gzjgqkbnb516_jlryy8']) + parseFloat(data[4]['t_gzjgqkbnb516_jlryy8'])) + '</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[3]['t_gzjgqkbnb516_lrzeyy9']) + parseFloat(data[4]['t_gzjgqkbnb516_lrzeyy9'])) + '</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[3]['t_gzjgqkbnb516_gyyd10']) + parseFloat(data[4]['t_gzjgqkbnb516_gyyd10'])) + '</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[3]['t_gzjgqkbnb516_cf11']) + parseFloat(data[4]['t_gzjgqkbnb516_cf11'])) + '</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[3]['t_gzjgqkbnb516_zg12']) + parseFloat(data[4]['t_gzjgqkbnb516_zg12'])) + '</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[3]['t_gzjgqkbnb516_bz13']) + parseFloat(data[4]['t_gzjgqkbnb516_bz13'])) + '</td></tr>'
                            str += qita1
                        }
                        if (i == 8) {
                            str += '<tr><td class="label-cell">总计</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[5]['t_gzjgqkbnb516_qys5']) + parseFloat(data[6]['t_gzjgqkbnb516_qys5'])) + '</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[5]['t_gzjgqkbnb516_zczeyy6']) + parseFloat(data[6]['t_gzjgqkbnb516_zczeyy6'])) + '</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[5]['t_gzjgqkbnb516_jzcyy7']) + parseFloat(data[6]['t_gzjgqkbnb516_jzcyy7'])) + '</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[5]['t_gzjgqkbnb516_jlryy8']) + parseFloat(data[6]['t_gzjgqkbnb516_jlryy8'])) + '</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[5]['t_gzjgqkbnb516_lrzeyy9']) + parseFloat(data[6]['t_gzjgqkbnb516_lrzeyy9'])) + '</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[5]['t_gzjgqkbnb516_gyyd10']) + parseFloat(data[6]['t_gzjgqkbnb516_gyyd10'])) + '</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[5]['t_gzjgqkbnb516_cf11']) + parseFloat(data[6]['t_gzjgqkbnb516_cf11'])) + '</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[5]['t_gzjgqkbnb516_zg12']) + parseFloat(data[6]['t_gzjgqkbnb516_zg12'])) + '</td>' +
                                '<td class="numeric-cell">' + (parseFloat(data[5]['t_gzjgqkbnb516_bz13']) + parseFloat(data[6]['t_gzjgqkbnb516_bz13'])) + '</td></tr>'
                            str += qita3
                        }
                    });

                }
                //2.1
                if (moduleId == "81") {

                    $.each(data, function (i, n) {
                        if (data[i]['t_bsqhdqknd605_nd2'] == (thisyear - 1)) {
                            str += '<tr>' +
                                '<td class="label-cell" rowspan="5"  style=" position:inherit;"><div style="width:60px;position:inherit; ">河湖情况</div></td>' +
                                '<td class="numeric-cell" rowspan="5"><div style="width:60px">河湖</div></td>' +
                                '<td class="numeric-cell"><div style="width:60px">条数</div></td>' +
                                '<td class="numeric-cell"><div style="width:60px">公里数</div></td>' +
                                '<td class="numeric-cell"><div style="width:60px">主要类别</div></td>' +
                                '<td class="numeric-cell"><div style="width:30px">条数</div></td>' +
                                '<td class="numeric-cell"><div style="width:60px">公里数</div></td>' +
                                '<td class="numeric-cell" rowspan="5"><div style="width:60px">其他河湖</div></td>' +
                                '<td class="numeric-cell"><div style="width:30px">条数</div></td>' +
                                '<td class="numeric-cell"><div style="width:60px">公里数</div></td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell" rowspan="4" style=" position:inherit;">' + data[i]['t_bsqhdqknd605_hhts3'] + '</td>' +
                                '<td class="numeric-cell" rowspan="4">' + data[i]['t_bsqhdqknd605_hhgls4'] + '</td>' +
                                '<td class="numeric-cell">市管</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqhdqknd605_sgts5'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqhdqknd605_sggls6'] + '</td>' +
                                '<td class="numeric-cell" rowspan="4">' + data[i]['t_bsqhdqknd605_qthhts12'] + '</td>' +
                                '<td class="numeric-cell" rowspan="4">' + data[i]['t_bsqhdqknd605_qthhgls13'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell" style=" position:inherit;">区管</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqhdqknd605_qgts20'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqhdqknd605_qggls7'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell" style=" position:inherit;">镇管</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqhdqknd605_zgts8'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqhdqknd605_zggls9'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell" style=" position:inherit;">村管</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqhdqknd605_cgts10'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqhdqknd605_cggls11'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell" rowspan="2" style=" position:inherit;">整治情况</td>' +
                                '<td class="numeric-cell">整治目标</td>' +
                                '<td class="numeric-cell">整治情况</td>' +
                                '<td class="numeric-cell">疏浚目标</td>' +
                                '<td class="numeric-cell">疏浚情况</td>' +
                                '<td class="numeric-cell" colspan="2">新增水域面积</td>' +
                                '<td class="numeric-cell" colspan="3">水质达标情况</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell" style=" position:inherit;">' + data[i]['t_bsqhdqknd605_zzmb14'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqhdqknd605_zzqk15'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqhdqknd605_sjmb16'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqhdqknd605_sjqk17'] + '</td>' +
                                '<td class="numeric-cell" colspan="2">' + data[i]['t_bsqhdqknd605_xzsymj18'] + '</td>' +
                                '<td class="numeric-cell" colspan="3">' + data[i]['t_bsqhdqknd605_szdbqk19'] + '</td>' +
                                '</tr>'

                        }


                    });

                }
                //2.2
                if (moduleId == "82") {
                    //console.log("data的长度"+len);
                    $.each(data, function (i, n) {
                        if ((n['t_bsqejgwjsqkyd597_kssj2'].slice(0, 7) == thisyear1 + "-01") && (n['t_bsqejgwjsqkyd597_jssj3'].slice(0, 7) == thisyear1 + "-" + lastmon)) {
                            str += '<tr>' +
                                '<td class="label-cell" rowspan="2">区级</td>' +
                                '<td class="numeric-cell">区水务局</td>' +
                                '<td class="numeric-cell">' + n['t_bsqejgwjsqkyd597_qswjyjcdkm4'] + '</td></tr>' +
                                '<tr><td class="numeric-cell">区建交委</td>' +
                                '<td class="numeric-cell">' + n['t_bsqejgwjsqkyd597_qjjwyjcdkm5'] + '</td></tr>' +
                                '<tr><td class="numeric-cell" colspan="2">街镇园区</td>' +
                                '<td class="numeric-cell">' + n['t_bsqejgwjsqkyd597_jzyqyjcdkm6'] + '</td></tr>' +
                                '<tr><td class="numeric-cell" colspan="2">合计</td>' +
                                '<td class="numeric-cell">' + n['t_bsqejgwjsqkyd597_hjyjcdkm7'] + '</td></tr>'
                        }
                    });
                    if (str == "") {
                        str += '<tr>' +
                            '<td class="label-cell" rowspan="2">区级</td>' +
                            '<td class="numeric-cell">区水务局</td>' +
                            '<td class="numeric-cell"></td></tr>' +
                            '<tr><td class="numeric-cell">区建交委</td>' +
                            '<td class="numeric-cell"></td></tr>' +
                            '<tr><td class="numeric-cell" colspan="2">街镇园区</td>' +
                            '<td class="numeric-cell"></td></tr>' +
                            '<tr><td class="numeric-cell" colspan="2">合计</td>' +
                            '<td class="numeric-cell"></td></tr>'
                    }
                }
                //2.3
                if (moduleId == "83") {
                    $.each(data, function (i, n) {
                        if ((n['t_bsqpsxtjsqkyd598_kssj2'].slice(0, 7) == thisyear1 + "-01") && (n['t_bsqpsxtjsqkyd598_jssj3'].slice(0, 7) == thisyear1 + "-" + lastmon)) {
                            str += '<tr>' +
                                '<td class="label-cell" rowspan="2">已建情况</td>' +
                                '<td class="numeric-cell">数量</td>' +
                                '<td class="numeric-cell">外环内</td>' +
                                '<td class="numeric-cell">外环外</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">' + n['t_bsqpsxtjsqkyd598_yjqksl4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqpsxtjsqkyd598_yjqkwhn5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqpsxtjsqkyd598_yjqkwhw6'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell" rowspan="2">在建情况</td>' +
                                '<td class="numeric-cell">5+1排水系统进度</td>' +
                                '<td class="numeric-cell" colspan="2">2018年军工路、杨盛东、月浦城区3个排水系统进度</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">' + n['t_bsqpsxtjsqkyd598_psxtjd14'] + '</td>' +
                                '<td class="numeric-cell" colspan="2">' + n['t_bsqpsxtjsqkyd598_jglysdypcqjd15'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell" rowspan="4">未建（缺口）情况</td>' +
                                '<td class="numeric-cell" rowspan="2">外环内</td>' +
                                '<td class="numeric-cell" >数量</td>' +
                                '<td class="numeric-cell">分布区域</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">' + n['t_bsqpsxtjsqkyd598_whnwjqkqksl10'] + '</td>' +
                                '<td class="numeric-cell" colspan="2">' + n['t_bsqpsxtjsqkyd598_whnwjqkqkfbqy11'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell" rowspan="2">外环外</td>' +
                                '<td class="numeric-cell" >数量</td>' +
                                '<td class="numeric-cell">分布区域</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">' + n['t_bsqpsxtjsqkyd598_whwwjqkqksl12'] + '</td>' +
                                '<td class="numeric-cell" colspan="2">' + n['t_bsqpsxtjsqkyd598_whwwjqkqkfbqy13'] + '</td>' +
                                '</tr>'
                        }
                    });
                    if (str == "") {
                        str += '<tr>' +
                            '<td class="label-cell" rowspan="2">已建情况</td>' +
                            '<td class="numeric-cell">数量</td>' +
                            '<td class="numeric-cell">外环内</td>' +
                            '<td class="numeric-cell">外环外</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td class="numeric-cell"></td>' +
                            '<td class="numeric-cell"></td>' +
                            '<td class="numeric-cell"></td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td class="label-cell" rowspan="2">在建情况</td>' +
                            '<td class="numeric-cell">5+1排水系统进度</td>' +
                            '<td class="numeric-cell" colspan="2">2018年军工路、杨盛东、月浦城区3个排水系统进度</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td class="numeric-cell"></td>' +
                            '<td class="numeric-cell" colspan="2"></td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td class="label-cell" rowspan="4">未建（缺口）情况</td>' +
                            '<td class="numeric-cell" rowspan="2">外环内</td>' +
                            '<td class="numeric-cell" >数量</td>' +
                            '<td class="numeric-cell">分布区域</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td class="numeric-cell"></td>' +
                            '<td class="numeric-cell" colspan="2"></td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td class="numeric-cell" rowspan="2">外环外</td>' +
                            '<td class="numeric-cell" >数量</td>' +
                            '<td class="numeric-cell">分布区域</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td class="numeric-cell"></td>' +
                            '<td class="numeric-cell" colspan="2"></td>' +
                            '</tr>'
                    }
                }
                //2.4
                if (moduleId == "84") {
                    var lastarr = {},
                        thismons = {};
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + jsziduan + '=' + search_condition['jsrq'] + '&' + 't_' + alias + '_shzt=已审核&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            //console.log(data);
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_bsqhbqkyd599_kssj2'].slice(0, 7) == (thisyear - 1) + "-01" && n['t_bsqhbqkyd599_jssj3'].slice(0, 7) == (thisyear - 1) + "-12") {
                                    lastarr = n;
                                }
                            });

                        }
                    })
                    $.each(data, function (i, n) {
                        // if (n['t_bsqhbqkyd599_kssj2'].slice(0, 7) == (thisyear - 1) + "-01" && n['t_bsqhbqkyd599_jssj3'].slice(0, 7) == (thisyear - 1) + "-12") {
                        //     lastarr = n;
                        // }
                        if (n['t_bsqhbqkyd599_kssj2'].slice(0, 7) == thisyear1 + "-01" && n['t_bsqhbqkyd599_jssj3'].slice(0, 7) == thisyear1 + "-" + lastmon) {
                            thismons = n;
                        }
                    });
                    str += '<tr>' +
                        '<td class="label-cell">空气质量指数(AQI)优良率(%)</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqhbqkyd599_kqzlyllaqi4'] + '</td>' +
                        '<td class="numeric-cell">' + thismons['t_bsqhbqkyd599_kqzlyllaqi4'] + '</td>' +
                        '<td class="numeric-cell">' + thismons['t_bsqhbqkyd599_aqitb7'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">PM2.5浓度(微克/立方米)</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqhbqkyd599_pmnd5'] + '</td>' +
                        '<td class="numeric-cell">' + thismons['t_bsqhbqkyd599_pmnd5'] + '</td>' +
                        '<td class="numeric-cell">' + thismons['t_bsqhbqkyd599_tb6'] + '</td>' +
                        '</tr>'
                }

                //2.5
                if (moduleId == "85") {
                    var last = [],
                        thismonth = [],
                        lastyearmonth = [];

                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-01-01";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' +  search_condition['kszd'] + '=' + search_condition['jsrq'] + '&' + 't_' + alias + '_shzt=已审核&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            //console.log(data);
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_bsqkhdmjcqkyb600_jssj3'].slice(0, 7) == (thisyear - 1) + "-12" && n['t_bsqkhdmjcqkyb600_kssj2'].slice(0, 7) == (thisyear - 1) + "-01") {
                                    last.push(lastyedata[i]);
                                }
                            });

                        }
                    })

                    $.each(data, function (i, n) {
                        if (n['t_bsqkhdmjcqkyb600_jssj3'].slice(0, 7) == thisyear1 + "-" + lastmon && n['t_bsqkhdmjcqkyb600_kssj2'].slice(0, 7) == thisyear1 + "-01") {
                            thismonth.push(data[i]);
                        }
                    });
                    $.each(last, function (i, n) {
                        $.each(thismonth, function (ii, nn) {
                            if (last[i]['t_bsqkhdmjcqkyb600_jcdmc4'] == thismonth[ii]['t_bsqkhdmjcqkyb600_jcdmc4']) {
                                last[i]['jinnianshuizhi'] = thismonth[ii]["t_bsqkhdmjcqkyb600_szlb6"]
                                last[i]['qunianshuzhi'] = thismonth[ii]["t_bsqkhdmjcqkyb600_qntq"]
                            }

                        });
                        // $.each(lastyearmonth, function (ii, nn) {
                        //     if (lastyearmonth[i]['t_bsqkhdmjcqkyb600_jcdmc4'] == lastyearmonth[ii]['t_bsqkhdmjcqkyb600_jcdmc4']) {
                        //         last[i]['qunianshuzhi'] = lastyearmonth[ii]["t_bsqkhdmjcqkyb600_szlb6"]
                        //     }
                        // });
                    });
                    $.each(last, function (i, n) {
                        str += '<tr>' +
                            '<td class="label-cell">' + n['t_bsqkhdmjcqkyb600_jcdmc4'] + '</td>' +
                            '<td class="numeric-cell">' + n['t_bsqkhdmjcqkyb600_ssjz5'] + '</td>' +
                            '<td class="numeric-cell">' + n['t_bsqkhdmjcqkyb600_szlb6'] + '</td>' +
                            '<td class="numeric-cell">' + n['qunianshuzhi'] + '</td>' +
                            '<td class="label-cell">' + n['jinnianshuizhi'] + '</td>' +
                            '</tr>'

                    });

                }
                //2.6
                if (moduleId == "86") {
                    $.each(data, function (i, n) {
                        if (n['t_bsqlhjbjsqknb601_nd2'] == (thisyear - 1)) {
                            str += '<tr>' +
                                '<td class="label-cell" rowspan="5">主要指标</td>' +
                                '<td class="numeric-cell" rowspan="2">绿地面积</td>' +
                                '<td class="numeric-cell">已建面积</td>' +
                                '<td class="numeric-cell">' + (thisyear - 1) + '年新建面积</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">' + n['t_bsqlhjbjsqknb601_yjmjgq3'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqlhjbjsqknb601_xjmjgq4'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">人均绿地面积</td>' +
                                '<td class="numeric-cell" colspan="2">' + n['t_bsqlhjbjsqknb601_rjldmjpfmr5'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">森林覆盖率</td>' +
                                '<td class="numeric-cell" colspan="2">' + n['t_bsqlhjbjsqknb601_slfgl6'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">门类</td>' +
                                '<td class="numeric-cell" colspan="2">' + n['t_bsqlhjbjsqknb601_ml7'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td rowspan="5">5个100建设情况</td>' +
                                '<td class="numeric-cell">100座公园绿地</td>' +
                                '<td class="numeric-cell" colspan="2">' + n['t_bsqlhjbjsqknb601_zgyldz8'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">100条区级林荫大道</td>' +
                                '<td class="numeric-cell" colspan="2">' + n['t_bsqlhjbjsqknb601_tqjlyddt9'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">100个市民街心花园</td>' +
                                '<td class="numeric-cell" colspan="2">' + n['t_bsqlhjbjsqknb601_gsmjxhyg10'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">100公里城市绿色步道</td>' +
                                '<td class="numeric-cell" colspan="2">' + n['t_bsqlhjbjsqknb601_glcslsbdgl11'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">100棵古树名木</td>' +
                                '<td class="numeric-cell" colspan="2">' + n['t_bsqlhjbjsqknb601_kgsmsk12'] + '</td>' +
                                '</tr>'
                        }
                    })
                }
                //2.7
                if (moduleId == "87") {
                    var lastarr = {},
                        thismonth = {},
                        thismonthes = {};
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + jsziduan + '=' + search_condition['jsrq'] + '&' + 't_' + alias + '_shzt=已审核&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            //console.log(data);
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_bsqsngzqkyb604_jssj3'] == (thisyear - 1) + "-12-31" && n['t_bsqsngzqkyb604_kssj2'] == (thisyear - 1) + "-01-01") {
                                    lastarr = n
                                }
                            });

                        }
                    })
                    $.each(data, function (i, n) {
                        // if (n['t_bsqsngzqkyb604_jssj3'] == (thisyear - 1) + "-12-31" && n['t_bsqsngzqkyb604_kssj2'] == (thisyear - 1) + "-01-01") {
                        //     lastarr = n
                        // }
                        if (n['t_bsqsngzqkyb604_jssj3'].slice(0, 7) == thisyear1 + "-" + lastmon && n['t_bsqsngzqkyb604_kssj2'].slice(0, 7) == thisyear1 + "-" + lastmon) {
                            thismonth = n
                        }
                        if (n['t_bsqsngzqkyb604_jssj3'].slice(0, 7) == thisyear1 + "-" + lastmon && n['t_bsqsngzqkyb604_kssj2'].slice(0, 7) == thisyear1 + "-01") {
                            thismonth = n
                        }
                    });
                    str += '<tr>' +
                        '<td class="label-cell" rowspan="10">1</td>' +
                        '<td class="numeric-cell" rowspan="13">基础数据</td>' +
                        '<td class="numeric-cell" colspan="2">行政村数总数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_xzcszs4'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_xzcszs4'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_xzcszs4'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell"><div style="width:30px">1.1</div></td>' +
                        '<td class="numeric-cell">杨行镇</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_xzcsyxz5'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_xzcsyxz5'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_xzcsyxz5'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">1.2</td>' +
                        '<td class="numeric-cell">月浦镇</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_xzcsypz6'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_xzcsypz6'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_xzcsypz6'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">1.3</td>' +
                        '<td class="numeric-cell">罗店镇</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_xzcsldz7'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_xzcsldz7'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_xzcsldz7'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">1.4</td>' +
                        '<td class="numeric-cell">罗泾镇</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_xzcslz8'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_xzcslz8'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_xzcslz8'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">1.5</td>' +
                        '<td class="numeric-cell">顾村镇</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_xzcsgcz9'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_xzcsgcz9'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_xzcsgcz9'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">1.6</td>' +
                        '<td class="numeric-cell">大场镇</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_xzcsdcz10'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_xzcsdcz10'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_xzcsdcz10'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">1.7</td>' +
                        '<td class="numeric-cell">庙行镇</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_xzcsmxz11'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_xzcsmxz11'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_xzcsmxz11'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">1.8</td>' +
                        '<td class="numeric-cell">友谊路街道</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_xzcsyyljd12'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_xzcsyyljd12'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_xzcsyyljd12'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">1.9</td>' +
                        '<td class="numeric-cell">城市工业园区</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_xzcscsgyyq13'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_xzcscsgyyq13'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_xzcscsgyyq13'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">2</td>' +
                        '<td class="numeric-cell" colspan="2">市级美丽乡村示范村创建成功数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_sjmlxcsfccjcgs14'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_sjmlxcsfccjcgs14'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_sjmlxcsfccjcgs14'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3</td>' +
                        '<td class="numeric-cell" colspan="2">无实际耕作土地行政村数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_wsjgztdxzcs15'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_wsjgztdxzcs15'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_wsjgztdxzcs15'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">4</td>' +
                        '<td class="numeric-cell" colspan="2">农业户籍人口</td>' +
                        '<td class="numeric-cell">万人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_nyhjrk16'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_nyhjrk16'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_nyhjrk16'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="6">5</td>' +
                        '<td class="numeric-cell" rowspan="6">农业可耕地面积</td>' +
                        '<td class="numeric-cell" colspan="2">全区总面积</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_nykgdzmj17'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_nykgdzmj17'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_nykgdzmj17'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">5.1</td>' +
                        '<td class="numeric-cell">杨行镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_nykgdmjyxz18'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_nykgdmjyxz18'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_nykgdmjyxz18'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">5.2</td>' +
                        '<td class="numeric-cell">月浦镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_nykgdmjypz19'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_nykgdmjypz19'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_nykgdmjypz19'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">5.3</td>' +
                        '<td class="numeric-cell">罗店镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_nykgdmjldz20'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_nykgdmjldz20'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_nykgdmjldz20'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">5.4</td>' +
                        '<td class="numeric-cell">罗泾镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_nykgdmjlz21'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_nykgdmjlz21'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_nykgdmjlz21'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">5.5</td>' +
                        '<td class="numeric-cell">顾村镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_nykgdmjgcz22'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_nykgdmjgcz22'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_nykgdmjgcz22'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="6">6</td>' +
                        '<td class="numeric-cell" rowspan="6">粮食功能区</td>' +
                        '<td class="numeric-cell" colspan="2">全区总面积</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_lsgnqzmj23'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_lsgnqzmj23'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_lsgnqzmj23'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">6.1</td>' +
                        '<td class="numeric-cell">杨行镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_lsgnqyxz24'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_lsgnqyxz24'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_lsgnqyxz24'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">6.2</td>' +
                        '<td class="numeric-cell">月浦镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_lsgnqypz25'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_lsgnqypz25'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_lsgnqypz25'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">6.3</td>' +
                        '<td class="numeric-cell">罗店镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_lsgnqldz26'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_lsgnqldz26'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_lsgnqldz26'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">6.4</td>' +
                        '<td class="numeric-cell">罗泾镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_lsgnqlz27'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_lsgnqlz27'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_lsgnqlz27'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">6.5</td>' +
                        '<td class="numeric-cell">顾村镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_lsgnqgcz28'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_lsgnqgcz28'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_lsgnqgcz28'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="6">7</td>' +
                        '<td class="numeric-cell" rowspan="6">蔬菜保护区</td>' +
                        '<td class="numeric-cell" colspan="2">全区总面积</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_scbhqzmj29'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_scbhqzmj29'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_scbhqzmj29'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">7.1</td>' +
                        '<td class="numeric-cell">杨行镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_scbhqyxz30'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_scbhqyxz30'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_scbhqyxz30'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">7.2</td>' +
                        '<td class="numeric-cell">月浦镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_scbhqypz31'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_scbhqypz31'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_scbhqypz31'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">7.3</td>' +
                        '<td class="numeric-cell">罗店镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_scbhqldz32'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_scbhqldz32'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_scbhqldz32'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">7.4</td>' +
                        '<td class="numeric-cell">罗泾镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_scbhqlz33'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_scbhqlz33'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_scbhqlz33'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">7.5</td>' +
                        '<td class="numeric-cell">顾村镇</td>' +
                        '<td class="numeric-cell">亩</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_scbhqgcz34'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_scbhqgcz34'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_scbhqgcz34'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">8</td>' +
                        '<td class="numeric-cell" rowspan="8">农村经济</td>' +
                        '<td class="numeric-cell" colspan="2">农村承包地确权完成数/总数</td>' +
                        '<td class="numeric-cell">个/个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_nccbdqqwcszs35'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_nccbdqqwcszs35'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_nccbdqqwcszs35'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">9</td>' +
                        '<td class="numeric-cell" colspan="2">镇、村、队三级集体经济组织总资产</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_zcdsjjtjjzzzzc36'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_zcdsjjtjjzzzzc36'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_zcdsjjtjjzzzzc36'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">10</td>' +
                        '<td class="numeric-cell" colspan="2">镇级产权制度改革完成数/总数</td>' +
                        '<td class="numeric-cell">个/个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_zjcqzdggwcszs37'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_zjcqzdggwcszs37'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_zjcqzdggwcszs37'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">11</td>' +
                        '<td class="numeric-cell" colspan="2">村级产权制度改革完成数/总数</td>' +
                        '<td class="numeric-cell">个/个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_cjcqzdggwcszs38'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_cjcqzdggwcszs38'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_cjcqzdggwcszs38'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">12</td>' +
                        '<td class="numeric-cell" colspan="2">村分账管理工作/总数</td>' +
                        '<td class="numeric-cell">个/个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_cfzglgzzs39'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_cfzglgzzs39'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_cfzglgzzs39'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">13</td>' +
                        '<td class="numeric-cell" colspan="2">农村的农业户籍数</td>' +
                        '<td class="numeric-cell">户</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_ncdnyhjs40'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_ncdnyhjs40'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_ncdnyhjs40'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">14</td>' +
                        '<td class="numeric-cell" colspan="2">农村居民家庭人均可支配收入</td>' +
                        '<td class="numeric-cell">万元</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_ncjmjtrjkzpsr41'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_ncjmjtrjkzpsr41'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_ncjmjtrjkzpsr41'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">15</td>' +
                        '<td class="numeric-cell" colspan="2">农民人均纯收入</td>' +
                        '<td class="numeric-cell">万元</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsngzqkyb604_nmrjcsr42'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsngzqkyb604_nmrjcsr42'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsngzqkyb604_nmrjcsr42'] + '</td>' +
                        '</tr>'

                }

                //3.1
                if (moduleId == "19") {
                    // console.log(thisyear - 1)
                    $.each(data, function (i, n) {
                        if (n['t_bsqtdjbqknb606_nd2'] == (thisyear - 1)) {
                            str += '<tr>' +
                                '<td class="label-cell" rowspan="3">建设用地</td>' +
                                '<td class="numeric-cell">城镇村及工矿用地</td>' +
                                '<td class="numeric-cell">' + n['t_bsqtdjbqknb606_czcjgkyd3'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">交通运输用地</td>' +
                                '<td class="numeric-cell">' + n['t_bsqtdjbqknb606_jtysyd4'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">水利设施用地</td>' +
                                '<td class="numeric-cell">' + n['t_bsqtdjbqknb606_slssyd5'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell" rowspan="3">农用地</td>' +
                                '<td class="numeric-cell">耕地</td>' +
                                '<td class="numeric-cell">' + n['t_bsqtdjbqknb606_gd6'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">林地</td>' +
                                '<td class="numeric-cell">' + n['t_bsqtdjbqknb606_ld7'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">其他农用地</td>' +
                                '<td class="numeric-cell">' + n['t_bsqtdjbqknb606_qtnyd8'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">未利用土地</td>' +
                                '<td class="numeric-cell" colspan="2">' + n['t_bsqtdjbqknb606_wlytd9'] + '</td>' +
                                '</tr>'
                        }
                    });

                }
                //3.2
                if (moduleId == "89") {
                    console.log(thisyear1 + "-01")
                    console.log(thisyear1 + "-" + lastmon)
                    $.each(data, function (i, n) {
                        if (n['t_bsqclgyydphgzssqkyb607_date2'].slice(0,7) == (thisyear1 + "-01") && n['t_bsqclgyydphgzssqkyb607_date3'].slice(0,7) == (thisyear1 + "-" + lastmon)) {
                            str += '<tr>' +
                                '<td class="numeric-cell">' + n['t_bsqclgyydphgzssqkyb607_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqclgyydphgzssqkyb607_mb5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqclgyydphgzssqkyb607_yph6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqclgyydphgzssqkyb607_wph7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqclgyydphgzssqkyb607_phjd8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqclgyydphgzssqkyb607_jzqk9'] + '</td>'

                                +
                                '</tr>'
                        }
                    });
                }

                //3.3
                if (moduleId == "21") {
                    $.each(data, function (i, n) {
                        if (n['t_bsqdlqknb608_nd2'] == (thisyear - 1)) {
                            str += '<tr>' +
                                '<td class="label-cell">市管</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdlqknb608_slsg3'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdlqknb608_lcssg4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdlqknb608_qlssg5'] + '</td>' +
                                '<td class="label-cell">' + n['t_bsqdlqknb608_jsrwsg6'] + '</td>' +
                                '<td class="label-cell">' + n['t_bsqdlqknb608_wcqksg7'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell">区管</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdlqknb608_slqg8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdlqknb608_lcsqg9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdlqknb608_qlsqg10'] + '</td>' +
                                '<td class="label-cell">' + n['t_bsqdlqknb608_jsrwqg11'] + '</td>' +
                                '<td class="label-cell">' + n['t_bsqdlqknb608_wcqkqg12'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell">镇管</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdlqknb608_slzg13'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdlqknb608_lcszg14'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdlqknb608_qlszg15'] + '</td>' +
                                '<td class="label-cell">' + n['t_bsqdlqknb608_jsrwzg16'] + '</td>' +
                                '<td class="label-cell">' + n['t_bsqdlqknb608_wcqkzg17'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell">合计</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdlqknb608_slhj18'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdlqknb608_lcshj19'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdlqknb608_qlshj20'] + '</td>' +
                                '<td class="label-cell">' + n['t_bsqdlqknb608_jsrwhj21'] + '</td>' +
                                '<td class="label-cell">' + n['t_bsqdlqknb608_wcqkhj22'] + '</td>' +
                                '</tr>'
                        }
                    });

                }

                //3.4
                if (moduleId == "22") {
                    $.each(data, function (i, n) {
                        if (n['t_bsqqlqknb609_nd2'] == (thisyear - 1)) {
                            str += '<tr>' +
                                '<td class="label-cell" >桥梁数量</td>' +
                                '<td class="numeric-cell" colspan="2">' + n['t_bsqqlqknb609_qlsl3'] + '</td>' +
                                '<td class="numeric-cell">桥孔数量</td>' +
                                '<td class="numeric-cell" colspan="2">' + n['t_bsqqlqknb609_qksl4'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell" >危桥数量</td>' +
                                '<td class="numeric-cell" colspan="5">' + n['t_bsqqlqknb609_wqsl5'] + '</td>' +
                                '</tr>'
                            strhead = '<tr>' +
                                '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">管理级别</div></th>' +
                                '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">数量</div></th>' +
                                '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">桥孔数</div></th>' +
                                '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">养护单位</div></th>' +
                                '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">维护任务</div></th>' +
                                '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">完成情况</div></th>' +
                                '</tr>'
                            strbody += '<tr>' +
                                '<td class="label-cell" >省级</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_slsj6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_qkssj7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_yhdwsj8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_whdwsj9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_wcqksj10'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell" >市级</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_slsj11'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_qkssj12'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_yhdwsj13'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_whdwsj14'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_wcqksj15'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell" >区级</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_slqj16'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_qksqj17'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_yhdwqj18'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_whdwqj19'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_wcqkqj20'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell" >镇级</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_slzj21'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_qkszj22'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_yhdwzj23'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_whdwzj24'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_wcqkzj25'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell" >农村</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_slnc26'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_qksnc27'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_yhdwnc28'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_whdwnc29'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_wcqknc30'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell" >三不管</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_slsbg31'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_qkssbg32'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_yhdwsbg33'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_whdwsbg34'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_wcqksbg35'] + '</td>' +
                                '</tr>'
                        }
                    });
                    str += '<tr><td colspan="6" style="padding:0 0"><table border="0"><thead>' + strhead + '</thead><tbody>' + strbody + '</tbody></table></td></tr>'

                }
                //3.5.1
                if (moduleId == "24") {
                    $.each(data, function (i, n) {
                        if (n['t_nddqghjbqkbjb610_date2'] == thisyear_jidu && n['t_nddqghjbqkbjb610_date3'] == (lastjidu)) {
                            strhead = '<tr>' +
                                '<th class="label-cell" colspan="2"><div style="width:60px;">计划导入</div></th>' +
                                '<th class="label-cell"><div style="width:40px;">污水</div></th>' +
                                '<th class="label-cell">新改建</th>' +
                                '<th class="label-cell" rowspan="2"><div style="width:110px;">新增公建配套项目</div></th>' +
                                '<th class="label-cell" colspan="2"><div style="width:100px;">居农民</div></th>' +
                                '<th class="label-cell" colspan="2"><div style="width:100px;">企业</div></th>' +
                                '</tr>' +
                                '<tr>' +
                                '<th class="label-cell" colspan="2">人口</th>' +
                                '<th class="label-cell">纳管(日流量)</th>' +
                                '<th class="label-cell" >道路</th>' +
                                '<th class="label-cell">已动迁</th>' +
                                '<th class="label-cell">未动迁</th>' +
                                '<th class="label-cell">已动迁</th>' +
                                '<th class="label-cell">未动迁</th>' +
                                '</tr>'
                            str += '<tr>' +
                                '<td class="label-cell" >' + n['t_nddqghjbqkbjb610_zdmj4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_nddqghjbqkbjb610_jzmj5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_nddqghjbqkbjb610_sbmj6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_nddqghjbqkbjb610_spf7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_nddqghjbqkbjb610_dqf8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_nddqghjbqkbjb610_gzf9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_nddqghjbqkbjb610_lh10'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_nddqghjbqkbjb610_sx11'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_nddqghjbqkbjb610_trxf12'] + '</td>' +
                                '</tr>'
                            strbody += '<tr>' +
                                '<td class="label-cell" colspan="2">' + n['t_nddqghjbqkbjb610_jhdrrkwr13'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_nddqghjbqkbjb610_wsngwdrll14'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_nddqghjbqkbjb610_xgjdl15'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_nddqghjbqkbjb610_xzgjptxm16'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_nddqghjbqkbjb610_ydqjnmwpfm17'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_nddqghjbqkbjb610_wdqjnmwpfm18'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_nddqghjbqkbjb610_ydqqywpfm19'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_nddqghjbqkbjb610_wdqqywpfm20'] + '</td>' +
                                '</tr>'
                        }

                    });
                    str += '<tr><td colspan="9" style="padding:0 0"><table border="0"><thead>' + strhead + '</thead><tbody>' + strbody + '</tbody></table></td></tr>'

                }
                //3.5.2
                if (moduleId == "90") {
                    $.each(data, function (i, n) {
                        if (n['t_wgyqjbqkjb611_date2'] == thisyear_jidu && n['t_wgyqjbqkjb611_date3'] == lastjidu) {
                            str += '<tr>' +
                                '<td class="numeric-cell">' + n['t_wgyqjbqkjb611_zdmj4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_wgyqjbqkjb611_zzmj5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_wgyqjbqkjb611_sbmj6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_wgyqjbqkjb611_gyyd7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_wgyqjbqkjb611_xyqyscz8'] + '</td>' +
                                '</tr>'
                            strhead = '<tr>' +
                                '<th class="label-cell">实有企业数(生产经营)</th>' +
                                '<th class="label-cell">现有居农民</th>' +
                                '<th class="label-cell" >道路</th>' +
                                '<th class="label-cell">水系</th>' +
                                '<th class="label-cell">现状用地权属情况</th>' +
                                '</tr>'
                            strbody += '<tr>' +
                                '<td class="numeric-cell">' + n['t_wgyqjbqkjb611_syqysscjy9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_wgyqjbqkjb611_xyjnm10'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_wgyqjbqkjb611_dl11'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_wgyqjbqkjb611_sx12'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_wgyqjbqkjb611_xzydqsqk13'] + '</td>' +
                                '</tr>'
                        }
                    });
                    str += '<tr><td colspan="5" style="padding:0 0"><table border="0"><thead>' + strhead + '</thead><tbody>' + strbody + '</tbody></table></td></tr>'

                }
                //3.6
                if (moduleId == "91") {

                    $.each(data, function (i, n) {
                        if (n['t_bsqczcgzjbqkjb612_nd1'] == thisyear_jidu && n['t_bsqczcgzjbqkjb612_jd2'] == lastjidu) {
                            str += '<tr>' +
                                '<td class="numeric-cell">' + n['t_bsqczcgzjbqkjb612_czc3'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqczcgzjbqkjb612_mj4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqczcgzjbqkjb612_rk5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqczcgzjbqkjb612_dqrk6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqczcgzjbqkjb612_dqqy7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqczcgzjbqkjb612_dqbl8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqczcgzjbqkjb612_jsjzqk9'] + '</td>' +
                                '</tr>'
                        }
                    });

                }
                //3.7
                if (moduleId == "45") {
                    $.each(data, function (i, n) {
                        if (n['t_bsqdxjzsqjbqkjb613_nd1'] == thisyear_jidu && n['t_bsqdxjzsqjbqkjb613_jd2'] == lastjidu) {

                            strhead = '<tr>' +
                                '<th class="label-cell">名称</th>' +
                                '<th class="label-cell">已建学校</th>' +
                                '<th class="label-cell" >学校缺口</th>' +
                                '<th class="label-cell">已建医院</th>' +
                                '<th class="label-cell">医院缺口</th>' +
                                '<th class="label-cell">已建道路</th>' +
                                '<th class="label-cell">道路缺口</th>' +
                                '</tr>'

                            str += '<tr><td class="label-cell">' + n['t_bsqdxjzsqjbqkjb613_mc3'] + '</td>' +
                                '<td class="numeric-cell" colspan="2">' + n['t_bsqdxjzsqjbqkjb613_mj4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdxjzsqjbqkjb613_yjg5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdxjzsqjbqkjb613_wjg6'] + '</td>' +
                                '<td class="numeric-cell" colspan="2">' + n['t_bsqdxjzsqjbqkjb613_drrk7'] + '</td></tr>'
                            strbody += '<tr><td class="label-cell">' + n['t_bsqdxjzsqjbqkjb613_mc3'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdxjzsqjbqkjb613_yjyx8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdxjzsqjbqkjb613_yxqk9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdxjzsqjbqkjb613_yjyy10'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdxjzsqjbqkjb613_yyqk11'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdxjzsqjbqkjb613_yjdl12'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdxjzsqjbqkjb613_dlqk13'] + '</td></tr>'
                        }
                    });
                    str += '<tr><td colspan="7" style="padding:0 0"><table border="0"><thead>' + strhead + '</thead><tbody>' + strbody + '</tbody></table></td></tr>'

                }
                // 4.1    
                if (moduleId == "94") {
                    var myDate = new Date();
                    var year = myDate.getFullYear();
                    var lastyear = year - 1;
                    var lastarr = {};
                    var thismonthes = {};
                    var thismonth = {};
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + jsziduan + '=' + search_condition['jsrq'] + '&' + 't_' + alias + '_shzt=已审核&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            //console.log(data);
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_bsqrlzyhshbzqkyb681_date3'] == (year - 1) + "-12-31" && n['t_bsqrlzyhshbzqkyb681_date2'] == (year - 1) + "-01-01") {
                                    lastarr = lastyedata[i];
                                }
                            });

                        }
                    })
                    $.each(data, function (i, n) {

                        if (data[i]['t_bsqrlzyhshbzqkyb681_date3'].slice(0, 7) == thisyear1 + '-' + lastmon && data[i]['t_bsqrlzyhshbzqkyb681_date2'].slice(0, 7) == thisyear1 + "-01") {

                            thismonthes = data[i];

                        }
                        if (data[i]['t_bsqrlzyhshbzqkyb681_date3'].slice(0, 7) == thisyear1 + '-' + lastmon && data[i]['t_bsqrlzyhshbzqkyb681_date2'].slice(0, 7) == thisyear1 + '-' + lastmon) {
                            thismonth = data[i];

                        }
                    });
                    if ($.isEmptyObject(lastarr)) {
                        for (var i in data[0]) {
                            lastarr[i] = ""
                        }
                    }

                    if ($.isEmptyObject(thismonthes)) {
                        //var thismonthes=[]
                        for (var i in data[0]) {
                            thismonthes[i] = ""
                        }
                    }
                    if ($.isEmptyObject(thismonth)) {

                        for (var i in data[0]) {
                            thismonth[i] = "";
                        }
                    }
                    str = '<tr>' +
                        '<td class="label-cell">1</td>' +
                        '<td class="numeric-cell" rowspan="8">就业创业</td>' +
                        '<td class="numeric-cell">全年城镇登记失业人数/市下达控制数</td>' +
                        '<td class="numeric-cell">人/人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_qnczdjsyrssxdkzs4'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_qnczdjsyrssxdkzs4'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_qnczdjsyrssxdkzs4'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">2</td>' +
                        '<td class="numeric-cell">帮扶引领创业人数</td>' +
                        '<td class="numeric-cell">人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_bfylcyrs5'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_bfylcyrs5'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_bfylcyrs5'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">3</td>' +
                        '  <td class="numeric-cell">长期失业青年实现就业创业</td>' +
                        '<td class="numeric-cell">人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_cqsyqnsxjycy6'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_cqsyqnsxjycy6'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_cqsyqnsxjycy6'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">4</td>' +
                        '<td class="numeric-cell">就业困难人员安置数</td>' +
                        '<td class="numeric-cell">人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_jyknryazs7'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_jyknryazs7'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_jyknryazs7'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">5</td>' +
                        '<td class="numeric-cell">零就业家庭安置数</td>' +
                        '<td class="numeric-cell">户</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_ljyjtazs8'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_ljyjtazs8'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_ljyjtazs8'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">6</td>' +
                        '<td class="numeric-cell">就业困难人员按时安置率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_jyknryasazl9'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_jyknryasazl9'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_jyknryasazl9'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">7</td>' +
                        '<td class="numeric-cell">发放创业贷款担保</td>' +
                        '<td class="numeric-cell">笔</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_ffcydkdb10'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_ffcydkdb10'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_ffcydkdb10'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">8</td>' +
                        ' <td class="numeric-cell">发放创业贷款担保金额</td>' +
                        ' <td class="numeric-cell">元</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_ffcydkdbje11'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_ffcydkdbje11'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_ffcydkdbje11'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">9</td>' +
                        '<td class="numeric-cell" rowspan="6">社会保障</td>' +
                        ' <td class="numeric-cell">城乡居保参保缴费人数</td>' +
                        '<td class="numeric-cell">人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_cxjbcbjfrs12'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_cxjbcbjfrs12'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_cxjbcbjfrs12'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">10</td>' +
                        '<td class="numeric-cell">城乡居保续缴费率</td>' +
                        ' <td class="numeric-cell">%</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_cxjbxjfl13'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_cxjbxjfl13'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_cxjbxjfl13'] + '</td>' +
                        ' </tr>' +
                        '<tr>' +
                        ' <td class="numeric-cell">11</td>' +
                        ' <td class="numeric-cell">办理征地项目</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_blzdxm14'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_blzdxm14'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_blzdxm14'] + '</td>' +
                        '</tr>' +
                        ' <tr>' +
                        ' <td class="numeric-cell">12</td>' +
                        ' <td class="numeric-cell">办理征地项目落实保障人数</td>' +
                        '<td class="numeric-cell">人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_blzdxmlsbzrs15'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_blzdxmlsbzrs15'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_blzdxmlsbzrs15'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        ' <td class="numeric-cell">13</td>' +
                        ' <td class="numeric-cell">征地养老区级统筹管理人员数</td>' +
                        '<td class="numeric-cell">人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_zdylqjtcglrys16'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_zdylqjtcglrys16'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_zdylqjtcglrys16'] + '</td>' +
                        '</tr>' +
                        ' <tr>' +
                        '<td class="numeric-cell">14</td>' +
                        '<td class="numeric-cell">符合条件的长护险参保老年人居家照护服务供应量</td>' +
                        '<td class="numeric-cell">人次</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_fhtjdchxcblnrjjzhfwgyl17'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_fhtjdchxcblnrjjzhfwgyl17'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_fhtjdchxcblnrjjzhfwgyl17'] + '</td>' +
                        '</tr>' +
                        ' <tr>' +
                        '<td class="label-cell">15</td>' +
                        ' <td class="numeric-cell" rowspan="9">劳动关系</td>' +
                        '<td class="numeric-cell">辖区内“上海市和谐劳动关系达标企业”数</td>' +
                        '<td class="numeric-cell">家</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_xqshshxldgxdbqys18'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_xqshshxldgxdbqys18'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_xqshshxldgxdbqys18'] + '</td>' +
                        ' </tr>' +
                        '<tr>' +
                        ' <td class="numeric-cell">16</td>' +
                        '<td class="numeric-cell">年度和谐劳动关系创建符合区级达标标准</td>' +
                        '<td class="numeric-cell">家</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_ndhxldgxcjfhqjdbbz19'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_ndhxldgxcjfhqjdbbz19'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_ndhxldgxcjfhqjdbbz19'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        ' <td class="numeric-cell">17</td>' +
                        ' <td class="numeric-cell">劳动人事争议仲裁案件按期办结率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_ldrszyzcajaqbjl20'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_ldrszyzcajaqbjl20'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_ldrszyzcajaqbjl20'] + '</td>' +
                        '</tr>' +
                        ' <tr>' +
                        ' <td class="numeric-cell">18</td>' +
                        '<td class="numeric-cell">年度劳动人事争议综合调解率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_ndldrszyzhdjl21'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_ndldrszyzhdjl21'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_ndldrszyzhdjl21'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">19</td>' +
                        '<td class="numeric-cell">调解组织和仲裁机构受理案件</td>' +
                        ' <td class="numeric-cell">件</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_djzzhzcjgslaj22'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_djzzhzcjgslaj22'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_djzzhzcjgslaj22'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        ' <td class="numeric-cell">20</td>' +
                        '<td class="numeric-cell">调解组织和仲裁机构办结案件</td>' +
                        ' <td class="numeric-cell">件</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_djzzhzcjgbjaj23'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_djzzhzcjgbjaj23'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_djzzhzcjgbjaj23'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        ' <td class="numeric-cell">21</td>' +
                        '<td class="numeric-cell">重大突发及10人以上群体性劳资纠纷</td>' +
                        ' <td class="numeric-cell">起</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_zdtfjrysqtxlzjf24'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_zdtfjrysqtxlzjf24'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_zdtfjrysqtxlzjf24'] + '</td>' +
                        '</tr>' +
                        ' <tr>' +
                        ' <td class="numeric-cell">22</td>' +
                        '<td class="numeric-cell">重大突发及10人以上群体性劳资纠纷涉及人数</td>' +
                        ' <td class="numeric-cell">人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_zdtfjrysqtxlzjfsjrs25'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_zdtfjrysqtxlzjfsjrs25'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_zdtfjrysqtxlzjfsjrs25'] + '</td>' +
                        ' </tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">23</td>' +
                        '<td class="numeric-cell">重大突发及10人以上群体性劳资纠纷涉及金额</td>' +
                        '<td class="numeric-cell">万元</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_zdtfjrysqtxlzjfsjje26'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_zdtfjrysqtxlzjfsjje26'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_zdtfjrysqtxlzjfsjje26'] + '</td>' +
                        ' </tr>' +
                        '<tr>' +
                        ' <td class="label-cell">24</td>' +
                        '<td class="numeric-cell" rowspan="2">人力资源</td>' +
                        '<td class="numeric-cell">*全区社区工作者人数</td>' +
                        ' <td class="numeric-cell">人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_qqsqgzzrs27'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_qqsqgzzrs27'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_qqsqgzzrs27'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        ' <td class="numeric-cell">25</td>' +
                        ' <td class="numeric-cell">全区社区工作者薪酬水平人均</td>' +
                        ' <td class="numeric-cell">元/年</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqrlzyhshbzqkyb681_qqsqgzzxcsprj28'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqrlzyhshbzqkyb681_qqsqgzzxcsprj28'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonthes['t_bsqrlzyhshbzqkyb681_qqsqgzzxcsprj28'] + '</td>' +
                        '</tr>'

                }
                //4.1.1
                if (moduleId == "95") {
                    // console.log(lastmon);
                    var myDate = new Date();
                    var year = myDate.getFullYear();
                    var lastyear = year - 1;
                    var lastarr = {};
                    var thismonthes = {};
                    var thismonth = {};
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + jsziduan + '=' + search_condition['jsrq'] + '&' + 't_' + alias + '_shzt=已审核&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            //console.log(data);
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (lastyedata[i]['t_bsqsydwrlzyqkyb653_date3'] == (lastyear) + "-12-31" && lastyedata[i]['t_bsqsydwrlzyqkyb653_date2'].slice(0, 7) == lastyear + "-01") {
                                    lastarr = lastyedata[i];

                                }
                            });

                        }
                    })
                    $.each(data, function (i, n) {

                        if (data[i]['t_bsqsydwrlzyqkyb653_date3'].slice(0, 7) == thisyear1 + '-' + lastmon && data[i]['t_bsqsydwrlzyqkyb653_date2'].slice(0, 7) == thisyear1 + "-01") {

                            thismonthes = data[i];

                        }
                        if (data[i]['t_bsqsydwrlzyqkyb653_date3'].slice(0, 7) == year + '-' + lastmon && data[i]['t_bsqsydwrlzyqkyb653_date2'].slice(0, 7) == year + '-' + lastmon) {
                            thismonth = data[i];

                        }
                    });
                    str += '<tr>' +
                        '<td class="label-cell">1</td>' +
                        '<td class="numeric-cell">全区事业单位数</td>' +
                        '<td class="numeric-cell">家</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsydwrlzyqkyb653_qqsydws4'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsydwrlzyqkyb653_qqsydws4'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsydwrlzyqkyb653_qqsydws4'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">2</td>' +
                        '<td class="numeric-cell">全区事业编制人员数</td>' +
                        '<td class="numeric-cell">人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqsydwrlzyqkyb653_qqsybzrys5'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqsydwrlzyqkyb653_qqsybzrys5'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqsydwrlzyqkyb653_qqsybzrys5'] + '</td>' +
                        '</tr>'
                }
                // 4.2 
                if (moduleId == "96") {
                    var myDate = new Date();
                    var year = myDate.getFullYear();
                    var lastyear = year - 1;
                    var lastarr = {};
                    var thismonthes = {};
                    var thismonth = {};
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + jsziduan + '=' + search_condition['jsrq'] + '&' + 't_' + alias + '_shzt=已审核&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            //console.log(data);
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_bsqmzgzqkyb718_date3'] == lastyear + "-12-31" && n['t_bsqmzgzqkyb718_date2'] == lastyear + "-01-01") {
                                    lastarr = n;
                                }
                            });

                        }
                    })
                    $.each(data, function (i, n) {

                        // if (n['t_bsqmzgzqkyb718_date3'] == lastyear + "-12-31" && n['t_bsqmzgzqkyb718_date2'] == lastyear + "-01-01") {
                        //     lastarr = n;
                        // }

                        if (n['t_bsqmzgzqkyb718_date3'].slice(0, 7) == thisyear1 + '-' + lastmon && n['t_bsqmzgzqkyb718_date2'].slice(0, 7) == thisyear1 + "-01") {
                            thismonthes = n;
                        }
                        if (n['t_bsqmzgzqkyb718_date3'].slice(0, 7) == year + '-' + lastmon && n['t_bsqmzgzqkyb718_date2'].slice(0, 7) == year + '-' + lastmon) {
                            thismonth = n;
                        }
                    })
                    if ($.isEmptyObject(lastarr)) {
                        for (var i in data[0]) {
                            lastarr[i] = ""
                        }
                    }

                    if ($.isEmptyObject(thismonthes)) {
                        //var thismonthes=[]
                        for (var i in data[0]) {
                            thismonthes[i] = ""
                        }
                    }
                    if ($.isEmptyObject(thismonth)) {
                        //  thismonth=data[0];
                        // var thismonth=[]
                        for (var i in data[0]) {
                            thismonth[i] = "";
                        }
                    }
                    str = ' <tr>' +
                        '<td class="label-cell">1</td>' +
                        ' <td class="numeric-cell" rowspan="5">救济救灾</td>' +
                        '<td class="numeric-cell" colspan="2">城乡低保总人数</td>' +
                        '<td class="numeric-cell">人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_cxdbzrs4'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_cxdbzrs4'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_cxdbzrs4'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        ' <td class="label-cell">2</td>' +
                        ' <td class="numeric-cell" colspan="2">城镇低保人数</td>' +
                        ' <td class="numeric-cell">人</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_czdbrs5'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_czdbrs5'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_czdbrs5'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        '  <td class="label-cell">3</td>' +
                        ' <td class="numeric-cell" colspan="2">农村低保人数</td>' +
                        ' <td class="numeric-cell">人</td>' +
                        '  <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ncdbrs6'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ncdbrs6'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ncdbrs6'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">4</td>' +
                        ' <td class="numeric-cell" colspan="2">年内累计救助人次</td>' +
                        ' <td class="numeric-cell">人次</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_nnljjzrc7'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_nnljjzrc7'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_nnljjzrc7'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        '<td class="label-cell">5</td>' +
                        '  <td class="numeric-cell" colspan="2">年内累计支出救助资金</td>' +
                        '<td class="numeric-cell">万元</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_nnljzcjzzj8'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_nnljzcjzzj8'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_nnljzcjzzj8'] + '</td>' +
                        ' </tr>' +
                        '<tr>' +
                        '<td class="label-cell">6</td>' +
                        '<td class="numeric-cell" rowspan="36">养老服务</td>' +
                        '<td class="numeric-cell" colspan="2">户籍老年人数（60岁以上）</td>' +
                        '<td class="numeric-cell">万人</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_hjlnrssys9'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_hjlnrssys9'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_hjlnrssys9'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">7</td>' +
                        '<td class="numeric-cell" colspan="2">户籍老年人数（60岁以上）占户籍人口比例</td>' +
                        ' <td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_hjlnrssyszhjrkbl10'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_hjlnrssyszhjrkbl10'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_hjlnrssyszhjrkbl10'] + '</td>' +
                        '</tr>' +
                        '  <tr>' +
                        ' <td class="label-cell" rowspan="14">8</td>' +
                        ' <td class="numeric-cell" colspan="2">公办/民办养老机构数总数</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_gbmbyljgszs11'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_gbmbyljgszs11'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_gbmbyljgszs11'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">8-1</td>' +
                        ' <td class="numeric-cell">杨行镇</td>' +
                        '  <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgsyxz12'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgsyxz12'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgsyxz12'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        '<td class="label-cell">8-2</td>' +
                        ' <td class="numeric-cell">月浦镇</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgsypz13'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgsypz13'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgsypz13'] + '</td>' +
                        ' </tr>' +
                        '  <tr>' +
                        ' <td class="label-cell">8-3</td>' +
                        '  <td class="numeric-cell">罗店镇</td>' +
                        '  <td class="numeric-cell">个</td>' +
                        '  <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgsldz14'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgsldz14'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgsldz14'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">8-4</td>' +
                        ' <td class="numeric-cell">罗泾镇</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '   <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgslz15'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgslz15'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgslz15'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        '   <td class="label-cell">8-5</td>' +
                        ' <td class="numeric-cell">顾村镇</td>' +
                        '  <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgsgcz16'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgsgcz16'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgsgcz16'] + '</td>' +
                        '   </tr>' +
                        ' <tr>' +
                        '  <td class="label-cell">8-6</td>' +
                        '<td class="numeric-cell">大场镇</td>' +
                        '   <td class="numeric-cell">个</td>' +
                        '  <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgsdcz17'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgsdcz17'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgsdcz17'] + '</td>' +
                        '   </tr>' +
                        '  <tr>' +
                        ' <td class="label-cell">8-7</td>' +
                        ' <td class="numeric-cell">庙行镇</td>' +
                        '  <td class="numeric-cell">个</td>' +
                        '   <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgsmxz18'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgsmxz18'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgsmxz18'] + '</td>' +
                        ' </tr>' +
                        '  <tr>' +
                        ' <td class="label-cell">8-8</td>' +
                        '  <td class="numeric-cell">淞南镇</td>' +
                        '   <td class="numeric-cell">个</td>' +
                        '  <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgsnz19'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgsnz19'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgsnz19'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">8-9</td>' +
                        ' <td class="numeric-cell">高境镇</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgsgjz20'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgsgjz20'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgsgjz20'] + '</td>' +
                        ' </tr>' +
                        ' <td class="label-cell">8-10</td>' +
                        ' <td class="numeric-cell">友谊路街道</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgsyyljd21'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgsyyljd21'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgsyyljd21'] + '</td>' +
                        '</tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">8-11</td>' +
                        ' <td class="numeric-cell">吴淞街道</td>' +
                        '  <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgswjd22'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgswjd22'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgswjd22'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">8-12</td>' +
                        ' <td class="numeric-cell">张庙街道</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        '  <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgszmjd23'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgszmjd23'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgszmjd23'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">8-13</td>' +
                        ' <td class="numeric-cell">区福利院</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgsqfly24'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgsqfly24'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgsqfly24'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell" rowspan="14">9</td>' +
                        ' <td class="numeric-cell" colspan="2">公办/民办养老床位总数</td>' +
                        ' <td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_gbmbylcwzs25'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_gbmbylcwzs25'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_gbmbylcwzs25'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        '<td class="label-cell">8-1</td>' +
                        ' <td class="numeric-cell">杨行镇</td>' +
                        ' <td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwsyxz26'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwsyxz26'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwsyxz26'] + '</td>' +
                        '</tr>' +
                        ' <tr>' +
                        '<td class="label-cell">8-2</td>' +
                        ' <td class="numeric-cell">月浦镇</td>' +
                        '<td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwsypz27'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwsypz27'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwsypz27'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">8-3</td>' +
                        ' <td class="numeric-cell">罗店镇</td>' +
                        '<td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwsldz28'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwsldz28'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwsldz28'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        ' <td class="label-cell">8-4</td>' +
                        ' <td class="numeric-cell">罗泾镇</td>' +
                        ' <td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwslz29'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwslz29'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwslz29'] + '</td>' +
                        ' </tr>' +
                        '<tr>' +
                        ' <td class="label-cell">8-5</td>' +
                        ' <td class="numeric-cell">顾村镇</td>' +
                        ' <td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwsgcz30'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwsgcz30'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwsgcz30'] + '</td>' +
                        '</tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">8-6</td>' +
                        ' <td class="numeric-cell">大场镇</td>' +
                        ' <td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwsdcz31'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwsdcz31'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwsdcz31'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        ' <td class="label-cell">8-7</td>' +
                        ' <td class="numeric-cell">庙行镇</td>' +
                        ' <td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwsmxz32'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwsmxz32'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwsmxz32'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        '<td class="label-cell">8-8</td>' +
                        ' <td class="numeric-cell">淞南镇</td>' +
                        '<td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwsnz33'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwsnz33'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwsnz33'] + '</td>' +
                        ' </tr>' +
                        '  <tr>' +
                        ' <td class="label-cell">8-9</td>' +
                        ' <td class="numeric-cell">高境镇</td>' +
                        ' <td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwsgjz34'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwsgjz34'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwsgjz34'] + '</td>' +
                        '</tr>' +
                        ' <tr>' +
                        '<td class="label-cell">8-10</td>' +
                        ' <td class="numeric-cell">友谊路街道</td>' +
                        ' <td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwsyyljd35'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwsyyljd35'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwsyyljd35'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">8-11</td>' +
                        ' <td class="numeric-cell">吴淞街道</td>' +
                        ' <td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwswjd36'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwswjd36'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwswjd36'] + '</td>' +
                        ' </tr>' +
                        '<tr>' +
                        ' <td class="label-cell">8-12</td>' +
                        '  <td class="numeric-cell">张庙街道</td>' +
                        ' <td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwszmjd37'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwszmjd37'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwszmjd37'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">8-13</td>' +
                        ' <td class="numeric-cell">区福利院</td>' +
                        ' <td class="numeric-cell">张</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_ylcwsqfly38'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_ylcwsqfly38'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_ylcwsqfly38'] + '</td>' +
                        '  </tr>' +
                        '<tr>' +
                        ' <td class="label-cell">10</td>' +
                        ' <td class="numeric-cell" colspan="2">床位数/户籍老年人口数</td>' +
                        ' <td class="numeric-cell">%</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_cwshjlnrks39'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_cwshjlnrks39'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_cwshjlnrks39'] + '</td>' +
                        '</tr>' +
                        '  <tr>' +
                        '<td class="label-cell">11</td>' +
                        '<td class="numeric-cell" colspan="2">长者照护之家总数</td>' +
                        '<td class="numeric-cell">家</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_czzhzjzs40'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_czzhzjzs40'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_czzhzjzs40'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">12</td>' +
                        ' <td class="numeric-cell" colspan="2">养老机构设置内设医疗机构</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_yljgsznsyljg41'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_yljgsznsyljg41'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_yljgsznsyljg41'] + '</td>' +
                        ' </tr>' +
                        '<tr>' +
                        '<td class="label-cell">13</td>' +
                        '<td class="numeric-cell" colspan="2">老年人日间照料中心总数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_lnrrjzlzxzs42'] + '</td>' +
                        '  <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_lnrrjzlzxzs42'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_lnrrjzlzxzs42'] + '</td>' +
                        ' </tr>' +
                        '   <tr>' +
                        ' <td class="label-cell">14</td>' +
                        ' <td class="numeric-cell" colspan="2">居家养老服务对象</td>' +
                        ' <td class="numeric-cell">人</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_jjylfwdxr43'] + '(人)<br>' + lastarr['t_bsqmzgzqkyb718_jjylfwdxrc44'] + '（人次）</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_jjylfwdxr43'] + '(人)<br>' + thismonth['t_bsqmzgzqkyb718_jjylfwdxrc44'] + '（人次）</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_jjylfwdxr43'] + '(人)<br>' + thismonthes['t_bsqmzgzqkyb718_jjylfwdxrc44'] + '（人次）</td>' +
                        '</tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">15</td>' +
                        ' <td class="numeric-cell" colspan="2">社区综合为老服务中心个数</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_sqzhwlfwzxgs45'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_sqzhwlfwzxgs45'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_sqzhwlfwzxgs45'] + '</td>' +
                        '</tr>' +
                        '  <tr>' +
                        ' <td class="label-cell">16</td>' +
                        ' <td class="label-cell" rowspan="8">社会治理</td>' +
                        ' <td class="numeric-cell" colspan="2">正式居委会总数</td>' +
                        '  <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_zsjwhzs46'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_zsjwhzs46'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_zsjwhzs46'] + '</td>' +
                        '</tr>' +
                        '  <tr>' +
                        ' <td class="label-cell">17</td>' +
                        ' <td class="numeric-cell" colspan="2">村委会总数</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_cwhzs47'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_cwhzs47'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_cwhzs47'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">18</td>' +
                        ' <td class="numeric-cell" colspan="2">社区事务受理服务中心总数</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_sqswslfwzxzs48'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_sqswslfwzxzs48'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_sqswslfwzxzs48'] + '</td>' +
                        '</tr>' +
                        '  <tr>' +
                        ' <td class="label-cell">19</td>' +
                        '  <td class="numeric-cell" colspan="2">社区事务受理服务分中心总数</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        '  <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_sqswslfwfzxzs49'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_sqswslfwfzxzs49'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_sqswslfwfzxzs49'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="label-cell">20</td>' +
                        ' <td class="numeric-cell" colspan="2">社区事务受理服务延伸服务点总数</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_sqswslfwysfwdzs50'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_sqswslfwysfwdzs50'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_sqswslfwysfwdzs50'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        '<td class="label-cell" rowspan="3">21</td>' +
                        '<td class="numeric-cell" colspan="2">社会组织总数（民非、社团）</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_shzzzsmfst51'] + '</td>' +
                        '<td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_shzzzsmfst51'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_shzzzsmfst51'] + '</td>' +
                        '</tr>' +
                        ' <tr>' +
                        ' <td class="numeric-cell">21-1</td>' +
                        ' <td class="numeric-cell">民非社会组织</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_mfshzz52'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_mfshzz52'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_mfshzz52'] + '</td>' +
                        ' </tr>' +
                        ' <tr>' +
                        ' <td class="numeric-cell">21-2</td>' +
                        ' <td class="numeric-cell">社团社会组织</td>' +
                        ' <td class="numeric-cell">个</td>' +
                        ' <td class="numeric-cell">' + lastarr['t_bsqmzgzqkyb718_stshzz53'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonth['t_bsqmzgzqkyb718_stshzz53'] + '</td>' +
                        ' <td class="numeric-cell">' + thismonthes['t_bsqmzgzqkyb718_stshzz53'] + '</td>' +
                        ' </tr>';

                }
                //4.3.1
                if (moduleId == "97") {
                    //   var lastyear=[];
                    //   var thisyear=[];
                    var thisy = thisyear;
                    var lastyear = {};
                    var thisyear = {};
                    $.each(data, function (i, n) {
                        var year = data[i]['t_bsqzymsxyczzcqknb655_nd2'];
                        if (year == (thisy - 1)) {
                            lastyear = n;
                            //   lastyear.push(data[i]['t_bsqzymsxyczzcqknb655_jyzczey3']);
                            //   lastyear.push(data[i]['t_bsqzymsxyczzcqknb655_jyzczqjczzcbl4']);
                            //   lastyear.push(data[i]['t_bsqzymsxyczzcqknb655_ylyjszczey5']);
                            //   lastyear.push(data[i]['t_bsqzymsxyczzcqknb655_nylyjszczqjczzcbl6']);
                            //   lastyear.push(data[i]['t_bsqzymsxyczzcqknb655_whycmzczey7']);
                            //   lastyear.push(data[i]['t_bsqzymsxyczzcqknb655_whycmzczqjczzcbl8']);
                            //   lastyear.push(data[i]['t_bsqzymsxyczzcqknb655_tyzczey9']);
                            //   lastyear.push(data[i]['t_bsqzymsxyczzcqknb655_tyzczqjczzcb10']);
                        }
                        if (year == thisy) {
                            thisyear = n
                            //   thisyear.push(data[i]['t_bsqzymsxyczzcqknb655_jyzczey3']);
                            //   thisyear.push(data[i]['t_bsqzymsxyczzcqknb655_jyzczqjczzcbl4']);
                            //   thisyear.push(data[i]['t_bsqzymsxyczzcqknb655_ylyjszczey5']);
                            //   thisyear.push(data[i]['t_bsqzymsxyczzcqknb655_nylyjszczqjczzcbl6']);
                            //   thisyear.push(data[i]['t_bsqzymsxyczzcqknb655_whycmzczey7']);
                            //   thisyear.push(data[i]['t_bsqzymsxyczzcqknb655_whycmzczqjczzcbl8']);
                            //   thisyear.push(data[i]['t_bsqzymsxyczzcqknb655_tyzczey9']);
                            //   thisyear.push(data[i]['t_bsqzymsxyczzcqknb655_tyzczqjczzcb10']);
                        }
                    });

                    str += '<tr>' +
                        '<td class="label-cell">1</td>' +
                        '<td class="numeric-cell" rowspan="2">教育</td>' +
                        '<td class="numeric-cell">教育支出总额</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqzymsxyczzcqknb655_jyzczey3'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqzymsxyczzcqknb655_jyzczey3'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">2</td>' +
                        '<td class="numeric-cell">教育支出占区级财政支出比例</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqzymsxyczzcqknb655_jyzczqjczzcbl4'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqzymsxyczzcqknb655_jyzczqjczzcbl4'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3</td>' +
                        '<td class="numeric-cell" rowspan="2">医疗</td>' +
                        '<td class="numeric-cell">医疗与计生支出总额</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqzymsxyczzcqknb655_ylyjszczey5'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqzymsxyczzcqknb655_ylyjszczey5'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">4</td>' +
                        '<td class="numeric-cell">年医疗与计生支出占区级财政支出比例</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqzymsxyczzcqknb655_nylyjszczqjczzcbl6'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqzymsxyczzcqknb655_nylyjszczqjczzcbl6'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">5</td>' +
                        '<td class="numeric-cell" rowspan="2">文化</td>' +
                        '<td class="numeric-cell">文化与传媒支出总额</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqzymsxyczzcqknb655_whycmzczey7'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqzymsxyczzcqknb655_whycmzczey7'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">6</td>' +
                        '<td class="numeric-cell">文化与传媒支出占区级财政支出比例</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqzymsxyczzcqknb655_whycmzczqjczzcbl8'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqzymsxyczzcqknb655_whycmzczqjczzcbl8'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">7</td>' +
                        '<td class="numeric-cell" rowspan="2">体育</td>' +
                        '<td class="numeric-cell">体育支出总额</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqzymsxyczzcqknb655_tyzczey9'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqzymsxyczzcqknb655_tyzczey9'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">8</td>' +
                        '<td class="numeric-cell">体育支出占区级财政支出比</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqzymsxyczzcqknb655_tyzczqjczzcb10'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqzymsxyczzcqknb655_tyzczqjczzcb10'] + '</td>' +
                        '</tr>'
                }
                //4.3.2
                if (moduleId == "98") {
                    var thisy = thisyear
                    var lastyear = [];
                    var thisyear = [];
                    $.each(data, function (i, n) {
                        var nianziuan = data[i]['t_bsqjyqkbnb719_date2'];
                        var nianduziduan = data[i]['t_bsqjyqkbnb719_date3'];
                        // var mon2=data[i]['t_bsqcsglgzqkbyb725_date3'].slice(5,7);
                        if (nianziuan == (thisy - 1) && nianduziduan == "全年") {
                            lastyear = n

                        }
                        if (nianziuan == thisyear_bannian) {
                            if (nianduziduan == lastniandu) {
                                thisyear = n
                            }

                        }
                    });
                    str += '<tr>' +
                        '<td class="label-cell" rowspan="2">1</td>' +
                        '<td class="numeric-cell" rowspan="2">基础教育收入构成</td>' +
                        '<td class="numeric-cell">一般公共财政</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_jcjysrybggcz4'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_jcjysrybggcz4'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">教育费附加</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_jcjysrjyffj5'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_jcjysrjyffj5'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="2">2</td>' +
                        '<td class="numeric-cell" rowspan="2">基础教育支出构成</td>' +
                        '<td class="numeric-cell">基本支出</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_jcjyzcjbzc6'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_jcjyzcjbzc6'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">项目支出</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_jcjyzcxmzc7'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_jcjyzcxmzc7'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3</td>' +
                        '<td class="numeric-cell" colspan="2">教育机构总数</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_jyjgzs8'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_jyjgzs8'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="8">4</td>' +
                        '<td class="numeric-cell" rowspan="8">教育机构功能分类</td>' +
                        '<td class="numeric-cell">中学</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_jyjgzy9'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_jyjgzy9'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">小学</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_jyjgxy10'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_jyjgxy10'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">幼儿园</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_jyjgyey11'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_jyjgyey11'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">工读</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_jyjggd12'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_jyjggd12'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">特教</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_jyjgtj13'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_jyjgtj13'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">中等职业学校</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_jyjgzdzyyx14'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_jyjgzdzyyx14'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">成人基础</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_jyjgcrjc15'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_jyjgcrjc15'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">其他单位</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_jyjgqtdw16'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_jyjgqtdw16'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="2">5</td>' +
                        '<td class="numeric-cell" rowspan="2">教育机构性质分类</td>' +
                        '<td class="numeric-cell">公办</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_jyjggb17'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_jyjggb17'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">民办</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_jyjgmb18'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_jyjgmb18'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">6</td>' +
                        '<td class="numeric-cell" colspan="2">学生总数</td>' +
                        '<td class="numeric-cell">万人</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_yszs19'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_yszs19'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">7</td>' +
                        '<td class="numeric-cell" colspan="2">非户籍学生数</td>' +
                        '<td class="numeric-cell">万人</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_fhjyss20'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_fhjyss20'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">8</td>' +
                        '<td class="numeric-cell" colspan="2">教职工数</td>' +
                        '<td class="numeric-cell">万人</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_jzgs21'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_jzgs21'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">9</td>' +
                        '<td class="numeric-cell" colspan="2">专任教师数</td>' +
                        '<td class="numeric-cell">万人</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_zrjss22'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_zrjss22'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">10</td>' +
                        '<td class="numeric-cell" colspan="2">骨干教师数</td>' +
                        '<td class="numeric-cell">名</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_ggjss23'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_ggjss23'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">11</td>' +
                        '<td class="numeric-cell" colspan="2">教师离职数</td>' +
                        '<td class="numeric-cell">名</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_jslzs24'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_jslzs24'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">12</td>' +
                        '<td class="numeric-cell" colspan="2">教师流动率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_jsldl25'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_jsldl25'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">13</td>' +
                        '<td class="numeric-cell" colspan="2">秋季高考公办学校本科达线率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_qjgkgbyxbkdxl26'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_qjgkgbyxbkdxl26'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">14</td>' +
                        '<td class="numeric-cell" colspan="2">教育集团化办学试点</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_jyjthbysd27'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_jyjthbysd27'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">15</td>' +
                        '<td class="numeric-cell" colspan="2">学区化集团化办学覆盖率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_yqhjthbyfgl28'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_yqhjthbyfgl28'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">16</td>' +
                        '<td class="numeric-cell" colspan="2">年度新开办学校数（含分部）</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_ndxkbyxshfb29'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_ndxkbyxshfb29'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">17</td>' +
                        '<td class="numeric-cell" colspan="2">年度新建学校数</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_ndxjyxs30'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_ndxjyxs30'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">18</td>' +
                        '<td class="numeric-cell" colspan="2">年度改扩建学校数</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_ndgkjyxs31'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_ndgkjyxs31'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="2">19</td>' +
                        '<td class="numeric-cell" rowspan="2">教育统筹指标</td>' +
                        '<td class="numeric-cell">“十三五”基本建设规划项目</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_sswjbjsghxm32'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_sswjbjsghxm32'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">未纳入“十三五”期间建设项目推进计划的历年应建未建学校项目</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear['t_bsqjyqkbnb719_wnrsswqjjsxmtjjhdlnyjwjyxxm33'] + '</td>' +
                        '<td class="numeric-cell">' + thisyear['t_bsqjyqkbnb719_wnrsswqjjsxmtjjhdlnyjwjyxxm33'] + '</td>' +
                        '</tr>'
                }
                //4.4
                if (moduleId == "99") {
                    var thisy = thisyear;
                    var lastyear = [];
                    var thisyear = [];
                    $.each(data, function (i, n) {
                        var year = data[i]['t_bsqylqknb727_nd2'];
                        // var mon1=data[i]['t_bsqcsglgzqkbyb725_date2'].slice(5,7);
                        // var mon2=data[i]['t_bsqcsglgzqkbyb725_date3'].slice(5,7);
                        if (year == (thisy - 1)) {
                            lastyear.push(data[i]['t_bsqylqknb727_ylwsxzglbmjsssydwjbzchxzsydwzgybjfdjbzcy3']);
                            lastyear.push(data[i]['t_bsqylqknb727_wsjgjsylzgwsjdsqggwsfwdzcy4']);
                            lastyear.push(data[i]['t_bsqylqknb727_wsylsbgxxxhjsdzcy5']);
                            lastyear.push(data[i]['t_bsqylqknb727_czjmjbylbxsqylhzbkjhsydzcy6']);
                            lastyear.push(data[i]['t_bsqylqknb727_qqylwsjgzss7']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylwsjgssjyys8']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylwsjgsejyys9']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylwsjgszyzss10']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylwsjgsyjyys11']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylwsjgsqwsfwzxs12']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylwsjgsxtnglylwshjsjgs13']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylwsjgsxtwglyljgs14']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylwsjgsmymzbs15']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylwsjgsgtzsjnsyljgs16']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylwsjgsmyyys17']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylwsjgsmyhlys18']);
                            lastyear.push(data[i]['t_bsqylqknb727_xtnzgsw19']);
                            lastyear.push(data[i]['t_bsqylqknb727_qqwsjsryzsw20']);
                            lastyear.push(data[i]['t_bsqylqknb727_wsjsrysxtnglylwshjsjgw21']);
                            lastyear.push(data[i]['t_bsqylqknb727_wsjsrysqtglyljgw22']);
                            lastyear.push(data[i]['t_bsqylqknb727_wsjsrysmbyljgw23']);
                            lastyear.push(data[i]['t_bsqylqknb727_wsjsryszgzcw24']);
                            lastyear.push(data[i]['t_bsqylqknb727_wsjsryszgzczb25']);
                            lastyear.push(data[i]['t_bsqylqknb727_wsjsrysfgzcw26']);
                            lastyear.push(data[i]['t_bsqylqknb727_wsjsrysfgzczb27']);
                            lastyear.push(data[i]['t_bsqylqknb727_wsjsryszjzcw28']);
                            lastyear.push(data[i]['t_bsqylqknb727_wsjsryszjzczb29']);
                            lastyear.push(data[i]['t_bsqylqknb727_wsjsryldl30']);
                            lastyear.push(data[i]['t_bsqylqknb727_qqbczsz31']);
                            lastyear.push(data[i]['t_bsqylqknb727_bcsxtnglylwshjsjgz32']);
                            lastyear.push(data[i]['t_bsqylqknb727_bcsqtglyljgz33']);
                            lastyear.push(data[i]['t_bsqylqknb727_bcsmbyljgz34']);
                            lastyear.push(data[i]['t_bsqylqknb727_mwrkyljgcwsczrkzwr35']);
                            lastyear.push(data[i]['t_bsqylqknb727_mwrkzyyssczrkzwr36']);
                            lastyear.push(data[i]['t_bsqylqknb727_yljgzhqyrswr37']);
                            lastyear.push(data[i]['t_bsqylqknb727_yljgzhqyrsqspm38']);
                            lastyear.push(data[i]['t_bsqylqknb727_jtysqyl39']);
                            lastyear.push(data[i]['t_bsqylqknb727_kjyscfwz40']);
                            lastyear.push(data[i]['t_bsqylqknb727_kjyscfsjjewy41']);
                            lastyear.push(data[i]['t_bsqylqknb727_kjyscfqspm42']);
                            lastyear.push(data[i]['t_bsqylqknb727_hjjmpjyqsms43']);
                            lastyear.push(data[i]['t_bsqylqknb727_yeswlh44']);
                            lastyear.push(data[i]['t_bsqylqknb727_yeswlc45']);
                            lastyear.push(data[i]['t_bsqylqknb727_syxet46']);
                            lastyear.push(data[i]['t_bsqylqknb727_ycfswl47']);
                            lastyear.push(data[i]['t_bsqylqknb727_yltslg48']);
                            lastyear.push(data[i]['t_bsqylqknb727_yltmdms49']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylgghlzbyzb50']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylgghlzbylsrzcl51']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylgghlzbylhczb52']);
                            lastyear.push(data[i]['t_bsqylqknb727_ndxjyyss53']);
                            lastyear.push(data[i]['t_bsqylqknb727_ndgkjyyss54']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqkyxzs55']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqkypzs56']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqknzs57']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqklzs58']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqkldzs59']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqkgczs60']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqkdczs61']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqkmxzs62']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqkgjzs63']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqkcsgyyqs64']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqkbsgyyqs65']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqkhys66']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqktcyys67']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqktcws68']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqktczms69']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqkqts70']);
                        }
                        if (year == thisy) {
                            thisyear.push(data[i]['t_bsqylqknb727_ylwsxzglbmjsssydwjbzchxzsydwzgybjfdjbzcy3']);
                            thisyear.push(data[i]['t_bsqylqknb727_wsjgjsylzgwsjdsqggwsfwdzcy4']);
                            thisyear.push(data[i]['t_bsqylqknb727_wsylsbgxxxhjsdzcy5']);
                            thisyear.push(data[i]['t_bsqylqknb727_czjmjbylbxsqylhzbkjhsydzcy6']);
                            thisyear.push(data[i]['t_bsqylqknb727_qqylwsjgzss7']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylwsjgssjyys8']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylwsjgsejyys9']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylwsjgszyzss10']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylwsjgsyjyys11']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylwsjgsqwsfwzxs12']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylwsjgsxtnglylwshjsjgs13']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylwsjgsxtwglyljgs14']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylwsjgsmymzbs15']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylwsjgsgtzsjnsyljgs16']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylwsjgsmyyys17']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylwsjgsmyhlys18']);
                            thisyear.push(data[i]['t_bsqylqknb727_xtnzgsw19']);
                            thisyear.push(data[i]['t_bsqylqknb727_qqwsjsryzsw20']);
                            thisyear.push(data[i]['t_bsqylqknb727_wsjsrysxtnglylwshjsjgw21']);
                            thisyear.push(data[i]['t_bsqylqknb727_wsjsrysqtglyljgw22']);
                            thisyear.push(data[i]['t_bsqylqknb727_wsjsrysmbyljgw23']);
                            thisyear.push(data[i]['t_bsqylqknb727_wsjsryszgzcw24']);
                            thisyear.push(data[i]['t_bsqylqknb727_wsjsryszgzczb25']);
                            thisyear.push(data[i]['t_bsqylqknb727_wsjsrysfgzcw26']);
                            thisyear.push(data[i]['t_bsqylqknb727_wsjsrysfgzczb27']);
                            thisyear.push(data[i]['t_bsqylqknb727_wsjsryszjzcw28']);
                            thisyear.push(data[i]['t_bsqylqknb727_wsjsryszjzczb29']);
                            thisyear.push(data[i]['t_bsqylqknb727_wsjsryldl30']);
                            thisyear.push(data[i]['t_bsqylqknb727_qqbczsz31']);
                            thisyear.push(data[i]['t_bsqylqknb727_bcsxtnglylwshjsjgz32']);
                            thisyear.push(data[i]['t_bsqylqknb727_bcsqtglyljgz33']);
                            thisyear.push(data[i]['t_bsqylqknb727_bcsmbyljgz34']);
                            thisyear.push(data[i]['t_bsqylqknb727_mwrkyljgcwsczrkzwr35']);
                            thisyear.push(data[i]['t_bsqylqknb727_mwrkzyyssczrkzwr36']);
                            thisyear.push(data[i]['t_bsqylqknb727_yljgzhqyrswr37']);
                            thisyear.push(data[i]['t_bsqylqknb727_yljgzhqyrsqspm38']);
                            thisyear.push(data[i]['t_bsqylqknb727_jtysqyl39']);
                            thisyear.push(data[i]['t_bsqylqknb727_kjyscfwz40']);
                            thisyear.push(data[i]['t_bsqylqknb727_kjyscfsjjewy41']);
                            thisyear.push(data[i]['t_bsqylqknb727_kjyscfqspm42']);
                            thisyear.push(data[i]['t_bsqylqknb727_hjjmpjyqsms43']);
                            thisyear.push(data[i]['t_bsqylqknb727_yeswlh44']);
                            thisyear.push(data[i]['t_bsqylqknb727_yeswlc45']);
                            thisyear.push(data[i]['t_bsqylqknb727_syxet46']);
                            thisyear.push(data[i]['t_bsqylqknb727_ycfswl47']);
                            thisyear.push(data[i]['t_bsqylqknb727_yltslg48']);
                            thisyear.push(data[i]['t_bsqylqknb727_yltmdms49']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylgghlzbyzb50']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylgghlzbylsrzcl51']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylgghlzbylhczb52']);
                            thisyear.push(data[i]['t_bsqylqknb727_ndxjyyss53']);
                            thisyear.push(data[i]['t_bsqylqknb727_ndgkjyyss54']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqkyxzs55']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqkypzs56']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqknzs57']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqklzs58']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqkldzs59']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqkgczs60']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqkdczs61']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqkmxzs62']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqkgjzs63']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqkcsgyyqs64']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqkbsgyyqs65']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqkhys66']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqktcyys67']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqktcws68']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqktczms69']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqkqts70']);
                        }
                    });
                    str += '<tr>' +
                        '<td class="label-cell" rowspan="4">1</td>' +
                        '<td class="numeric-cell" rowspan="4">医疗与计生支出构成</td>' +
                        '<td class="numeric-cell" colspan="2">医疗卫生行政管理部门及所属事业单位基本支出和行政事业单位职工医保缴费等基本支出</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[0] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[0] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">卫生机构建设、医疗综改、卫生监督、社区公共卫生服务等支出</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[1] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[1] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">卫生医疗设备更新、信息化建设等支出</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[2] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[2] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">城镇居民基本医疗保险、社区医疗互助帮困、计划生育等支出</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[3] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[3] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">2</td>' +
                        '<td class="numeric-cell" colspan="3">全区医疗卫生机构总数</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[4] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[4] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="5">3</td>' +
                        '<td class="numeric-cell" rowspan="5">医疗机构级别分类</td>' +
                        '<td class="numeric-cell" colspan="2">三级医院</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[5] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[5] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">二级医院</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[6] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[6] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">专业站所</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[7] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[7] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">一级医院</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[8] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[8] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">社区卫生服务中心</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[9] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[9] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="6">4</td>' +
                        '<td class="numeric-cell" rowspan="6">医疗卫生机构性质分类</td>' +
                        '<td class="numeric-cell" rowspan="2">公立</td>' +
                        '<td class="numeric-cell">系统内公立医疗卫生和计生机构</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[10] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[10] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">系统外公立医疗机构</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[11] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[11] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" rowspan="4">民营</td>' +
                        '<td class="numeric-cell">民营门诊部</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[12] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[12] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">个体诊所及内设医疗机构</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[13] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[13] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">民营医院</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[14] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[14] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">民营护理院</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[15] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[15] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">5</td>' +
                        '<td class="numeric-cell" colspan="3">系统内职工数</td>' +
                        '<td class="numeric-cell">位</td>' +
                        '<td class="numeric-cell">' + lastyear[16] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[16] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">6</td>' +
                        '<td class="numeric-cell" colspan="3">全区卫生技术人员总数</td>' +
                        '<td class="numeric-cell">位</td>' +
                        '<td class="numeric-cell">' + lastyear[17] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[17] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">7</td>' +
                        '<td class="numeric-cell" rowspan="3">卫生技术人员性质分类</td>' +
                        '<td class="numeric-cell" colspan="2">系统内公立医疗卫生和计生机构</td>' +
                        '<td class="numeric-cell">位</td>' +
                        '<td class="numeric-cell">' + lastyear[18] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[18] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">其他公立医疗机构</td>' +
                        '<td class="numeric-cell">位</td>' +
                        '<td class="numeric-cell">' + lastyear[19] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[19] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">民办医疗机构构</td>' +
                        '<td class="numeric-cell">位</td>' +
                        '<td class="numeric-cell">' + lastyear[20] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[20] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">8</td>' +
                        '<td class="numeric-cell" rowspan="3">系统内卫生技术人员级别分类</td>' +
                        '<td class="numeric-cell" colspan="2">正高职称</td>' +
                        '<td class="numeric-cell">位</td>' +
                        '<td class="numeric-cell">' + lastyear[21] + '(占比' + lastyear[22] + '%)</td>' +
                        '<td class="numeric-cell">' + thisyear[21] + '(占比' + thisyear[22] + '%)</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">副高职称</td>' +
                        '<td class="numeric-cell">位</td>' +
                        '<td class="numeric-cell">' + lastyear[23] + '(占比' + lastyear[24] + '%)</td>' +
                        '<td class="numeric-cell">' + thisyear[23] + '(占比' + thisyear[24] + '%)</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">中级职称</td>' +
                        '<td class="numeric-cell">位</td>' +
                        '<td class="numeric-cell">' + lastyear[25] + '(占比' + lastyear[26] + '%)</td>' +
                        '<td class="numeric-cell">' + thisyear[25] + '(占比' + thisyear[26] + '%)</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">9</td>' +
                        '<td class="numeric-cell" colspan="3">卫生技术人员流动率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[27] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[27] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">10</td>' +
                        '<td class="numeric-cell" colspan="3">全区病床总数</td>' +
                        '<td class="numeric-cell">张</td>' +
                        '<td class="numeric-cell">' + lastyear[28] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[28] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">11</td>' +
                        '<td class="numeric-cell" rowspan="3">病床分类</td>' +
                        '<td class="numeric-cell" colspan="2">系统内公立医疗卫生和计生机构</td>' +
                        '<td class="numeric-cell">张</td>' +
                        '<td class="numeric-cell">' + lastyear[29] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[29] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">其他公立医疗机构</td>' +
                        '<td class="numeric-cell">张</td>' +
                        '<td class="numeric-cell">' + lastyear[30] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[30] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">民办医疗机构</td>' +
                        '<td class="numeric-cell">张</td>' +
                        '<td class="numeric-cell">' + lastyear[31] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[31] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">12</td>' +
                        '<td class="numeric-cell" colspan="3">每万人口医疗机构床位数（常住人口）</td>' +
                        '<td class="numeric-cell">张/万人</td>' +
                        '<td class="numeric-cell">' + lastyear[32] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[32] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">13</td>' +
                        '<td class="numeric-cell" colspan="3">每万人口执业医师数（常住人口）</td>' +
                        '<td class="numeric-cell">位/万人</td>' +
                        '<td class="numeric-cell">' + lastyear[33] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[33] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">14</td>' +
                        '<td class="numeric-cell" colspan="3">“1+1+1”医疗机构组合签约人数</td>' +
                        '<td class="numeric-cell">万人</td>' +
                        '<td class="numeric-cell">' + lastyear[34] + '(全市排第' + lastyear[35] + ')</td>' +
                        '<td class="numeric-cell">' + thisyear[34] + '(全市排第' + thisyear[35] + ')</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">15</td>' +
                        '<td class="numeric-cell" colspan="3">家庭医生签约率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[36] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[36] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">16</td>' +
                        '<td class="numeric-cell" colspan="3">开具延伸处方</td>' +
                        '<td class="numeric-cell">万张</td>' +
                        '<td class="numeric-cell">' + lastyear[37] + '(涉及金额' + lastyear[38] + '万元，全市排名第' + lastyear[39] + ')</td>' +
                        '<td class="numeric-cell">' + thisyear[37] + '(涉及金额' + thisyear[38] + '万元，全市排名第' + thisyear[39] + ')</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">17</td>' +
                        '<td class="numeric-cell" colspan="3">户籍居民平均预期寿命</td>' +
                        '<td class="numeric-cell">岁</td>' +
                        '<td class="numeric-cell">' + lastyear[40] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[40] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">18</td>' +
                        '<td class="numeric-cell" colspan="3">婴儿死亡率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[41] + '(户)' + lastyear[42] + '(常)</td>' +
                        '<td class="numeric-cell">' + thisyear[41] + '(户)' + thisyear[42] + '(常)</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">19</td>' +
                        '<td class="numeric-cell" colspan="3">5岁以下儿童</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[43] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[43] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">20</td>' +
                        '<td class="numeric-cell" colspan="3">孕产妇死亡率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[44] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[44] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">21</td>' +
                        '<td class="numeric-cell" colspan="3">医联体数量</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[45] + '(' + lastyear[46] + ')</td>' +
                        '<td class="numeric-cell">' + thisyear[45] + '(' + thisyear[46] + ')</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">22</td>' +
                        '<td class="numeric-cell" rowspan="3">医疗改革衡量指标</td>' +
                        '<td class="numeric-cell" colspan="2">药占比</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[47] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[47] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">医疗收入增长率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[48] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[48] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">医疗耗材占比</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[49] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[49] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">23</td>' +
                        '<td class="numeric-cell" colspan="3">年度新建医院数</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[50] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[50] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">24</td>' +
                        '<td class="numeric-cell" colspan="3">年度改扩建医院数</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[51] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[51] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="16">25</td>' +
                        '<td class="numeric-cell" rowspan="16">各街镇医疗缺口</td>' +
                        '<td class="numeric-cell" colspan="2">杨行镇</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[52] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[52] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">月浦镇</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[53] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[53] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">淞南镇</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[54] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[54] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">罗泾镇</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[55] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[55] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">罗店镇</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[56] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[56] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">顾村镇</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[57] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[57] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">大场镇</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[58] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[58] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">庙行镇</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[59] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[59] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">高境镇</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[60] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[60] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">城市工业园区</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[61] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[61] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">宝山工业园区</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[62] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[62] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">航运</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[63] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[63] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">投促—友谊</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[64] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[64] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">投促—吴淞</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[65] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[65] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">投促—张庙</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[66] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[66] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">其他</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[67] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[67] + '</td>' +
                        '</tr>'
                }
                //4.5
                if (moduleId == "100") {
                    var thisy = thisyear;
                    var lastyear = [];
                    var thisyear = [];
                    $.each(data, function (i, n) {
                        var year = data[i]['t_bsqwhqkbnb685_date2'];
                        var niandu = data[i]['t_bsqwhqkbnb685_date3'];
                        // var nian2=data[i]['t_bsqcsglgzqkbyb725_date3'].slice(5,7);
                        if (year == (thisy - 1) && niandu == "全年") {
                            lastyear.push(data[i]['t_bsqwhqkbnb685_whgbdsdglbmjsssydwjbzcy4']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_zmwhhdzxhkzjngdxdzcy5']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_ggwhsyhddzcy6']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_qqwhsszsg7']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_ggwhgg8']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_jzsqwhhdzxg9']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_tsgg10']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_glbwgjngclsg11']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_cjhdsg12']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_ycyjywtg13']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_xzwhssslg14']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_xzwhssmjwpfm15']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_ggwhsszmjrjmjczrk16']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_ndqzwhhdcyrcwrc17']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_njggwhtrzjy18']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_wczdlynzdqygwcyysry19']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_hsfczjzcwcxmslg20']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_hsfczjzcwcxmzjedwy21']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_bsjdykswrc22']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_bslyxyzsry23']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_ggwhsyfzzxzjqwy24']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_whcycyfzydzjqwy25']);

                        }
                        if (year == thisyear_bannian) {
                            if (niandu == lastniandu) {
                                //thisyear.splice(0,thisyear.length);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_whgbdsdglbmjsssydwjbzcy4']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_zmwhhdzxhkzjngdxdzcy5']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_ggwhsyhddzcy6']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_qqwhsszsg7']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_ggwhgg8']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_jzsqwhhdzxg9']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_tsgg10']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_glbwgjngclsg11']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_cjhdsg12']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_ycyjywtg13']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_xzwhssslg14']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_xzwhssmjwpfm15']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_ggwhsszmjrjmjczrk16']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_ndqzwhhdcyrcwrc17']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_njggwhtrzjy18']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_wczdlynzdqygwcyysry19']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_hsfczjzcwcxmslg20']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_hsfczjzcwcxmzjedwy21']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_bsjdykswrc22']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_bslyxyzsry23']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_ggwhsyfzzxzjqwy24']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_whcycyfzydzjqwy25']);
                            }
                        }
                    });

                    str += '<tr>' +
                        '<td class="label-cell" rowspan="3">1</td>' +
                        '<td class="numeric-cell" rowspan="3">文化与传媒支出构成</td>' +
                        '<td class="numeric-cell" colspan="2">文化、广播电视等管理部门及所属事业单位基本支出</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[0] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[0] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">张庙文化活动中心、淞沪抗战纪念馆大修等支出</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[1] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[1] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">公共文化事业活动等支出</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[2] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[2] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">2</td>' +
                        '<td class="numeric-cell" colspan="3">全区文化设施总数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[3] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[3] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="6">3</td>' +
                        '<td class="numeric-cell" rowspan="6">文化设施分类</td>' +
                        '<td class="numeric-cell" colspan="2">公共文化馆</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[4] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[4] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">街镇社区文化活动中心</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[5] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[5] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">图书馆</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[6] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[6] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">各类博物馆、纪念馆、陈列室</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[7] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[7] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">村居活动室</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[8] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[8] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">一村一居一舞台</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[9] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[9] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="2">4</td>' +
                        '<td class="numeric-cell" rowspan="2">年度新增文化设施</td>' +
                        '<td class="numeric-cell" colspan="2">新增文化设施数量</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[10] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[10] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">新增文化设施面积</td>' +
                        '<td class="numeric-cell">万平方米</td>' +
                        '<td class="numeric-cell">' + lastyear[11] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[11] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">5</td>' +
                        '<td class="numeric-cell" colspan="3">公共文化设施总面积/人均面积(常住人口）</td>' +
                        '<td class="numeric-cell">平方米</td>' +
                        '<td class="numeric-cell">' + lastyear[12] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[12] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">6</td>' +
                        '<td class="numeric-cell" colspan="3">年度群众文化活动参与人次</td>' +
                        '<td class="numeric-cell">万人次</td>' +
                        '<td class="numeric-cell">' + lastyear[13] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[13] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">7</td>' +
                        '<td class="numeric-cell" colspan="3">年均公共文化投入资金</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[14] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[14] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="7">8</td>' +
                        '<td class="numeric-cell" rowspan="7">文创产业数据</td>' +
                        '<td class="numeric-cell" colspan="2">文创重点领域内重点企业共完成营业收入</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[15] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[15] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" rowspan="2">获市扶持资金支持文创项目</td>' +
                        '<td class="numeric-cell">项目数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[16] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[16] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">资金额度</td>' +
                        '<td class="numeric-cell">万元</td>' +
                        '<td class="numeric-cell">' + lastyear[17] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[17] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" rowspan="2">文旅商联动</td>' +
                        '<td class="numeric-cell">宝山接待游客数</td>' +
                        '<td class="numeric-cell">万人次</td>' +
                        '<td class="numeric-cell">' + lastyear[18] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[18] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">宝山旅游行业总收入</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[19] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[19] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" rowspan="2">区级扶持政策</td>' +
                        '<td class="numeric-cell">公共文化事业发展专项资金</td>' +
                        '<td class="numeric-cell">千万元</td>' +
                        '<td class="numeric-cell">' + lastyear[20] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[20] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">文化创意产业发展引导资金</td>' +
                        '<td class="numeric-cell">千万元</td>' +
                        '<td class="numeric-cell">' + lastyear[21] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[21] + '</td>' +
                        '</tr>'
                }
                //4.6
                if (moduleId == "101") {
                    var thisy = thisyear;
                    var lastyear = [];
                    var thisyear = [];
                    $.each(data, function (i, n) {
                        var year = data[i]['t_bsqtyqkbnb686_date2'];
                        var niandu = data[i]['t_bsqtyqkbnb686_date3'];
                        // var mon2=data[i]['t_bsqcsglgzqkbyb725_date3'].slice(5,7);
                        if (year == (thisy - 1)) {
                            lastyear.push(data[i]['t_bsqtyqkbnb686_tyglbmjsssydwjbzcy4']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_bstyzxthqmjszxddxtyssdxzcy5']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_qztyhddzcy6']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_xztyssslg7']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_xztyssmjwpfm8']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_qqtycdzsg9']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_tycdzmjpfm10']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_tycdrjmjczrkpfm11']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_jbcbqsntysshdccg12']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_jbcbqsntysshdrsg13']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_cjsjysqsntyssdcyd14']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_cjsjysqsntyssrsg15']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_cjsjysqsntysshjpsg16']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_jlyjxyrcg17']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_jlyjxypyysrcg18']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_tyjnpyzdjsrcg19']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_tyjnpyzdjsyxsg20']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_tzjkdbyxsg21']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_tzjkdbyssg22']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_ndjbgcjsshdsg23']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_ndqztyhdcyrcwrc24']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_ndtyssgykfccg25']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_ndtyssgykfsyrqsg26']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_tycyqysg27']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_tycygmwy28']);
                        }
                        if (year == thisyear_bannian) {
                            if (niandu == lastniandu) {
                                //thisyear.splice(0,thisyear.length);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_tyglbmjsssydwjbzcy4']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_bstyzxthqmjszxddxtyssdxzcy5']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_qztyhddzcy6']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_xztyssslg7']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_xztyssmjwpfm8']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_qqtycdzsg9']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_tycdzmjpfm10']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_tycdrjmjczrkpfm11']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_jbcbqsntysshdccg12']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_jbcbqsntysshdrsg13']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_cjsjysqsntyssdcyd14']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_cjsjysqsntyssrsg15']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_cjsjysqsntysshjpsg16']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_jlyjxyrcg17']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_jlyjxypyysrcg18']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_tyjnpyzdjsrcg19']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_tyjnpyzdjsyxsg20']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_tzjkdbyxsg21']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_tzjkdbyssg22']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_ndjbgcjsshdsg23']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_ndqztyhdcyrcwrc24']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_ndtyssgykfccg25']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_ndtyssgykfsyrqsg26']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_tycyqysg27']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_tycygmwy28']);
                            }
                        }
                    });

                    str += '<tr>' +
                        '<td class="label-cell" rowspan="3">1</td>' +
                        '<td class="numeric-cell" rowspan="3">体育支出构成</td>' +
                        '<td class="numeric-cell" colspan="2">体育管理部门及所属事业单位基本支出</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[0] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[0] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">宝山体育中心、通河全民健身中心等大型体育设施大修支出</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[1] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[1] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">群众体育活动等支出</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[2] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[2] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="2">2</td>' +
                        '<td class="numeric-cell" rowspan="2">年度新增体育设施</td>' +
                        '<td class="numeric-cell" colspan="2">新增体育设施数量</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[3] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[3] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">新增体育设施面积</td>' +
                        '<td class="numeric-cell">万平方米</td>' +
                        '<td class="numeric-cell">' + lastyear[4] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[4] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3</td>' +
                        '<td class="numeric-cell" colspan="3">全区体育场地总数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[5] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[5] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">4</td>' +
                        '<td class="numeric-cell" colspan="3">体育场地总面积/人均面积（常住人口）</td>' +
                        '<td class="numeric-cell">平方米</td>' +
                        '<td class="numeric-cell">' + lastyear[6] + '/' + lastyear[7] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[6] + '/' + lastyear[7] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="6">5</td>' +
                        '<td class="numeric-cell" rowspan="6">青少年体育发展</td>' +
                        '<td class="numeric-cell" rowspan="3">赛事活动</td>' +
                        '<td class="numeric-cell">举办、承办青少年体育赛事活动场次/人数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[8] + '/' + lastyear[9] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[8] + '/' + thisyear[9] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">参加市级以上青少年体育赛事的参与度</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[10] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[10] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">参加市级以上青少年体育赛事人数/获奖牌数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[11] + '/' + lastyear[12] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[11] + '/' + thisyear[12] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" rowspan="2">体育技能培训</td>' +
                        '<td class="numeric-cell">“教练员进校园”人次/培训学生人次</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[13] + '/' + lastyear[14] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[13] + '/' + thisyear[14] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">指导教师人次/学校数（次）</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[15] + '/' + lastyear[16] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[15] + '/' + thisyear[16] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">体质健康达标</td>' +
                        '<td class="numeric-cell">学校数/学生数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[17] + '/' + lastyear[18] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[17] + '/' + thisyear[18] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">6</td>' +
                        '<td class="numeric-cell" colspan="3">年度举办各层级赛事活动数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[19] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[19] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">7</td>' +
                        '<td class="numeric-cell" colspan="3">年度群众体育活动参与人次</td>' +
                        '<td class="numeric-cell">万人次</td>' +
                        '<td class="numeric-cell">' + lastyear[20] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[20] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">8</td>' +
                        '<td class="numeric-cell" colspan="3">年度体育设施公益开放场次/受益人群数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[21] + '/' + lastyear[22] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[21] + '/' + thisyear[22] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="2">9</td>' +
                        '<td class="numeric-cell" rowspan="2">体育产业数据</td>' +
                        '<td class="numeric-cell" colspan="2">体育产业企业数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[23] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[23] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">体育产业规模</td>' +
                        '<td class="numeric-cell">万元</td>' +
                        '<td class="numeric-cell">' + lastyear[24] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[24] + '</td>' +
                        '</tr>'
                }
                //4.7.1
                if (moduleId == "102") {

                    var lastyear = [];
                    var thisyearm = [];
                    var thisyearms = [];
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + jsziduan + '=' + search_condition['jsrq'] + '&' + 't_' + alias + '_shzt=已审核&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_bsqcsglgzqkbyb725_date2'] == (thisyear - 1) + "-01-01" && n['t_bsqcsglgzqkbyb725_date3'] == (thisyear - 1) + "-12-31") {
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qqwggldyzsg4']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qqqyglmjzqqcshmjbl5']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qqqyglmjzsk6']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjyxzk7']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjypzk8']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjldzk9']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjlzk10']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjgczk11']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjdczk12']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjmxzk13']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjnzk14']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjgjzk15']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjyyljdk16']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjwjdk17']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjzmjdk18']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjbsgyyqk19']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qyglmjcsgyqqk20']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qwgycyzsr21']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_qqjcgzzzsg22']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_slwgajsj23']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_slwgajjal24']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_slwgajjsl25']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_slrxgdsj26']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_slrxgdxxlxl27']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_slrxgdsjjjl28']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_slrxgdpdjsl29']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_slrxgdpdzql30']);
                                    lastyear.push(lastyedata[i]['t_bsqcsglgzqkbyb725_slrxgdhfl31']);
                                }
                            });
                            console.log(lastyear)
                        }
                    })
                    console.log(data)
                    $.each(data, function (i, n) {
                        var year = data[i]['t_bsqcsglgzqkbyb725_date3'].slice(0, 4);
                        var mon1 = data[i]['t_bsqcsglgzqkbyb725_date2'].slice(5, 7);
                        var mon2 = data[i]['t_bsqcsglgzqkbyb725_date3'].slice(5, 7);
                        // if (year == (thisyear - 1)) {
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qqwggldyzsg4']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qqqyglmjzqqcshmjbl5']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qqqyglmjzsk6']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjyxzk7']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjypzk8']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjldzk9']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjlzk10']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjgczk11']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjdczk12']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjmxzk13']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjnzk14']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjgjzk15']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjyyljdk16']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjwjdk17']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjzmjdk18']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjbsgyyqk19']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjcsgyqqk20']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qwgycyzsr21']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_qqjcgzzzsg22']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_slwgajsj23']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_slwgajjal24']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_slwgajjsl25']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdsj26']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdxxlxl27']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdsjjjl28']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdpdjsl29']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdpdzql30']);
                        //     lastyear.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdhfl31']);
                        // }
                        if (year == thisyear1 && mon1 == "01" && mon2 == lastmon) {

                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qqwggldyzsg4']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qqqyglmjzqqcshmjbl5']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qqqyglmjzsk6']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjyxzk7']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjypzk8']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjldzk9']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjlzk10']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjgczk11']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjdczk12']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjmxzk13']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjnzk14']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjgjzk15']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjyyljdk16']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjwjdk17']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjzmjdk18']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjbsgyyqk19']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjcsgyqqk20']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qwgycyzsr21']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_qqjcgzzzsg22']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_slwgajsj23']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_slwgajjal24']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_slwgajjsl25']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdsj26']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdxxlxl27']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdsjjjl28']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdpdjsl29']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdpdzql30']);
                            thisyearm.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdhfl31']);
                        } else if (year == thisyear1 && mon1 == lastmon && mon2 == lastmon) {
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qqwggldyzsg4']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qqqyglmjzqqcshmjbl5']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qqqyglmjzsk6']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjyxzk7']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjypzk8']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjldzk9']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjlzk10']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjgczk11']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjdczk12']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjmxzk13']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjnzk14']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjgjzk15']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjyyljdk16']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjwjdk17']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjzmjdk18']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjbsgyyqk19']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qyglmjcsgyqqk20']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qwgycyzsr21']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_qqjcgzzzsg22']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_slwgajsj23']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_slwgajjal24']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_slwgajjsl25']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdsj26']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdxxlxl27']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdsjjjl28']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdpdjsl29']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdpdzql30']);
                            thisyearms.push(data[i]['t_bsqcsglgzqkbyb725_slrxgdhfl31']);

                        }
                    });

                    str += '<tr>' +
                        '<td class="label-cell">1</td>' +
                        '<td class="numeric-cell" colspan="2">全区网格管理单元总数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[0] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[0] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[0] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">2</td>' +
                        '<td class="numeric-cell" colspan="2">全区区域管理面积占全区城市化面积比例</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[1] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[1] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[1] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="15">3</td>' +
                        '<td class="numeric-cell" colspan="2">全区区域管理面积总数</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[2] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[2] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[2] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-1</td>' +
                        '<td class="numeric-cell">杨行镇</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[3] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[3] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[3] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-2</td>' +
                        '<td class="numeric-cell">月浦镇</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[4] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[4] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[4] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-3</td>' +
                        '<td class="numeric-cell">罗店镇</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[5] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[5] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[5] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-4</td>' +
                        '<td class="numeric-cell">罗泾镇</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[6] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[6] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[6] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-5</td>' +
                        '<td class="numeric-cell">顾村镇</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[7] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[7] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[7] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-6</td>' +
                        '<td class="numeric-cell">大场镇</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[8] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[8] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[8] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-7</td>' +
                        '<td class="numeric-cell">庙行镇</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[9] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[9] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[9] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-8</td>' +
                        '<td class="numeric-cell">淞南镇</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[10] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[10] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[10] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-9</td>' +
                        '<td class="numeric-cell">高境镇</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[11] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[11] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[11] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-10</td>' +
                        '<td class="numeric-cell">友谊路街道</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[12] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[12] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[12] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-11</td>' +
                        '<td class="numeric-cell">吴淞街道</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[13] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[13] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[13] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-12</td>' +
                        '<td class="numeric-cell">张庙街道</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[14] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[14] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[14] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-13</td>' +
                        '<td class="numeric-cell">宝山工业园区</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[15] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[15] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[15] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3-14</td>' +
                        '<td class="numeric-cell">城市工业全区</td>' +
                        '<td class="numeric-cell">平方公里</td>' +
                        '<td class="numeric-cell">' + lastyear[16] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[16] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[16] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">4</td>' +
                        '<td class="numeric-cell" colspan="2">区网格巡查员总数</td>' +
                        '<td class="numeric-cell">人</td>' +
                        '<td class="numeric-cell">' + lastyear[17] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[17] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[17] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">5</td>' +
                        '<td class="numeric-cell" colspan="2">全区居村工作站总数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[18] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[18] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[18] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">6</td>' +
                        '<td class="numeric-cell" colspan="2">受理网格案件数</td>' +
                        '<td class="numeric-cell">件</td>' +
                        '<td class="numeric-cell">' + lastyear[19] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[19] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[19] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">7</td>' +
                        '<td class="numeric-cell" colspan="2">受理网格案件结案率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[20] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[20] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[20] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">8</td>' +
                        '<td class="numeric-cell" colspan="2">受理网格案件及时率</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[21] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[21] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[21] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">9</td>' +
                        '<td class="numeric-cell" colspan="2">受理热线工单数</td>' +
                        '<td class="numeric-cell">件</td>' +
                        '<td class="numeric-cell">' + lastyear[22] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[22] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[22] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">10</td>' +
                        '<td class="numeric-cell" colspan="2">受理热线工单先行联系率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[23] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[23] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[23] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">11</td>' +
                        '<td class="numeric-cell" colspan="2">受理热线工单实际解决率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[24] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[24] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[24] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">12</td>' +
                        '<td class="numeric-cell" colspan="2">受理热线工单派单及时率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[25] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[25] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[25] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">13</td>' +
                        '<td class="numeric-cell" colspan="2">受理热线工单派单准确率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[26] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[26] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[26] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">14</td>' +
                        '<td class="numeric-cell" colspan="2">受理热线工单回访率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[27] + '</td>' +
                        '<td class="numeric-cell">' + thisyearm[27] + '</td>' +
                        '<td class="numeric-cell">' + thisyearms[27] + '</td>' +
                        '</tr>'
                }
                //4.7.2        
                if (moduleId == "103") {
                    var myDate = new Date();
                    var year = myDate.getFullYear();
                    var month = (myDate.getMonth() + 1);
                    var last = {},
                        thisyear = {};
                    var num1 = 0,
                        num2 = 0;
                    $.each(data, function (i, n) {
                        if (n['t_bsqpasfcjqkbnb661_nd2'] == (year - 1)) {
                            last[num1] = n
                            num1++
                        }
                        if (n['t_bsqpasfcjqkbnb661_nd2'] == year) {
                            thisyear[num2] = n;
                            num2++
                        }
                    });
                    var empty = $.isEmptyObject(thisyear); // 判断是否为空
                    var empty1 = $.isEmptyObject(last);
                    if (empty1 && !empty) {
                        $.each(thisyear, function (i, n) {
                            str += '<tr>' +
                                '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqpasfcjqkbnb661_jzyq3'] + '</td>' +
                                '<td class="numeric-cell">' + (year - 1) + '</td>' +
                                ' <td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                ' <td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '</tr>'
                            str += '<tr>' +
                                '<td class="numeric-cell">' + year + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_spasfsqcjqk4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_spasqcjqk5'] + '</td>' +
                                ' <td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_qpasfxqcjl6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_qpaxqcjl7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_pazyzdwzcrszczrkbl8'] + '</td>' +
                                '</tr>'

                        });
                    } else {
                        $.each(last, function (i, n) {
                            if (empty) {
                                str += '<tr>' +
                                    '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqpasfcjqkbnb661_jzyq3'] + '</td>' +
                                    '<td class="numeric-cell">' + (year - 1) + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_spasfsqcjqk4'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_spasqcjqk5'] + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_qpasfxqcjl6'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_qpaxqcjl7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_pazyzdwzcrszczrkbl8'] + '</td>' +
                                    '</tr>'
                                str += '<tr>' +
                                    '<td class="numeric-cell">' + year + '</td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    ' <td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '</tr>'
                            } else {
                                // console.log(thisyear)
                                str += '<tr>' +
                                    '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqpasfcjqkbnb661_jzyq3'] + '</td>' +
                                    '<td class="numeric-cell">' + (year - 1) + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_spasfsqcjqk4'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_spasqcjqk5'] + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_qpasfxqcjl6'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_qpaxqcjl7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_pazyzdwzcrszczrkbl8'] + '</td>' +
                                    '</tr>'
                                if ($.isEmptyObject(thisyear[i])) {
                                    str += '<tr>' +
                                        '<td class="numeric-cell">' + year + '</td>' +
                                        '<td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        ' <td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        '</tr>'
                                } else {
                                    str += '<tr>' +
                                        '<td class="numeric-cell">' + year + '</td>' +
                                        '<td class="numeric-cell">' + thisyear[i]['t_bsqpasfcjqkbnb661_spasfsqcjqk4'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyear[i]['t_bsqpasfcjqkbnb661_spasqcjqk5'] + '</td>' +
                                        ' <td class="numeric-cell">' + thisyear[i]['t_bsqpasfcjqkbnb661_qpasfxqcjl6'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyear[i]['t_bsqpasfcjqkbnb661_qpaxqcjl7'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyear[i]['t_bsqpasfcjqkbnb661_pazyzdwzcrszczrkbl8'] + '</td>' +
                                        '</tr>'
                                }
                            }
                        });
                    }
                }
                //4.7.3
                if (moduleId == "104") {
                    var myDate = new Date();
                    var year = myDate.getFullYear();
                    var lastyear = year - 1;
                    var lastar = {};
                    var thismonthes = {};
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + "-12-31";
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + jsziduan + '=' + search_condition['jsrq'] + '&' + 't_' + alias + '_shzt=已审核&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_bsqrkqkbyb722_date3'] == lastyear + "-12-31" && n['t_bsqrkqkbyb722_date2'] == lastyear + '-01-01') {
                                    lastar = n;
                                    //console.log(lastar)
                                }
                            });
                            console.log(lastyear)
                        }
                    })
                    $.each(data, function (i, n) {
                        // if (data[i]['t_bsqrkqkbyb722_date3'] == lastyear + "-12-31" && data[i]['t_bsqrkqkbyb722_date2'] == lastyear + '-01-01') {
                        //     lastar = data[i];
                        //     //console.log(lastar)
                        // }
                        if (data[i]['t_bsqrkqkbyb722_date3'].slice(0, 7) == thisyear1 + '-' + lastmon && data[i]['t_bsqrkqkbyb722_date2'].slice(0, 7) == thisyear1 + "-01") {

                            thismonthes = data[i];
                            // console.log(thismonthes)
                        }
                    });
                    str += '<tr>' +
                        '<td class="label-cell" rowspan="3">全区</td>' +
                        '<td class="numeric-cell">' + lastyear + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrksqq4'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhrysqq20'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + thisyear1 + '年1-' + lastmon + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrksqq4'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhrysqq20'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">杨行镇</td>' +
                        '<td class="numeric-cell">' + lastyear + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrksyxz5'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhrysyxz21'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + thisyear1 + '年1-' + lastmon + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrksyxz5'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhrysyxz21'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">月浦镇</td>' +
                        '<td class="numeric-cell">' + lastyear + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrksypz6'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhrysypz22'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + thisyear1 + '年1-' + lastmon + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrksypz6'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhrysypz22'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">罗泾镇</td>' +
                        '<td class="numeric-cell">' + lastyear + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrkslz7'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhryslz23'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + thisyear1 + '年1-' + lastmon + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrkslz7'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhryslz23'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">宝山工业园区</td>' +
                        '<td class="numeric-cell">' + lastyear + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrksbsgyyq8'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhrysbsgyyq24'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + thisyear1 + '年1-' + lastmon + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrksbsgyyq8'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhrysbsgyyq24'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">罗店镇</td>' +
                        '<td class="numeric-cell">' + lastyear + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrksldz9'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhrysldz25'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + thisyear1 + '年1-' + lastmon + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrksldz9'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhrysldz25'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">顾村镇</td>' +
                        '<td class="numeric-cell">' + lastyear + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrksgcz10'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhrysgcz26'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + thisyear1 + '年1-' + lastmon + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrksgcz10'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhrysgcz26'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">庙行镇</td>' +
                        '<td class="numeric-cell">' + lastyear + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrksmxz11'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhrysmxz27'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + thisyear1 + '年1-' + lastmon + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrksmxz11'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhrysmxz27'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">淞南镇</td>' +
                        '<td class="numeric-cell">' + lastyear + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrksnz12'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhrysnz28'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + thisyear1 + '年1-' + lastmon + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrksnz12'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhrysnz28'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">高境镇</td>' +
                        '<td class="numeric-cell">' + lastyear + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrksgjz13'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhrysgjz29'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + thisyear1 + '年1-' + lastmon + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrksgjz13'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhrysgjz29'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">友谊路街道</td>' +
                        '<td class="numeric-cell">' + lastyear + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrksyyljd14'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhrysyyljd30'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + thisyear1 + '年1-' + lastmon + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrksyyljd14'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhrysyyljd30'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">吴淞街道</td>' +
                        '<td class="numeric-cell">' + lastyear + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrkswjd15'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhryswjd31'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + thisyear1 + '年1-' + lastmon + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrkswjd15'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhryswjd31'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">张庙街道</td>' +
                        '<td class="numeric-cell">' + lastyear + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrkszmjd16'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhryszmjd32'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + thisyear1 + '年1-' + lastmon + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrkszmjd16'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhryszmjd32'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">大场镇</td>' +
                        '<td class="numeric-cell">' + lastyear + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrksdcz17'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhrysdcz33'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + thisyear1 + '年1-' + lastmon + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrksdcz17'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhrysdcz33'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">城市工业园区</td>' +
                        '<td class="numeric-cell">' + lastyear + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrkscsgyyq18'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhryscsgyyq34'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + thisyear1 + '年1-' + lastmon + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrkscsgyyq18'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhryscsgyyq34'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">农场</td>' +
                        '<td class="numeric-cell">' + lastyear + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_czrksnc19'] + '</td>' +
                        '<td class="numeric-cell">' + lastar['t_bsqrkqkbyb722_lhrysnc35'] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">目标数</td>' +
                        '<td class="numeric-cell"></td>' +
                        '<td class="numeric-cell"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">' + thisyear1 + '年1-' + lastmon + '月</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_czrksnc19'] + '</td>' +
                        '<td class="numeric-cell">' + thismonthes['t_bsqrkqkbyb722_lhrysnc35'] + '</td>' +
                        '</tr>'
                }
                //4.7.4
                if (moduleId == "105") {
                    var myDate = new Date();
                    var year = myDate.getFullYear();
                    var month = (myDate.getMonth() + 1);
                    var last = {},
                        thisyear = {};
                    var num1 = 0,
                        num2 = 0;
                    $.each(data, function (i, n) {
                        if (n['t_bsqspjkqkbnb689_nd2'] == (year - 1)) {
                            last[num1] = n
                            num1++
                        }
                        if (n['t_bsqspjkqkbnb689_nd2'] == year) {
                            thisyear[num2] = n;
                            num2++
                        }
                    });
                    var empty = $.isEmptyObject(thisyear); // 判断是否为空
                    var empty1 = $.isEmptyObject(last);
                    if (empty1 && !empty) {
                        $.each(thisyear, function (i, n) {
                            str += '<tr>' +
                                '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqspjkqkbnb689_jzyq3'] + '</td>' +
                                '<td class="numeric-cell">' + (year - 1) + '</td>' +
                                ' <td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '</tr>'
                            str += '<tr>' +
                                '<td class="numeric-cell">' + year + '</td>' +
                                ' <td class="numeric-cell">' + n['t_bsqspjkqkbnb689_spjkdsg4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspjkqkbnb689_ncdqspjkczfgl5'] + '</td>' +
                                '</tr>'

                        });
                    } else {
                        $.each(last, function (i, n) {
                            if (empty) {
                                str += '<tr>' +
                                    '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqspjkqkbnb689_jzyq3'] + '</td>' +
                                    '<td class="numeric-cell">' + (year - 1) + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqspjkqkbnb689_spjkdsg4'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqspjkqkbnb689_ncdqspjkczfgl5'] + '</td>' +
                                    '</tr>'
                                str += '<tr>' +
                                    '<td class="numeric-cell">' + year + '</td>' +
                                    ' <td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '</tr>'
                            } else {
                                //console.log(thisyear)
                                str += '<tr>' +
                                    '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqspjkqkbnb689_jzyq3'] + '</td>' +
                                    '<td class="numeric-cell">' + (year - 1) + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqspjkqkbnb689_spjkdsg4'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqspjkqkbnb689_ncdqspjkczfgl5'] + '</td>' +
                                    '</tr>'
                                if ($.isEmptyObject(thisyear[i])) {
                                    str += '<tr>' +
                                        '<td class="numeric-cell">' + year + '</td>' +
                                        ' <td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        '</tr>'
                                } else {
                                    str += '<tr>' +
                                        '<td class="numeric-cell">' + year + '</td>' +
                                        ' <td class="numeric-cell">' + thisyear[i]['t_bsqspjkqkbnb689_spjkdsg4'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyear[i]['t_bsqspjkqkbnb689_ncdqspjkczfgl5'] + '</td>' +
                                        '</tr>'
                                }
                            }
                        });
                    }
                }
                //4.8.1
                if (moduleId == "106") {
                    var myDate = new Date();
                    var year = myDate.getFullYear();
                    var lastdata = {},
                        thisyeardata = {};
                    var num1 = 0,
                        num2 = 0;
                    $.each(data, function (i, n) {
                        if (n['t_bsqaqscqkbbnb690_date2'] == (year - 1)) {
                            lastdata[num1] = n
                            num1++
                        }
                        if (n['t_bsqaqscqkbbnb690_date2'] == thisyear_bannian && n['t_bsqaqscqkbbnb690_date3'] == lastniandu) {
                            thisyeardata[num2] = n;
                            num2++
                        }
                    });
                    var empty = $.isEmptyObject(thisyeardata); // 判断是否为空
                    var empty1 = $.isEmptyObject(lastdata);
                    if (empty1 && !empty) {
                        $.each(thisyeardata, function (i, n) {
                            str += '<tr>' +
                                '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqaqscqkbbnb690_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + (year - 1) + '年</td>' +
                                ' <td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                ' <td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '</tr>'
                            str += '<tr>' +
                                '<td class="numeric-cell">' + thisyear_bannian + '年' + lastniandu_months + '</td>' +
                                ' <td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_whscjyqysg5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_zdwxysg6'] + '</td>' +
                                ' <td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_zdjgqysh7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_zdsgyhqjgpdbsj8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_scaqswsgsj9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_gksmjyryswrscaqsgswl10'] + '</td>' +
                                '</tr>'

                        });
                    } else {
                        $.each(lastdata, function (i, n) {
                            if (empty) {
                                str += '<tr>' +
                                    '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqaqscqkbbnb690_jzyq4'] + '</td>' +
                                    '<td class="numeric-cell">' + (year - 1) + '年</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_whscjyqysg5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_zdwxysg6'] + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_zdjgqysh7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_zdsgyhqjgpdbsj8'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_scaqswsgsj9'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_gksmjyryswrscaqsgswl10'] + '</td>' +
                                    '</tr>'
                                str += '<tr>' +
                                    '<td class="numeric-cell">' + thisyear_bannian + '年' + lastniandu_months + '</td>' +
                                    ' <td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    ' <td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '</tr>'
                            } else {
                                str += '<tr>' +
                                    '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqaqscqkbbnb690_jzyq4'] + '</td>' +
                                    '<td class="numeric-cell">' + (year - 1) + '年</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_whscjyqysg5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_zdwxysg6'] + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_zdjgqysh7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_zdsgyhqjgpdbsj8'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_scaqswsgsj9'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_gksmjyryswrscaqsgswl10'] + '</td>' +
                                    '</tr>'
                                if ($.isEmptyObject(thisyeardata[i])) {
                                    str += '<tr>' +
                                        '<td class="numeric-cell">' + thisyear_bannian + '年' + lastniandu_months + '</td>' +
                                        ' <td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        ' <td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        '</tr>'
                                } else {
                                    str += '<tr>' +
                                        '<td class="numeric-cell">' + thisyear_bannian + '年' + lastniandu_months + '</td>' +
                                        ' <td class="numeric-cell">' + thisyeardata[i]['t_bsqaqscqkbbnb690_whscjyqysg5'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyeardata[i]['t_bsqaqscqkbbnb690_zdwxysg6'] + '</td>' +
                                        ' <td class="numeric-cell">' + thisyeardata[i]['t_bsqaqscqkbbnb690_zdjgqysh7'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyeardata[i]['t_bsqaqscqkbbnb690_zdsgyhqjgpdbsj8'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyeardata[i]['t_bsqaqscqkbbnb690_scaqswsgsj9'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyeardata[i]['t_bsqaqscqkbbnb690_gksmjyryswrscaqsgswl10'] + '</td>' +
                                        '</tr>'
                                }
                            }
                        });
                    }

                }
                //4.8.2
                if (moduleId == "107") {
                    var myDate = new Date();
                    var year = myDate.getFullYear();
                    var lastdata = {},
                        thisyeardata = {};
                    var num1 = 0,
                        num2 = 0;
                    $.each(data, function (i, n) {
                        if (n['t_bsqyzjdqkbbnb665_date2'] == (year - 1)) {
                            lastdata[num1] = n
                            num1++
                        }
                        if (n['t_bsqyzjdqkbbnb665_date2'] == thisyear_bannian && n['t_bsqyzjdqkbbnb665_date3'] == lastniandu) {
                            thisyeardata[num2] = n;
                            num2++
                        }
                    });
                    var empty = $.isEmptyObject(thisyeardata); // 判断是否为空
                    var empty1 = $.isEmptyObject(lastdata);
                    if (empty1 && !empty) {
                        $.each(thisyeardata, function (i, n) {
                            str += '<tr>' +
                                '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqyzjdqkbbnb665_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + (year - 1) + '年</td>' +
                                ' <td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                ' <td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                ' <td class="numeric-cell"></td>' +
                                '</tr>'
                            str += '<tr>' +
                                '<td class="numeric-cell">' + thisyear_bannian + '年' + lastniandu_months + '</td>' +
                                ' <td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_zxsbzzqysh5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_zjzjgdg6'] + '</td>' +
                                ' <td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_wxpmtsg7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_tzsbsg8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_tzsbzgsg9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_dxkjsg10'] + '</td>' +
                                ' <td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_jmscsg11'] + '</td>' +
                                '</tr>'
                        });
                    } else {
                        $.each(lastdata, function (i, n) {
                            if (empty) {
                                str += '<tr>' +
                                    '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqyzjdqkbbnb665_jzyq4'] + '</td>' +
                                    '<td class="numeric-cell">' + (year - 1) + '年</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_zxsbzzqysh5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_zjzjgdg6'] + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_wxpmtsg7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_tzsbsg8'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_tzsbzgsg9'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_dxkjsg10'] + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_jmscsg11'] + '</td>' +
                                    '</tr>'
                                str += '<tr>' +
                                    '<td class="numeric-cell">' + thisyear_bannian + '年' + lastniandu_months + '</td>' +
                                    ' <td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    ' <td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    ' <td class="numeric-cell"></td>' +
                                    '</tr>'
                            } else {
                                str += '<tr>' +
                                    '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqyzjdqkbbnb665_jzyq4'] + '</td>' +
                                    '<td class="numeric-cell">' + (year - 1) + '年</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_zxsbzzqysh5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_zjzjgdg6'] + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_wxpmtsg7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_tzsbsg8'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_tzsbzgsg9'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_dxkjsg10'] + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_jmscsg11'] + '</td>' +
                                    '</tr>'
                                if ($.isEmptyObject(thisyeardata[i])) {
                                    str += '<tr>' +
                                        '<td class="numeric-cell">' + thisyear_bannian + '年' + lastniandu_months + '</td>' +
                                        ' <td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        ' <td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        ' <td class="numeric-cell"></td>' +
                                        '</tr>'
                                } else {
                                    str += '<tr>' +
                                        '<td class="numeric-cell">' + thisyear_bannian + '年' + lastniandu_months + '</td>' +
                                        ' <td class="numeric-cell">' + thisyeardata[i]['t_bsqyzjdqkbbnb665_zxsbzzqysh5'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyeardata[i]['t_bsqyzjdqkbbnb665_zjzjgdg6'] + '</td>' +
                                        ' <td class="numeric-cell">' + thisyeardata[i]['t_bsqyzjdqkbbnb665_wxpmtsg7'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyeardata[i]['t_bsqyzjdqkbbnb665_tzsbsg8'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyeardata[i]['t_bsqyzjdqkbbnb665_tzsbzgsg9'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyeardata[i]['t_bsqyzjdqkbbnb665_dxkjsg10'] + '</td>' +
                                        ' <td class="numeric-cell">' + thisyeardata[i]['t_bsqyzjdqkbbnb665_jmscsg11'] + '</td>' +
                                        '</tr>'
                                }
                            }
                        });
                    }

                }
                //4.8.3
                if (moduleId == "108") {
                    var myDate = new Date();
                    var year = myDate.getFullYear();
                    //  console.log(data)
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + '-' + (search_condition['jsrq'].substr(5, 10));
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + jsziduan + '=' + search_condition['jsrq'] + '&' + 't_' + alias + '_shzt=已审核&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {

                                data.push(n);


                            });
                            console.log(lastyear)
                        }
                    })
                    beizhu = "备注：";
                    console.log(data)
                    $.each(data, function (i, n) {
                        if (n['t_bsqajqkbyb666_date3'].slice(0, 7) == (year - 1) + "-" + lastmon && n['t_bsqajqkbyb666_date2'].slice(0, 7) == (year - 1) + "-01") {
                            str += '<tr>' +
                                '<td class="numeric-cell">' + (year - 1) + '.' + lastmon + '</td>' +
                                ' <td class="numeric-cell">' + n['t_bsqajqkbyb666_xsajsj4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqajqkbyb666_maxsajsj5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqajqkbyb666_maxsajphl6'] + '</td>' +
                                '</tr>'
                        }
                        if (n['t_bsqajqkbyb666_date3'].slice(0, 7) == (thisyear1) + "-" + lastmon && n['t_bsqajqkbyb666_date2'].slice(0, 7) == (thisyear1) + "-01") {
                            str += '<tr>' +
                                '<td class="label-cell"  rowspan="2">全区</td>' +
                                '<td class="numeric-cell">' + (year) + '.' + lastmon + '</td>' +
                                ' <td class="numeric-cell">' + n['t_bsqajqkbyb666_xsajsj4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqajqkbyb666_maxsajsj5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqajqkbyb666_maxsajphl6'] + '</td>' +
                                '</tr>'
                            beizhu += n['t_bsqajqkbyb666_bz7'];
                        }
                    })
                    if (str == "") {
                        str += '<tr>' +
                            '<td class="label-cell"  rowspan="2">全区</td>' +
                            '<td class="numeric-cell">' + (year - 1) + '.' + lastmon + '</td>' +
                            ' <td class="numeric-cell"></td>' +
                            '<td class="numeric-cell"></td>' +
                            '<td class="numeric-cell"></td>' +
                            '</tr>'
                        str += '<tr>' +
                            '<td class="numeric-cell">' + (year) + '.' + lastmon + '</td>' +
                            ' <td class="numeric-cell"></td>' +
                            '<td class="numeric-cell"></td>' +
                            '<td class="numeric-cell"></td>' +
                            '</tr>'
                    }
                }
                //4.8.4
                if (moduleId == "109") {
                    var myDate = new Date();
                    var year = myDate.getFullYear();
                    var month = (myDate.getMonth() + 1);
                    var lastdata = {},
                        thisyeardata = {};
                    var num1 = 0,
                        num2 = 0;
                    $.each(data, function (i, n) {
                        if (n['t_bsqsyrkjlqkbnb723_nd2'] == (year - 1)) {
                            lastdata[num1] = n
                            num1++
                        }
                        if (n['t_bsqsyrkjlqkbnb723_nd2'] == year) {
                            thisyeardata[num2] = n;
                            num2++
                        }
                    });
                    var empty = $.isEmptyObject(thisyeardata); // 判断是否为空
                    var empty1 = $.isEmptyObject(lastdata);
                    if (empty1 && !empty) {
                        $.each(thisyeardata, function (i, n) {
                            str += '<tr>' +
                                '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqsyrkjlqkbnb723_jzyq3'] + '</td>' +
                                '<td class="numeric-cell">' + (year - 1) + '</td>' +
                                ' <td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                ' <td class="numeric-cell"></td>' +
                                '</tr>'
                            str += '<tr>' +
                                '<td class="numeric-cell">' + year + '</td>' +
                                ' <td class="numeric-cell">' + n['t_bsqsyrkjlqkbnb723_syrksr4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqsyrkjlqkbnb723_bjlskrkwrjjsj5'] + '</td>' +
                                ' <td class="numeric-cell">' + n['t_bsqsyrkjlqkbnb723_pcssyrkwrjlsr6'] + '</td>' +
                                '</tr>'

                        });
                    } else {
                        $.each(lastdata, function (i, n) {
                            if (empty) {
                                str += '<tr>' +
                                    '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqsyrkjlqkbnb723_jzyq3'] + '</td>' +
                                    '<td class="numeric-cell">' + (year - 1) + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqsyrkjlqkbnb723_syrksr4'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqsyrkjlqkbnb723_bjlskrkwrjjsj5'] + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqsyrkjlqkbnb723_pcssyrkwrjlsr6'] + '</td>' +
                                    '</tr>'
                                str += '<tr>' +
                                    '<td class="numeric-cell">' + year + '</td>' +
                                    ' <td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    ' <td class="numeric-cell"></td>' +
                                    '</tr>'
                            } else {

                                str += '<tr>' +
                                    '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqsyrkjlqkbnb723_jzyq3'] + '</td>' +
                                    '<td class="numeric-cell">' + (year - 1) + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqsyrkjlqkbnb723_syrksr4'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqsyrkjlqkbnb723_bjlskrkwrjjsj5'] + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqsyrkjlqkbnb723_pcssyrkwrjlsr6'] + '</td>' +
                                    '</tr>'
                                if ($.isEmptyObject(thisyeardata[i])) {
                                    str += '<tr>' +
                                        '<td class="numeric-cell">' + year + '</td>' +
                                        ' <td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        ' <td class="numeric-cell"></td>' +
                                        '</tr>'
                                } else {
                                    str += '<tr>' +
                                        '<td class="numeric-cell">' + year + '</td>' +
                                        ' <td class="numeric-cell">' + thisyeardata[i]['t_bsqsyrkjlqkbnb723_syrksr4'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyeardata[i]['t_bsqsyrkjlqkbnb723_bjlskrkwrjjsj5'] + '</td>' +
                                        ' <td class="numeric-cell">' + thisyeardata[i]['t_bsqsyrkjlqkbnb723_pcssyrkwrjlsr6'] + '</td>' +
                                        '</tr>'
                                }
                            }
                        });
                    }

                }
                //4.8.5
                if (moduleId == "110") {
                    var myDate = new Date();
                    var year = myDate.getFullYear();
                    var month = (myDate.getMonth() + 1);
                    var lastdata = {},
                        thismonthdata = {};
                    var num1 = 0,
                        num2 = 0;
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + '-12-31';
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + jsziduan + '=' + search_condition['jsrq'] + '&' + 't_' + alias + '_shzt=已审核&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_bsqhzsgqkbyb668_date2'] == (year - 1) + "-01-01" && n['t_bsqhzsgqkbyb668_date3'] == (year - 1) + "-12-31") {
                                    lastdata[i] = n
                                    //num1++
                                }
                            });
                            console.log(lastyear)
                        }
                    })
                    $.each(data, function (i, n) {
                        // if (n['t_bsqhzsgqkbyb668_date2'] == (year - 1) + "-01-01" && n['t_bsqhzsgqkbyb668_date3'] == (year - 1) + "-12-31") {
                        //     lastdata[num1] = n
                        //     num1++
                        // }
                        if (n['t_bsqhzsgqkbyb668_date2'].slice(0, 7) == thisyear1 + "-01" && n['t_bsqhzsgqkbyb668_date3'].slice(0, 7) == thisyear1 + "-" + lastmon) {
                            thismonthdata[num2] = n;
                            num2++
                        }
                    });
                    var empty = $.isEmptyObject(thismonthdata); // 判断是否为空
                    var empty1 = $.isEmptyObject(lastdata);
                    if (empty1 && !empty) {
                        $.each(thismonthdata, function (i, n) {

                            str += '<tr>' +
                                '<td class="label-cell" rowspan="2" colspan="2">' + n['t_bsqhzsgqkbyb668_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + (year - 1) + '年</td>' +
                                '<td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '</tr>'
                            str += '<tr>' +
                                '<td class="numeric-cell">' + thisyear + '年1月-' + lastmon + '月</td>' +
                                '<td class="numeric-cell">' + n['t_bsqhzsgqkbyb668_hzsgsj5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqhzsgqkbyb668_hzyhzgsc6'] + '</td>' +
                                '</tr>'

                        });
                    } else {
                        $.each(lastdata, function (i, n) {
                            if (empty) {
                                str += '<tr>' +
                                    '<td class="label-cell" rowspan="2" colspan="2">' + n['t_bsqhzsgqkbyb668_jzyq4'] + '</td>' +
                                    '<td class="numeric-cell">' + (year - 1) + '年</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqhzsgqkbyb668_hzsgsj5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqhzsgqkbyb668_hzyhzgsc6'] + '</td>' +
                                    '</tr>'
                                str += '<tr>' +
                                    '<td class="numeric-cell">' + thisyear + '年1月-' + lastmon + '月</td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '</tr>'
                            } else {
                                str += '<tr>' +
                                    '<td class="label-cell" rowspan="2" colspan="2">' + n['t_bsqhzsgqkbyb668_jzyq4'] + '</td>' +
                                    '<td class="numeric-cell">' + (year - 1) + '年</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqhzsgqkbyb668_hzsgsj5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqhzsgqkbyb668_hzyhzgsc6'] + '</td>' +
                                    '</tr>'
                                str += '<tr>' +
                                    '<td class="numeric-cell">' + thisyear + '年1月-' + lastmon + '月</td>' +
                                    '<td class="numeric-cell">' + thismonthdata[i]['t_bsqhzsgqkbyb668_hzsgsj5'] + '</td>' +
                                    '<td class="numeric-cell">' + thismonthdata[i]['t_bsqhzsgqkbyb668_hzyhzgsc6'] + '</td>' +
                                    '</tr>'
                            }
                        });
                    }
                }
                //4.8.6
                if (moduleId == "111") {
                    var myDate = new Date();
                    var year = myDate.getFullYear();
                    var lastdata = {},
                        thisyeardata = {};
                    $.each(data, function (i, n) {
                        if (n['t_bsqjtsgqkbnb669_nd2'] == (year - 1)) {
                            lastdata = n
                        }
                    })
                    $.each(data, function (i, n) {
                        if (n['t_bsqjtsgqkbnb669_nd2'] == (year)) {
                            thisyeardata = n
                        }
                    })
                    var empty = $.isEmptyObject(thisyeardata); // 判断是否为空
                    var empty1 = $.isEmptyObject(lastdata);
                    if (!empty1) {
                        str += '<tr>' +
                            '<td class="label-cell"  rowspan="2">全区</td>' +
                            '<td class="numeric-cell">' + (year - 1) + '</td>' +
                            ' <td class="numeric-cell">' + lastdata['t_bsqjtsgqkbnb669_dljtsgsj3'] + '</td>' +
                            '<td class="numeric-cell">' + lastdata['t_bsqjtsgqkbnb669_jtsgswrsr4'] + '</td>' +
                            '</tr>'
                    } else {
                        str += '<tr>' +
                            '<td class="label-cell"  rowspan="2">全区</td>' +
                            '<td class="numeric-cell">' + (year - 1) + '</td>' +
                            ' <td class="numeric-cell"></td>' +
                            '<td class="numeric-cell"></td>' +
                            '</tr>'
                    }
                    if (!empty) {
                        str += '<tr>' +
                            '<td class="numeric-cell">' + year + '</td>' +
                            ' <td class="numeric-cell">' + thisyeardata['t_bsqjtsgqkbnb669_dljtsgsj3'] + '</td>' +
                            '<td class="numeric-cell">' + thisyeardata['t_bsqjtsgqkbnb669_jtsgswrsr4'] + '</td>' +
                            '</tr>'
                    } else {
                        str += '<tr>' +
                            '<td class="numeric-cell">' + year + '</td>' +
                            ' <td class="numeric-cell"></td>' +
                            '<td class="numeric-cell"></td>' +
                            '</tr>'
                    }

                    if (str == "") {
                        str += '<tr>' +
                            '<td class="label-cell"  rowspan="2">全区</td>' +
                            '<td class="numeric-cell">' + (year - 1) + '.' + lastmon + '</td>' +
                            ' <td class="numeric-cell"></td>' +
                            '<td class="numeric-cell"></td>' +
                            '<td class="numeric-cell"></td>' +
                            '</tr>'
                        str += '<tr>'

                            +
                            '<td class="numeric-cell">' + (year) + '.' + lastmon + '</td>' +
                            ' <td class="numeric-cell"></td>' +
                            '<td class="numeric-cell"></td>' +
                            '<td class="numeric-cell"></td>' +
                            '</tr>'


                    }

                }
                //4.8.7
                if (moduleId == "112") {
                    var myDate = new Date();
                    var year = myDate.getFullYear();
                    var month = (myDate.getMonth() + 1);
                    var lastdata = {},
                        thismonthdata = {};
                    var num1 = 0,
                        num2 = 0;
                    search_condition['jsrq'] = (search_condition['jsrq'].substr(0, 4) - 1) + '-12-31';
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?' + jsziduan + '=' + search_condition['jsrq'] + '&' + 't_' + alias + '_shzt=已审核&token=' + localStorage.token,
                        //contentType:"json",
                        data: {
                            bpmDataTemplatep: '1',
                            bpmDataTemplatez: '1000',
                            bpmDataTemplateoz: '1000',
                            bpmDataTemplate__ns__: 't_' + alias + '_ID',
                            bpmDataTemplateo: "ASC",

                        },
                        dataType: 'json',
                        beforeSend: function () {
                            myApp.showPreloader();
                        },
                        complete: function () {
                            myApp.hidePreloader();
                        },
                        success: function (data1) {
                            var data1 = data1.bpmDataTemplate.list;
                            lastyedata = data1;
                            $.each(lastyedata, function (i, n) {
                                if (n['t_bsqspaqqkbyb670_date2'] == (year - 1) + "-01-01" && n['t_bsqspaqqkbyb670_date3'] == (year - 1) + "-12-31") {
                                    lastdata[i] = n

                                }
                            });
                            console.log(lastyear)
                        }
                    })
                    $.each(data, function (i, n) {
                        if (n['t_bsqspaqqkbyb670_date2'] == (year - 1) + "-01-01" && n['t_bsqspaqqkbyb670_date3'] == (year - 1) + "-12-31") {
                            lastdata[num1] = n
                            num1++
                        }
                        if (n['t_bsqspaqqkbyb670_date2'].slice(0, 7) == thisyear1 + "-01" && n['t_bsqspaqqkbyb670_date3'].slice(0, 7) == thisyear1 + "-" + lastmon) {
                            thismonthdata[num2] = n;
                            num2++
                        }
                    });
                    var empty = $.isEmptyObject(thismonthdata); // 判断是否为空
                    var empty1 = $.isEmptyObject(lastdata);
                    if (empty1 && !empty) {
                        $.each(thismonthdata, function (i, n) {

                            str += '<tr>' +
                                '<td class="label-cell" rowspan="2" colspan="2">' + n['t_bsqspaqqkbyb670_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + (year - 1) + '年</td>' +
                                '<td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '</tr>'
                            str += '<tr>' +
                                '<td class="numeric-cell">' + thisyear1 + '年1-' + lastmon + '月</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_splajsj5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_spscqysh6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_zzxcwzwzspscjyhsh7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_zyspfxjccys8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_ypzljdxcjcys9'] + '</td>' +
                                '</tr>'
                        });
                    } else {
                        $.each(lastdata, function (i, n) {
                            if (empty) {
                                str += '<tr>' +
                                    '<td class="label-cell" rowspan="2" colspan="2">' + n['t_bsqspaqqkbyb670_jzyq4'] + '</td>' +
                                    '<td class="numeric-cell">' + (year - 1) + '年</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_splajsj5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_spscqysh6'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_zzxcwzwzspscjyhsh7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_zyspfxjccys8'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_ypzljdxcjcys9'] + '</td>' +
                                    '</tr>'
                                str += '<tr>' +
                                    '<td class="numeric-cell">' + thisyear1 + '年1-' + lastmon + '月</td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '</tr>'
                            } else {
                                str += '<tr>' +
                                    '<td class="label-cell" rowspan="2" colspan="2">' + n['t_bsqspaqqkbyb670_jzyq4'] + '</td>' +
                                    '<td class="numeric-cell">' + (year - 1) + '年</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_splajsj5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_spscqysh6'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_zzxcwzwzspscjyhsh7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_zyspfxjccys8'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqspaqqkbyb670_ypzljdxcjcys9'] + '</td>' +
                                    '</tr>'
                                str += '<tr>' +
                                    '<td class="numeric-cell">' + thisyear1 + '年1-' + lastmon + '月</td>' +
                                    '<td class="numeric-cell">' + thismonthdata[i]['t_bsqspaqqkbyb670_splajsj5'] + '</td>' +
                                    '<td class="numeric-cell">' + thismonthdata[i]['t_bsqspaqqkbyb670_spscqysh6'] + '</td>' +
                                    '<td class="numeric-cell">' + thismonthdata[i]['t_bsqspaqqkbyb670_zzxcwzwzspscjyhsh7'] + '</td>' +
                                    '<td class="numeric-cell">' + thismonthdata[i]['t_bsqspaqqkbyb670_zyspfxjccys8'] + '</td>' +
                                    '<td class="numeric-cell">' + thismonthdata[i]['t_bsqspaqqkbyb670_ypzljdxcjcys9'] + '</td>' +
                                    '</tr>'
                            }
                        });
                    }
                }
                //5.1
                if (moduleId == "114") {
                    $.each(data, function (i, n) {
                        if (n['t_bsqspsxfwsxsjblhsjbljbqkyb728_jssj3'].slice(0, 7) == thisyear1 + '-' + lastmon && n['t_bsqspsxfwsxsjblhsjbljbqkyb728_kssj2'].slice(0, 7) == thisyear1 + '-' + lastmon) {
                            str += '<tr>' +
                                '<td class="label-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_ID'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_bmck4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_swsxzssp5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_swsxzsfw6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_sjblsxssp7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_sjblsxsfw8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_sjblsxssp9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_sjblsxsfw10'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_sjsjsxszb11'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_sjsjsxbllsp12'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_sjsjsxbllfw13'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_sjsjsxwsbllsp14'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_sjsjsxwsbllfw15'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_sjsjtxxtwblsp16'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_sjsjtxxtwblfw17'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_wsbllzb18'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_zzpwkdsdjs19'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspsxfwsxsjblhsjbljbqkyb728_zzpwkdsdzb20'] + '</td>' +
                                '</tr>'
                        }
                    });
                }
                //5.2
                if (moduleId == "115") {
                    $.each(data, function (i, n) {
                        if (n['t_bsqljzldwjbqkjb729_jd3'] == lastjidu && n['t_bsqljzldwjbqkjb729_nd2'] == thisyear_jidu) {
                            str += '<tr>' +
                                '<td class="label-cell">' + n['t_bsqljzldwjbqkjb729_ID'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqljzldwjbqkjb729_bmck4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqljzldwjbqkjb729_sfjz5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqljzldwjbqkjb729_yjsxsp6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqljzldwjbqkjb729_yjsxfw7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqljzldwjbqkjb729_yjsxsp8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqljzldwjbqkjb729_yjsxfw9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqljzldwjbqkjb729_jzbl10'] + '</td>' +
                                '</tr>'
                        }
                    });
                }
                str = str.replace(/undefined/g, "");
                str = str.replace(/NaN/g, "");
                // console.log("str"+str);
                if (moduleId == "108") {
                    $('#beizhu').html(beizhu);
                }
                $('#form-body').html(str);
            }

        },
        error: function (data, type, err) {
            myApp.hidePreloader();
            tishi("出现错误");

        }
    });
}

function get_data_qushi(year, alias, ziduan, moduleId, fl) {
    var tubiao = [];
    var xaxis = [];
    var lbiao = [];
    var t = false; //是否有单月数据
    // var tubiao="";    
    $.ajax({
        type: "POST",
        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?'+ziduan+'='+year+'-01-01'+'&token=' + localStorage.token,
        //contentType:"json",
        async: false,
        data: {
            bpmDataTemplatep: '1',
            bpmDataTemplatez: '1000',
            bpmDataTemplateoz: '1000',
            bpmDataTemplate__ns__: 't_' + alias + '_ID',
            bpmDataTemplateo: "ASC"
        },
        dataType: 'json',
        beforeSend: function () {
            myApp.showPreloader();
        },
        complete: function () {
            myApp.hidePreloader();
        },
        success: function (data) {
            if (data.bpmDataTemplate != null) {
                // console.log(data.data);
                var data = data.bpmDataTemplate.list;
                // console.log("_____======"+data);

                if (moduleId == "73") { //工业主要指标情况
                    if (data.length == 0) {

                        tubiao.push(0);
                        tubiao.push(0);
                        tubiao.push(0);
                    } else {
                        if (fl == "1") {
                            $.each(data, function (i, n) {
                                var year1 = data[i][ziduan].slice(0, 4);
                                var mon1 = data[i]['t_gyzyzbqkbyb502_kssj2'].slice(5, 7);
                                var mon2 = data[i]['t_gyzyzbqkbyb502_jssj3'].slice(5, 7);


                                if (year1 == year) {
                                    if (mon1 != mon2) {
                                        tubiao.push(parseFloat(data[i]['t_gyzyzbqkbyb502_updown34']));
                                        xaxis.push("1-" + mon2 + "月");
                                    }

                                }
                            });
                            //console.log("排序前："+tubiao);
                            // tubiao=tubiao.reverse();
                            // xaxis=xaxis.reverse();
                           // console.log("排序后：" + xaxis);
                            lbiao[0] = tubiao;
                            lbiao[1] = ['bar'];

                            lbiao[2] = xaxis;
                            lbiao[3] = ['45'];
                            //console.log("排序说谁说说说后："+lbiao[0]);
                            //console.log("数组的长度："+tubiao.length);
                            //    for(var y=0;y<tubiao.length;y++){
                            //     if(tubiao[y]!=""&&tubiao[y]!=undefined){
                            //         //console.log("数组中的值："+tubiao[y]);
                            //         t=true;
                            //         break;
                            //     }
                            //   }
                            // if(t==false){
                            //     lbiao=[];
                            //     tubiao=[]; 
                            //     $.each(data, function(i, n){
                            //         var year1=data[i][ziduan].slice(0,4);
                            //         var mon1=data[i]['t_gyzyzbqkbyb502_kssj2'].slice(5,7);
                            //         var mon2=data[i]['t_gyzyzbqkbyb502_jssj3'].slice(5,7);
                            //         if(year1==year&&mon1=="01"&&mon2==lastmon){
                            //             tubiao.push(parseFloat(data[i]['t_gyzyzbqkbyb502_updown34']));

                            //         }
                            //     });
                            //     lbiao[0]=tubiao;
                            //     lbiao[1]=['bar'];
                            //     lbiao[2]=['1-'+lastmon+'月'];
                            //     lbiao[3]=['60'];
                            // }

                            //if(data.length >2){data = data.slice(-2);data.reverse()} 
                            //  console.log("总产值"+tubiao)
                            // data[0]['t_syzyzbqkbyb510_jeyy5']=(data[0]['t_syzyzbqkbyb510_jeyy5']==undefined?"":data[0]['t_syzyzbqkbyb510_jeyy5'])
                            // data[0]['t_syzyzbqkbyb510_6']=(data[0]['t_syzyzbqkbyb510_6']==undefined?"":data[0]['t_syzyzbqkbyb510_6'])
                            //   console.log("cessss+"+lbiao[0])
                            //   console.log("cessss22+"+lbiao[1])
                        }
                        if (fl == "2") {
                            $.each(data, function (i, n) {
                                var year1 = data[i][ziduan].slice(0, 4);
                                var mon1 = data[i]['t_gyzyzbqkbyb502_kssj2'].slice(5, 7);
                                var mon2 = data[i]['t_gyzyzbqkbyb502_jssj3'].slice(5, 7);


                                if (year1 == year) {
                                    if (mon1 != mon2) {
                                        tubiao.push(parseFloat(data[i]['t_gyzyzbqkbyb502_gmysqyyy8']));
                                        xaxis.push("1-" + mon2 + "月");
                                    }
                                }
                            });
                            // tubiao=tubiao.reverse();
                            // xaxis=xaxis.reverse();
                            lbiao[0] = tubiao;
                            lbiao[1] = ['bar'];
                            lbiao[2] = xaxis;
                            lbiao[3] = ['45'];


                        }
                        if (fl == "3") {
                            $.each(data, function (i, n) {
                                var year1 = data[i][ziduan].slice(0, 4);
                                var mon1 = data[i]['t_gyzyzbqkbyb502_kssj2'].slice(5, 7);
                                var mon2 = data[i]['t_gyzyzbqkbyb502_jssj3'].slice(5, 7);
                                if (year1 == year) {
                                    if (mon1 != mon2) {
                                        tubiao.push(parseFloat(data[i]['t_gyzyzbqkbyb502_zlxxxcyzzybfyy10']));
                                        xaxis.push("1-" + mon2 + "月");
                                    }
                                }
                            });
                            // console.log("战略性新兴企业数组的长度："+tubiao.length);
                            // console.log("战略性新兴企业数组："+tubiao);
                            // tubiao=tubiao.reverse();
                            // xaxis=xaxis.reverse();
                            lbiao[0] = tubiao;
                            lbiao[1] = ['bar'];
                            lbiao[2] = xaxis;
                            lbiao[3] = ['45'];
                        }

                    }

                }

                if (moduleId == "59") { //商业主要指标情况
                    if (data.length == 0) {

                        tubiao.push(0);
                        tubiao.push(0);
                        tubiao.push(0);
                    } else {
                        if (fl == "1") {
                            // console.log("data="+data);
                            // console.log("长度+"+data.length)
                            $.each(data, function (i, n) {
                                var year1 = data[i]['t_syzyzbqkbyb510_jssj3'].slice(0, 4);
                                var mon1 = data[i]['t_syzyzbqkbyb510_kssj2'].slice(5, 7);
                                var mon2 = data[i]['t_syzyzbqkbyb510_jssj3'].slice(5, 7);
                                if (data[i]['t_syzyzbqkbyb510_xm4'] == "商品销售额") {
                                    if (year1 == year) {

                                        tubiao.push(parseFloat(data[i]['t_syzyzbqkbyb510_dyjeyy7']));
                                        xaxis.push(mon2 + "月");

                                    }

                                }

                            });
                            // tubiao=tubiao.reverse();
                            // xaxis=xaxis.reverse();
                            lbiao[0] = tubiao;
                            lbiao[1] = ['bar'];
                            lbiao[2] = xaxis;
                            lbiao[3] = ['45'];
                            //console.log("商品数组："+lbiao[0]);
                            //        for(var y=0;y<tubiao.length;y++){
                            //         if(tubiao[y]!=""&&tubiao[y]!=undefined){
                            //             //console.log("商品数组中的值："+tubiao[y]);
                            //             t=true;
                            //             break;
                            //         }
                            //       }
                            // if(t==false){
                            //     lbiao=[];
                            //     tubiao=[]; 
                            //     $.each(data, function(i, n){
                            //         var year1=data[i][ziduan].slice(0,4);
                            //         var mon1=data[i]['t_syzyzbqkbyb510_kssj2'].slice(5,7);
                            //         var mon2=data[i][ziduan].slice(5,7);
                            //         if(data[i]['t_syzyzbqkbyb510_xm4']=="商品销售额"){
                            //         if(year1==year&&mon1=="01"&&mon2==lastmon){
                            //             tubiao.push(parseFloat(data[i]['t_syzyzbqkbyb510_ljjeyy5']));

                            //         }
                            //     }
                            //     });
                            //     lbiao[0]=tubiao;
                            //     lbiao[1]=['bar'];
                            //     lbiao[2]=['1-'+lastmon+'月'];
                            //     lbiao[3]=['60'];
                            // }

                        }
                        if (fl == "2") {
                            $.each(data, function (i, n) {
                                var year1 = data[i]['t_syzyzbqkbyb510_jssj3'].slice(0, 4);
                                var mon1 = data[i]['t_syzyzbqkbyb510_kssj2'].slice(5, 7);
                                var mon2 = data[i]['t_syzyzbqkbyb510_jssj3'].slice(5, 7);
                                if (data[i]['t_syzyzbqkbyb510_xm4'] == "社会消费品零售总额") {
                                    if (year1 == year) {
                                        tubiao.push(parseFloat(data[i]['t_syzyzbqkbyb510_dyjeyy7']));
                                        xaxis.push(mon2 + "月");

                                    }
                                }

                            });
                            // tubiao=tubiao.reverse();
                            // xaxis=xaxis.reverse();
                            lbiao[0] = tubiao;
                            lbiao[1] = ['bar'];
                            lbiao[2] = xaxis;
                            lbiao[3] = ['45'];
                            //console.log("数组的长度："+tubiao.length);
                            // $.each(data, function(i, n){
                            //     var year1=data[i]['t_syzyzbqkbyb510_jssj3'].slice(0,4);
                            //     var mon1=data[i]['t_syzyzbqkbyb510_kssj2'].slice(5,7);
                            //     var mon2=data[i]['t_syzyzbqkbyb510_jssj3'].slice(5,7);
                            //     if(data[i]['t_syzyzbqkbyb510_xm4']=="社会消费品零售总额"){

                            //         if(year1==year-1){
                            //             qn=data[i]['t_syzyzbqkbyb510_ljjeyy5'];
                            //             console.log(data[i]['t_syzyzbqkbyb510_xm4']);
                            //         }
                            //         if(year==year1){
                            //           if(mon1=="01" && mon2==month){    
                            //             jns=data[i]['t_syzyzbqkbyb510_ljjeyy5'];  
                            //             jn=data[i]['t_syzyzbqkbyb510_dyjeyy7'];              
                            //           }  
                            //         }  
                            //     }
                            // });

                        }

                    }

                }


            }

        },
        error: function (data, type, err) {
            //myApp.hidePreloader();
            tishi("出现错误");
        },
        //    beforeSend:function(){
        //     myApp.showPreloader();
        //   },
        //     complete:function(){
        //     myApp.hidePreloader();
        //     }
    });
    return lbiao;

}
// $$('#sousuo').on('click', function () {
//     myApp.showPreloader();
//     setTimeout(function () {
//         myApp.hidePreloader();
//     }, 3000);
// });
//图表的搜索

function goto_qushi() {
    if (!localStorage.debugC ) {
        window.plugins.spinnerDialog.show()  
    }
    var qushi = $('#qushiyear').val();
    if (qushi == "") {
        tishi('请选择日期')
        window.plugins.spinnerDialog.hide();
        return false;
    } else {
        localStorage.qushi = qushi;
        var tubiao1 = get_data_qushi(localStorage.qushi, "gyzyzbqkbyb502", "t_gyzyzbqkbyb502_kssj2", 73, "1");
        var tubiao2 = get_data_qushi(localStorage.qushi, "gyzyzbqkbyb502", "t_gyzyzbqkbyb502_kssj2", 73, "2");
        var tubiao3 = get_data_qushi(localStorage.qushi, "gyzyzbqkbyb502", "t_gyzyzbqkbyb502_kssj2", 73, "3")
        var tubiao4 = get_data_qushi(localStorage.qushi, "syzyzbqkbyb510", "t_syzyzbqkbyb510_kssj2", 59, "1");
        var tubiao5 = get_data_qushi(localStorage.qushi, "syzyzbqkbyb510", "t_syzyzbqkbyb510_kssj2", 59, "2");
        tubiao(tubiao1, tubiao2, tubiao3, tubiao4, tubiao5);

    }
    
    if (!localStorage.debugC) {
    setTimeout(window.plugins.spinnerDialog.hide(), 3000);
    }
}
var formid;
var form_title,
    form_alias;

function form(id, alais) {
    tiaozhuan('form.html');
    formid = id;
    form_alias = alais
}

myApp.onPageAfterAnimation("form", function () {

    var myDate = new Date();
    var thisyear = myDate.getFullYear();
    //$("meta[ name='viewport']").attr('content',"width=device-width, initial-scale=1, maximum-scale=2, minimum-scale=1, user-scalable=no, minimal-ui");
    var biaotou = '';
    var danwei = "";
    var qiantou = "";
    var search1 = '<div class="item-content1">' +
        '<input type="text" placeholder="选择月份" onfocus="(this.type=&apos;month&apos;)"  id="enddate">' +
        '</div>' +
        '<div class="item-content2"><button onclick="get_date()" class="button button-blue">搜索</butto></div>'
    var search2 = '<div class="item-content1" style="width:60%">' +
        '<input type="text" placeholder="选择月份" onfocus="(this.type=&apos;month&apos;)"  id="semonth">' +
        '</div>' +
        '<div class="item-content2"><button onclick="get_date1()" class="button button-blue">搜索</butto></div>'
    //搜索年
    var search3 = '<div class="item-content1" style="width:60%">' +
        '<input  placeholder="选择年份" id="seyear" readonly>' +
        '</div>' +
        '<div class="item-content2"><button onclick="get_date_nian()" class="button button-blue">搜索</butto></div>'
    //搜索季度
    var search4 = '<div class="item-content1" style="width:30%">' +
        '<input  placeholder="选择年份"  id="seyear" readonly></div>' +
        '<div class="jiange"></div>' +
        '<div class="item-content1" style="width:30%"><select id="jidu"><option value="">选择季度</option><option value="1">1季度</option><option value="2">2季度</option><option value="3">3季度</option><option value="4">4季度</option></select></div>' +
        '<div class="item-content2"><button onclick="get_date_jidu()" class="button button-blue">搜索</button></div>'
    //搜索半年
    var search5 = '<div class="item-content1" style="width:30%">' +
        '<input  placeholder="选择年份" id="seyear" readonly></div>' +
        '<div class="jiange"></div>' +
        '<div class="item-content1" style="width:30%"><select placeholder="" id="bannian"><option value="上半年">上半年</option><option value="下半年">下半年</option></select>' +
        '</div>' +
        '<div class="item-content2"><button onclick="get_date_bannian()" class="button button-blue">搜索</butto></div>'
    if (formid == "2") {
        $('#searchkuang').html(search1);
        qiantou = "牵头单位:各街镇、园区";
        //t_gjzyqqyjyqkbyb517_jssj3 结束时间
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_gjzyqqyjyqkbyb517_jssj3" data-kstime="t_gjzyqqyjyqkbyb517_kssj2" id="get-data">' +
            '<th class="label-cell" rowspan="3"><div  style="WORD-WRAP: break-word;width:60px">企业经营状况</div></th>' +
            '<th class="" id="yearmonthse" colspan="8">' + thisyear1 + '年1-' + lastmon + '月</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell" colspan="3">落地型在当地（以镇、园区获得租金为标志）</th>' +
            ' <th class="numeric-cell" colspan="4">注册在当地</th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:80px">企业总数(注册+未注册的落地型)</div></th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">企业数（个）</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">注册在当地（个）</div></th>' +
            '<th class="numeric-cell"><div  style="WORD-WRAP: break-word;width:60px">纳税总额（万元）</div></th>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">企业数（个）</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">在地经营（个）</div></th>' +
            '<th class="numeric-cell"><div  style="WORD-WRAP: break-word;width:60px"></div>在地产生实际税收（万元）</th></th>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">纳税总额（万元）</div></th>' +
            '<th class="numeric-cell" ></th>' +
            '</tr>'
    }
    if (formid == "3") {
        $('#searchkuang').html(search1);
        qiantou = "牵头单位:区市场局"
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_gjzyqzsyzzlbyb518_jssj3" data-kstime="t_gjzyqzsyzzlbyb518_kssj2" id="get-data">' +
            '<th class="label-cell" rowspan="3"><div  style="WORD-WRAP: break-word;width:60px">招商引资质量</div></th>' +
            '<th id="yearmonthse" colspan="8">' + thisyear1 + '年1-' + lastmon + '月</th>' +
            '<th class="label-cell" rowspan="3"><div  style="WORD-WRAP: break-word;width:60px">备注</div></th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell" colspan="3">注册情况</th>' +
            '<th class="numeric-cell" colspan="3">迁出情况</th>' +
            '<th class="numeric-cell" colspan="2">净增情况</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">新注册企业数（个）</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">近2年新注册企业中纳税企业数（个）</div></th>' +
            '<th class="numeric-cell"><div  style="WORD-WRAP: break-word;width:60px">近2年新注册企业纳税总额（万元）</div></th>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">新迁出至外区企业数（个）</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">近2年迁出企业中纳税企业数（个）</div></th>' +
            '<th class="numeric-cell"><div  style="WORD-WRAP: break-word;width:60px">近2年迁出企业纳税总额（万元）</div></th>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">企业数（个）</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">净增企业对税收增长贡献度</div></th>' +
            '</tr>'

    }
    if (formid == "52") {
        $('#searchkuang').html(search1);
        qiantou = "牵头单位:区科委"
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_gjzyqzhjzlbyb501_jssj3" data-kstime="t_gjzyqzhjzlbyb501_kssj2"  id="get-data">' +
            '<th class="label-cell" rowspan="3"><div  style="WORD-WRAP: break-word;width:60px">综合竞争力</div></th>' +
            '<th id="yearmonthse" colspan="8">' + thisyear1 + '年1-' + lastmon + '月</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell" rowspan="2"><div  style="WORD-WRAP: break-word;width:60px">税收收入</div></th>' +
            '<th class="label-cell" colspan="2">高新技术企业</th>' +
            '<th class="numeric-cell" colspan="2">高新技术企业</th>' +
            '<th class="numeric-cell" colspan="2">上市企业（个）</th>' +
            '<th class="label-cell" rowspan="2"><div  style="WORD-WRAP: break-word;width:60px">专利数</div></th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">数量</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">占比</div></th>' +
            '<th class="numeric-cell"><div  style="WORD-WRAP: break-word;width:60px">产值</div></th>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">占比</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">主板</div></th>' +
            '<th class="numeric-cell"><div  style="WORD-WRAP: break-word;width:60px">新三板</div></th>' +
            '</tr>'
    }
    // 1.2.1
    if (formid == "73") {
        $('#searchkuang').html(search2);
        danwei = "单位：亿元";
        qiantou = "注：战新增幅是可比增幅（市下返）<br>牵头单位:区统计局";
        $('#form-body').addClass('nofreeze-form-body');
        $('#form-head').addClass('nofreeze-form-head');
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_gyzyzbqkbyb502_jssj3" data-kstime="t_gyzyzbqkbyb502_kssj2" id="get-data">' +
            '<th class="label-cell" rowspan="2" colspan="2"><div  style="WORD-WRAP: break-word;width:60px">项目</div></th>' +
            '<th id="lastyearselect" class="label-cell" colspan="2">' + (thisyear - 1) + '年</th>' +
            '<th id="yearselect" class="numeric-cell" colspan="3">' + thisyear1 + '年</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">1-12月</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">±%</div></th>'
            // +'<th class="label-cell" ><div id="thismonth" style="WORD-WRAP: break-word;width:60px">'+lastmon+'月</div></th>'
            +
            '<th class="numeric-cell" ><div id="thismonths"  style="WORD-WRAP: break-word;width:60px">1-' + lastmon + '月</div></th>' +
            '<th class="numeric-cell"><div  style="WORD-WRAP: break-word;width:60px">±%</div></th>' +
            '</tr>'
    }
    if (formid == "54") {
        $('#searchkuang').html(search1);
        danwei = "单位：户、亿元";
        qiantou = "牵头单位:区统计局";
        biaotou = '<tr  data-mid="' + formid + '"  data-type="yue" data-alias="' + form_alias + '" data-time="t_gyqyqkbyb503_jssj3"  data-kstime="t_gyqyqkbyb503_kssj2" id="get-data">' +
            '<th class="label-cell" rowspan="3"><div  style="WORD-WRAP: break-word;width:60px">类别</div></th>' +
            '<th id="yearmonthse" colspan="5">' + thisyear1 + '年1-' + lastmon + '月</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell" rowspan="2"><div  style="WORD-WRAP: break-word;width:60px">工业总产值</div></th>' +
            '<th class="label-cell" colspan="2">规上工业企业</th>' +
            '<th class="numeric-cell" colspan="2">#战略性新兴产业企业</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">总数</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">总产值</div></th>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">总数</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">总产值</div></th>' +
            '</tr>'
    }

    //1.2.3
    if (formid == "74") {
        $('#searchkuang').html(search2);
        danwei = "单位：万平方米、亿元、%"
        qiantou = "牵头单位:区统计局"
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_ggyyqztqkbyb504_jssj3"  data-kstime="t_ggyyqztqkbyb504_kssj2"id="get-data">' +
            '<th class="label-cell" rowspan="3"><div  style="WORD-WRAP: break-word;width:60px">类别</div></th>' +
            '<th class="label-cell" rowspan="3"><div  style="WORD-WRAP: break-word;width:60px">面积</div></th>' +
            '<th id="lastyearselect" colspan="2" rowspan="2">' + (thisyear - 1) + '年</th>' +
            '<th id="yearselect" colspan="4">' + thisyear1 + '年</th>' +
            '</tr>' +
            '<tr>' +
            '<th id="thismonth" class="label-cell" colspan="2">' + lastmon + '月</th>' +
            '<th id="thismonths" class="numeric-cell"  colspan="2">1-' + lastmon + '月</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">总产值</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">±%</div></th>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">总产值</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">±%</div></th>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">总产值</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">±%</div></th>' +
            '</tr>'
    }
    //1.2.4
    if (formid == "4") {
        $('#searchkuang').html(search1);
        danwei = "单位：个、万元"
        qiantou = "牵头单位:区统计局"
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_gyxmqkbyb505_jssj3" data-kstime="t_gyxmqkbyb505_kssj2" id="get-data">' +
            '<th id="yearmonthse" colspan="9">' + thisyear1 + '年1-' + lastmon + '月</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell" rowspan="2"  style="background:#ffffff;position: sticky;-webkit-position: sticky;left:0px;">类别</th>' +
            '<th class="numeric-cell" colspan="2">拟启动</th>' +
            '<th class="numeric-cell" colspan="2">在建</th>' +
            '<th class="numeric-cell" colspan="2">其中：新开工</th>'

            +
            '<th class="numeric-cell" colspan="2">竣工投产</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">项目数</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">投资量</div></th>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">项目数</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">投资量</div></th>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">项目数</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">投资量</div></th>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">项目数</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">投资量</div></th>' +
            '</tr>'
    }
    //1.2.5
    if (formid == "75") {
        $('#searchkuang').html(search2);
        danwei = "单位：亩"
        qiantou = "牵头单位:区经委"
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_clgytdphqkbyb506_jssj3" data-kstime="t_clgytdphqkbyb506_kssj2" id="get-data">' +
            '<th class="label-cell"><div style="width:40px">类别</div></th>' +
            '<th class="label-cell"><div id="lastyearselect" style="width:60px">' + (thisyear - 1) + '年</div></th>' +
            '<th class="label-cell" ><div id="yearselect" style="width:90px">' + thisyear + '年目标</div></th>' +
            '<th class="label-cell" ><div id="thismonthes" style="width:60px">' + thisyear1 + '年' + lastmon + '月</div></th>' +
            '<th class="label-cell" ><div id="thismonthses" style="width:60px">' + thisyear1 + '年1-' + lastmon + '月</div></th>' +
            '<th class="label-cell"><div style="width:30px">排名</div></th>' +
            '<th class="label-cell"><div style="width:60px">完成进度</div></th>' +
            '<th class="label-cell"><div style="width:30px">排名</div></th>' +
            '</tr>'
    }
    //1.3.1
    if (formid == "56") {
        $('#searchkuang').html(search2);
        danwei = "单位：亿元"
        qiantou = "牵头单位:区统计局"
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_fwyssqkbyb507_jssj3" data-kstime="t_fwyssqkbyb507_kssj2" id="get-data">' +
            '<th class="label-cell" rowspan="2"> <div style="width:80px;">项目</div></th>' +
            '<th id="lastyearselect" class="numeric-cell" colspan="2">' + (thisyear - 1) + '年</th>' +
            '<th id="yearselect" class="numeric-cell" colspan="4">' + thisyear1 + '年</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">1-12月</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">±%</div></th>'
            // +'<th class="label-cell" ><div id="thismonth" style="WORD-WRAP: break-word;width:60px">'+lastmon+'月</div></th>'
            // +'<th class="numeric-cell" ><div style="WORD-WRAP: break-word;width:60px">±%</div></th>'
            +
            '<th class="numeric-cell" ><div id="thismonths"  style="WORD-WRAP: break-word;width:60px">1-' + lastmon + '月</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">±%</div></th>' +
            '</tr>'
    }

    //1.3.2
    if (formid == "57") {
        $('#searchkuang').html(search2);
        $('#form-body').addClass('nofreeze-form-body');
        $('#form-head').addClass('nofreeze-form-head');
        danwei = "单位：亿元"
        qiantou = "牵头单位:区统计局"
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_shfwyzyzbqkbyb508_jssj3" data-kstime="t_shfwyzyzbqkbyb508_kssj2" id="get-data">' +
            '<th class="label-cell" rowspan="2" colspan="2"><div style="width:60px;">项目</div></th>' +
            '<th id="lastyearselect" class="numeric-cell" colspan="2">' + (thisyear - 1) + '年</th>' +
            '<th id="yearselect" class="numeric-cell" colspan="4">' + thisyear1 + '年</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">1-12月</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">±%</div></th>'
            // +'<th class="label-cell" ><div id="thismonth" style="WORD-WRAP: break-word;width:60px">'+lastmon+'月</div></th>'
            // +'<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">±%</div></th>'
            +
            '<th class="numeric-cell" ><div id="thismonths" style="WORD-WRAP: break-word;width:60px">1-' + lastmon + '月</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">±%</div></th>' +
            '</tr>'
    }
    //1.3.3
    if (formid == "76") {
        $('#searchkuang').html(search1);
        $('#form-body').addClass('nofreeze-form-body');
        $('#form-head').addClass('nofreeze-form-head');
        danwei = "单位：户、亿元"
        qiantou = "牵头单位:区统计局";
        $('#form-body').addClass('nofreeze-form-body');
        $('#form-head').addClass('nofreeze-form-head');
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_shfwyqyqkbyb509_jssj3" data-kstime="t_shfwyqyqkbyb509_kssj2" id="get-data">' +
            '<th class="label-cell" rowspan="2"><div  style="WORD-WRAP: break-word;width:60px">项目</div></th>' +
            '<th class="label-cell" rowspan="2"><div  style="WORD-WRAP: break-word;width:60px">类别</div></th>' +
            '<th class="numeric-cell" id="yearmonthse" colspan="3">' + thisyear1 + '年1-' + lastmon + '月</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">规上企业总数</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:90px">规上企业营业收入(亿)</div></th>' +
            '<th class="numeric-cell"><div  style="WORD-WRAP: break-word;width:60px">±%</div></th>' +
            '</tr>'
    }

    //1.3.4
    if (formid == "59") {
        $('#searchkuang').html(search2);
        danwei = "单位：亿元"
        qiantou = "牵头单位:区统计局"
        $('#form-body').addClass('nofreeze-form-body');
        $('#form-head').addClass('nofreeze-form-head');
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_syzyzbqkbyb510_jssj3"  data-kstime="t_syzyzbqkbyb510_kssj2" id="get-data">' +
            '<th class="label-cell" rowspan="2" colspan="2">项目</th>' +
            '<th id="lastyearselect" class="numeric-cell" colspan="2">' + (thisyear - 1) + '年</th>' +
            '<th id="yearselect" class="numeric-cell" colspan="4">' + thisyear1 + '年</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:50px">1-12月</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:50px">±%</div></th>' +
            '<th class="label-cell" ><div id="thismonth" style="WORD-WRAP: break-word;width:50px">' + lastmon + '月</div></th>'
            // +'<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">±%</div></th>'
            +
            '<th class="numeric-cell" ><div id="thismonths" style="WORD-WRAP: break-word;width:50px">1-' + lastmon + '月</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:50px">±%</div></th>' +
            '</tr>'
    }
    //1.3.5
    if (formid == "60") {
        $('#searchkuang').html(search1);
        danwei = "单位：户、亿元"
        qiantou = "牵头单位:区统计局"
        $('#form-body').addClass('second-form-body');
        $('#form-head').addClass('second-form-head');
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_syqyqkbyb511_jssj3" data-kstime="t_syqyqkbyb511_kssj2" id="get-data">' +
            '<th class="label-cell" rowspan="3"><div  style="WORD-WRAP: break-word;width:50px">项目</div></th>' +
            '<th class="label-cell" rowspan="3"><div  style="WORD-WRAP: break-word;width:60px">类别</div></th>' +
            '<th id="yearmonthse" colspan="7">' + thisyear1 + '年1-' + lastmon + '月</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">商品销售额</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">±%</div></th>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">社会消费品零售总额</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">±%</div></th>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">规上零售企业总数</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">规上零售企业零售额</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">±%</div></th>' +
            '</tr>'
    }

    //1.3.6
    if (formid == "6") {
        $('#searchkuang').html(search2);
        qiantou = "备注：旅游总收入为区商务委提供，为主要饭店宾馆、景点和旅行社收入<br>牵头单位:区商务委"
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_sylyqkbyb512_jssj3" data-kstime="t_sylyqkbyb512_kssj2" id="get-data">' +
            '<th class="label-cell" rowspan="2"><div  style="WORD-WRAP: break-word;width:60px">类别</div></th>' +
            '<th class="label-cell" rowspan="2"><div  style="WORD-WRAP: break-word;width:60px">大型商场数量</div></th>' +
            '<th class="label-cell" rowspan="2"><div  style="WORD-WRAP: break-word;width:60px">星级旅游饭店数量</div></th>' +
            '<th class="label-cell" rowspan="2"><div  style="WORD-WRAP: break-word;width:60px">A级旅游景区（点）数量</div></th>' +
            '<th class="label-cell" rowspan="2"><div  style="WORD-WRAP: break-word;width:60px">接待游客数（人次）</div></th>' +
            '<th class="" colspan="3">旅游总收入（万元）</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell" ><div id="lastyearselect" style="WORD-WRAP: break-word;width:60px">' + (thisyear - 1) + '年</div></th>' +
            '<th class="numeric-cell" ><div id="yearselect" style="WORD-WRAP: break-word;width:60px">' + thisyear1 + '年</div><div id="thismonth" style="WORD-WRAP: break-word;width:60px">' + lastmon + '月</div></th>' +
            '<th class="numeric-cell" ><div id="yearselect1" style="WORD-WRAP: break-word;width:60px">' + thisyear1 + '年</div><div id="thismonths" style="WORD-WRAP: break-word;width:60px">' + thisyear1 + '年1-' + lastmon + '月</div></th>' +
            '</tr>'
    }

    if (formid == "77") {
        $('#searchkuang').html(search1);
        qiantou = "备注：载体数据为商务委隔月报送<br>牵头单位:区商务委";

        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_sxfwyztqkbyb513_jssj3"  data-kstime="t_sxfwyztqkbyb513_kssj2" id="get-data">' +
            '<th class="label-cell" rowspan="2"><div  style="WORD-WRAP: break-word;width:60px">项目名称</div></th>' +
            '<th id="yearmonthse" colspan="8">' + thisyear1 + '年1-' + lastmon + '月</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">企业总数（户）</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">总税收收入（万元）</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">总税收单位面积产出（元/平方米）</div></th>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">载体总数</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">落地企业注册率（%）</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">入驻率（%）</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">税收收入1亿元以上载体（个）</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">税收收入1000万以上载体（个）</div></th>' +
            '</tr>'
    }

    if (formid == "78") {
        $('#searchkuang').html(search3);
        danwei = "单位：个、万元";
        qiantou = "牵头单位:区科委"
        biaotou = '<tr  data-mid="' + formid + '" data-type="nian" data-alias="' + form_alias + '" data-time="t_bsqkcqkbyb514_jssj3" data-kstime="t_bsqkcqkbyb514_kssj2" id="get-data">' +
            '<th class="label-cell" rowspan="2"><div  style="WORD-WRAP: break-word;width:60px">项目名称</div></th>' +
            '<th id="yearmonthse1" colspan="10">' + thisyear1 + '年</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">申请张江园项目数</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">申请立项数</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">申请张江市级资金支持</div></th>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">投入研发强度R&D</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">市级科技小巨人企业数</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">双创空间数（其中：市级以上）</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">院士专家工作站</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">专利申请量</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">研发费用投入占GDP比重</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">市级创新大赛入围企业数</div></th>' +
            '</tr>'
    }

    //1.5
    if (formid == "9") {
        $('#searchkuang').html(search2);
        danwei = "单位：%、人次、万元、亿元"
        qiantou = "牵头单位:区滨江委"
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_yljjfzqkbyb515_jssj3"  data-kstime="t_yljjfzqkbyb515_kssj2"id="get-data">' +
            '<th class="label-cell" colspan="3">统计内容</th>' +
            '<th id="lastyearselect" class="numeric-cell">' + (thisyear - 1) + '年</th>' +
            '<th class="numeric-cell"><div id="yearselect">' + thisyear1 + '年</div><div id="thismonth">' + lastmon + '月</div></th>' +
            '<th class="numeric-cell"><div id="yearselect1">' + thisyear1 + '年</div><div id="thismonths">1-' + lastmon + '月</div></th>' +
            '</tr>'
    }
    //1.6
    if (formid == "79") {
        $('#searchkuang').html(search3); //  默认是上一年数据
        danwei = "单位：户、人、亿元"
        qiantou = "牵头单位:区国资委"
        biaotou = '<tr  data-mid="' + formid + '" data-type="nian" data-alias="' + form_alias + '" data-time="t_gzjgqkbnb516_kssj2"  data-kstime="t_gzjgqkbnb516_kssj2" id="get-data">' +
            '<th class="label-cell" rowspan="2"><div  style="WORD-WRAP: break-word;width:60px"></div></th>' +
            '<th id="yearmonthse1" colspan="9">' + (thisyear - 1) + '年</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">企业数</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">资产总额</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">净资产</div></th>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">净利润</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">利润总额</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">工业用地</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">厂房</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">职工</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">备注</div></th>' +
            '</tr>'
    }
    //2.1
    if (formid == "81") {
        $('#searchkuang').html(search3);
        qiantou = "牵头单位:区水务局"
        biaotou = '<tr  data-mid="' + formid + '" data-type="nian" data-alias="' + form_alias + '" data-time="t_bsqhdqknd605_nd2"  data-kstime="t_bsqhdqknd605_nd2" id="get-data">' +
            '<th class="label-cell"  style=" position:inherit;"><div style="WORD-WRAP: break-word;width:60px ;">类别</div></th>' +
            '<th id="yearmonthse1" class="" colspan="9">' + (thisyear - 1) + '年</th>' +
            '</tr>'
    }

    //2.2
    if (formid == "82") {
        $('#searchkuang').html(search1);
        qiantou = "牵头单位:区水务局"
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_bsqejgwjsqkyd597_jssj3"  data-kstime="t_bsqejgwjsqkyd597_kssj2" id="get-data">' +
            '<th class="" colspan="3">已建长度</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="" id="yearmonthse" colspan="3">' + thisyear1 + '年1-' + lastmon + '月</th>' +
            '</tr>'
    }

    //2.3
    if (formid == "83") {
        qiantou = "牵头单位:区水务局"
        $('#searchkuang').html(search1);
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_bsqpsxtjsqkyd598_jssj3"  data-kstime="t_bsqpsxtjsqkyd598_kssj3" id="get-data">' +
            '<th class="" id="yearmonthse" colspan="4">' + thisyear1 + '年1-' + lastmon + '月</th>' +
            '</tr>'
    }

    //2.4
    if (formid == "84") {
        $('#searchkuang').html(search2);
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_bsqhbqkyd599_jssj3"  data-kstime="t_bsqhbqkyd599_kssj2" id="get-data">' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">主要指标</div></th>' +
            '<th class="numeric-cell" ><div id="lastyearselect">' + (thisyear - 1) + '年</div></th>' +
            '<th class="numeric-cell" ><div id="yearselect1">' + thisyear1 + '年</div><div id="thismonths">1-' + lastmon + '月</div></th>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">上年同期</div></th>' +
            '</tr>'
    }
    //2.5
    if (formid == "85") {
        $('#searchkuang').html(search2);
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_bsqkhdmjcqkyb600_jssj3"  data-kstime="t_bsqkhdmjcqkyb600_kssj2" id="get-data">' +
            '<th class="label-cell" rowspan="2">监测点名称</th>' +
            '<th class="label-cell" rowspan="2">所属街镇</th>' +
            '<th class="" colspan="3">水质类别</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell" ><div class="lastyearselect">' + (thisyear - 1) + '年</div></th>' +
            '<th class="numeric-cell" ><div class="lastyearselect">' + (thisyear1 - 1) + '年</div><div class="thismonths">1-' + lastmon + '月</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px"  class="yearselect1">' + thisyear1 + '年</div><div class="thismonths">1-' + lastmon + '月</div></th>' +
            '</tr>'
    }
    //2.6
    if (formid == "86") {
        qiantou = "牵头单位:区绿化市容局"
        $('#searchkuang').html(search3);
        biaotou = '<tr  data-mid="' + formid + '" data-type="nian" data-alias="' + form_alias + '" data-time="t_bsqlhjbjsqknb601_nd2" data-kstime="t_bsqlhjbjsqknb601_nd2" id="get-data">'
            // +'<th class="label-cell"><div style="WORD-WRAP: break-word;width:60px">类别</div></th>'
            // +'<th class="" colspan="9">2017年</th>'
            +
            '</tr>'
    }
    //2.7
    if (formid == "87") {
        $('#searchkuang').html(search2);
        $('#form-body').addClass('nofreeze-form-body');
        $('#form-head').addClass('nofreeze-form-head');
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_bsqsngzqkyb604_jssj3" data-kstime="t_bsqsngzqkyb604_kssj2" id="get-data">' +
            '<th class="">序号</th>' +
            '<th class="">类别</th>' +
            '<th class="" colspan="2"><div style="width:90px;">统计项目</div></th>' +
            '<th class="">单位</th>' +
            '<th class="" ><div style="width:60px;" id="lastyearselect">' + (thisyear - 1) + '年</div></th>' +
            '<th class=""><div style="width:60px;"><div id="yearselect">' + thisyear1 + '年</div><div id="thismonth">' + lastmon + '月</div></div></th>' +
            '<th class=""><div style="width:70px;"><div id="yearselect1">' + thisyear1 + '年</div><div id="thismonths">1-' + lastmon + '月</div></div></th>' +
            '</tr>'
    }
    //3.1
    if (formid == "19") {
        $('#searchkuang').html(search3);
        qiantou = "牵头单位:区规土局"
        biaotou = '<tr  data-mid="' + formid + '" data-type="nian" data-alias="' + form_alias + '" data-time="t_bsqtdjbqknb606_nd2" data-kstime="t_bsqtdjbqknb606_nd2" id="get-data">' +
            '<th class="" id="yearmonthse1" colspan="3">' + (thisyear - 1) + '年</th>' +
            '</tr>'
    }

    //3.2
    if (formid == "89") {
        $('#searchkuang').html(search1);
        qiantou = "牵头单位:区规土局"
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_bsqclgyydphgzssqkyb607_date3"  data-kstime="t_bsqclgyydphgzssqkyb607_date2" id="get-data">' +
            '<th class="" rowspan="2" ><div style="width:60px;">镇、园区</div></th>' +
            '<th class="" id="yearmonthse" colspan="5">' + thisyear + '年01-' + lastmon + '月</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="" ><div style="width:40px;">目标</div></th>' +
            '<th class=""  ><div style="width:40px">已盘活</div></th>' +
            '<th class="" ><div style="width:40px">未盘活</div></th>' +
            '<th class="" ><div style="width:60px">盘活进度</div></th>' +
            '<th class="" ><div style="width:200px">进展情况</div></th>' +
            '</tr>'
    }
    //3.3
    if (formid == "21") {
        $('#searchkuang').html(search3);
        qiantou = "牵头单位:区建交委"
        biaotou = '<tr  data-mid="' + formid + '" data-type="nian" data-alias="' + form_alias + '" data-time="t_bsqdlqknb608_nd2" data-kstime="t_bsqdlqknb608_nd2" id="get-data">' +
            '<th class="label-cell" colspan="6">宝山区道路建设情况(新改建)</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell" rowspan="2">管理级别</th>' +
            '<th class="label-cell" id="yearmonthse1" colspan="5">' + (thisyear - 1) + '年</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">数量</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">里程数</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">桥梁数</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">建设任务</div></th>' +
            '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">完成情况</div></th>' +
            '</tr>'
    }
    //3.4
    if (formid == "22") {
        $('#searchkuang').html(search3);
        $('#form-body').addClass('nofreeze-form-body');
        $('#form-head').addClass('nofreeze-form-head');
        qiantou = "牵头单位:区建交委"
        biaotou = '<tr  data-mid="' + formid + '" data-type="nian" data-alias="' + form_alias + '" data-time="t_bsqqlqknb609_nd2" data-kstime="t_bsqqlqknb609_nd2" id="get-data">' +
            '<th class="label-cell" id="yearmonthse1" colspan="6">' + (thisyear - 1) + '年</th>' +
            '</tr>'
    }
    //3.5.1
    if (formid == "24") {
        $('#searchkuang').html(search4);
        $('#form-body').addClass('nofreeze-form-body');
        $('#form-head').addClass('nofreeze-form-head');
        qiantou = "牵头单位:区南大指挥办公室"
        biaotou = '<tr  data-mid="' + formid + '" data-type="ji" data-alias="' + form_alias + '" data-time="t_nddqghjbqkbjb610_date2" data-jidu="t_nddqghjbqkbjb610_date3" id="get-data">' +
            '<th class="label-cell"><div style="width:40px;">占地</div></th>' +
            '<th class="label-cell"><div style="width:40px;">建筑</div></th>' +
            '<th class="label-cell" rowspan="2"><div style="width:60px;">商办面积</div></th>' +
            '<th class="label-cell" colspan="3"><div style="width:120px;">住宅面积</div></th>' +
            '<th class="label-cell" rowspan="2"><div style="width:40px;">绿化</div></th>' +
            '<th class="label-cell" rowspan="2"><div style="width:40px;">水系</div></th>' +
            '<th class="label-cell" rowspan="2"><div style="width:100px;">土壤修复</div></th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell"><div style="width:40px;">面积</div></th>' +
            '<th class="label-cell"><div style="width:40px;">面积</div></th>' +
            '<th class="label-cell"><div style="width:40px;">商品房</div></th>' +
            '<th class="label-cell"><div style="width:40px;">动迁房</div></th>' +
            '<th class="label-cell"><div style="width:40px;">公租房</div></th>' +
            '</tr>'
    }
    //3.5.2
    if (formid == "90") {
        $('#searchkuang').html(search4);
        biaotou = '<tr  data-mid="' + formid + '" data-type="ji" data-alias="' + form_alias + '" data-time="t_wgyqjbqkjb611_date2" data-jidu="t_wgyqjbqkjb611_date3" id="get-data">' +
            '<th class="label-cell">占地面积</th>' +
            '<th class="label-cell">住宅面积</th>' +
            '<th class="label-cell">商办面积</th>' +
            '<th class="label-cell" >工业用地</th>' +
            '<th class="label-cell">现有企业数(产证)</th>' +
            '</tr>'
    }
    //3.6
    if (formid == "91") {
        $('#searchkuang').html(search4);
        qiantou = "牵头单位:区房管局"
        biaotou = '<tr  data-mid="' + formid + '" data-type="ji" data-alias="' + form_alias + '" data-time="t_bsqczcgzjbqkjb612_nd1"  data-jidu="t_bsqczcgzjbqkjb612_jd2" id="get-data">' +
            '<th class="label-cell" rowspan="2"><div style="width:45px">城中村</div></th>' +
            '<th id="nianandjidu" class="label-cell" colspan="6">' + thisyear + '年' + lastjidu + '季度</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="label-cell"><div style="width:45px">面积</div></th>' +
            '<th class="label-cell"><div style="width:45px">人口</div></th>' +
            '<th class="label-cell"><div style="width:60px">动迁人口</div></th>' +
            '<th class="label-cell" ><div style="width:60px">动迁企业</div></th>' +
            '<th class="label-cell"><div style="width:60px">动迁比例</div></th>' +
            '<th class="label-cell"><div style="width:75px">建设进展情况</div></th>' +
            '</tr>'
    }
    //3.7
    if (formid == "45") {
        $('#searchkuang').html(search4);
        qiantou = "牵头单位:区房管局"
        biaotou = '<tr  data-mid="' + formid + '" data-type="ji" data-alias="' + form_alias + '" data-time="t_bsqdxjzsqjbqkjb613_nd1"  data-jidu="t_bsqdxjzsqjbqkjb613_jd2" id="get-data">' +
            '<th class="label-cell">名称</th>' +
            '<th class="label-cell" colspan="2">面积</th>' +
            '<th class="label-cell">已竣工</th>' +
            '<th class="label-cell" >未竣工</th>' +
            '<th class="label-cell" colspan="2">导入人口</th>' +
            '</tr>'
    }
    //4.1
    if (formid == "94") {
        $('#searchkuang').html(search2);
        $('#form-body').addClass('nofreeze-form-body');
        $('#form-head').addClass('nofreeze-form-head');
        qiantou = "牵头单位:区人社局"
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_bsqrlzyhshbzqkyb681_date3" data-jidu="t_bsqrlzyhshbzqkyb681_date2" id="get-data">' +
            '<th class="">序号</th>' +
            '<th class="">类别</th>' +
            '<th class=""><div style="width:60px;">统计项目</div></th>' +
            '<th class=""><div style="width:60px;">统计单位</div></th>' +
            '<th class=""><div style="width:60px;"  id="lastyearselect">' + (thisyear-1) + '年</div></th>' +
            '<th class=""><div style="width:60px;"><div id="yearselect">' + thisyear1 + '年</div><div id="thismonth">' + lastmon + '月</div></div></th>' +
            '<th class=""><div style="width:80px;"><div id="yearselect1">' + thisyear1 + '年</div><div id="thismonths">1-' + lastmon + '月</div></div></th>' +
            '</tr>'
    }
    //4.1.1
    if (formid == "95") {
        $('#searchkuang').html(search2);
        $('#form-body').addClass('nofreeze-form-body');
        $('#form-head').addClass('nofreeze-form-head');
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_bsqsydwrlzyqkyb653_date3"  data-kstime="t_bsqsydwrlzyqkyb653_date2" id="get-data">' +
            '<th class="">序号</th>' +
            '<th class="">统计项目</th>' +
            '<th class=""><div style="width:60px;">统计单位</div></th>' +
            '<th class="" ><div style="width:60px;" id="lastyearselect">' + (thisyear-1) + '年</div></th>' +
            '<th class=""><div style="width:60px;"><div id="yearselect">' + thisyear1 + '年</div><div id="thismonth">' + lastmon + '月</div></div></th>' +
            '<th class=""><div style="width:80px;"><div id="yearselect1">' + thisyear1 + '年</div><div id="thismonths">1-' + lastmon + '月</div></div></th>' +
            '</tr>'
    }

    //4.2
    if (formid == "96") {
        $('#searchkuang').html(search2);
        $('#form-body').addClass('nofreeze-form-body');
        $('#form-head').addClass('nofreeze-form-head');
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_bsqmzgzqkyb718_date3"  data-kstime="t_bsqmzgzqkyb718_date2" id="get-data">' +
            '<th class="">序号</th>' +
            '<th class="">类别</th>' +
            '<th class="" colspan="2"><div style="width:90px;">统计项目</div></th>' +
            '<th class=""><div style="width:30px;">单位</div></th>' +
            '<th class="" ><div style="width:50px;" id="lastyearselect">' + (thisyear - 1) + '年</div></th>' +
            '<th class=""><div style="width:60px;"><div id="yearselect">' + thisyear1 + '年</div><div id="thismonth">' + lastmon + '月</div></div></th>' +
            '<th class=""><div style="width:80px;"><div id="yearselect1">' + thisyear1 + '年</div><div id="thismonths">1-' + lastmon + '月</div></div></th>' +
            '</tr>'
    }

    //4.3.1
    if (formid == "97") {
        $('#searchkuang').html(search3);
        qiantou = "牵头单位:区财政局"
        biaotou = '<tr  data-mid="' + formid + '" data-type="nian" data-alias="' + form_alias + '" data-time="t_bsqzymsxyczzcqknb655_nd2" id="get-data">' +
            '<th class="">序号</th>' +
            '<th class="" style="width:50px;">类别</th>' +
            '<th class="">指标</th>' +
            '<th class="">单位</th>' +
            '<th class="" style="width:40px;" id="yearmonthse">' + (thisyear - 1) + '年</th>' +
            '<th class="" style="width:40px;" id="yearmonthse1">' + thisyear + '年</th>' +
            '</tr>'
    }

    //4.3.2
    if (formid == "98") {
        $('#searchkuang').html(search5);
        qiantou = "牵头单位:区教育局"
        biaotou = '<tr  data-mid="' + formid + '" data-type="ban" data-alias="' + form_alias + '" data-time="t_bsqjyqkbnb719_date2"  data-bannian="t_bsqjyqkbnb719_date3" id="get-data">' +
            '<th class="" width="20px">序号</th>' +
            '<th class="" colspan="2">指标</th>' +
            '<th class="" style="width:30px;">单位</th>' +
            '<th class="" style="width:60px;" id="lastyearselect">' + (thisyear - 1) + '年</th>' +
            '<th class="" style="width:90px;" id="bannianselect">' + thisyear_bannian + '年' + lastniandu_months + '</th>' +
            '</tr>'
    }
    //4.4
    if (formid == "99") {
        $('#searchkuang').html(search3);
        qiantou = "牵头单位:区卫计委"
        biaotou = '<tr  data-mid="' + formid + '" data-type="nian" data-alias="' + form_alias + '" data-time="t_bsqylqknb727_nd2"   id="get-data">' +
            '<th class="">序号</th>' +
            '<th class="" colspan="3">指标</th>' +
            '<th class="" style="width:30px;">单位</th>' +
            '<th class="" id="yearmonthse" style="width:40px;">' + (thisyear - 1) + '年</th>' +
            '<th class="" id="yearmonthse1" style="width:40px;">' + thisyear + '年</th>' +
            '</tr>'
    }
    //4.5
    if (formid == "100") {
        $('#searchkuang').html(search5);
        qiantou = "牵头单位:区文广局"
        biaotou = '<tr  data-mid="' + formid + '" data-type="ban" data-alias="' + form_alias + '" data-time="t_bsqwhqkbnb685_date2"  data-bannian="t_bsqwhqkbnb685_date3" id="get-data">' +
            '<th class="" style="width:30px;">序号</th>' +
            '<th class="" colspan="3" style="width:150px;">指标</th>' +
            '<th class="" style="width:30px;">单位</th>' +
            '<th class="" style="width:60px;" ><div id="lastyearselect" style="width:60px;">' + (thisyear - 1) + '年</div></th>' +
            '<th class=""  style="width:90px;"><div id="bannianselect" style="width:60px;">' + (thisyear_bannian) + '年' + lastniandu_months + '</div></th>' +
            '</tr>'
    }
    //4.6
    if (formid == "101") {
        $('#searchkuang').html(search5);
        $('#form-body').addClass('nofreeze-form-body');
        $('#form-head').addClass('nofreeze-form-head');
        qiantou = "牵头单位:区体育局"
        biaotou = '<tr  data-mid="' + formid + '" data-type="ban" data-alias="' + form_alias + '" data-time="t_bsqtyqkbnb686_date2"  data-bannian="t_bsqtyqkbnb686_date3" id="get-data">' +
            '<th class="" ><div style="width:30px;">序号</div></th>' +
            '<th class="" colspan="3" ><div style="width:100px;">建议指标</div></th>' +
            '<th class=""><div style="width:30px;">单位</div></th>' +
            '<th class="" ><div style="width:80px;" id="lastyearselect">' + (thisyear - 1) + '年</div></th>' +
            '<th class="" ><div id="bannianselect" style="width:100px;">' + (thisyear_bannian) + '年' + lastniandu_months + '</div></th>' +
            '</tr>'
    }
    //4.7.1
    if (formid == "102") {
        $('#searchkuang').html(search2);
        $('#form-body').addClass('nofreeze-form-body');
        $('#form-head').addClass('nofreeze-form-head');
        qiantou = "牵头单位:区网格化中心"
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_bsqcsglgzqkbyb725_date3"  data-kstime="t_bsqcsglgzqkbyb725_date2" id="get-data">' +
            '<th class="">序号</th>' +
            '<th class="" colspan="2"><div style="width:90px">统计项目</div></th>' +
            '<th class="" style="width:30px;">单位</th>' +
            '<th class="" ><div style="width:30px;" id="lastyearselect">' + (thisyear - 1) + '年</div></th>' +
            '<th class=""><div style="width:70px"><div id="yearselect">' + (thisyear1) + '年</div><div id="thismonth">' + lastmon + '月</div></div></th>' +
            '<th class=""><div style="width:70px"><div id="yearselect1">' + (thisyear1) + '年</div><div id="thismonths">1-' + lastmon + '月</div></div></th>' +
            '</tr>'
    }
    //4.7.2
    if (formid == "103") {
        $('#searchkuang').html(search3);
        $('#form-body').addClass('nofreeze-form-body');
        $('#form-head').addClass('nofreeze-form-head');
        qiantou = "牵头单位:区综治办"
        biaotou = '<tr  data-mid="' + formid + '" data-type="nian" data-alias="' + form_alias + '" data-time="t_bsqpasfcjqkbnb661_nd2"  id="get-data">' +
            '<th class="" colspan="2"></th>' +
            '<th class=""><div style="width:30px">指标</div></th>' +
            '<th class=""><div style="width:80px">“市平安示范社区”创建情况</div></th>' +
            '<th class=""><div style="width:80px">“市平安社区”创建情况</div></th>' +
            '<th class=""><div style="width:80px">“区平安示范小区”创建率</div></th>' +
            '<th class=""><div style="width:80px">“区平安小区”创建率</div></th>' +
            '<th class=""><div style="width:80px">平安志愿者队伍注册人数占常住人口比例</div></th>' +
            '</tr>'
    }
    //4.7.3
    if (formid == "104") {
        $('#searchkuang').html(search2);
        qiantou = "备注：1、表内常住人口数按市公安局口径统计。<br>2、各街镇（园区）常住人口不设置目标数。<br>3、因系统设置，宝山工业园区、城市工业园区的常住人口数分别计入罗泾镇、大场镇。<br>另，2018年来沪人员目标数未定，故暂时空缺。"
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_bsqrkqkbyb722_date3"  data-kstime="t_bsqrkqkbyb722_date2" id="get-data">' +
            '<th class=""></th>' +
            '<th class="">指标</th>' +
            '<th class=""> 常住人口数（人）</th>' +
            '<th class=""> 来沪人员数（人）</th>' +
            '</tr>'
    }
    //4.7.4
    if (formid == "105") {
        $('#searchkuang').html(search3);
        qiantou = "备注：此表中视频监控点数为公安局自建数量。"
        biaotou = '<tr  data-mid="' + formid + '" data-type="nian" data-alias="' + form_alias + '" data-time="t_bsqspjkqkbnb689_nd2" id="get-data">' +
            '<th class="" colspan="2"></th>' +
            '<th class=""><div style="width:60px;">指标</div></th>' +
            '<th class="">视频监控点数（个）</th>' +
            '<th class="">农村地区视频监控村组覆盖率</th>' +
            '</tr>'
    }
    //4.8.1
    if (formid == "106") {
        $('#searchkuang').html(search5);
        $('#form-body').addClass('nofreeze-form-body');
        $('#form-head').addClass('nofreeze-form-head');
        qiantou = "牵头单位:区安监局"
        biaotou = '<tr  data-mid="' + formid + '" data-type="ban" data-alias="' + form_alias + '" data-time="t_bsqaqscqkbbnb690_date2"  data-bannian="t_bsqaqscqkbbnb690_date3" id="get-data">' +
            '<th class="" colspan="2"></th>' +
            '<th class=""><div style="width:50px">指标</div></th>' +
            '<th class=""><div style="width:70px">危化生产经营企业数（个）</div></th>' +
            '<th class=""><div style="width:70px">重大危险源数（个）</div></th>' +
            '<th class=""><div style="width:70px">重点监管企业数（户）</div></th>' +
            '<th class=""><div style="width:70px">重大事故隐患区级挂牌督办数（件）</div></th>' +
            '<th class=""><div style="width:70px">生产安全死亡事故数（件）</div></th>' +
            '<th class=""><div style="width:120px">工矿商贸就业人员十万人生产安全事故死亡率</div></th>' +
            '</tr>'
    }

    //4.8.2
    if (formid == "107") {
        $('#searchkuang').html(search5);
        $('#form-body').addClass('nofreeze-form-body');
        $('#form-head').addClass('nofreeze-form-head');
        qiantou = "牵头单位:区安监局"
        biaotou = '<tr  data-mid="' + formid + '" data-type="ban" data-alias="' + form_alias + '" data-time="t_bsqyzjdqkbbnb665_date2"  data-bannian="t_bsqyzjdqkbbnb665_date3" id="get-data">' +
            '<th class="" colspan="2"></th>' +
            '<th class=""><div style="width:50px">指标</div></th>' +
            '<th class=""><div style="width:80px">重型设备制造企业数（户）</div></th>' +
            '<th class=""><div style="width:80px">在建在监工地（个）</div></th>' +
            '<th class=""><div style="width:80px">危险品码头数（个）</div></th>' +
            '<th class=""><div style="width:80px">特种设备数（个）</div></th>' +
            '<th class=""><div style="width:80px">特种设备整改数（个）</div></th>' +
            '<th class=""><div style="width:80px">地下空间数（个）</div></th>' +
            '<th class=""><div style="width:80px">集贸市场数（个）</div></th>' +
            '</tr>'
    }
    //4.8.3
    if (formid == "108") {
        $('#searchkuang').html(search2);
        qiantou = "牵头单位:区公安局"
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_bsqajqkbyb666_date3"  data-kstime="t_bsqajqkbyb666_date2" id="get-data">' +
            '<th class=""></th>' +
            '<th class="" style="width:50px;">指标</th>' +
            '<th class="">刑事案件数（件）</th>' +
            '<th class="">命案刑事案件数（件）</th>' +
            '<th class="">命案刑事案件破获率（%）</th>' +
            '</tr>'
    }
    //4.8.4
    if (formid == "109") {
        $('#searchkuang').html(search3);
        qiantou = "备注：2017年实有人口数为2017年底期末人口数据。<br>罗泾镇各项数据为罗泾镇、宝山工业园区合计数。<br>大场镇各项数据为大场镇、城市工业园区合计数。<br>牵头单位:区公安局"
        biaotou = '<tr  data-mid="' + formid + '" data-type="nian" data-alias="' + form_alias + '" data-time="t_bsqdxjzsqjbqkjb613_nd1"  data-jidu="t_bsqdxjzsqjbqkjb613_jd2" id="get-data">' +
            '<th class="" colspan="2"></th>' +
            '<th class="" style="width:30px;">指标</th>' +
            '<th class="" style="width:60px;">实有人口数</th>' +
            '<th class="" style="width:80px;">报警类110实口人口万人接警数（件）</th>' +
            '<th class="" style="width:60px;">派出所实有人口万人警力数（人）</th>' +
            '</tr>'
    }
    //4.8.5
    if (formid == "110") {
        $('#searchkuang').html(search2);
        qiantou = "牵头单位:区消防"
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_bsqhzsgqkbyb668_date3"  data-kstime="t_bsqhzsgqkbyb668_date2" id="get-data">' +
            '<th class="" colspan="2"></th>' +
            '<th class="">指标</th>' +
            '<th class="">火灾事故数（件）</th>' +
            '<th class="">火灾隐患整改数（处）</th>' +
            '</tr>'
    }
    //4.8.6
    if (formid == "111") {
        $('#searchkuang').html(search3);
        qiantou = "牵头单位:区公安局";
        biaotou = '<tr  data-mid="' + formid + '" data-type="nian" data-alias="' + form_alias + '" data-time="t_bsqdxjzsqjbqkjb613_nd1"  data-jidu="t_bsqdxjzsqjbqkjb613_jd2" id="get-data">' +
            '<th class=""></th>' +
            '<th class="" style="width:30px">指标</th>' +
            '<th class="">道路交通事故数（件）</th>' +
            '<th class="">交通事故死亡人数（人）</th>' +
            '</tr>'
    }
    //4.8.7
    if (formid == "112") {
        $('#searchkuang').html(search2);
        $('#form-body').addClass('nofreeze-form-body');
        $('#form-head').addClass('nofreeze-form-head');
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_bsqspaqqkbyb670_date3"  data-kstime="t_bsqspaqqkbyb670_date2" id="get-data">' +
            '<th class="" colspan="2"></th>' +
            '<th class=""><div style="width:30px">指标</div></th>' +
            '<th class=""><div style="width:70px">食品类案件数（件）</div></th>' +
            '<th class=""><div style="width:70px">食品生产企业数（户）</div></th>' +
            '<th class=""><div style="width:70px">整治消除无证无照食品生产经营户数（户）</div></th>' +
            '<th class=""><div style="width:70px">主要食品风险监测抽样数</div></th>' +
            '<th class="" ><div style="width:70px">药品质量监督性抽检抽样数</div></th>' +
            '</tr>'
    }
    //5.1
    if (formid == "114") {
        $('#searchkuang').html(search1);
        $('#form-body').addClass('second-form-body');
        $('#form-head').addClass('second-form-head');
        biaotou = '<tr  data-mid="' + formid + '" data-type="yue" data-alias="' + form_alias + '" data-time="t_bsqspsxfwsxsjblhsjbljbqkyb728_jssj3"  data-kstime="t_bsqspsxfwsxsjblhsjbljbqkyb728_kssj2" id="get-data">' +
            '<th class="" rowspan="2"><div style="width:50px">序号</div></th>' +
            '<th class="" rowspan="2"><div style="width:50px">部门窗口</div></th>' +
            '<th class="" colspan="2"><div style="width:90px">上网事项总数</div></th>' +
            '<th class="" colspan="2"><div style="width:90px">四级办理事项数</div></th>' +
            '<th class="" colspan="2"><div style="width:90px">三级办理事项数</div></th>' +
            '<th class=""><div style="width:90px">三级四级事项数占比</div></th>' +
            '<th class="" colspan="2"><div style="width:90px">三级、四级事项办理量</div></th>' +
            '<th class="" colspan="2"><div style="width:90px">三级、四级事项网上办理量</div></th>' +
            '<th class="" colspan="2"><div style="width:90px">其中：三级四级条线系统网办量</div></th>' +
            '<th class=""><div style="width:50px">网上办理量</div></th>' +
            '<th class="" colspan="2"><div style="width:90px">证照批文快递送达</div></th>' +
            '</tr>' +
            '<tr>' +
            '<th class="">审批</th>' +
            '<th class="">服务</th>' +
            '<th class="">审批</th>' +
            '<th class="">服务</th>' +
            '<th class="">审批</th>' +
            '<th class="">服务</th>' +
            '<th class="">占比%</th>' +
            '<th class="">审批</th>' +
            '<th class="">服务</th>' +
            '<th class="">审批</th>' +
            '<th class="">服务</th>' +
            '<th class="">审批</th>' +
            '<th class="">服务</th>' +
            '<th class="">占比%</th>' +
            '<th class="">件数</th>' +
            '<th class="">占比%</th>' +
            '</tr>'
    }
    //5.2
    if (formid == "115") {
        $('#searchkuang').html(search4);
        qiantou = "牵头单位:区行政中心"
        biaotou = '<tr  data-mid="' + formid + '" data-type="ji" data-alias="' + form_alias + '" data-time="t_bsqljzldwjbqkjb729_nd2"  data-jidu="t_bsqljzldwjbqkjb729_jd3" id="get-data">' +
            '<th class="" rowspan="3"><div style="width:30px">序号</div></th>' +
            '<th class="" rowspan="3"><div style="width:25px">部门窗口</div></th>' +
            '<th class="" rowspan="3">是否进驻</th>' +
            '<th class="" id="nianandjidu" colspan="5">' + thisyear_jidu + '年' + lastjidu + '季度</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="" colspan="2">应进事项</th>' +
            '<th class="" colspan="2">已进事项</th>' +
            '<th class="" rowspan="2">进驻比例%</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="">审批</th>' +
            '<th class="">服务</th>' +
            '<th class="">审批</th>' +
            '<th class="">服务</th>' +
            '</tr>'
    }
    // alert(biaotou)
    $('#form-head').html(biaotou);
    $('#danwei').html(danwei)
    $('#qiantou').html(qiantou)
    // alert(sss)
    var wid = $('#form-table').width();
    $("#danwei").width(wid);
    datalay();
    var date_type = $('#form-head tr').data('type');
    console.log(date_type)
    var search_condition = [];
    if (date_type == "yue") {
        // search_condition['ksrq']=lastyearstart;
        search_condition['jsrq'] = lastDay;
        search_condition['kszd']=$('#form-head tr').data('kstime');
        search_condition['jszd'] = $('#form-head tr').data('time')
    }
    if (date_type == "ji") {
        //    if (lastjidu=="1") {
        //     lastjidu="第一季度"
        //    } else if(lastjidu=="2") {
        //     lastjidu="第二季度"
        //    } else if(lastjidu=="3") {
        //     lastjidu="第三季度"
        //    } else if(lastjidu=="4") {
        //     lastjidu="第四季度"
        // }

        //     search_condition['jdsz'] = lastjidu;
        //     search_condition['jdzd']=$('#form-head tr').data('jidu');
        //     search_condition['ksrq'] = thisyear_jidu;
        //     search_condition['kszd'] = $('#form-head tr').data('time')
    }
    if (date_type == "ban") {

        // search_condition['ndsz'] =  lastniandu ;
        // search_condition['ndzd']=$('#form-head tr').data('bannian');
        // search_condition['ksrq'] = thisyear_bannian;
        // search_condition['kszd'] = $('#form-head tr').data('time')
    }
    if (date_type == "nian") {
        // search_condition['ndrq'] = thisyear_bannian;
        // search_condition['niandu'] = $('#form-head tr').data('time')
    }

    get_data(formid, form_alias, search_condition);
});
// 年报搜索
function get_date_nian() {

    var end = $('#seyear').val();
    var ziduan = $('#get-data').data('time')
    var mid = $('#get-data').data('mid')
    var alias = $('#get-data').data('alias')
    var nian2 = end;
    if (end == "") {
        tishi('请选择日期');
        return false
    }
    $("#yearmonthse").html((nian2 - 1) + "年");
    $("#yearmonthse1").html((nian2) + "年");


    //console.log(start, end, ksziduan, ziduan, mid)
    get_data_search_nian(end, ziduan, mid, alias);
}

function get_data_search_nian(end, ziduan, moduleId, alias) {
    $.ajax({
        type: "POST",
        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?token=' + localStorage.token,
        //contentType:"json",
        data: {
            bpmDataTemplatep: '1',
            bpmDataTemplatez: '1000',
            bpmDataTemplateoz: '1000',
            bpmDataTemplate__ns__: 't_' + alias + '_ID',
            bpmDataTemplateo: "ASC"
        },
        dataType: 'json',
        beforeSend: function () {
            myApp.showPreloader();
        },
        complete: function () {
            myApp.hidePreloader();
        },
        success: function (data) {
            //console.log(data)
            if (data.bpmDataTemplate != null) {
                var data = data.bpmDataTemplate.list;
                var last = end - 1;
                var str = "";
                if (moduleId == "79") {
                    var qita1 = "",
                        qita2 = "",
                        qita3 = "";
                    $.each(data, function (i, n) {
                        if (n[ziduan] == end) {
                            if (n['t_gzjgqkbnb516_lb4'] == "其他(直管)") {
                                qita1 = '<tr><td class="label-cell">' + n['t_gzjgqkbnb516_lb4'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_qys5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_zczeyy6'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_jzcyy7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_jlryy8'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_lrzeyy9'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_gyyd10'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_cf11'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_zg12'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_bz13'] + '</td></tr>'
                            }
                            if (n['t_gzjgqkbnb516_lb4'] == "其他(区属)") {
                                qita2 = '<tr><td class="label-cell">' + n['t_gzjgqkbnb516_lb4'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_qys5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_zczeyy6'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_jzcyy7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_jlryy8'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_lrzeyy9'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_gyyd10'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_cf11'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_zg12'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_bz13'] + '</td></tr>'
                            }
                            if (n['t_gzjgqkbnb516_lb4'] == "其他(委托监管)") {
                                qita3 = '<tr><td class="label-cell">' + n['t_gzjgqkbnb516_lb4'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_qys5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_zczeyy6'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_jzcyy7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_jlryy8'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_lrzeyy9'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_gyyd10'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_cf11'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_zg12'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_bz13'] + '</td></tr>'
                            }
                        }
                    })
                    $.each(data, function (i, n) {
                        if (n[ziduan] == end) {
                            if (n['t_gzjgqkbnb516_lb4'].indexOf("其他") == -1) {
                                str += '<tr><td class="label-cell">' + n['t_gzjgqkbnb516_lb4'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_qys5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_zczeyy6'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_jzcyy7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_jlryy8'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_lrzeyy9'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_gyyd10'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_cf11'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_zg12'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_gzjgqkbnb516_bz13'] + '</td></tr>'
                            }
                            if (i == 1) {
                                str += '<tr><td class="label-cell">总计</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[0]['t_gzjgqkbnb516_qys5']) + parseFloat(data[1]['t_gzjgqkbnb516_qys5'])) + '</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[0]['t_gzjgqkbnb516_zczeyy6']) + parseFloat(data[1]['t_gzjgqkbnb516_zczeyy6'])) + '</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[0]['t_gzjgqkbnb516_jzcyy7']) + parseFloat(data[1]['t_gzjgqkbnb516_jzcyy7'])) + '</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[0]['t_gzjgqkbnb516_jlryy8']) + parseFloat(data[1]['t_gzjgqkbnb516_jlryy8'])) + '</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[0]['t_gzjgqkbnb516_lrzeyy9']) + parseFloat(data[1]['t_gzjgqkbnb516_lrzeyy9'])) + '</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[0]['t_gzjgqkbnb516_gyyd10']) + parseFloat(data[1]['t_gzjgqkbnb516_gyyd10'])) + '</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[0]['t_gzjgqkbnb516_cf11']) + parseFloat(data[1]['t_gzjgqkbnb516_cf11'])) + '</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[0]['t_gzjgqkbnb516_zg12']) + parseFloat(data[1]['t_gzjgqkbnb516_zg12'])) + '</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[0]['t_gzjgqkbnb516_bz13']) + parseFloat(data[1]['t_gzjgqkbnb516_bz13'])) + '</td></tr>'
                                str += qita2
                            }
                            if (i == 4) {
                                str += '<tr><td class="label-cell">总计</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[3]['t_gzjgqkbnb516_qys5']) + parseFloat(data[4]['t_gzjgqkbnb516_qys5'])) + '</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[3]['t_gzjgqkbnb516_zczeyy6']) + parseFloat(data[4]['t_gzjgqkbnb516_zczeyy6'])) + '</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[3]['t_gzjgqkbnb516_jzcyy7']) + parseFloat(data[4]['t_gzjgqkbnb516_jzcyy7'])) + '</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[3]['t_gzjgqkbnb516_jlryy8']) + parseFloat(data[4]['t_gzjgqkbnb516_jlryy8'])) + '</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[3]['t_gzjgqkbnb516_lrzeyy9']) + parseFloat(data[4]['t_gzjgqkbnb516_lrzeyy9'])) + '</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[3]['t_gzjgqkbnb516_gyyd10']) + parseFloat(data[4]['t_gzjgqkbnb516_gyyd10'])) + '</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[3]['t_gzjgqkbnb516_cf11']) + parseFloat(data[4]['t_gzjgqkbnb516_cf11'])) + '</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[3]['t_gzjgqkbnb516_zg12']) + parseFloat(data[4]['t_gzjgqkbnb516_zg12'])) + '</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[3]['t_gzjgqkbnb516_bz13']) + parseFloat(data[4]['t_gzjgqkbnb516_bz13'])) + '</td></tr>'
                                str += qita1
                            }
                            if (i == 8) {
                                str += '<tr><td class="label-cell">总计</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[5]['t_gzjgqkbnb516_qys5']) + parseFloat(data[6]['t_gzjgqkbnb516_qys5'])) + '</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[5]['t_gzjgqkbnb516_zczeyy6']) + parseFloat(data[6]['t_gzjgqkbnb516_zczeyy6'])) + '</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[5]['t_gzjgqkbnb516_jzcyy7']) + parseFloat(data[6]['t_gzjgqkbnb516_jzcyy7'])) + '</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[5]['t_gzjgqkbnb516_jlryy8']) + parseFloat(data[6]['t_gzjgqkbnb516_jlryy8'])) + '</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[5]['t_gzjgqkbnb516_lrzeyy9']) + parseFloat(data[6]['t_gzjgqkbnb516_lrzeyy9'])) + '</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[5]['t_gzjgqkbnb516_gyyd10']) + parseFloat(data[6]['t_gzjgqkbnb516_gyyd10'])) + '</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[5]['t_gzjgqkbnb516_cf11']) + parseFloat(data[6]['t_gzjgqkbnb516_cf11'])) + '</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[5]['t_gzjgqkbnb516_zg12']) + parseFloat(data[6]['t_gzjgqkbnb516_zg12'])) + '</td>' +
                                    '<td class="numeric-cell">' + (parseFloat(data[5]['t_gzjgqkbnb516_bz13']) + parseFloat(data[6]['t_gzjgqkbnb516_bz13'])) + '</td></tr>'
                                str += qita3
                            }
                        }
                    });
                }
                //1.4
                if (moduleId == "78") {
                    $.each(data, function (i, n) {
                        if (n[ziduan].slice(0, 4) == end) {
                            str += '<tr><td class="label-cell">' + n['t_bsqkcqkbyb514_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqkcqkbyb514_sqzjyxms5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqkcqkbyb514_sqlxs6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqkcqkbyb514_sqzjsjzjzcwy7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqkcqkbyb514_tryfqdrd8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqkcqkbyb514_sjkjxjrqys9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqkcqkbyb514_sckjsqzsjys10'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqkcqkbyb514_yszjgzz11'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqkcqkbyb514_zlsql12'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqkcqkbyb514_yffytrzgdpbz13'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqkcqkbyb514_sjcxdsrwqys14'] + '</td></tr>'
                        }
                    });
                }
                //2.1
                if (moduleId == "81") {
                    // console.log("ziduan"+ziduan);
                    $.each(data, function (i, n) {
                        if (data[i][ziduan] == end) {
                            str += '<tr>' +
                                '<td class="label-cell" rowspan="5" style=" position:inherit;"><div style="width:60px; position:inherit;">河湖情况</div></td>' +
                                '<td class="numeric-cell" rowspan="5"><div style="width:60px">河湖</div></td>' +
                                '<td class="numeric-cell"><div style="width:60px">条数</div></td>' +
                                '<td class="numeric-cell"><div style="width:60px">公里数</div></td>' +
                                '<td class="numeric-cell"><div style="width:60px">主要类别</div></td>' +
                                '<td class="numeric-cell"><div style="width:30px">条数</div></td>' +
                                '<td class="numeric-cell"><div style="width:60px">公里数</div></td>' +
                                '<td class="numeric-cell" rowspan="5"><div style="width:60px">其他河湖</div></td>' +
                                '<td class="numeric-cell"><div style="width:30px">条数</div></td>' +
                                '<td class="numeric-cell"><div style="width:60px">公里数</div></td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell" rowspan="4" style=" position:inherit;">' + data[i]['t_bsqhdqknd605_hhts3'] + '</td>' +
                                '<td class="numeric-cell" rowspan="4">' + data[i]['t_bsqhdqknd605_hhgls4'] + '</td>' +
                                '<td class="numeric-cell">市管</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqhdqknd605_sgts5'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqhdqknd605_sggls6'] + '</td>' +
                                '<td class="numeric-cell" rowspan="4">' + data[i]['t_bsqhdqknd605_qthhts12'] + '</td>' +
                                '<td class="numeric-cell" rowspan="4">' + data[i]['t_bsqhdqknd605_qthhgls13'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell" style=" position:inherit;">区管</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqhdqknd605_qgts20'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqhdqknd605_qggls7'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell" style=" position:inherit;">镇管</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqhdqknd605_zgts8'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqhdqknd605_zggls9'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell" style=" position:inherit;">村管</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqhdqknd605_cgts10'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqhdqknd605_cggls11'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell" rowspan="2" style=" position:inherit;">整治情况</td>' +
                                '<td class="numeric-cell">整治目标</td>' +
                                '<td class="numeric-cell">整治情况</td>' +
                                '<td class="numeric-cell">疏浚目标</td>' +
                                '<td class="numeric-cell">疏浚情况</td>' +
                                '<td class="numeric-cell" colspan="2">新增水域面积</td>' +
                                '<td class="numeric-cell" colspan="3">水质达标情况</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell" style=" position:inherit;">' + data[i]['t_bsqhdqknd605_zzmb14'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqhdqknd605_zzqk15'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqhdqknd605_sjmb16'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqhdqknd605_sjqk17'] + '</td>' +
                                '<td class="numeric-cell" colspan="2">' + data[i]['t_bsqhdqknd605_xzsymj18'] + '</td>' +
                                '<td class="numeric-cell" colspan="3">' + data[i]['t_bsqhdqknd605_szdbqk19'] + '</td>' +
                                '</tr>'
                        }
                        // else{
                        //     str +='<tr>'
                        //         +'<td class="label-cell" rowspan="5"><div style="width:60px">河湖情况</div></td>'
                        //         +'<td class="numeric-cell" rowspan="5"><div style="width:60px">河湖</div></td>'
                        //         +'<td class="numeric-cell"><div style="width:60px">条数</div></td>'
                        //         +'<td class="numeric-cell"><div style="width:60px">公里数</div></td>'
                        //         +'<td class="numeric-cell"><div style="width:60px">主要类别</div></td>'
                        //         +'<td class="numeric-cell"><div style="width:30px">条数</div></td>'
                        //         +'<td class="numeric-cell"><div style="width:60px">公里数</div></td>'
                        //         +'<td class="numeric-cell" rowspan="5"><div style="width:60px">其他河湖</div></td>'
                        //         +'<td class="numeric-cell"><div style="width:30px">条数</div></td>'
                        //         +'<td class="numeric-cell"><div style="width:60px">公里数</div></td>'
                        //         +'</tr>'
                        //         +'<tr>'
                        //             +'<td class="numeric-cell" rowspan="4"></td>'
                        //             +'<td class="numeric-cell" rowspan="4"></td>'
                        //             +'<td class="numeric-cell">市管</td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell" rowspan="4"></td>'
                        //             +'<td class="numeric-cell" rowspan="4"></td>'
                        //         +'</tr>'
                        //         +'<tr>'
                        //             +'<td class="numeric-cell">区管</td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //         +'</tr>'
                        //         +'<tr>'
                        //             +'<td class="numeric-cell">镇管</td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //         +'</tr>'
                        //         +'<tr>'
                        //             +'<td class="numeric-cell">村管</td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //         +'</tr>'
                        //         +'<tr>'
                        //             +'<td class="label-cell" rowspan="2">整治情况</td>'
                        //             +'<td class="numeric-cell">整治目标</td>'
                        //             +'<td class="numeric-cell">整治情况</td>'
                        //             +'<td class="numeric-cell">疏浚目标</td>'
                        //             +'<td class="numeric-cell">疏浚情况</td>'
                        //             +'<td class="numeric-cell" colspan="2">新增水域面积</td>'
                        //             +'<td class="numeric-cell" colspan="3">水质达标情况</td>'
                        //         +'</tr>'
                        //         +'<tr>'
                        //         +'<td class="numeric-cell"></td>'
                        //         +'<td class="numeric-cell"></td>'
                        //         +'<td class="numeric-cell"></td>'
                        //         +'<td class="numeric-cell"></td>'
                        //         +'<td class="numeric-cell" colspan="2"></td>'
                        //         +'<td class="numeric-cell" colspan="3"></td>'
                        //     +'</tr>'
                        // }

                    });
                }

                //2.6
                if (moduleId == "86") {
                    $.each(data, function (i, n) {
                        if (data[i][ziduan] == end) {
                            str += '<tr>' +
                                '<td class="label-cell" rowspan="5">主要指标</td>' +
                                '<td class="numeric-cell" rowspan="2">绿地面积</td>' +
                                '<td class="numeric-cell">已建面积</td>' +
                                '<td class="numeric-cell">' + end + '年新建面积</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqlhjbjsqknb601_yjmjgq3'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqlhjbjsqknb601_xjmjgq4'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">人均绿地面积</td>' +
                                '<td class="numeric-cell" colspan="2">' + data[i]['t_bsqlhjbjsqknb601_rjldmjpfmr5'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">森林覆盖率</td>' +
                                '<td class="numeric-cell" colspan="2">' + data[i]['t_bsqlhjbjsqknb601_slfgl6'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">门类</td>' +
                                '<td class="numeric-cell" colspan="2">' + data[i]['t_bsqlhjbjsqknb601_ml7'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td rowspan="5">5个100建设情况</td>' +
                                '<td class="numeric-cell">100座公园绿地</td>' +
                                '<td class="numeric-cell" colspan="2">' + data[i]['t_bsqlhjbjsqknb601_zgyldz8'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">100条区级林荫大道</td>' +
                                '<td class="numeric-cell" colspan="2">' + data[i]['t_bsqlhjbjsqknb601_tqjlyddt9'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">100个市民街心花园</td>' +
                                '<td class="numeric-cell" colspan="2">' + data[i]['t_bsqlhjbjsqknb601_gsmjxhyg10'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">100公里城市绿色步道</td>' +
                                '<td class="numeric-cell" colspan="2">' + data[i]['t_bsqlhjbjsqknb601_glcslsbdgl11'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">100棵古树名木</td>' +
                                '<td class="numeric-cell" colspan="2">' + data[i]['t_bsqlhjbjsqknb601_kgsmsk12'] + '</td>' +
                                '</tr>'
                        }
                        // else{
                        //     str ='<tr>'
                        //     +'<td class="label-cell" rowspan="5">主要指标</td>'
                        //     +'<td class="numeric-cell" rowspan="2">绿地面积</td>'
                        //     +'<td class="numeric-cell">已建面积</td>'
                        //     +'<td class="numeric-cell">'+last+'年新建面积</td>' 
                        // +'</tr>'
                        // +'<tr>'
                        //     +'<td class="numeric-cell"></td>'
                        //     +'<td class="numeric-cell"></td>' 
                        // +'</tr>'
                        // +'<tr>'
                        //     +'<td class="numeric-cell">人均绿地面积</td>'
                        //     +'<td class="numeric-cell" colspan="2"></td>' 
                        // +'</tr>'
                        // +'<tr>'
                        //     +'<td class="numeric-cell">森林覆盖率</td>'
                        //     +'<td class="numeric-cell" colspan="2"></td>' 
                        // +'</tr>'
                        // +'<tr>'
                        //     +'<td class="numeric-cell">门类</td>'
                        //     +'<td class="numeric-cell" colspan="2"></td>' 
                        // +'</tr>'
                        // +'<tr>'
                        //     +'<td rowspan="5">5个100建设情况</td>'
                        //     +'<td class="numeric-cell">100座公园绿地</td>'
                        //     +'<td class="numeric-cell" colspan="2"></td>' 
                        // +'</tr>'
                        // +'<tr>'
                        //     +'<td class="numeric-cell">100条区级林荫大道</td>'
                        //     +'<td class="numeric-cell" colspan="2"></td>' 
                        // +'</tr>'
                        // +'<tr>'
                        //     +'<td class="numeric-cell">100个市民街心花园</td>'
                        //     +'<td class="numeric-cell" colspan="2"></td>' 
                        // +'</tr>'
                        // +'<tr>'
                        //     +'<td class="numeric-cell">100公里城市绿色步道</td>'
                        //     +'<td class="numeric-cell" colspan="2"></td>'
                        // +'</tr>'
                        // +'<tr>'
                        //     +'<td class="numeric-cell">100棵古树名木</td>'
                        //     +'<td class="numeric-cell" colspan="2"></td>' 
                        // +'</tr>'
                        // }
                    });
                }
                //3.1
                if (moduleId == "19") {
                    $.each(data, function (i, n) {
                        if (data[i][ziduan] == end) {
                            str += '<tr>' +
                                '<td class="label-cell" rowspan="3">建设用地</td>' +
                                '<td class="numeric-cell">城镇村及工矿用地</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqtdjbqknb606_czcjgkyd3'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">交通运输用地</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqtdjbqknb606_jtysyd4'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">水利设施用地</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqtdjbqknb606_slssyd5'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell" rowspan="3">农用地</td>' +
                                '<td class="numeric-cell">耕地</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqtdjbqknb606_gd6'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">林地</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqtdjbqknb606_ld7'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">其他农用地</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqtdjbqknb606_qtnyd8'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="numeric-cell">未利用土地</td>' +
                                '<td class="numeric-cell" colspan="2">' + data[i]['t_bsqtdjbqknb606_wlytd9'] + '</td>' +
                                '</tr>'
                        }
                        //   else{
                        //     str +='<tr>'
                        //             +'<td class="label-cell" rowspan="3">建设用地</td>'
                        //             +'<td class="numeric-cell">城镇村及工矿用地</td>'
                        //             +'<td class="numeric-cell"></td>'
                        //         +'</tr>'
                        //         +'<tr>'
                        //         +'<td class="numeric-cell">交通运输用地</td>'
                        //         +'<td class="numeric-cell"></td>'
                        //     +'</tr>'
                        //     +'<tr>'
                        //         +'<td class="numeric-cell">水利设施用地</td>'
                        //         +'<td class="numeric-cell"></td>'
                        //     +'</tr>'
                        //     +'<tr>'
                        //         +'<td class="label-cell" rowspan="3">农用地</td>'
                        //         +'<td class="numeric-cell">耕地</td>'
                        //         +'<td class="numeric-cell"></td>'
                        //     +'</tr>'
                        //         +'<tr>'
                        //         +'<td class="numeric-cell">林地</td>'
                        //         +'<td class="numeric-cell"></td>'
                        //     +'</tr>'
                        //     +'<tr>'
                        //         +'<td class="numeric-cell">其他农用地</td>'
                        //         +'<td class="numeric-cell"></td>'
                        //     +'</tr>'
                        //     +'<tr>'
                        //         +'<td class="numeric-cell">未利用土地</td>'
                        //         +'<td class="numeric-cell" colspan="2"></td>'
                        //     +'</tr>' 
                        //   }
                    });
                }
                //3.3
                if (moduleId == "21") {
                    $.each(data, function (i, n) {
                        if (data[i][ziduan] == end) {
                            str += '<tr>' +
                                '<td class="label-cell">市管</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdlqknb608_slsg3'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdlqknb608_lcssg4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdlqknb608_qlssg5'] + '</td>' +
                                '<td class="label-cell">' + n['t_bsqdlqknb608_jsrwsg6'] + '</td>' +
                                '<td class="label-cell">' + n['t_bsqdlqknb608_wcqksg7'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell">区管</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqdlqknb608_slqg8'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqdlqknb608_lcsqg9'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_bsqdlqknb608_qlsqg10'] + '</td>' +
                                '<td class="label-cell">' + data[i]['t_bsqdlqknb608_jsrwqg11'] + '</td>' +
                                '<td class="label-cell">' + data[i]['t_bsqdlqknb608_wcqkqg12'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell">镇管</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdlqknb608_slzg13'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdlqknb608_lcszg14'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdlqknb608_qlszg15'] + '</td>' +
                                '<td class="label-cell">' + n['t_bsqdlqknb608_jsrwzg16'] + '</td>' +
                                '<td class="label-cell">' + n['t_bsqdlqknb608_wcqkzg17'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell">合计</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdlqknb608_slhj18'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdlqknb608_lcshj19'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdlqknb608_qlshj20'] + '</td>' +
                                '<td class="label-cell">' + n['t_bsqdlqknb608_jsrwhj21'] + '</td>' +
                                '<td class="label-cell">' + n['t_bsqdlqknb608_wcqkhj22'] + '</td>' +
                                '</tr>'
                        }
                    });
                }

                //3.4
                if (moduleId == "22") {
                    //  console.log(ziduan)
                    //  console.log(end)
                    var strbody = ""
                    var strhead = ""
                    $.each(data, function (i, n) {

                        if (data[i][ziduan] == end) {

                            // console.log(data[i])
                            str += '<tr>' +
                                '<td class="label-cell" >桥梁数量</td>' +
                                '<td class="numeric-cell" colspan="2">' + data[i]['t_bsqqlqknb609_qlsl3'] + '</td>' +
                                '<td class="numeric-cell">桥孔数量</td>' +
                                '<td class="numeric-cell" colspan="2">' + data[i]['t_bsqqlqknb609_qksl4'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell" >危桥数量</td>' +
                                '<td class="numeric-cell" colspan="5"></td>' +
                                '</tr>'
                            strhead = '<tr>' +
                                '<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">管理级别</div></th>' +
                                '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">数量</div></th>' +
                                '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">桥孔数</div></th>' +
                                '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">养护单位</div></th>' +
                                '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">维护任务</div></th>' +
                                '<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">完成情况</div></th>' +
                                '</tr>'
                            strbody += '<tr>' +
                                '<td class="label-cell" >省级</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_slsj6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_qkssj7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_yhdwsj8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_whdwsj9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_wcqksj10'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell" >市级</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_slsj11'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_qkssj12'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_yhdwsj13'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_whdwsj14'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_wcqksj15'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell" >区级</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_slqj16'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_qksqj17'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_yhdwqj18'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_whdwqj19'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_wcqkqj20'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell" >镇级</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_slzj21'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_qkszj22'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_yhdwzj23'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_whdwzj24'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_wcqkzj25'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell" >农村</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_slnc26'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_qksnc27'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_yhdwnc28'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_whdwnc29'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_wcqknc30'] + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td class="label-cell" >三不管</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_slsbg31'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_qkssbg32'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_yhdwsbg33'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_whdwsbg34'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqqlqknb609_wcqksbg35'] + '</td>' +
                                '</tr>'
                        }
                        //      else{
                        //         str ='<tr>'
                        //         +'<td class="label-cell" >桥梁数量</td>'
                        //         +'<td class="numeric-cell" colspan="2"></td>'
                        //         +'<td class="numeric-cell">桥孔数量</td>'
                        //         +'<td class="numeric-cell" colspan="2"></td>'
                        //     +'</tr>'
                        //     +'<tr>'
                        //         +'<td class="label-cell" >危桥数量</td>'
                        //         +'<td class="numeric-cell" colspan="5"></td>'
                        //     +'</tr>'
                        //         strhead='<tr>'
                        //         +'<th class="label-cell" ><div  style="WORD-WRAP: break-word;width:60px">管理级别</div></th>'
                        //         +'<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">数量</div></th>'
                        //         +'<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">桥孔数</div></th>'
                        //         +'<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">养护单位</div></th>'            
                        //         +'<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">维护任务</div></th>'
                        //         +'<th class="numeric-cell" ><div  style="WORD-WRAP: break-word;width:60px">完成情况</div></th>'
                        //     +'</tr>'      
                        //    strbody ='<tr>'
                        //             +'<td class="label-cell" >省级</td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //         +'</tr>'
                        //         +'<tr>'
                        //             +'<td class="label-cell" >市级</td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //         +'</tr>'
                        //         +'<tr>'
                        //             +'<td class="label-cell" >区级</td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //         +'</tr>'
                        //         +'<tr>'
                        //             +'<td class="label-cell" >镇级</td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //         +'</tr>'
                        //         +'<tr>'
                        //             +'<td class="label-cell" >农村</td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //         +'</tr>'
                        //         +'<tr>'
                        //             +'<td class="label-cell" >三不管</td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //             +'<td class="numeric-cell"></td>'
                        //         +'</tr>'
                        //      }
                    });
                    str += '<tr><td colspan="6" style="padding:0 0"><table border="0"><thead>' + strhead + '</thead><tbody>' + strbody + '</tbody></table></td></tr>'

                }

                //4.3.1
                if (moduleId == "97") {
                    var lastyear = [];
                    var thisyear = [];
                    $.each(data, function (i, n) {

                        if (data[i][ziduan] == last) {
                            lastyear.push(data[i]['t_bsqzymsxyczzcqknb655_jyzczey3']);
                            lastyear.push(data[i]['t_bsqzymsxyczzcqknb655_jyzczqjczzcbl4']);
                            lastyear.push(data[i]['t_bsqzymsxyczzcqknb655_ylyjszczey5']);
                            lastyear.push(data[i]['t_bsqzymsxyczzcqknb655_nylyjszczqjczzcbl6']);
                            lastyear.push(data[i]['t_bsqzymsxyczzcqknb655_whycmzczey7']);
                            lastyear.push(data[i]['t_bsqzymsxyczzcqknb655_whycmzczqjczzcbl8']);
                            lastyear.push(data[i]['t_bsqzymsxyczzcqknb655_tyzczey9']);
                            lastyear.push(data[i]['t_bsqzymsxyczzcqknb655_tyzczqjczzcb10']);
                        }
                        if (data[i][ziduan] == end) {
                            thisyear.push(data[i]['t_bsqzymsxyczzcqknb655_jyzczey3']);
                            thisyear.push(data[i]['t_bsqzymsxyczzcqknb655_jyzczqjczzcbl4']);
                            thisyear.push(data[i]['t_bsqzymsxyczzcqknb655_ylyjszczey5']);
                            thisyear.push(data[i]['t_bsqzymsxyczzcqknb655_nylyjszczqjczzcbl6']);
                            thisyear.push(data[i]['t_bsqzymsxyczzcqknb655_whycmzczey7']);
                            thisyear.push(data[i]['t_bsqzymsxyczzcqknb655_whycmzczqjczzcbl8']);
                            thisyear.push(data[i]['t_bsqzymsxyczzcqknb655_tyzczey9']);
                            thisyear.push(data[i]['t_bsqzymsxyczzcqknb655_tyzczqjczzcb10']);
                        }
                    });
                    str += '<tr>' +
                        '<td class="label-cell">1</td>' +
                        '<td class="numeric-cell" rowspan="2">教育</td>' +
                        '<td class="numeric-cell">教育支出总额</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[0] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[0] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">2</td>' +
                        '<td class="numeric-cell">教育支出占区级财政支出比例</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[1] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[1] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3</td>' +
                        '<td class="numeric-cell" rowspan="2">医疗</td>' +
                        '<td class="numeric-cell">医疗与计生支出总额</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[2] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[2] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">4</td>' +
                        '<td class="numeric-cell">年医疗与计生支出占区级财政支出比例</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[3] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[3] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">5</td>' +
                        '<td class="numeric-cell" rowspan="2">文化</td>' +
                        '<td class="numeric-cell">文化与传媒支出总额</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[4] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[4] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">6</td>' +
                        '<td class="numeric-cell">文化与传媒支出占区级财政支出比例</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[5] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[5] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">7</td>' +
                        '<td class="numeric-cell" rowspan="2">体育</td>' +
                        '<td class="numeric-cell">体育支出总额</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[6] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[6] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">8</td>' +
                        '<td class="numeric-cell">体育支出占区级财政支出比</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[7] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[7] + '</td>' +
                        '</tr>'
                }

                //4.4
                if (moduleId == "99") {
                    var lastyear = [];
                    var thisyear = [];
                    $.each(data, function (i, n) {
                        // var mon1=data[i]['t_bsqcsglgzqkbyb725_date2'].slice(5,7);
                        // var mon2=data[i]['t_bsqcsglgzqkbyb725_date3'].slice(5,7);
                        if (data[i][ziduan] == last) {
                            lastyear.push(data[i]['t_bsqylqknb727_ylwsxzglbmjsssydwjbzchxzsydwzgybjfdjbzcy3']);
                            lastyear.push(data[i]['t_bsqylqknb727_wsjgjsylzgwsjdsqggwsfwdzcy4']);
                            lastyear.push(data[i]['t_bsqylqknb727_wsylsbgxxxhjsdzcy5']);
                            lastyear.push(data[i]['t_bsqylqknb727_czjmjbylbxsqylhzbkjhsydzcy6']);
                            lastyear.push(data[i]['t_bsqylqknb727_qqylwsjgzss7']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylwsjgssjyys8']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylwsjgsejyys9']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylwsjgszyzss10']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylwsjgsyjyys11']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylwsjgsqwsfwzxs12']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylwsjgsxtnglylwshjsjgs13']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylwsjgsxtwglyljgs14']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylwsjgsmymzbs15']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylwsjgsgtzsjnsyljgs16']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylwsjgsmyyys17']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylwsjgsmyhlys18']);
                            lastyear.push(data[i]['t_bsqylqknb727_xtnzgsw19']);
                            lastyear.push(data[i]['t_bsqylqknb727_qqwsjsryzsw20']);
                            lastyear.push(data[i]['t_bsqylqknb727_wsjsrysxtnglylwshjsjgw21']);
                            lastyear.push(data[i]['t_bsqylqknb727_wsjsrysqtglyljgw22']);
                            lastyear.push(data[i]['t_bsqylqknb727_wsjsrysmbyljgw23']);
                            lastyear.push(data[i]['t_bsqylqknb727_wsjsryszgzcw24']);
                            lastyear.push(data[i]['t_bsqylqknb727_wsjsryszgzczb25']);
                            lastyear.push(data[i]['t_bsqylqknb727_wsjsrysfgzcw26']);
                            lastyear.push(data[i]['t_bsqylqknb727_wsjsrysfgzczb27']);
                            lastyear.push(data[i]['t_bsqylqknb727_wsjsryszjzcw28']);
                            lastyear.push(data[i]['t_bsqylqknb727_wsjsryszjzczb29']);
                            lastyear.push(data[i]['t_bsqylqknb727_wsjsryldl30']);
                            lastyear.push(data[i]['t_bsqylqknb727_qqbczsz31']);
                            lastyear.push(data[i]['t_bsqylqknb727_bcsxtnglylwshjsjgz32']);
                            lastyear.push(data[i]['t_bsqylqknb727_bcsqtglyljgz33']);
                            lastyear.push(data[i]['t_bsqylqknb727_bcsmbyljgz34']);
                            lastyear.push(data[i]['t_bsqylqknb727_mwrkyljgcwsczrkzwr35']);
                            lastyear.push(data[i]['t_bsqylqknb727_mwrkzyyssczrkzwr36']);
                            lastyear.push(data[i]['t_bsqylqknb727_yljgzhqyrswr37']);
                            lastyear.push(data[i]['t_bsqylqknb727_yljgzhqyrsqspm38']);
                            lastyear.push(data[i]['t_bsqylqknb727_jtysqyl39']);
                            lastyear.push(data[i]['t_bsqylqknb727_kjyscfwz40']);
                            lastyear.push(data[i]['t_bsqylqknb727_kjyscfsjjewy41']);
                            lastyear.push(data[i]['t_bsqylqknb727_kjyscfqspm42']);
                            lastyear.push(data[i]['t_bsqylqknb727_hjjmpjyqsms43']);
                            lastyear.push(data[i]['t_bsqylqknb727_yeswlh44']);
                            lastyear.push(data[i]['t_bsqylqknb727_yeswlc45']);
                            lastyear.push(data[i]['t_bsqylqknb727_syxet46']);
                            lastyear.push(data[i]['t_bsqylqknb727_ycfswl47']);
                            lastyear.push(data[i]['t_bsqylqknb727_yltslg48']);
                            lastyear.push(data[i]['t_bsqylqknb727_yltmdms49']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylgghlzbyzb50']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylgghlzbylsrzcl51']);
                            lastyear.push(data[i]['t_bsqylqknb727_ylgghlzbylhczb52']);
                            lastyear.push(data[i]['t_bsqylqknb727_ndxjyyss53']);
                            lastyear.push(data[i]['t_bsqylqknb727_ndgkjyyss54']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqkyxzs55']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqkypzs56']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqknzs57']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqklzs58']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqkldzs59']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqkgczs60']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqkdczs61']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqkmxzs62']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqkgjzs63']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqkcsgyyqs64']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqkbsgyyqs65']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqkhys66']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqktcyys67']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqktcws68']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqktczms69']);
                            lastyear.push(data[i]['t_bsqylqknb727_gjzylqkqts70']);
                        }
                        if (data[i][ziduan] == end) {
                            thisyear.push(data[i]['t_bsqylqknb727_ylwsxzglbmjsssydwjbzchxzsydwzgybjfdjbzcy3']);
                            thisyear.push(data[i]['t_bsqylqknb727_wsjgjsylzgwsjdsqggwsfwdzcy4']);
                            thisyear.push(data[i]['t_bsqylqknb727_wsylsbgxxxhjsdzcy5']);
                            thisyear.push(data[i]['t_bsqylqknb727_czjmjbylbxsqylhzbkjhsydzcy6']);
                            thisyear.push(data[i]['t_bsqylqknb727_qqylwsjgzss7']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylwsjgssjyys8']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylwsjgsejyys9']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylwsjgszyzss10']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylwsjgsyjyys11']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylwsjgsqwsfwzxs12']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylwsjgsxtnglylwshjsjgs13']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylwsjgsxtwglyljgs14']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylwsjgsmymzbs15']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylwsjgsgtzsjnsyljgs16']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylwsjgsmyyys17']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylwsjgsmyhlys18']);
                            thisyear.push(data[i]['t_bsqylqknb727_xtnzgsw19']);
                            thisyear.push(data[i]['t_bsqylqknb727_qqwsjsryzsw20']);
                            thisyear.push(data[i]['t_bsqylqknb727_wsjsrysxtnglylwshjsjgw21']);
                            thisyear.push(data[i]['t_bsqylqknb727_wsjsrysqtglyljgw22']);
                            thisyear.push(data[i]['t_bsqylqknb727_wsjsrysmbyljgw23']);
                            thisyear.push(data[i]['t_bsqylqknb727_wsjsryszgzcw24']);
                            thisyear.push(data[i]['t_bsqylqknb727_wsjsryszgzczb25']);
                            thisyear.push(data[i]['t_bsqylqknb727_wsjsrysfgzcw26']);
                            thisyear.push(data[i]['t_bsqylqknb727_wsjsrysfgzczb27']);
                            thisyear.push(data[i]['t_bsqylqknb727_wsjsryszjzcw28']);
                            thisyear.push(data[i]['t_bsqylqknb727_wsjsryszjzczb29']);
                            thisyear.push(data[i]['t_bsqylqknb727_wsjsryldl30']);
                            thisyear.push(data[i]['t_bsqylqknb727_qqbczsz31']);
                            thisyear.push(data[i]['t_bsqylqknb727_bcsxtnglylwshjsjgz32']);
                            thisyear.push(data[i]['t_bsqylqknb727_bcsqtglyljgz33']);
                            thisyear.push(data[i]['t_bsqylqknb727_bcsmbyljgz34']);
                            thisyear.push(data[i]['t_bsqylqknb727_mwrkyljgcwsczrkzwr35']);
                            thisyear.push(data[i]['t_bsqylqknb727_mwrkzyyssczrkzwr36']);
                            thisyear.push(data[i]['t_bsqylqknb727_yljgzhqyrswr37']);
                            thisyear.push(data[i]['t_bsqylqknb727_yljgzhqyrsqspm38']);
                            thisyear.push(data[i]['t_bsqylqknb727_jtysqyl39']);
                            thisyear.push(data[i]['t_bsqylqknb727_kjyscfwz40']);
                            thisyear.push(data[i]['t_bsqylqknb727_kjyscfsjjewy41']);
                            thisyear.push(data[i]['t_bsqylqknb727_kjyscfqspm42']);
                            thisyear.push(data[i]['t_bsqylqknb727_hjjmpjyqsms43']);
                            thisyear.push(data[i]['t_bsqylqknb727_yeswlh44']);
                            thisyear.push(data[i]['t_bsqylqknb727_yeswlc45']);
                            thisyear.push(data[i]['t_bsqylqknb727_syxet46']);
                            thisyear.push(data[i]['t_bsqylqknb727_ycfswl47']);
                            thisyear.push(data[i]['t_bsqylqknb727_yltslg48']);
                            thisyear.push(data[i]['t_bsqylqknb727_yltmdms49']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylgghlzbyzb50']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylgghlzbylsrzcl51']);
                            thisyear.push(data[i]['t_bsqylqknb727_ylgghlzbylhczb52']);
                            thisyear.push(data[i]['t_bsqylqknb727_ndxjyyss53']);
                            thisyear.push(data[i]['t_bsqylqknb727_ndgkjyyss54']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqkyxzs55']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqkypzs56']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqknzs57']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqklzs58']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqkldzs59']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqkgczs60']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqkdczs61']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqkmxzs62']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqkgjzs63']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqkcsgyyqs64']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqkbsgyyqs65']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqkhys66']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqktcyys67']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqktcws68']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqktczms69']);
                            thisyear.push(data[i]['t_bsqylqknb727_gjzylqkqts70']);
                        }
                    });
                    str += '<tr>' +
                        '<td class="label-cell" rowspan="4">1</td>' +
                        '<td class="numeric-cell" rowspan="4">医疗与计生支出构成</td>' +
                        '<td class="numeric-cell" colspan="2">医疗卫生行政管理部门及所属事业单位基本支出和行政事业单位职工医保缴费等基本支出</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[0] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[0] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">卫生机构建设、医疗综改、卫生监督、社区公共卫生服务等支出</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[1] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[1] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">卫生医疗设备更新、信息化建设等支出</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[2] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[2] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">城镇居民基本医疗保险、社区医疗互助帮困、计划生育等支出</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[3] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[3] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">2</td>' +
                        '<td class="numeric-cell" colspan="3">全区医疗卫生机构总数</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[4] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[4] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="5">3</td>' +
                        '<td class="numeric-cell" rowspan="5">医疗机构级别分类</td>' +
                        '<td class="numeric-cell" colspan="2">三级医院</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[5] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[5] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">二级医院</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[6] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[6] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">专业站所</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[7] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[7] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">一级医院</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[8] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[8] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">社区卫生服务中心</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[9] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[9] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="6">4</td>' +
                        '<td class="numeric-cell" rowspan="6">医疗卫生机构性质分类</td>' +
                        '<td class="numeric-cell" rowspan="2">公立</td>' +
                        '<td class="numeric-cell">系统内公立医疗卫生和计生机构</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[10] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[10] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">系统外公立医疗机构</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[11] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[11] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" rowspan="4">民营</td>' +
                        '<td class="numeric-cell">民营门诊部</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[12] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[12] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">个体诊所及内设医疗机构</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[13] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[13] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">民营医院</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[14] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[14] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">民营护理院</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[15] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[15] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">5</td>' +
                        '<td class="numeric-cell" colspan="3">系统内职工数</td>' +
                        '<td class="numeric-cell">位</td>' +
                        '<td class="numeric-cell">' + lastyear[16] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[16] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">6</td>' +
                        '<td class="numeric-cell" colspan="3">全区卫生技术人员总数</td>' +
                        '<td class="numeric-cell">位</td>' +
                        '<td class="numeric-cell">' + lastyear[17] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[17] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">7</td>' +
                        '<td class="numeric-cell" rowspan="3">卫生技术人员性质分类</td>' +
                        '<td class="numeric-cell" colspan="2">系统内公立医疗卫生和计生机构</td>' +
                        '<td class="numeric-cell">位</td>' +
                        '<td class="numeric-cell">' + lastyear[18] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[18] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">其他公立医疗机构</td>' +
                        '<td class="numeric-cell">位</td>' +
                        '<td class="numeric-cell">' + lastyear[19] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[19] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">民办医疗机构构</td>' +
                        '<td class="numeric-cell">位</td>' +
                        '<td class="numeric-cell">' + lastyear[20] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[20] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">8</td>' +
                        '<td class="numeric-cell" rowspan="3">系统内卫生技术人员级别分类</td>' +
                        '<td class="numeric-cell" colspan="2">正高职称</td>' +
                        '<td class="numeric-cell">位</td>' +
                        '<td class="numeric-cell">' + lastyear[21] + '(占比' + lastyear[22] + '%)</td>' +
                        '<td class="numeric-cell">' + thisyear[21] + '(占比' + thisyear[22] + '%)</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">副高职称</td>' +
                        '<td class="numeric-cell">位</td>' +
                        '<td class="numeric-cell">' + lastyear[23] + '(占比' + lastyear[24] + '%)</td>' +
                        '<td class="numeric-cell">' + thisyear[23] + '(占比' + thisyear[24] + '%)</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">中级职称</td>' +
                        '<td class="numeric-cell">位</td>' +
                        '<td class="numeric-cell">' + lastyear[25] + '(占比' + lastyear[26] + '%)</td>' +
                        '<td class="numeric-cell">' + thisyear[25] + '(占比' + thisyear[26] + '%)</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">9</td>' +
                        '<td class="numeric-cell" colspan="3">卫生技术人员流动率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[27] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[27] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">10</td>' +
                        '<td class="numeric-cell" colspan="3">全区病床总数</td>' +
                        '<td class="numeric-cell">张</td>' +
                        '<td class="numeric-cell">' + lastyear[28] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[28] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">11</td>' +
                        '<td class="numeric-cell" rowspan="3">病床分类</td>' +
                        '<td class="numeric-cell" colspan="2">系统内公立医疗卫生和计生机构</td>' +
                        '<td class="numeric-cell">张</td>' +
                        '<td class="numeric-cell">' + lastyear[29] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[29] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">其他公立医疗机构</td>' +
                        '<td class="numeric-cell">张</td>' +
                        '<td class="numeric-cell">' + lastyear[30] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[30] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">民办医疗机构</td>' +
                        '<td class="numeric-cell">张</td>' +
                        '<td class="numeric-cell">' + lastyear[31] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[31] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">12</td>' +
                        '<td class="numeric-cell" colspan="3">每万人口医疗机构床位数（常住人口）</td>' +
                        '<td class="numeric-cell">张/万人</td>' +
                        '<td class="numeric-cell">' + lastyear[32] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[32] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">13</td>' +
                        '<td class="numeric-cell" colspan="3">每万人口执业医师数（常住人口）</td>' +
                        '<td class="numeric-cell">位/万人</td>' +
                        '<td class="numeric-cell">' + lastyear[33] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[33] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">14</td>' +
                        '<td class="numeric-cell" colspan="3">“1+1+1”医疗机构组合签约人数</td>' +
                        '<td class="numeric-cell">万人</td>' +
                        '<td class="numeric-cell">' + lastyear[34] + '(全市排第' + lastyear[35] + ')</td>' +
                        '<td class="numeric-cell">' + thisyear[34] + '(全市排第' + thisyear[35] + ')</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">15</td>' +
                        '<td class="numeric-cell" colspan="3">家庭医生签约率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[36] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[36] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">16</td>' +
                        '<td class="numeric-cell" colspan="3">开具延伸处方</td>' +
                        '<td class="numeric-cell">万张</td>' +
                        '<td class="numeric-cell">' + lastyear[37] + '(涉及金额' + lastyear[38] + '万元，全市排名第' + lastyear[39] + ')</td>' +
                        '<td class="numeric-cell">' + thisyear[37] + '(涉及金额' + thisyear[38] + '万元，全市排名第' + thisyear[39] + ')</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">17</td>' +
                        '<td class="numeric-cell" colspan="3">户籍居民平均预期寿命</td>' +
                        '<td class="numeric-cell">岁</td>' +
                        '<td class="numeric-cell">' + lastyear[40] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[40] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">18</td>' +
                        '<td class="numeric-cell" colspan="3">婴儿死亡率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[41] + '(户)' + lastyear[42] + '(常)</td>' +
                        '<td class="numeric-cell">' + thisyear[41] + '(户)' + thisyear[42] + '(常)</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">19</td>' +
                        '<td class="numeric-cell" colspan="3">5岁以下儿童</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[43] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[43] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">20</td>' +
                        '<td class="numeric-cell" colspan="3">孕产妇死亡率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[44] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[44] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">21</td>' +
                        '<td class="numeric-cell" colspan="3">医联体数量</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[45] + '(' + lastyear[46] + ')</td>' +
                        '<td class="numeric-cell">' + thisyear[45] + '(' + thisyear[46] + ')</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="3">22</td>' +
                        '<td class="numeric-cell" rowspan="3">医疗改革衡量指标</td>' +
                        '<td class="numeric-cell" colspan="2">药占比</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[47] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[47] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">医疗收入增长率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[48] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[48] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">医疗耗材占比</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[49] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[49] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">23</td>' +
                        '<td class="numeric-cell" colspan="3">年度新建医院数</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[50] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[50] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">24</td>' +
                        '<td class="numeric-cell" colspan="3">年度改扩建医院数</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[51] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[51] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="16">25</td>' +
                        '<td class="numeric-cell" rowspan="16">各街镇医疗缺口</td>' +
                        '<td class="numeric-cell" colspan="2">杨行镇</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[52] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[52] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">月浦镇</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[53] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[53] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">淞南镇</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[54] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[54] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">罗泾镇</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[55] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[55] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">罗店镇</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[56] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[56] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">顾村镇</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[57] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[57] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">大场镇</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[58] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[58] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">庙行镇</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[59] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[59] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">高境镇</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[60] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[60] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">城市工业园区</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[61] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[61] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">宝山工业园区</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[62] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[62] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">航运</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[63] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[63] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">投促—友谊</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[64] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[64] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">投促—吴淞</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[65] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[65] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">投促—张庙</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[66] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[66] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">其他</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[67] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[67] + '</td>' +
                        '</tr>'
                }
                //4.7.2        
                if (moduleId == "103") {
                    var last = {},
                        thisyear = {};
                    var num1 = 0,
                        num2 = 0;
                    $.each(data, function (i, n) {
                        if (n['t_bsqpasfcjqkbnb661_nd2'] == (end - 1)) {
                            last[num1] = n
                            num1++
                        }
                        if (n['t_bsqpasfcjqkbnb661_nd2'] == end) {
                            thisyear[num2] = n;
                            num2++
                        }
                    });
                    var empty = $.isEmptyObject(thisyear); // 判断是否为空
                    var empty1 = $.isEmptyObject(last);
                    //   console.log(empty)
                    //   console.log(empty1)
                    if (empty1 && !empty) {
                        $.each(thisyear, function (i, n) {
                            str += '<tr>' +
                                '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqpasfcjqkbnb661_jzyq3'] + '</td>' +
                                '<td class="numeric-cell">' + (end - 1) + '</td>' +
                                ' <td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                ' <td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '</tr>'
                            str += '<tr>' +
                                '<td class="numeric-cell">' + end + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_spasfsqcjqk4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_spasqcjqk5'] + '</td>' +
                                ' <td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_qpasfxqcjl6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_qpaxqcjl7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_pazyzdwzcrszczrkbl8'] + '</td>' +
                                '</tr>'

                        });
                    } else {
                        $.each(last, function (i, n) {
                            if (empty) {
                                str += '<tr>' +
                                    '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqpasfcjqkbnb661_jzyq3'] + '</td>' +
                                    '<td class="numeric-cell">' + (end - 1) + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_spasfsqcjqk4'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_spasqcjqk5'] + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_qpasfxqcjl6'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_qpaxqcjl7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_pazyzdwzcrszczrkbl8'] + '</td>' +
                                    '</tr>'
                                str += '<tr>' +
                                    '<td class="numeric-cell">' + end + '</td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    ' <td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '</tr>'
                            } else {
                                str += '<tr>' +
                                    '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqpasfcjqkbnb661_jzyq3'] + '</td>' +
                                    '<td class="numeric-cell">' + (end - 1) + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_spasfsqcjqk4'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_spasqcjqk5'] + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_qpasfxqcjl6'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_qpaxqcjl7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqpasfcjqkbnb661_pazyzdwzcrszczrkbl8'] + '</td>' +
                                    '</tr>'
                                if ($.isEmptyObject(thisyear[i])) {
                                    str += '<tr>' +
                                        '<td class="numeric-cell">' + end + '</td>' +
                                        '<td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        ' <td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        '</tr>'
                                } else {
                                    str += '<tr>' +
                                        '<td class="numeric-cell">' + end + '</td>' +
                                        '<td class="numeric-cell">' + thisyear[i]['t_bsqpasfcjqkbnb661_spasfsqcjqk4'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyear[i]['t_bsqpasfcjqkbnb661_spasqcjqk5'] + '</td>' +
                                        ' <td class="numeric-cell">' + thisyear[i]['t_bsqpasfcjqkbnb661_qpasfxqcjl6'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyear[i]['t_bsqpasfcjqkbnb661_qpaxqcjl7'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyear[i]['t_bsqpasfcjqkbnb661_pazyzdwzcrszczrkbl8'] + '</td>' +
                                        '</tr>'
                                }
                            }
                        });
                    }
                }
                //4.7.4
                if (moduleId == "105") {
                    var last = {},
                        thisyear = {};
                    var num1 = 0,
                        num2 = 0;
                    $.each(data, function (i, n) {
                        if (n['t_bsqspjkqkbnb689_nd2'] == (end - 1)) {
                            last[num1] = n
                            num1++
                        }
                        if (n['t_bsqspjkqkbnb689_nd2'] == end) {
                            thisyear[num2] = n;
                            num2++
                        }
                    });
                    var empty = $.isEmptyObject(thisyear); // 判断是否为空
                    var empty1 = $.isEmptyObject(last);
                    if (empty1 && !empty) {
                        $.each(thisyear, function (i, n) {
                            str += '<tr>' +
                                '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqspjkqkbnb689_jzyq3'] + '</td>' +
                                '<td class="numeric-cell">' + (end - 1) + '</td>' +
                                ' <td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '</tr>'
                            str += '<tr>' +
                                '<td class="numeric-cell">' + end + '</td>' +
                                ' <td class="numeric-cell">' + n['t_bsqspjkqkbnb689_spjkdsg4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqspjkqkbnb689_ncdqspjkczfgl5'] + '</td>' +
                                '</tr>'

                        });
                    } else {
                        $.each(last, function (i, n) {
                            if (empty) {
                                str += '<tr>' +
                                    '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqspjkqkbnb689_jzyq3'] + '</td>' +
                                    '<td class="numeric-cell">' + (end - 1) + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqspjkqkbnb689_spjkdsg4'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqspjkqkbnb689_ncdqspjkczfgl5'] + '</td>' +
                                    '</tr>'
                                str += '<tr>' +
                                    '<td class="numeric-cell">' + end + '</td>' +
                                    ' <td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '</tr>'
                            } else {
                                str += '<tr>' +
                                    '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqspjkqkbnb689_jzyq3'] + '</td>' +
                                    '<td class="numeric-cell">' + (end - 1) + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqspjkqkbnb689_spjkdsg4'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqspjkqkbnb689_ncdqspjkczfgl5'] + '</td>' +
                                    '</tr>'
                                if ($.isEmptyObject(thisyear[i])) {
                                    str += '<tr>' +
                                        '<td class="numeric-cell">' + end + '</td>' +
                                        ' <td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        '</tr>'
                                } else {
                                    str += '<tr>' +
                                        '<td class="numeric-cell">' + end + '</td>' +
                                        ' <td class="numeric-cell">' + thisyear[i]['t_bsqspjkqkbnb689_spjkdsg4'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyear[i]['t_bsqspjkqkbnb689_ncdqspjkczfgl5'] + '</td>' +
                                        '</tr>'
                                }
                            }
                        });
                    }
                }
                //4.8.4
                if (moduleId == "109") {
                    var lastdata = {},
                        thisyeardata = {};
                    var num1 = 0,
                        num2 = 0;
                    $.each(data, function (i, n) {
                        if (n['t_bsqsyrkjlqkbnb723_nd2'] == last) {
                            lastdata[num1] = n
                            num1++
                        }
                        if (n['t_bsqsyrkjlqkbnb723_nd2'] == end) {
                            thisyeardata[num2] = n;
                            num2++
                        }
                    });
                    var empty = $.isEmptyObject(thisyeardata); // 判断是否为空
                    var empty1 = $.isEmptyObject(lastdata);
                    if (empty1 && !empty) {
                        $.each(thisyeardata, function (i, n) {
                            str += '<tr>' +
                                '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqsyrkjlqkbnb723_jzyq3'] + '</td>' +
                                '<td class="numeric-cell">' + (last) + '</td>' +
                                ' <td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                ' <td class="numeric-cell"></td>' +
                                '</tr>'
                            str += '<tr>' +
                                '<td class="numeric-cell">' + end + '</td>' +
                                ' <td class="numeric-cell">' + n['t_bsqsyrkjlqkbnb723_syrksr4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqsyrkjlqkbnb723_bjlskrkwrjjsj5'] + '</td>' +
                                ' <td class="numeric-cell">' + n['t_bsqsyrkjlqkbnb723_pcssyrkwrjlsr6'] + '</td>' +
                                '</tr>'

                        });
                    } else {
                        $.each(lastdata, function (i, n) {
                            if (empty) {
                                str += '<tr>' +
                                    '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqsyrkjlqkbnb723_jzyq3'] + '</td>' +
                                    '<td class="numeric-cell">' + (last) + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqsyrkjlqkbnb723_syrksr4'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqsyrkjlqkbnb723_bjlskrkwrjjsj5'] + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqsyrkjlqkbnb723_pcssyrkwrjlsr6'] + '</td>' +
                                    '</tr>'
                                str += '<tr>' +
                                    '<td class="numeric-cell">' + end + '</td>' +
                                    ' <td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    ' <td class="numeric-cell"></td>' +
                                    '</tr>'
                            } else {

                                str += '<tr>' +
                                    '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqsyrkjlqkbnb723_jzyq3'] + '</td>' +
                                    '<td class="numeric-cell">' + (last) + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqsyrkjlqkbnb723_syrksr4'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqsyrkjlqkbnb723_bjlskrkwrjjsj5'] + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqsyrkjlqkbnb723_pcssyrkwrjlsr6'] + '</td>' +
                                    '</tr>'
                                if ($.isEmptyObject(thisyeardata[i])) {
                                    str += '<tr>' +
                                        '<td class="numeric-cell">' + end + '</td>' +
                                        ' <td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        ' <td class="numeric-cell"></td>' +
                                        '</tr>'
                                } else {
                                    str += '<tr>' +
                                        '<td class="numeric-cell">' + end + '</td>' +
                                        ' <td class="numeric-cell">' + thisyeardata[i]['t_bsqsyrkjlqkbnb723_syrksr4'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyeardata[i]['t_bsqsyrkjlqkbnb723_bjlskrkwrjjsj5'] + '</td>' +
                                        ' <td class="numeric-cell">' + thisyeardata[i]['t_bsqsyrkjlqkbnb723_pcssyrkwrjlsr6'] + '</td>' +
                                        '</tr>'
                                }
                            }
                        });
                    }
                    //     $.each(data, function(i, n){ 
                    //     if(n['t_bsqsyrkjlqkbnb723_nd2']==last){ 
                    //       str +='<tr>'
                    //           +  '<td class="label-cell"  rowspan="2" colspan="2">'+n['t_bsqsyrkjlqkbnb723_jzyq3']+'</td>'
                    //           +  '<td class="numeric-cell">'+last+'</td>'
                    //           + ' <td class="numeric-cell">'+n['t_bsqsyrkjlqkbnb723_syrksr4']+'</td>'
                    //           +  '<td class="numeric-cell">'+n['t_bsqsyrkjlqkbnb723_bjlskrkwrjjsj5']+'</td>'
                    //           + ' <td class="numeric-cell">'+n['t_bsqsyrkjlqkbnb723_pcssyrkwrjlsr6']+'</td>'
                    //           +  '</tr>'
                    //     }else{
                    //         str +='<tr>'
                    //               +  '<td class="label-cell"  rowspan="2" colspan="2">'+n['t_bsqsyrkjlqkbnb723_jzyq3']+'</td>'
                    //               +  '<td class="numeric-cell">'+last+'</td>'
                    //               + ' <td class="numeric-cell"></td>'
                    //               +  '<td class="numeric-cell"></td>'
                    //               + ' <td class="numeric-cell"></td>'
                    //               +  '</tr>'
                    //     } 
                    //     if(n['t_bsqsyrkjlqkbnb723_nd2']==end){
                    //           str +='<tr>'
                    //               +  '<td class="numeric-cell">'+end+'</td>'
                    //               + ' <td class="numeric-cell">'+n['t_bsqsyrkjlqkbnb723_syrksr4']+'</td>'
                    //               +  '<td class="numeric-cell">'+n['t_bsqsyrkjlqkbnb723_bjlskrkwrjjsj5']+'</td>'
                    //               + ' <td class="numeric-cell">'+n['t_bsqsyrkjlqkbnb723_pcssyrkwrjlsr6']+'</td>'
                    //               +  '</tr>'
                    //     }else{
                    //           str +='<tr>'
                    //           +  '<td class="numeric-cell">'+end+'</td>'
                    //           + ' <td class="numeric-cell"></td>'
                    //           +  '<td class="numeric-cell"></td>'
                    //           + ' <td class="numeric-cell"></td>'
                    //           +  '</tr>'
                    //     }
                    //   })  

                }
                //4.8.6
                if (moduleId == "111") {
                    var lastdata = {},
                        thisyeardata = {};
                    $.each(data, function (i, n) {
                        if (n['t_bsqjtsgqkbnb669_nd2'] == last) {
                            lastdata = n
                        }
                    })
                    $.each(data, function (i, n) {
                        if (n['t_bsqjtsgqkbnb669_nd2'] == end) {
                            thisyeardata = n
                        }
                    })
                    var empty = $.isEmptyObject(thisyeardata); // 判断是否为空
                    var empty1 = $.isEmptyObject(lastdata);
                    if (!empty1) {
                        str += '<tr>' +
                            '<td class="label-cell"  rowspan="2">全区</td>' +
                            '<td class="numeric-cell">' + last + '</td>' +
                            ' <td class="numeric-cell">' + lastdata['t_bsqjtsgqkbnb669_dljtsgsj3'] + '</td>' +
                            '<td class="numeric-cell">' + lastdata['t_bsqjtsgqkbnb669_jtsgswrsr4'] + '</td>' +
                            '</tr>'
                    } else {
                        str += '<tr>' +
                            '<td class="label-cell"  rowspan="2">全区</td>' +
                            '<td class="numeric-cell">' + last + '</td>' +
                            ' <td class="numeric-cell"></td>' +
                            '<td class="numeric-cell"></td>' +
                            '</tr>'
                    }
                    if (!empty) {
                        str += '<tr>' +
                            '<td class="numeric-cell">' + end + '</td>' +
                            ' <td class="numeric-cell">' + thisyeardata['t_bsqjtsgqkbnb669_dljtsgsj3'] + '</td>' +
                            '<td class="numeric-cell">' + thisyeardata['t_bsqjtsgqkbnb669_jtsgswrsr4'] + '</td>' +
                            '</tr>'
                    } else {
                        str += '<tr>' +
                            '<td class="numeric-cell">' + end + '</td>' +
                            ' <td class="numeric-cell"></td>' +
                            '<td class="numeric-cell"></td>' +
                            '</tr>'
                    }
                }
            }
            str = str.replace(/undefined/g, "");
            str = str.replace(/NaN/g, "");
            $('#form-body').html(str);
        },
        beforeSend: function () {
            myApp.showPreloader();
        },
        complete: function () {
            myApp.hidePreloader();
        }
    });

}

// 季报搜索
function get_date_jidu() {

    var end = $('#seyear').val();
    var jidu = $('#jidu').val();
    var ziduannian = $('#get-data').data('time');
    var ziduanjidu = $('#get-data').data('jidu');
    var mid = $('#get-data').data('mid');
    var alias = $('#get-data').data('alias')


    //var nianofjidu=end;
    if (end == "") {
        tishi('请选择日期');
        return false;
    }
    if (jidu == "") {
        tishi('请选择季度');
        return false;
    }
    $("#nianandjidu").html(end + "年" + "第" + jidu + "季度");
    if (jidu == '1') {
        jidu = "第一季度"
    } else if (jidu == '2') {
        jidu = "第二季度"
    } else if (jidu == '3') {
        jidu = "第三季度"
    } else if (jidu == '4') {
        jidu = "第四季度"
    }

    get_data_search_jidu(end, jidu, ziduannian, ziduanjidu, mid, alias);
}

function get_data_search_jidu(end, jidu, ziduannian, ziduanjidu, moduleId, alias) {
    $.ajax({
        type: "POST",
        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?token=' + localStorage.token,
        //contentType:"json",
        data: {
            bpmDataTemplatep: '1',
            bpmDataTemplatez: '1000',
            bpmDataTemplateoz: '1000',
            bpmDataTemplate__ns__: 't_' + alias + '_ID',
            bpmDataTemplateo: "ASC"
        },
        dataType: 'json',
        beforeSend: function () {
            myApp.showPreloader();
        },
        complete: function () {
            myApp.hidePreloader();
        },
        success: function (data) {
            // console.log(data)
            if (data.bpmDataTemplate != null) {

                console.log(data.bpmDataTemplate)
                var data = data.bpmDataTemplate.list;
                //  var last =end - 1;
                var str = "";
                var strbody = "";
                var strhead = "";
                //3.5.1
                if (moduleId == "24") {
                    $.each(data, function (i, n) {
                        if (data[i][ziduannian] == end && data[i][ziduanjidu] == jidu) {
                            strhead = '<tr>' +
                                '<th class="label-cell" colspan="2"><div style="width:60px;">计划导入</div></th>' +
                                '<th class="label-cell"><div style="width:40px;">污水</div></th>' +
                                '<th class="label-cell">新改建</th>' +
                                '<th class="label-cell" rowspan="2"><div style="width:110px;">新增公建配套项目</div></th>' +
                                '<th class="label-cell" colspan="2"><div style="width:100px;">居农民</div></th>' +
                                '<th class="label-cell" colspan="2"><div style="width:100px;">企业</div></th>' +
                                '</tr>' +
                                '<tr>' +
                                '<th class="label-cell" colspan="2">人口</th>' +
                                '<th class="label-cell">纳管(日流量)</th>' +
                                '<th class="label-cell" >道路</th>' +
                                '<th class="label-cell">已动迁</th>' +
                                '<th class="label-cell">未动迁</th>' +
                                '<th class="label-cell">已动迁</th>' +
                                '<th class="label-cell">未动迁</th>' +
                                '</tr>'
                            str += '<tr>' +
                                '<td class="label-cell" >' + data[i]['t_nddqghjbqkbjb610_zdmj4'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_nddqghjbqkbjb610_jzmj5'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_nddqghjbqkbjb610_sbmj6'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_nddqghjbqkbjb610_spf7'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_nddqghjbqkbjb610_dqf8'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_nddqghjbqkbjb610_gzf9'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_nddqghjbqkbjb610_lh10'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_nddqghjbqkbjb610_sx11'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_nddqghjbqkbjb610_trxf12'] + '</td>' +
                                '</tr>'
                            strbody += '<tr>' +
                                '<td class="label-cell" colspan="2">' + data[i]['t_nddqghjbqkbjb610_jhdrrkwr13'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_nddqghjbqkbjb610_wsngwdrll14'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_nddqghjbqkbjb610_xgjdl15'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_nddqghjbqkbjb610_xzgjptxm16'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_nddqghjbqkbjb610_ydqjnmwpfm17'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_nddqghjbqkbjb610_wdqjnmwpfm18'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_nddqghjbqkbjb610_ydqqywpfm19'] + '</td>' +
                                '<td class="numeric-cell">' + data[i]['t_nddqghjbqkbjb610_wdqqywpfm20'] + '</td>' +
                                '</tr>'
                        }


                    });
                    str += '<tr><td colspan="9" style="padding:0 0"><table border="0"><thead>' + strhead + '</thead><tbody>' + strbody + '</tbody></table></td></tr>'

                }
                //3.5.2
                if (moduleId == "90") {
                    $.each(data, function (i, n) {
                        if (n[ziduannian] == end && n[ziduanjidu] == jidu) {
                            str += '<tr>' +
                                '<td class="numeric-cell">' + n['t_wgyqjbqkjb611_zdmj4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_wgyqjbqkjb611_zzmj5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_wgyqjbqkjb611_sbmj6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_wgyqjbqkjb611_gyyd7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_wgyqjbqkjb611_xyqyscz8'] + '</td>' +
                                '</tr>'
                            strhead = '<tr>' +
                                '<th class="label-cell">实有企业数(生产经营)</th>' +
                                '<th class="label-cell">现有居农民</th>' +
                                '<th class="label-cell" >道路</th>' +
                                '<th class="label-cell">水系</th>' +
                                '<th class="label-cell">现状用地权属情况</th>' +
                                '</tr>'
                            strbody += '<tr>' +
                                '<td class="numeric-cell">' + n['t_wgyqjbqkjb611_syqysscjy9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_wgyqjbqkjb611_xyjnm10'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_wgyqjbqkjb611_dl11'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_wgyqjbqkjb611_sx12'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_wgyqjbqkjb611_xzydqsqk13'] + '</td>' +
                                '</tr>'
                        }
                    });
                    str += '<tr><td colspan="5" style="padding:0 0"><table border="0"><thead>' + strhead + '</thead><tbody>' + strbody + '</tbody></table></td></tr>'

                }
                //3.6
                if (moduleId == "91") {
                    $.each(data, function (i, n) {
                        //console.log("n[ziduannian]"+n[ziduannian]+"n[ziduanjidu]");
                        if (n[ziduannian] == end && n[ziduanjidu] == jidu) {
                            str += '<tr>' +
                                '<td class="numeric-cell">' + n['t_bsqczcgzjbqkjb612_czc3'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqczcgzjbqkjb612_mj4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqczcgzjbqkjb612_rk5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqczcgzjbqkjb612_dqrk6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqczcgzjbqkjb612_dqqy7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqczcgzjbqkjb612_dqbl8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqczcgzjbqkjb612_jsjzqk9'] + '</td>' +
                                '</tr>'
                        }
                    });

                }

                if (moduleId == "45") {
                    $.each(data, function (i, n) {

                        strhead = '<tr>' +
                            '<th class="label-cell">名称</th>' +
                            '<th class="label-cell">已建学校</th>' +
                            '<th class="label-cell" >学校缺口</th>' +
                            '<th class="label-cell">已建医院</th>' +
                            '<th class="label-cell">医院缺口</th>' +
                            '<th class="label-cell">已建道路</th>' +
                            '<th class="label-cell">道路缺口</th>' +
                            '</tr>'

                        if (n[ziduannian] == end && n[ziduanjidu] == jidu) {
                            str += '<tr><td class="label-cell">' + n['t_bsqdxjzsqjbqkjb613_mc3'] + '</td>' +
                                '<td class="numeric-cell" colspan="2">' + n['t_bsqdxjzsqjbqkjb613_mj4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdxjzsqjbqkjb613_yjg5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdxjzsqjbqkjb613_wjg6'] + '</td>' +
                                '<td class="numeric-cell" colspan="2">' + n['t_bsqdxjzsqjbqkjb613_drrk7'] + '</td></tr>'
                            strbody += '<tr><td class="label-cell">' + n['t_bsqdxjzsqjbqkjb613_mc3'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdxjzsqjbqkjb613_yjyx8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdxjzsqjbqkjb613_yxqk9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdxjzsqjbqkjb613_yjyy10'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdxjzsqjbqkjb613_yyqk11'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdxjzsqjbqkjb613_yjdl12'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqdxjzsqjbqkjb613_dlqk13'] + '</td></tr>'
                        }
                    });
                    str += '<tr><td colspan="7" style="padding:0 0"><table border="0"><thead>' + strhead + '</thead><tbody>' + strbody + '</tbody></tbody></table></td></tr>'

                }
                //5.2
                if (moduleId == "115") {
                    $.each(data, function (i, n) {
                        if (n[ziduannian] == end && n[ziduanjidu] == jidu) {
                            str += '<tr>' +
                                '<td class="label-cell">' + n['t_bsqljzldwjbqkjb729_ID'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqljzldwjbqkjb729_bmck4'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqljzldwjbqkjb729_sfjz5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqljzldwjbqkjb729_yjsxsp6'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqljzldwjbqkjb729_yjsxfw7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqljzldwjbqkjb729_yjsxsp8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqljzldwjbqkjb729_yjsxfw9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqljzldwjbqkjb729_jzbl10'] + '</td>' +
                                '</tr>'
                        }
                    });
                }
            }
            str = str.replace(/undefined/g, "");
            str = str.replace(/NaN/g, "");
            $('#form-body').html(str);
        },
        error: function (data, type, err) {
            myApp.hidePreloader();
            tishi("出现错误");

        }
    });

}
// 半年度搜索
function get_date_bannian() {
    var year = $('#seyear').val();
    var bannian = $('#bannian').val();
    var ziduannian = $('#get-data').data('time');
    var ziduanniandu = $('#get-data').data('bannian');
    var mid = $('#get-data').data('mid');
    var alias = $("#get-data").data('alias');
    //var nianofjidu=end;
    if (year == "") {
        tishi('请选择日期');
        return false;
    }
    if (bannian == "") {
        tishi('请选择年度');
        return false;
    }
    if (bannian == "上半年") {
        $("#bannianselect").html(year + "年1-6月");
    }
    if (bannian == '下半年') {
        $("#bannianselect").html(year + "年7-12月");
    }
    $('#lastyearselect').html((year - 1) + '年')
    get_data_search_bannian(year, bannian, ziduannian, ziduanniandu, mid, alias);
}

function get_data_search_bannian(year, bannian, ziduannian, ziduanniandu, moduleId, alias) {
    $.ajax({
        type: "POST",
        url: hapiurl + 'platform/form/ajaxBpmDataTemplate/dataList_' + alias + '.ht?token=' + localStorage.token,
        //contentType:"json",
        data: {
            bpmDataTemplatep: '1',
            bpmDataTemplatez: '1000',
            bpmDataTemplateoz: '1000',
            bpmDataTemplate__ns__: 't_' + alias + '_ID',
            bpmDataTemplateo: "ASC"
        },
        dataType: 'json',
        beforeSend: function () {
            myApp.showPreloader();
        },
        complete: function () {
            myApp.hidePreloader();
        },
        success: function (data) {
            // console.log(data)
            if (data.bpmDataTemplate != null) {

                //  console.log(data.data)
                var data = data.bpmDataTemplate.list;
                var last = year - 1;
                var str = "";
                var strbody = "";
                var strhead = "";
                var niandu = "";
                if (bannian == "上半年") {
                    niandu = "1-6月";
                } else {
                    niandu = "7-12月"
                }
                //4.3.2
                if (moduleId == "98") {
                    var lastyear = [];
                    var thisyear = [];
                    $.each(data, function (i, n) {
                        //console.log(ziduannian) 
                        if (data[i][ziduannian] == last && data[i]['t_bsqjyqkbnb719_date3'] == "全年") {

                            lastyear.push(data[i]['t_bsqjyqkbnb719_jcjysrybggcz4']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_jcjysrjyffj5']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_jcjyzcjbzc6']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_jcjyzcxmzc7']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_jyjgzs8']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_jyjgzy9']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_jyjgxy10']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_jyjgyey11']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_jyjggd12']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_jyjgtj13']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_jyjgzdzyyx14']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_jyjgcrjc15']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_jyjgqtdw16']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_jyjggb17']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_jyjgmb18']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_yszs19']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_fhjyss20']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_jzgs21']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_zrjss22']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_ggjss23']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_jslzs24']);
                            lastyear.push(" ");
                            lastyear.push(data[i]['t_bsqjyqkbnb719_qjgkgbyxbkdxl26']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_jyjthbysd27']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_yqhjthbyfgl28']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_ndxkbyxshfb29']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_ndxjyxs30']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_ndgkjyxs31']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_sswjbjsghxm32']);
                            lastyear.push(data[i]['t_bsqjyqkbnb719_wnrsswqjjsxmtjjhdlnyjwjyxxm33']);

                        }
                        if (data[i][ziduannian] == year) {
                            if (data[i][ziduanniandu] == bannian) {
                                //thisyear.splice(0,thisyear.length);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_jcjysrybggcz4']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_jcjysrjyffj5']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_jcjyzcjbzc6']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_jcjyzcxmzc7']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_jyjgzs8']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_jyjgzy9']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_jyjgxy10']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_jyjgyey11']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_jyjggd12']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_jyjgtj13']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_jyjgzdzyyx14']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_jyjgcrjc15']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_jyjgqtdw16']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_jyjggb17']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_jyjgmb18']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_yszs19']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_fhjyss20']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_jzgs21']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_zrjss22']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_ggjss23']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_jslzs24']);
                                thisyear.push(" ");
                                thisyear.push(data[i]['t_bsqjyqkbnb719_qjgkgbyxbkdxl26']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_jyjthbysd27']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_yqhjthbyfgl28']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_ndxkbyxshfb29']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_ndxjyxs30']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_ndgkjyxs31']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_sswjbjsghxm32']);
                                thisyear.push(data[i]['t_bsqjyqkbnb719_wnrsswqjjsxmtjjhdlnyjwjyxxm33']);

                            }

                        }
                    });
                    str += '<tr>' +
                        '<td class="label-cell" rowspan="2">1</td>' +
                        '<td class="numeric-cell" rowspan="2">基础教育收入构成</td>' +
                        '<td class="numeric-cell">一般公共财政</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[0] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[0] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">教育费附加</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[1] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[1] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="2">2</td>' +
                        '<td class="numeric-cell" rowspan="2">基础教育支出构成</td>' +
                        '<td class="numeric-cell">基本支出</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[2] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[2] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">项目支出</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[3] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[3] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3</td>' +
                        '<td class="numeric-cell" colspan="2">教育机构总数</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[4] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[4] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="8">4</td>' +
                        '<td class="numeric-cell" rowspan="8">教育机构功能分类</td>' +
                        '<td class="numeric-cell">中学</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[5] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[5] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">小学</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[6] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[6] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">幼儿园</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[7] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[7] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">工读</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[8] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[8] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">特教</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[9] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[9] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">中等职业学校</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[10] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[10] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">成人基础</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[11] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[11] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">其他单位</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[12] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[12] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="2">5</td>' +
                        '<td class="numeric-cell" rowspan="2">教育机构性质分类</td>' +
                        '<td class="numeric-cell">公办</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[13] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[13] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">民办</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[14] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[14] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">6</td>' +
                        '<td class="numeric-cell" colspan="2">学生总数</td>' +
                        '<td class="numeric-cell">万人</td>' +
                        '<td class="numeric-cell">' + lastyear[15] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[15] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">7</td>' +
                        '<td class="numeric-cell" colspan="2">非户籍学生数</td>' +
                        '<td class="numeric-cell">万人</td>' +
                        '<td class="numeric-cell">' + lastyear[16] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[16] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">8</td>' +
                        '<td class="numeric-cell" colspan="2">教职工数</td>' +
                        '<td class="numeric-cell">万人</td>' +
                        '<td class="numeric-cell">' + lastyear[17] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[17] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">9</td>' +
                        '<td class="numeric-cell" colspan="2">专任教师数</td>' +
                        '<td class="numeric-cell">万人</td>' +
                        '<td class="numeric-cell">' + lastyear[18] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[18] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">10</td>' +
                        '<td class="numeric-cell" colspan="2">骨干教师数</td>' +
                        '<td class="numeric-cell">名</td>' +
                        '<td class="numeric-cell">' + lastyear[19] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[19] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">11</td>' +
                        '<td class="numeric-cell" colspan="2">教师离职数</td>' +
                        '<td class="numeric-cell">名</td>' +
                        '<td class="numeric-cell">' + lastyear[20] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[20] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">12</td>' +
                        '<td class="numeric-cell" colspan="2">教师流动率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[21] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[21] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">13</td>' +
                        '<td class="numeric-cell" colspan="2">秋季高考公办学校本科达线率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[22] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[22] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">14</td>' +
                        '<td class="numeric-cell" colspan="2">教育集团化办学试点</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[23] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[23] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">15</td>' +
                        '<td class="numeric-cell" colspan="2">学区化集团化办学覆盖率</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[24] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[24] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">16</td>' +
                        '<td class="numeric-cell" colspan="2">年度新开办学校数（含分部）</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[25] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[25] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">17</td>' +
                        '<td class="numeric-cell" colspan="2">年度新建学校数</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[26] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[26] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">18</td>' +
                        '<td class="numeric-cell" colspan="2">年度改扩建学校数</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[27] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[27] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="2">19</td>' +
                        '<td class="numeric-cell" rowspan="2">教育统筹指标</td>' +
                        '<td class="numeric-cell">“十三五”基本建设规划项目</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[28] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[28] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">未纳入“十三五”期间建设项目推进计划的历年应建未建学校项目</td>' +
                        '<td class="numeric-cell">所</td>' +
                        '<td class="numeric-cell">' + lastyear[29] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[29] + '</td>' +
                        '</tr>'
                }

                //4.5
                if (moduleId == "100") {
                    var lastyear = [];
                    var thisyear = [];
                    $.each(data, function (i, n) {
                        if (data[i][ziduannian] == last) {
                            lastyear.push(data[i]['t_bsqwhqkbnb685_whgbdsdglbmjsssydwjbzcy4']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_zmwhhdzxhkzjngdxdzcy5']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_ggwhsyhddzcy6']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_qqwhsszsg7']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_ggwhgg8']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_jzsqwhhdzxg9']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_tsgg10']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_glbwgjngclsg11']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_cjhdsg12']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_ycyjywtg13']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_xzwhssslg14']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_xzwhssmjwpfm15']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_ggwhsszmjrjmjczrk16']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_ndqzwhhdcyrcwrc17']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_njggwhtrzjy18']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_wczdlynzdqygwcyysry19']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_hsfczjzcwcxmslg20']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_hsfczjzcwcxmzjedwy21']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_bsjdykswrc22']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_bslyxyzsry23']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_ggwhsyfzzxzjqwy24']);
                            lastyear.push(data[i]['t_bsqwhqkbnb685_whcycyfzydzjqwy25']);

                        }
                        if (data[i][ziduannian] == year) {
                            if (data[i][ziduanniandu] == bannian) {
                                //thisyear.splice(0,thisyear.length);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_whgbdsdglbmjsssydwjbzcy4']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_zmwhhdzxhkzjngdxdzcy5']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_ggwhsyhddzcy6']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_qqwhsszsg7']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_ggwhgg8']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_jzsqwhhdzxg9']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_tsgg10']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_glbwgjngclsg11']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_cjhdsg12']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_ycyjywtg13']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_xzwhssslg14']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_xzwhssmjwpfm15']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_ggwhsszmjrjmjczrk16']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_ndqzwhhdcyrcwrc17']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_njggwhtrzjy18']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_wczdlynzdqygwcyysry19']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_hsfczjzcwcxmslg20']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_hsfczjzcwcxmzjedwy21']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_bsjdykswrc22']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_bslyxyzsry23']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_ggwhsyfzzxzjqwy24']);
                                thisyear.push(data[i]['t_bsqwhqkbnb685_whcycyfzydzjqwy25']);
                            }

                        }
                    });
                    str += '<tr>' +
                        '<td class="label-cell" rowspan="3">1</td>' +
                        '<td class="numeric-cell" rowspan="3">文化与传媒支出构成</td>' +
                        '<td class="numeric-cell" colspan="2">文化、广播电视等管理部门及所属事业单位基本支出</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[0] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[0] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">张庙文化活动中心、淞沪抗战纪念馆大修等支出</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[1] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[1] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">公共文化事业活动等支出</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[2] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[2] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">2</td>' +
                        '<td class="numeric-cell" colspan="3">全区文化设施总数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[3] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[3] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="6">3</td>' +
                        '<td class="numeric-cell" rowspan="6">文化设施分类</td>' +
                        '<td class="numeric-cell" colspan="2">公共文化馆</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[4] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[4] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">街镇社区文化活动中心</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[5] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[5] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">图书馆</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[6] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[6] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">各类博物馆、纪念馆、陈列室</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[7] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[7] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">村居活动室</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[8] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[8] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">一村一居一舞台</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[9] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[9] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="2">4</td>' +
                        '<td class="numeric-cell" rowspan="2">年度新增文化设施</td>' +
                        '<td class="numeric-cell" colspan="2">新增文化设施数量</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[10] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[10] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">新增文化设施面积</td>' +
                        '<td class="numeric-cell">万平方米</td>' +
                        '<td class="numeric-cell">' + lastyear[11] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[11] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">5</td>' +
                        '<td class="numeric-cell" colspan="3">公共文化设施总面积/人均面积(常住人口）</td>' +
                        '<td class="numeric-cell">平方米</td>' +
                        '<td class="numeric-cell">' + lastyear[12] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[12] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">6</td>' +
                        '<td class="numeric-cell" colspan="3">年度群众文化活动参与人次</td>' +
                        '<td class="numeric-cell">万人次</td>' +
                        '<td class="numeric-cell">' + lastyear[13] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[13] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">7</td>' +
                        '<td class="numeric-cell" colspan="3">年均公共文化投入资金</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[14] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[14] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="7">8</td>' +
                        '<td class="numeric-cell" rowspan="7">文创产业数据</td>' +
                        '<td class="numeric-cell" colspan="2">文创重点领域内重点企业共完成营业收入</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[15] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[15] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" rowspan="2">获市扶持资金支持文创项目</td>' +
                        '<td class="numeric-cell">项目数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[16] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[16] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">资金额度</td>' +
                        '<td class="numeric-cell">万元</td>' +
                        '<td class="numeric-cell">' + lastyear[17] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[17] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" rowspan="2">文旅商联动</td>' +
                        '<td class="numeric-cell">宝山接待游客数</td>' +
                        '<td class="numeric-cell">万人次</td>' +
                        '<td class="numeric-cell">' + lastyear[18] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[18] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">宝山旅游行业总收入</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[19] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[19] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" rowspan="2">区级扶持政策</td>' +
                        '<td class="numeric-cell">公共文化事业发展专项资金</td>' +
                        '<td class="numeric-cell">千万元</td>' +
                        '<td class="numeric-cell">' + lastyear[20] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[20] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">文化创意产业发展引导资金</td>' +
                        '<td class="numeric-cell">千万元</td>' +
                        '<td class="numeric-cell">' + lastyear[21] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[21] + '</td>' +
                        '</tr>'
                }

                //4.6
                if (moduleId == "101") {
                    var lastyear = [];
                    var thisyear = [];
                    $.each(data, function (i, n) {
                        if (data[i][ziduannian] == last) {
                            lastyear.push(data[i]['t_bsqtyqkbnb686_tyglbmjsssydwjbzcy4']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_bstyzxthqmjszxddxtyssdxzcy5']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_qztyhddzcy6']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_xztyssslg7']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_xztyssmjwpfm8']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_qqtycdzsg9']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_tycdzmjpfm10']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_tycdrjmjczrkpfm11']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_jbcbqsntysshdccg12']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_jbcbqsntysshdrsg13']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_cjsjysqsntyssdcyd14']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_cjsjysqsntyssrsg15']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_cjsjysqsntysshjpsg16']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_jlyjxyrcg17']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_jlyjxypyysrcg18']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_tyjnpyzdjsrcg19']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_tyjnpyzdjsyxsg20']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_tzjkdbyxsg21']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_tzjkdbyssg22']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_ndjbgcjsshdsg23']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_ndqztyhdcyrcwrc24']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_ndtyssgykfccg25']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_ndtyssgykfsyrqsg26']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_tycyqysg27']);
                            lastyear.push(data[i]['t_bsqtyqkbnb686_tycygmwy28']);
                        }
                        if (data[i][ziduannian] == year) {
                            if (data[i][ziduanniandu] == bannian) {
                                //thisyear.splice(0,thisyear.length);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_tyglbmjsssydwjbzcy4']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_bstyzxthqmjszxddxtyssdxzcy5']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_qztyhddzcy6']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_xztyssslg7']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_xztyssmjwpfm8']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_qqtycdzsg9']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_tycdzmjpfm10']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_tycdrjmjczrkpfm11']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_jbcbqsntysshdccg12']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_jbcbqsntysshdrsg13']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_cjsjysqsntyssdcyd14']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_cjsjysqsntyssrsg15']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_cjsjysqsntysshjpsg16']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_jlyjxyrcg17']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_jlyjxypyysrcg18']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_tyjnpyzdjsrcg19']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_tyjnpyzdjsyxsg20']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_tzjkdbyxsg21']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_tzjkdbyssg22']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_ndjbgcjsshdsg23']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_ndqztyhdcyrcwrc24']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_ndtyssgykfccg25']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_ndtyssgykfsyrqsg26']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_tycyqysg27']);
                                thisyear.push(data[i]['t_bsqtyqkbnb686_tycygmwy28']);
                            }

                        }
                    });
                    str += '<tr>' +
                        '<td class="label-cell" rowspan="3">1</td>' +
                        '<td class="numeric-cell" rowspan="3">体育支出构成</td>' +
                        '<td class="numeric-cell" colspan="2">体育管理部门及所属事业单位基本支出</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[0] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[0] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">宝山体育中心、通河全民健身中心等大型体育设施大修支出</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[1] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[1] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">群众体育活动等支出</td>' +
                        '<td class="numeric-cell">亿元</td>' +
                        '<td class="numeric-cell">' + lastyear[2] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[2] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="2">2</td>' +
                        '<td class="numeric-cell" rowspan="2">年度新增体育设施</td>' +
                        '<td class="numeric-cell" colspan="2">新增体育设施数量</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[3] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[3] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">新增体育设施面积</td>' +
                        '<td class="numeric-cell">万平方米</td>' +
                        '<td class="numeric-cell">' + lastyear[4] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[4] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">3</td>' +
                        '<td class="numeric-cell" colspan="3">全区体育场地总数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[5] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[5] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">4</td>' +
                        '<td class="numeric-cell" colspan="3">体育场地总面积/人均面积（常住人口）</td>' +
                        '<td class="numeric-cell">平方米</td>' +
                        '<td class="numeric-cell">' + lastyear[6] + '/' + lastyear[7] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[6] + '/' + lastyear[7] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="6">5</td>' +
                        '<td class="numeric-cell" rowspan="6">青少年体育发展</td>' +
                        '<td class="numeric-cell" rowspan="3">赛事活动</td>' +
                        '<td class="numeric-cell">举办、承办青少年体育赛事活动场次/人数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[8] + '/' + lastyear[9] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[8] + '/' + thisyear[9] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">参加市级以上青少年体育赛事的参与度</td>' +
                        '<td class="numeric-cell">%</td>' +
                        '<td class="numeric-cell">' + lastyear[10] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[10] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">参加市级以上青少年体育赛事人数/获奖牌数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[11] + '/' + lastyear[12] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[11] + '/' + thisyear[12] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" rowspan="2">体育技能培训</td>' +
                        '<td class="numeric-cell">“教练员进校园”人次/培训学生人次</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[13] + '/' + lastyear[14] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[13] + '/' + thisyear[14] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">指导教师人次/学校数（次）</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[15] + '/' + lastyear[16] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[15] + '/' + thisyear[16] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell">体质健康达标</td>' +
                        '<td class="numeric-cell">学校数/学生数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[17] + '/' + lastyear[18] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[17] + '/' + thisyear[18] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">6</td>' +
                        '<td class="numeric-cell" colspan="3">年度举办各层级赛事活动数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[19] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[19] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">7</td>' +
                        '<td class="numeric-cell" colspan="3">年度群众体育活动参与人次</td>' +
                        '<td class="numeric-cell">万人次</td>' +
                        '<td class="numeric-cell">' + lastyear[20] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[20] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell">8</td>' +
                        '<td class="numeric-cell" colspan="3">年度体育设施公益开放场次/受益人群数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[21] + '/' + lastyear[22] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[21] + '/' + thisyear[22] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label-cell" rowspan="2">9</td>' +
                        '<td class="numeric-cell" rowspan="2">体育产业数据</td>' +
                        '<td class="numeric-cell" colspan="2">体育产业企业数</td>' +
                        '<td class="numeric-cell">个</td>' +
                        '<td class="numeric-cell">' + lastyear[23] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[23] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="numeric-cell" colspan="2">体育产业规模</td>' +
                        '<td class="numeric-cell">万元</td>' +
                        '<td class="numeric-cell">' + lastyear[24] + '</td>' +
                        '<td class="numeric-cell">' + thisyear[24] + '</td>' +
                        '</tr>'
                }
                //4.8.1
                if (moduleId == "106") {

                    var lastdata = {},
                        thisyeardata = {};
                    var num1 = 0,
                        num2 = 0;
                    $.each(data, function (i, n) {
                        if (n['t_bsqaqscqkbbnb690_date2'] == (last)) {
                            lastdata[num1] = n
                            num1++
                        }
                        if (n['t_bsqaqscqkbbnb690_date2'] == year && n['t_bsqaqscqkbbnb690_date3'] == bannian) {
                            thisyeardata[num2] = n;
                            num2++
                        }
                    });
                    var empty = $.isEmptyObject(thisyeardata); // 判断是否为空
                    var empty1 = $.isEmptyObject(lastdata);
                    if (empty1 && !empty) {
                        $.each(thisyeardata, function (i, n) {
                            str += '<tr>' +
                                '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqaqscqkbbnb690_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + (year - 1) + '年</td>' +
                                ' <td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                ' <td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '</tr>'
                            str += '<tr>' +
                                '<td class="numeric-cell">' + thisyear_bannian + '年' + lastniandu_months + '</td>' +
                                ' <td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_whscjyqysg5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_zdwxysg6'] + '</td>' +
                                ' <td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_zdjgqysh7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_zdsgyhqjgpdbsj8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_scaqswsgsj9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_gksmjyryswrscaqsgswl10'] + '</td>' +
                                '</tr>'

                        });
                    } else {
                        $.each(lastdata, function (i, n) {
                            if (empty) {
                                str += '<tr>' +
                                    '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqaqscqkbbnb690_jzyq4'] + '</td>' +
                                    '<td class="numeric-cell">' + (year - 1) + '年</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_whscjyqysg5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_zdwxysg6'] + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_zdjgqysh7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_zdsgyhqjgpdbsj8'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_scaqswsgsj9'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_gksmjyryswrscaqsgswl10'] + '</td>' +
                                    '</tr>'
                                str += '<tr>' +
                                    '<td class="numeric-cell">' + thisyear_bannian + '年' + lastniandu_months + '</td>' +
                                    ' <td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    ' <td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '</tr>'
                            } else {
                                str += '<tr>' +
                                    '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqaqscqkbbnb690_jzyq4'] + '</td>' +
                                    '<td class="numeric-cell">' + (year - 1) + '年</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_whscjyqysg5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_zdwxysg6'] + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_zdjgqysh7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_zdsgyhqjgpdbsj8'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_scaqswsgsj9'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqaqscqkbbnb690_gksmjyryswrscaqsgswl10'] + '</td>' +
                                    '</tr>'
                                if ($.isEmptyObject(thisyeardata[i])) {
                                    str += '<tr>' +
                                        '<td class="numeric-cell">' + thisyear_bannian + '年' + lastniandu_months + '</td>' +
                                        ' <td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        ' <td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        '</tr>'
                                } else {
                                    str += '<tr>' +
                                        '<td class="numeric-cell">' + thisyear_bannian + '年' + lastniandu_months + '</td>' +
                                        ' <td class="numeric-cell">' + thisyeardata[i]['t_bsqaqscqkbbnb690_whscjyqysg5'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyeardata[i]['t_bsqaqscqkbbnb690_zdwxysg6'] + '</td>' +
                                        ' <td class="numeric-cell">' + thisyeardata[i]['t_bsqaqscqkbbnb690_zdjgqysh7'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyeardata[i]['t_bsqaqscqkbbnb690_zdsgyhqjgpdbsj8'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyeardata[i]['t_bsqaqscqkbbnb690_scaqswsgsj9'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyeardata[i]['t_bsqaqscqkbbnb690_gksmjyryswrscaqsgswl10'] + '</td>' +
                                        '</tr>'
                                }
                            }
                        });
                    }
                }
                //4.8.2
                if (moduleId == "107") {
                    var lastdata = {},
                        thisyeardata = {};
                    var num1 = 0,
                        num2 = 0;
                    $.each(data, function (i, n) {
                        if (n['t_bsqyzjdqkbbnb665_date2'] == last) {
                            lastdata[num1] = n
                            num1++
                        }
                        if (n['t_bsqyzjdqkbbnb665_date2'] == year && n['t_bsqyzjdqkbbnb665_date3'] == bannian) {
                            thisyeardata[num2] = n;
                            num2++
                        }
                    });
                    var empty = $.isEmptyObject(thisyeardata); // 判断是否为空
                    var empty1 = $.isEmptyObject(lastdata);
                    if (empty1 && !empty) {
                        $.each(thisyeardata, function (i, n) {
                            str += '<tr>' +
                                '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqyzjdqkbbnb665_jzyq4'] + '</td>' +
                                '<td class="numeric-cell">' + (year - 1) + '年</td>' +
                                ' <td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                ' <td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                '<td class="numeric-cell"></td>' +
                                ' <td class="numeric-cell"></td>' +
                                '</tr>'
                            str += '<tr>' +
                                '<td class="numeric-cell">' + thisyear_bannian + '年' + lastniandu_months + '</td>' +
                                ' <td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_zxsbzzqysh5'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_zjzjgdg6'] + '</td>' +
                                ' <td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_wxpmtsg7'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_tzsbsg8'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_tzsbzgsg9'] + '</td>' +
                                '<td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_dxkjsg10'] + '</td>' +
                                ' <td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_jmscsg11'] + '</td>' +
                                '</tr>'
                        });
                    } else {
                        $.each(lastdata, function (i, n) {
                            if (empty) {
                                str += '<tr>' +
                                    '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqyzjdqkbbnb665_jzyq4'] + '</td>' +
                                    '<td class="numeric-cell">' + (year - 1) + '年</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_zxsbzzqysh5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_zjzjgdg6'] + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_wxpmtsg7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_tzsbsg8'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_tzsbzgsg9'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_dxkjsg10'] + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_jmscsg11'] + '</td>' +
                                    '</tr>'
                                str += '<tr>' +
                                    '<td class="numeric-cell">' + thisyear_bannian + '年' + lastniandu_months + '</td>' +
                                    ' <td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    ' <td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    '<td class="numeric-cell"></td>' +
                                    ' <td class="numeric-cell"></td>' +
                                    '</tr>'
                            } else {
                                str += '<tr>' +
                                    '<td class="label-cell"  rowspan="2" colspan="2">' + n['t_bsqyzjdqkbbnb665_jzyq4'] + '</td>' +
                                    '<td class="numeric-cell">' + (year - 1) + '年</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_zxsbzzqysh5'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_zjzjgdg6'] + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_wxpmtsg7'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_tzsbsg8'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_tzsbzgsg9'] + '</td>' +
                                    '<td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_dxkjsg10'] + '</td>' +
                                    ' <td class="numeric-cell">' + n['t_bsqyzjdqkbbnb665_jmscsg11'] + '</td>' +
                                    '</tr>'
                                if ($.isEmptyObject(thisyeardata[i])) {
                                    str += '<tr>' +
                                        '<td class="numeric-cell">' + thisyear_bannian + '年' + lastniandu_months + '</td>' +
                                        ' <td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        ' <td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        '<td class="numeric-cell"></td>' +
                                        ' <td class="numeric-cell"></td>' +
                                        '</tr>'
                                } else {
                                    str += '<tr>' +
                                        '<td class="numeric-cell">' + thisyear_bannian + '年' + lastniandu_months + '</td>' +
                                        ' <td class="numeric-cell">' + thisyeardata[i]['t_bsqyzjdqkbbnb665_zxsbzzqysh5'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyeardata[i]['t_bsqyzjdqkbbnb665_zjzjgdg6'] + '</td>' +
                                        ' <td class="numeric-cell">' + thisyeardata[i]['t_bsqyzjdqkbbnb665_wxpmtsg7'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyeardata[i]['t_bsqyzjdqkbbnb665_tzsbsg8'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyeardata[i]['t_bsqyzjdqkbbnb665_tzsbzgsg9'] + '</td>' +
                                        '<td class="numeric-cell">' + thisyeardata[i]['t_bsqyzjdqkbbnb665_dxkjsg10'] + '</td>' +
                                        ' <td class="numeric-cell">' + thisyeardata[i]['t_bsqyzjdqkbbnb665_jmscsg11'] + '</td>' +
                                        '</tr>'
                                }
                            }
                        });
                    }
                }
            }
            str = str.replace(/undefined/g, "");
            str = str.replace(/NaN/g, "");
            $('#form-body').html(str);
        },
        error: function (data, type, err) {
            myApp.hidePreloader();
            tishi("出现错误");

        }
    });
}

function qushitz() {
    tiaozhuan('qushi.html');
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
    if (nettype == "1") {
        localStorage.type = "wai";
        ip = "101.230.193.93";
    } else {
        localStorage.type = "nei"
        ip = "192.168.6.213";
    }
    if (!flg) {
        return false;
    }
    localStorage.pwd = $("#upwdLog").val();
    //console.log(ip);
    hapiurl = 'http://' + ip + ':8080/baoshan/';
    console.log(hapiurl)
    var flg = true
    var options = {
        type: 'POST',
        url: hapiurl + 'ajaxlogin.ht', // 登录判断
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
            console.log(msg1);
            if (msg1['resstatus'] == "0") {
                tishi(msg1.msg);
                return false;
            }
            var un = msg1['sysuser']['account']
            var tn = msg1['sysuser']['username']
            if (msg1['resstatus'] == '1') {
                var options1 = {
                    type: 'POST',
                    url: hapiurl + 'system/reg/getToken.ht', // token生成网址
                    data: {
                        'username': $('#unameLog').val()
                    },
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
                    fun: function (msg2) {
                        console.log(msg2)
                        localStorage.token = msg2
                        var options2 = {
                            type: 'POST',
                            url: hapiurl + 'platform/system/ajaxsysUser/getSelf.ht?token=' + msg2,
                            dtype: 'json',
                            ts: '登陆中...',
                            error: '登录验证失败！',
                            fun: function (msg) {
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
                                            //console.log(localStorage)
                                            tiaozhuan('index.html'); //注释-不跳转到个人中心页面
                                            myApp.closeModal('.login-screen');
                                            $(".modal-overlay").css('display', 'none');
                                            $(".popup-overlay").css('display', 'none');
                                            myLogin();
                                            isLog();
                                           
                                        }
                                    }]
                                })
                            }
                        }
                        appajax(options2)
                    }
                }
                appajax(options1)
            } else {
                tishi(msg1['msg'])
            }
        }
    }
    appajax(options)

    // $.ajax({
    //     type: "GET",
    //     url: "http://"+ip+"/EeveeUp_erpv1/login/doAuthlogin.htm?username="+$("#unameLog").val()+"&password="+$("#upwdLog").val(),
    //     dataType: "json",
    //     timeout: 10000,
    //     beforeSend: function(){
    //         myApp.showPreloader();
    //       },
    //     complete: function(){
    //         myApp.hidePreloader();
    //     },
    //     error: function(XMLHttpRequest, textStatus, errorThrown){
    //         //myApp.hidePreloader();
    //         if(XMLHttpRequest.readyState ==0){
    //             myApp.modal({
    //                 title: '未登录',
    //                 text: '请确认选择的网络是否正确',
    //                 buttons: [{
    //                     text: '确定',
    //                     onClick: function() {}
    //                 }]
    //             });
    //         }
    //         }, 
    //     success: function(msg) {
    //         // console.log(msg);
    //       if (msg['errcode'] == "0") {
    //       myApp.modal({
    //             title: '',
    //             text: '登录成功',
    //             buttons: [{
    //                 text: '确定',
    //                 onClick: function() {
    //                         var myDate = new Date();
    //                         localStorage.uname=$("#unameLog").val();
    //                         localStorage.expresstime = Date.parse(new Date()) + 86400000; // 登录过期时间为一天
    //                         localStorage.un="";
    //                         localStorage.tn="";
    //                         //console.log(localStorage)
    //                         tiaozhuan('index.html'); //注释-不跳转到个人中心页面
    //                         myApp.closeModal('.login-screen');
    //                         $(".modal-overlay").css('display','none');
    //                         $(".popup-overlay").css('display','none');
    //                         myLogin();
    //                 }
    //             }]
    //         })
    //        }else if (msg['errcode'] == '40001') {
    //         tishi('用户名或密码错误')
    //        }
    //     }
    // });
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
                ip = "";
                $('#tishi').html("");
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

function datalay() {
    laydate.render({
        elem: '#seyear',
        type: 'year',
        trigger: 'click',
        max: 'date',
        showBottom: false,
        format: 'yyyy',
        change: function (value, dates, edate) {
            $('#seyear').val(value);
            $("div[id*='layui-laydate']").remove();
        }
    });
}

function qushidatalay() {
    laydate.render({
        elem: '#qushiyear',
        type: 'year',
        trigger: 'click',
        max: 'date',
        showBottom: false,
        format: 'yyyy',
        change: function (value, dates, edate) {
            $('#qushiyear').val(value);
            $("div[id*='layui-laydate']").remove();
        }
    });
}

//get_datanew()

//获取个人资料
// function get_data_person(uname) {
//     //console.log(localStorage.un)
//     if (localStorage.un != "" || localStorage.tn != "") {
//         $("#uname").html(localStorage.un);
//         $("#truename").html(localStorage.tn);
//         return;
//     }
//     var accesstoken;
//     var moduleId = "123"
//     accesstoken = get_token();
//     accesstoken = "" + accesstoken + ""
//     var url = "http://" + ip + "/EeveeUp_erpv1/search/wuyecms/getAjaxList.htm?access_token=" + accesstoken
//     $.ajax({
//         type: "POST",
//         url: url,
//         contentType: "application/json;charset=utf-8",
//         data: '{pageSize:\"20\",nowPage:\"1\",searchMap:\"{}\",sortMap:\"{}\",moduleId:\"' + moduleId + '\",freedomTableName:\"\",freedomId:\"\"}',
//         dataType: 'json',
//         success: function (data) {
//             // console.log(data)
//             var un, tn;
//             if (data.errcode == "0" && data.data != null) {
//                 // console.log(data.data)
//                 var data = data.data;
//                 $.each(data, function (i, n) {
//                     if (n['cy_sys_base_user_username'] == uname) {
//                         un = n['cy_sys_base_user_username'],
//                             tn = n['cy_sys_base_user_realname'];
//                         localStorage.un = un;
//                         localStorage.tn = tn;
//                         //ad=n['cy_sys_base_user_address']
//                     }
//                 });

//             }
//             $("#uname").html(un);
//             $("#truename").html(tn);
//             //  $("#adress").html(ad);
//         },
//     });

// }
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
    //alert("11111");
    var view = mainView.activePage.name;
    console.log(view)
    if (view == 'index') {
        window.plugins.toast.showWithOptions({
            message: "请再按一次退出宝山数据",
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
    } else if (view == 'xiangqing' || view == 'my' || view == 'qushi') {
        tiaozhuan('index.html');
    } else {
        mainView.router.back();
    }
}
document.addEventListener("backbutton", eventBackButton, false);

function isLog(){
   
        window.JPush.setAlias({ sequence: 1, alias: localStorage.uname },
            function (result) {
                // alert(JSON.stringify(result));
            }, function (error){
                // alert(JSON.stringify(error));
            }
        );
        var tags = [];
        tags.push(localStorage.uname);
        // if(localStorage.company_name != 'null' && localStorage.company_name != '' && localStorage.company_name != null && localStorage.company_name != undefined ){
        //     tags.push(localStorage.company_name);
        // }
        window.JPush.setTags({ sequence: 1, tags: tags },
            function (result) {
                // alert(JSON.stringify(result));
            }, function (error) {
                // alert(JSON.stringify(error));
            }
        );
    }



function xiazairuanjian() {
    location.href = 'http://site.yuanjutong.com/baoshanapp/baoshan6.apk';
}

