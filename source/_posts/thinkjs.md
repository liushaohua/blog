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
![目录结构](https://o3o97s3zl.qnssl.com/20151201_route.png)

- src 查看当前所有模块
	- bootstrap
	- config
	- controller
- view 视图文件

### common -> config -> config.js 修改config 
```javascript
	export default {
	  route_on: true
	};	
```

### 开启默认路由，在config目录下创建 router.js
```javascript
	//自定义路由规则
	module.exports = [
		["page/:id", "index/page"],					//详情页
		["archives","index/archives"],				//归档
		["error","index/error"]						//错误
	]
```

### 修改页面
- 进入 view -> home -> index_index.html
```html
	<div id="msgBox">
		<form>
			<h2>来 , 说说你在做什么 , 想什么</h2>
			<div>
				<input id="userName" class="f-text" value="" />
				<p id="face"><img src="/static/img/face1.gif" class="current" /><img src="/static/img/face2.gif" /><img src="/static/img/face3.gif" /><img src="/static/img/face4.gif" /><img src="/static/img/face5.gif" /><img src="/static/img/face6.gif" /><img src="/static/img/face7.gif" /><img src="/static/img/face8.gif" /></p>
			</div>
			<div><textarea id="conBox" class="f-text"></textarea></div>
			<div class="tr">
				<p>
					<span class="countTxt">还能输入</span><strong class="maxNum">140</strong><span>个字</span>
					<input id="sendBtn" type="button" value="" title="快捷键 Ctrl+Enter" />
				</p>
			</div>
		</form>
		<div class="list">
			<h3><span>大家在说</span></h3>
			<ul>
				<%data.forEach(function(v){%>
				<li list_id="<%=v.id%>">
					<div class="userPic"><img src="/static/img/face<%=v.user_id%>.gif" /></div>
					<div class="content">
						<div class="userName"><a href="javascript:;"><%=v.user_name%></a>:</div>
						<div class="msgInfo"><%=v.text%></div>
						<div class="times"><span><%=v.date%></span><a class="del" href="javascript:;">删除</a></div>
					</div>
				</li>
				<%})%>
			</ul>
		</div>	
	</div>
```

### 增加控制器
```javascript
	export default class extends Base {
	  /**
	   * index action
	   * 首页控制器
	   * @return {Promise} []
	   */
	  async indexAction(){
		let data = await this.model('list').getList();
		this.assign('data', data);
		return this.display();
	  }
	  
	  /**
	   * send action
	   * 发送消息
	   * @return {Promise} []
	   */
	  async sendAction() {
		  if(this.isPost()){
			  await this.model('list').addList(this.post());
			  this.success();
		  }
	  }
	  
	  /**
	   * send action
	   * 删除消息
	   * @return {Promise} []
	   */
	  async deleteAction() {
		  if (this.isAjax()) {
			  await this.model('list').delete_list(this.post('id'));	
			  this.success();
		  }
	  }	  
	}
```

### 增加model
```javascript
	/**
	 * model
	 */
	export default class extends think.model.base {
		async getList() {
			let data = await this.field("id,user_id,user_name,text,date").order('id DESC').select();
			return data;
		}
		
		async addList(d) {
			await this.add(d);
		}
		
		async delete_list(data) {
			await this.where({id:data}).delete();
		}
	}
```



### common -> config -> db.js 修改db  文件修改，连接数据库
```javascript
	export default {
	  type: 'mysql',
	  host: '',		//ip
	  port: '3306',
	  name: '',		//项目名称
	  user: 'root',
	  pwd: '',		//密码
	  prefix: '',	//前缀名称
	  encoding: 'utf8',
	  nums_per_page: 10,
	  log_sql: true,
	  log_connect: true,
	  cache: {
		on: true,
		type: '',
		timeout: 3600
	  }
	};
```

### 未完，持续更新中...