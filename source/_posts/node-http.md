title: Node学习笔记-HTTP
date: 2014-04-13 09:42:40
tags:
	- HTTP
	- node.js
---
占楼

### 简介
HTTP是Hyper Text Transfer Protocol（超文本传输协议）的缩写。它的发展是万维网协会（World Wide Web Consortium）和Internet工作小组IETF（Internet Engineering Task Force）合作的结果，（他们）最终发布了一系列的RFC，RFC 1945定义了HTTP/1.0版本。其中最著名的就是RFC 2616。RFC 2616定义了今天普遍使用的一个版本——HTTP 1.1。

HTTP协议（HyperText Transfer Protocol，超文本传输协议）是用于从WWW服务器传输超文本到本地浏览器的传送协议。它可以使浏览器更加高效，使网络传输减少。它不仅保证计算机正确快速地传输超文本文档，还确定传输文档中的哪一部分，以及哪部分内容首先显示(如文本先于图形)等。

HTTP是一个应用层协议，由请求和响应构成，是一个标准的客户端服务器模型。HTTP是一个无状态的协议。

<!-- more -->

### 相关内容
- HTTP协议通常承载于TCP协议之上，有时也承载于TLS或SSL协议层之上，这个时候，就成了我们常说的HTTPS。
```javascript
-----------------------
-        HTTP         -
-            TLS/SSL  -
-        TCP          -
-        IP           -
-     数据链路层      -
-----------------------
```
 

### Node中的使用
```javascript
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var users = [];
var fs = require('fs');
/*
 * 创建服务器
 */
var server = http.createServer(function(req,res){
    //req.url;//获取请求的字符串
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;
    if(pathname == '/'){
        fs.createReadStream('./reg.html').pipe(res);
    }else if(pathname == '/reg'){
        var contentType = req.headers['content-type'];
        req.setEncoding('utf8');
        if(hashBody(req)){
            var result = '';
            req.on('data',function(chunk){
                result +=chunk ;
            });
            req.on('end',function(){
                if(contentType == 'application/json'){
                    req.body = JSON.parse(result);
                }else if(contentType == 'application/x-www-form-urlencoded'){
                    req.body = querystring.parse(result);
                }
                res.end(JSON.stringify(req.body));
            });
        }else{
            res.end('空空如也');
        }

    }
    function hashBody(req){
        return req.headers['content-length'];
    }

});
server.listen(8080);
```