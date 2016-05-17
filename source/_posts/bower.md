title: 指定bower安装目录
date: 2013-02-01 10:02:20
tags:
	- bower
---
在项目的根下创建一个名为.bowerrc 的文件
```javascript
	{
	  "directory" : "public/libs"    //bower中的插件 安装目录
	}
```

运行bower install 初始化需要的包

### 生成package.json
```javascript
	bower init
```

### 下载包
```javascript
	npm install bower -g
	bower install jquery
	npm install jQuery --save //--save会保存的到package.json中
```
 
