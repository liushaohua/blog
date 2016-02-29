title: Node学习笔记-Path
date: 2014-04-10 14:39:21
tags:
	- Path
	- node.js
---
用过`世界上最好的语言`的同学一定对`pathinfo()`这个函数比较熟悉，它是检查文件路径相关的`API`，说起`PHP`的内置函数，据说有500多个，也是多的`不要不要`的了，但是功能强大，极大的增加了我们的开发便利，但我们今天的主题不是`PHP`，我们来聊下`Node`的`Path`。
<!-- more -->

### 路径 (Path)
- path.normalize(p)
- path.join([path1], [path2], [...])
- path.resolve([from ...], to)
- path.isAbsolute(path)
- path.relative(from, to)
- path.dirname(p)
- path.basename(p, [ext])
- path.extname(p)
- path.sep
- path.delimiter

`Path`是`Node`中内置的路径处理模块，通过 require('path') 来加载此模块，我们逐一介绍下各个方法的用途。

### path.normalize(p)
- normalize(正常)，将非标准路径转化为标准路径
- 解析 . `当前目录` .. `上级目录` 
- 多个杠转成一个杠
- 兼容多平台 windows linux`\ /`
- 如果是斜杠结尾，则保留
```javascript
	path.normalize('./../a////b//d//../c//e//')
	..\a\b\c\e\
	
	path.normalize('/foo/bar//baz/asdf/quux/..')
	'/foo/bar/baz/asdf'
```

### path.join([path1], [path2], [...])
- 连接所有参数, 并且规范化得到的路径
```javascript
	path.join(__dirname,'a','b','..','c')
	E:\node\lectures\10.path\a\c
```

### path.resolve([from ...], to)
- 以应用程序根目录为起点，根据参数的值解析出一个绝对路径
- 以应用程序根目录为起点
- 普通字符串代表当前目录的下一级目录
- /代表盘符根目录
- 没有下一个参数，返回当前路径
- 另一种思路, 是把它看做一系列 cd 命令
```javascript
	path.resolve('/a','..','b','msg','a.txt')
	e:\b\msg
```
```shell
	path.resolve('/a','..','b','msg','a.txt')
	cd /a 
	cd ..
	cd b/
	cd msg
	pwd /b/msg
```

### path.isAbsolute(path)
- 判断是否绝对路径
```javascript
	path.isAbsolute('/foo/bar')  // true
	path.isAbsolute('/opt/..')   // true
    path.isAbsolute('web/');     // false
```

### path.relative(from, to)
- 解析从from到to的相对路径
- 返回的是在第一个路径里，如何用相对路径 去引用第二个路径
```javascript
	- a
		index.js
	- b
		c.js
		
	path.relative('a','b/c.js')
	b/c.js
	
	path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')
    ../../impl/bbb'
```

### path.dirname(p)
- 获取路径所属的目录
- 目录的话 返回上一级目录
- 如果是文件 返回此文件所属的目录
```javascript
	path.dirname(__dirname)
```

# path.basename(p, [ext])
- 返回指定的文件名，返回结果可排除[ext]后缀字符串
```javascript
	console.log('文件名带后缀：'+path.basename(p));
	console.log('文件名不带后缀：'+path.basename(p, '.html'));
```

### path.extname(p)
- 获取文件的扩展名
```javascript
	path.extname('a/b/index.js')
	//.js
```

## path.sep 
- 路径分隔符
```javascript
	console.log(path.sep); // '/'或'\’
	console.log(path_str.split(path.sep)); // [ '', 'home', 'lee', 'works', 'nodejs', 'study12', 'index.html' ]
```

## path.delimiter
- 环境变量分隔符
```javascript
	console.log(path.delimiter); //一般linux是'：'，windows是';'
	console.log(process.env.PATH); //打印环境变量path
	console.log(process.env.PATH.split(path.delimiter)) //用path.delimiter分割
```




















