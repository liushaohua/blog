title: Node学习笔记-Session
date: 2014-04-14 14:10:54
tags:
	- Session
	- node.js
---
Session:在计算机中，尤其是在网络应用中，称为`会话控制`。Session 对象存储特定用户会话所需的属性及配置信息。这样，当用户在应用程序的 Web 页之间跳转时，存储在 Session 对象中的变量将不会丢失，而是在整个用户会话中一直存在下去。当用户请求来自应用程序的 Web 页时，如果该用户还没有会话，则 Web 服务器将自动创建一个 Session 对象。当会话过期或被放弃后，服务器将终止该会话。Session 对象最常见的一个用法就是存储用户的首选项。例如，如果用户指明不喜欢查看图形，就可以将该信息存储在 Session 对象中。注意`会话状态仅在支持 cookie 的浏览器中保留`。

<!-- more -->

### cookie的实现
```javascript
var http = require('http');
var url = require('url');
var querystring = require('querystring');
http.createServer(function(request,response){
    var urlObj = url.parse(request.url,true);
    var pathname = urlObj.pathname;
    if('/favicon.ico' == pathname){
        return response.end('404');
    }else if(pathname == '/write'){
		//设置cookie
        response.writeHead(200,{'Content-Type':'text/html',"Set-Cookie":["name=abc","isAdmin=0"]});
        response.end('hello');
    }else{
        var cookie = request.headers.cookie;
        var cookieObj = querystring.parse(cookie,'; ');
        response.setHeader('Content-Type',"text/html;charset=utf-8");
        if(cookieObj.name){
            var isAdmin = cookieObj.isAdmin==1?"管理员":"普通用户";
            response.end('欢迎老用户,你是'+isAdmin);
        }else{
            response.end('欢迎新用户');
        }
    }
}).listen(8080);
```

### Session的实现
```javascript
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var SESSION_KEY = 'sessionKey';
var session = {};
http.createServer(function(req,res){
    var urlObj = url.parse(req.url);
    var pathname = urlObj.pathname;
    var now = new Date().getTime();
    if(pathname=='/favicon.ico'){
        return res.end('404');
    }else{
        var cookie = req.headers.cookie;
        var cookieObj = querystring.parse(cookie,'; ');
        res.writeHead(200,{'Content-Type':"text/html;charset=utf-8"});
        if(cookieObj[SESSION_KEY]){
            var id = cookieObj[SESSION_KEY];
            var obj = session[id];
            if(obj){
                if(obj.mny<=0){
                    res.end("次数用完，请重新办理");
                }else{
                    obj.mny -= 1;
                    res.end('欢迎你，老顾客，你的可用次数为'+obj.mny);
                }

            }else{
                var sessionId = now+'_'+Math.random();//卡号
                var sessionObj = {mny:10};//会员卡的信息
                session[sessionId] = sessionObj;
                res.writeHead(200,{'Content-Type':"text/html;charset=utf-8","Set-Cookie":SESSION_KEY+'='+sessionId});
                res.end('老顾客，但你的会员卡我们找不到对应关系了，再送你一张剪发卡，次数为10次');
            }

        }else{//没有访问过
            var sessionId = now+'_'+Math.random();//卡号
            var sessionObj = {mny:100};//会员卡的信息
            session[sessionId] = sessionObj;
            res.writeHead(200,{'Content-Type':"text/html;charset=utf-8","Set-Cookie":SESSION_KEY+'='+sessionId});
            res.end('新顾客，送你一张剪发卡，次数为10次');
        }

    }
}).listen(8080);
```