title: 基于Node.js的前后端分离
date: 2014-06-13 10:11:27
tags:
	- 前后端分离
	- node.js
---
前言：前后端分离是一个老生常谈的话题了,工作了几年，我也体验过分离与不分离的项目，也有一些心得，我早年工作的是时候，是前端开发静态页面与交互，后端负责套模板写数据交互，各种酸爽你懂的，有事没事就叫我们前端过去帮忙调页面，无非出现的问题就是标签没闭合或者套错层级orJS看不懂等一些低级问题，导致我们前端没有成就感，一直在不停的切页面填坑，在后来经历过前端负责写页面，全站ajax，后端负责底层数据&接口等，虽然前端有了一定话语权and制造线上bug风险的权利了，但是这种开发模式也不是最优，脱离了后端模板引擎对于同步渲染与seo都造成了一定问题，再后来到了X度迎来了曙光，这才是真正意义上的前后端分离，这里前端负责开发smarty模板,后端负责数据透传与模板召回，前后端完全解耦也不存在同步渲染的问题了，后端语言不限c++，python都可以，前端唯一一点不好就是要熟悉smarty&php相关，其他还好，再后来`后来 我总算学会了如何去爱 可惜你早已远去 消失在人海`,终于到了我今天想说的主题，`理想中的前后端分离`。

<!-- more --->

### 大前端分层(前端视角)

```javascript
-----------------------
-                     -
-       Browser       -
-  前端    |          -
-         Node        -
-          |          -
-  后端   API         -
-                     -
-----------------------
```

这里的前端分为`Node`和`Browser`两层，`Node`层的前端主要负责API和controller相关开发，而Browser层的前端主要负责view和交互相关，由于和服务器交互的语言为`Node`，没有了其他语言的束缚，编写模板的时候就轻松多了。`Node`主要的功能还是起到了一个挡板代理的功能，轻量级的项目就由后端提供HTTP接口 or webSocket,Node层转发，不会存在跨域相关问题，而且可以把数据同步推到view层，也就不存在首屏渲染的问题了.
```javascript
var http = require('http'),
    httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer();

http.createServer(function (req, res) {

  if (/\/api\/.*$/.test(req.url)) {
	setTimeout(function () {
		proxy.web(req, res, {
		  target: 'http://localhost:9008'
		});
	  }, 500);
  } else {
	res.write('hello');
	res.end();
  }
  
}).listen(8008);

//
// 目标服务器
//
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(9008);
```

### 重型项目

如果是重型项目的话可以使用`Thrift`,`Thrift`支持多种语言之间的RPC方式的通信：Node语言client可以构造一个对象，调用相应的服务方法来调用java语言的服务 ，跨越语言的C/S  rpc调用,具体的使用方法大家可以自行Google下，而controller通常都是后端去写的，有了`Node`，就可以交给前端了，后端就可以专心的搞底层了。关于服务器部署这块，可以先暂时保留传统后端&Node,同时部署在机器上进行分流，部分机器Nginx配置规则让 Node.js 来处理相应请求，线上出现了问题的话直接对Nginx 配置进行回滚，待到测试完成再进行全量。当然这里面还会有一些其他要注意的地方和坑，这只是一个简略的思路而已，大神勿拍砖撒~~~

