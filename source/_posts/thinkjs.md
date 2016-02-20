title: 使用ThinkJS构建web应用
date: 2015-12-01 17:09:58
tags:
	- ThinkJS
	- node.js
---
玩过`Node`的同学对`Express`肯定不陌生，是TJ大神主刀开发的，今天咱们来说`下ThinkJS`，提到`ThinkPHP`各位同学肯定秒懂了，感谢`奇舞团`&&`成银老师`。

<!-- more --->
ThinkJS基于`MVC`设计，把数据视图表现分离得当，把常用的Node方法进行了封装，入门简单，大大的提高了开发效率，让我们可以随随便便分分钟构建一个web应用，废话不多说，直接来。

### 安装ThinkJS
- npm install thinkjs@2 -g --verbos

### 创建项目&&启动
- thinkjs new project_path --es6
- cd project_path && npm install
- npm start

### 目录结构
- src 查看当前所有模块
	- bootstrap
	- config
	- controller
- view 视图文件

common -> config -> config.js

export default {
  route_on: true
};	

开启默认路由，在config目录下创建 router.js
//自定义路由规则
module.exports = [
    ["page/:id", "index/page"],					//详情页
	["p/:page", "index/index"],					//首页翻页
	["mood/:page", "mood/index"],				//心情
	["search", "index/search"],					//搜索
	["login", "index/login"],					//登录
	["cate/:cate", "index/index"],
	["tag/:tag", "index/index"],				//标签云
	["about", "index/page?id=1"],				//关于
	["comment", "index/page?id=2"],				//留言
	["archives","index/archives"],				//归档
	["error","index/error"]						//错误
]

//db 文件修改，连接数据库