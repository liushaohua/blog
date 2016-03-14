title: Node学习笔记-Tcp
date: 2014-04-12 15:37:23
tags:
	- Tcp
	- node.js
---
### 前言
在浏览器中通过http仅能实现单向的通信，但如果想做实时通讯，我们应该怎么搞？大家的脑海里的第一印象是不是`WebSocket`or `Socket.io`，区别于 HTTP 服务器以 HTTP 为通讯协议， 实时服务器一般采用较为底层的 TCP/IP 为协议通讯，实现了“套字节 Socket”的双向机制，接下来咱们就具体实践下。
<!-- more -->

### 关于TCP
- `TPC/IP`协议是传输层协议，主要解决数据如何在网络中传输
- TCP分层模型
	- 应用层
	- 表示层
	- 会话层
	- 传输层
	- 网络层
	- 数据链路层
	- 物理层
- 让数据进行计算机间传输
- 传输前要经过三次握手 才能发射数据
- 当会话过程中，双方都提供一个套接字 socket. 实现客户端和服务器端的连接
- socket可读可写的一个流

### 它能做什么
Nodejs提供了`net`模块给我们，可用于创建Socket服务器或Socket客户端。NodeJS 的数据通信，最基础的两个模块是 Net 和 Http，前者是基于 Tcp 的封装，后者本质还是 Tcp 层，只不过做了比较多的数据封装，我们视为表现层

### 建立一个`Tcp`服务器
```javascript
var  net = require('net'),
     fs = require('fs'),
     ws = fs.createWriteStream('tcp.log');
var  server = net.createServer(function(socket){
     console.log(socket.address());
     socket.setEncoding('utf8');
	
  	 server.on('listening', function() {
	   console.log('Server is listening on port');
	 });
	
     socket.on('data',function(chunk){
        console.log(chunk);
        ws.write(chunk);
     });
	
     socket.on('end',function(){
        console.log('end');
     });

     socket.on('close',function(){
        console.log('close');
        socket.destroy();
     });
});
server.listen(8080,function(){
    console.log('started');
});
```

### 访问服务器
``` shell
telnet 127.0.0.1 8080
```

建立连接后，得到一个socket对象作为回调中的参数，我们可以操作这个socket对象，前面提到过tcp连接的对象是可读可写的流。作为一个流对象，因此能够监听data,end等事件；作为一个可写流，具有write()方法。

### 创建一个简单聊天服务器
```javascript
var net = require('net'),
	clients = {};

var server = net.createServer(function (socket) {
	var name;
	socket.write('欢迎来到聊天室，请设置昵称:');
	
	socket.on('data',function (chunk) {
		if (name) {
			sendMsg(name.toString() + chunk.toString());
		} else {
			if (clients[chunk]) {
				socket.write('用户名被占用，请更换用户名');
			} else {
				name = chunk;
				clients[chunk] = socket;
				sendMsg('SYSTEM:'+chunk+'来到聊天室，我们欢迎他');
			}
		}
	});
	
	socket.on('close',function (chunk) {
		delete clients[name];
		socket.destroy();
		sendMsg('SYSTEM:'+name+'离开了');
	});
}).listen(8080);	

function sendMsg(msg) {
	for (var e in clients) {
		clients[e].write(msg);
	}
}
```

短短几行代码就搞定了，看上去也比较简单，`data`的时候判断有没有用户名，有的话并且没有重复就输出，把`socket`对象缓存并广播所有人，当然只是入门的简版，还需要增加判断是不是本人以及`error`和`close`相关，大家可以自行补充哈~~






















