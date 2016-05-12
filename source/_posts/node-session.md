title: Node学习笔记-Session
date: 2014-04-14 14:10:54
tags:
	- Session
	- node.js
---
Session:在计算机中，尤其是在网络应用中，称为`会话控制`。Session 对象存储特定用户会话所需的属性及配置信息。这样，当用户在应用程序的 Web 页之间跳转时，存储在 Session 对象中的变量将不会丢失，而是在整个用户会话中一直存在下去。当用户请求来自应用程序的 Web 页时，如果该用户还没有会话，则 Web 服务器将自动创建一个 Session 对象。当会话过期或被放弃后，服务器将终止该会话。Session 对象最常见的一个用法就是存储用户的首选项。例如，如果用户指明不喜欢查看图形，就可以将该信息存储在 Session 对象中。注意`会话状态仅在支持 cookie 的浏览器中保留`。

<!-- more -->

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

### express中使用session && 存储在redis

```javascript
var express = require('express');
var session = require('express-session'); //如果要使用session，需要单独包含这个模块
var cookieParser = require('cookie-parser'); //如果要使用cookie，需要显式包含这个模块
var RedisStore = require('connect-redis')(session);
var app = express();
 
// 设置 Cookie
app.use(cookieParser('abc'));
 
// 设置 Session
app.use(session({
  store: new RedisStore({
    host: "127.0.0.1",
    port: 6379,
    db: "test_session"
  }),
  resave:false,
  saveUninitialized:false,
  secret: 'keyboard cat'
}))
 
app.get("/", function(req, res) {
  var session = req.session;
  session.count = session.count || 0;
  var n = session.count++;
  res.send('hello, session id:' + session.id + ' count:' + n);
});
 
app.listen(8080);
```