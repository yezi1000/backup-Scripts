// ==UserScript==
// @name         NPUPT-GEN
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://npupt.com/upload.php
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var button_html = '&nbsp; &nbsp; &nbsp; <button type="button" id="down_video_btn">生成链接</button>';
    var html_tag = $("td.rowfollow.left");
    var need = "[size=6][color=Red]安装有问题先看[url=https://npupt.com/forums.php?action=viewtopic&forumid=25&topicid=7184]游戏破解版常见问题[/url][/color][/size]\n\n【安装信息】\n1. 解压缩\n2. 载入镜像\n3. 安装游戏\n4. 复制Crack文件夹(也可能是组名例如CODEX PLAZA等)内的未加密补丁到游戏目录中覆盖\n  如果这个文件夹为空则说明不需要打补丁 安装有问题可以查看*.nfo文件\n5. 运行游戏\n\n【游戏截图】"
    if (html_tag) {
        html_tag.addClass("bt").append(button_html);
    }
    // Your code here...
    $("#down_video_btn").click(function () {
        var uurl = document.getElementById('transferred_url').value;
        var apiurl="https://api.yezi.ga/infogen"
        if (uurl.search("steam") != -1) {
            //alert(apiurl+'?url='+uurl)
            $.ajax({
                type: 'GET',
                url: apiurl+'?url=' + uurl,
                dataType: 'json',
                success: function (data) {
                    var sstr = data.format;
                    var index1 = sstr.search('【游戏截图】');
                    //alert(index1);
                    var from = sstr.substr(0, index1);//切割字符串
                    var las = sstr.substr(index1 + 6, sstr.length);
                    $("#descr").text(from + need + las);//替换内容
                }
            })
        } else if(uurl.search("imdb")!=-1){
            var gg=uurl.search('title');
            var ll=uurl.length;
            if(uurl.charAt(ll-1)=='/') ll-=1;
            var lasstr=uurl.substring(gg+6,ll);
            var finstr='?site=douban&sid=';
            finstr+=lasstr;
            alert(lasstr);
            $.ajax({
                type: 'GET',
                url: apiurl+finstr,
                dataType: 'json',
                success: function(data){
                    var sstr=data.format;
                    $("#descr").text(sstr);//替换内容
                }
            })
        }
        else if(uurl.search("epic")!=-1){
                //alert(apiurl+'?url='+uurl)
                $.ajax({
                    type: 'GET',
                    url: apiurl+'?url=' + uurl,
                    dataType: 'json',
                    success: function (data) {
                        var sstr = data.format;
                        var index1 = sstr.search('【推荐配置】');
                        //alert(index1);
                        var from = sstr.substr(0, index1);//切割字符串
                        var las = sstr.substr(index1 + 6, sstr.length);
                        $("#descr").text(from + need + las);//替换内容
                    }
                })
        }
        else if(uurl.search("indienova.com")!=-1){
                //alert(apiurl+'?url='+uurl)
                $.ajax({
                    type: 'GET',
                    url: apiurl+'?url=' + uurl,
                    dataType: 'json',
                    success: function (data) {
                        var sstr = data.format;
                        var index1 = sstr.search('【推荐配置】');
                        //alert(index1);
                        var from = sstr.substr(0, index1);//切割字符串
                        var las = sstr.substr(index1 + 6, sstr.length);
                        $("#descr").text(from + need + las);//替换内容
                    }
                })
        }
        else{
            $.ajax({
                type: 'GET',
                url: apiurl+'?url=' + uurl,
                dataType: 'json',
                success: function (data) {
                    var sstr = data.format;
                    $("#descr").text(sstr);//替换内容
                }
            })
        }
    });
})();
