title: Node学习笔记-Stream
date: 2014-04-11 09:55:25
tags:
	- Stream
	- node.js
---
在Node的使用中，我们会频繁的接触到`Stream`,并且内建stream模块已经被多个Node核心模块使用，同时也可以被用户自定义的模块使用。`Stream`到底是什么，用来做什么，最近查阅了写资料并进行了整理，简单总结下供自己查阅。

<!-- more -->

### 简介
[官方文档](http://nodeapi.ucdok.com/#/api/stream.html)上是这么说的：`流是一个抽象接口，被 Node 中的很多对象所实现。比如对一个 HTTP 服务器的请求是一个流，stdout 也是一个流。流是可读、可写或兼具两者的。所有流都是 EventEmitter 的实例。` 流又包括四类流， `Readable` 流、`Writable` 流、`Duplex` 流和`Transform`流，具体的异同会在下文中说到.

### 流的用途
```javascript
let http = require('http'),
    fs = require('fs');
 
let server = http.createServer(function (req, res) {
    fs.readFile(__dirname + '/data.txt', function (err, data) {
        res.end(data);
    });
});
server.listen(8000);
```
上面代码没什么问题,每次请求我们都会把整个data.txt文件读入到内存中，然后把结果返回客户端，但是通常大文件的一次读取和大量用户的高并发都会占用很大的内存，而`流`则可以分段读取，方便粗暴，大大的方便了我们。

### 如何使用
```javascript
/**
 * 流的分类
 * 可读流 可以从中流出字节内容
 * 可写流 可以把字节写入流中
 * 继承 Readable
 * 继承 EventEmitter
 * @type {exports|module.exports}
 **/

 //Readable
let fs = require('fs'),
    rs = fs.createReadStream('data.txt');
	
rs.on('open',function(){
    console.log('打开文件');
});

//只有当监听了data事件之后才开始真正读取，不监听的话下面的其他方法`end`,'close','error'自然也不会触发
rs.on('data',function(data){
    //console.log('操作');
    rs.pause();//等待操作完成          暂停流的发射事件 关掉开关
    setTimeout(function(){
        console.log('操作完成');
        rs.resume();//再次执行操作     重新开始恢复 读取 打开开关
    },1000);
});
rs.on('end',function(){
    console.log('文件内容读取完毕');
});
rs.on('close',function(){
    console.log('文件关闭');
});
rs.on('error',function(err){
    console.log(err);
});
```
### 大家可以看出来，`Readable`流有以下几个事件：
- 当一个数据块可以从流中被读出时，它会触发一个 `readable` 事件
- `data`事件 - 数据正在传递时，触发该事件（以chunk数据块为对象）
- `end`事件 - 数据传递完成后，会触发该事件。
- `close`事件 - 当底层数据源（比如，源头的文件描述符）被关闭时触发。并不是所有流都会触发这个事件。
- `error`事件 - 数据接收异常时，会触发该事件

### 方便的API
Node还给我提供了简洁的API，供我们使用，而且`req`,`res`参数都是流对象,读文件的代码我们就可以调整下:
```javascript
var http = require('http');
var fs = require('fs');
 
var server = http.createServer(function (req, res) {
    var stream = fs.createReadStream(__dirname + '/data.txt');
    stream.pipe(res);
});
server.listen(8000);
```
`.pipe`方法会自动帮助我们监听data和end事件。上面的这段代码不仅简洁，而且`data.txt`文件中每一小段数据都将源源不断的发送到客户端。
除此之外，使用`.pipe()`方法还有别的好处，比如说它可以自动控制后端压力，以便在客户端连接缓慢的时候node可以将尽可能少的缓存放到内存中。

### pipe
readable.pipe(destination, [options])
- 实现流的输入和输出功能
- destination {Writable Stream} 写入数据的目标
- options {Object} 导流选项
- end {Boolean} 在读取者结束时结束写入者。缺省为 true

### Stream中的4大`天王`
| 类            | 使用场景                          | 实现的方法       | 
| ------------- |:---------------------------------:| ----------------:|
| Readable      | 只读                              | _read            |
| Writable      | 只写                              | _write           |
| Duplex        | 读写                              | _read,_write     |
| Transform     | 操作被写入的数据，然后读出结果    | _transform,flush |

- Readable流（可读流）介绍
	- Readable（可读）流接口是对您正在读取的数据的来源的抽象。换言之，数据出自一个可读流。
    - Readable 流有两种“模式”：流动模式和暂停模式。
    - 当处于流动模式时，数据由底层系统读出，并尽可能快地提供给您的程序；当处于暂停模式时，您必须明确地调用 stream.read() 来取出若干数据块。流默认处于暂停模式。
	- Readable流拥有的事件，已经在`本文的开始`介绍过了。
	
- Writable流（可写流）介绍	
	- Writable（可写）流接口是对写入数据的目标的抽象。
	- `write()`方法 该方法向底层系统写入数据，并在数据被处理完毕后调用所给的回调。
	- `end()`方法 当不再写入数据时，调用该方法，停止写入。
	
- Duplex(双工流) 介绍
	- Duplex（可读写）流同时兼具可读和可写特性，比如一个 TCP 嵌套字连接。
	- 值得注意的是，stream.Duplex 是一个可以像 Readable 或 Writable 一样被扩充、实现了底层方法 _read(sise) 和 _write(chunk, encoding, callback) 的抽象类

- Transform（转换流）介绍
	- "转换"（transform）流实际上是一个输出与输入存在因果关系的双工流，比如 zlib 流或 crypto 流。
	- 输入和输出并无要求相同大小、相同块数或同时到达。举个例子，一个 Hash 流只会在输入结束时产生一个数据块的输出；一个 zlib 流会产生比输入小得多或大得多的输出。
	
### 参考资料
- [NodeAPI](http://nodeapi.ucdok.com/api/)