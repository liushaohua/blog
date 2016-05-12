title: Node学习笔记-Cookie
date: 2014-04-14 09:42:54
tags:
	- Cookie
	- node.js
---
科普:Cookie(点心)是由服务器端生成，发送给User-Agent（一般是浏览器），浏览器会将Cookie的key/value保存到某个目录下的文本文件内，下次请求同一网站时就发送该Cookie给服务器（前提是浏览器设置为启用cookie）。Cookie名称和值可以由服务器端开发自己定义,服务器可以设置或读取Cookies中包含信息，借此维护用户跟服务器会话中的状态

<!-- more -->

### Cookie利弊
- 一旦服务器向客户端发了cookie,以后除非 cookie过期，否则浏览器每次都会向服务器发cookie
- 存放在客户端，容易被篡改

### 工作原理
一般来说，Cookie通过HTTP Headers从服务器端返回到浏览器上。首先，服务器端在响应中利用Set-Cookie header来创建一个Cookie ，然后，浏览器在它的请求中通过Cookie header包含这个已经创建的Cookie，并且把它返回至服务器，从而完成浏览器的论证。
  
### 建议优化点  
- 不要存储私密数据(or 强加密)
- 正确的设置path domain 以减少cookie的发送
- 正确的设置httpOnly防止cookie被篡改


### cookie的使用
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

### express中使用cookie

```javascript
var express      = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());

app.get('/', function(req, res) {
	//设置
	res.cookie('name', 'koby', { domain: '.example.com', path: '/admin', secure: true });
	
	//res.cookie(name, value [, options]);
    //domain：cookie在什么域名下有效，类型为String,。默认为网站域名
    //expires: cookie过期时间，类型为Date。如果没有设置或者设置为0，那么该cookie只在这个这个session有效，即关闭浏览器后，这个cookie会被浏览器删除。
    //httpOnly: 只能被web server访问，类型Boolean。
    //maxAge: 实现expires的功能，设置cookie过期的时间，类型为String，指明从现在开始，多少毫秒以后，cookie到期。
    //path: cookie在什么路径下有效，默认为'/'，类型为String
    //secure：只能被HTTPS使用，类型Boolean，默认为false
    //signed:使用签名，类型Boolean，默认为false。`express会使用req.secret来完成签名，需要cookie-parser配合使用`
   
	//读取
    console.log("Cookies: ", req.cookies);
});

app.listen(8080)
```
