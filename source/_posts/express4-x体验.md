title: express4.x体验
date: 2015-04-02 10:04:36
tags:
	- express
	- node.js
---
Express 是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架，它提供一系列强大的特性，帮助你创建各种 Web 和移动设备应用。

<!-- more --->

### 安装
```javascript
	npm install -g express
	npm install -g express-generator
	express myBlog
	cd myBlog && npm install
	npm start 
```
npm start 之后就跑起来了，打开浏览器localhost 3000端口 http://localhost:3000/

- 常用的express函数
	- `res.redirect('/')`; 重定向
	- `express -e myblog` 创建博客的时候使用ejs 默认为jade
	- ```javascript
		router.post('/reg',function (req, res, next) {
		 　　var userName = req.body.username;   //获取post后页面内的name
		}
	  ```
	- `var session = require('express-session');`     //引入session  
	- ```javascript
		//使用session
		app.use(session({
			secret: 'myblog',
			resave: false,
			saveUninitialized: false
		}));
	  ```
	- `app.use(flash());`  //使用flash  
	- ```javascript
	app.use(function(req,res,next){
		res.locals.error = req.flash('error').toString() || "";
		res.locals.success = req.flash('success').toString() || "";
		res.locals.title = "";
		res.locals.count = 0;
		res.locals.pageNum= 0;
		res.locals.pageSize= 0;
		res.locals.totalPage= 0;
		res.locals.keyword='';
		res.locals.user = req.session.user;
		next();
	});
	//app.locals：这是一个函数对象，可以给它增加新的属性。程序内所有页面模板都能访问这个对象，所以可以用它保存全局配置变量供页面模板使用。
	//调用方法
	<%=title%>
	<%=error%>
	  ```

- 再看下app.js	  
	- 1.app.set(name,value)
	```javascript
	//把名字为name的项的值设为value，用于设置参数
	app.set('views', path.join(__dirname, 'views'));
	//设置了模版文件夹的路径；主要清楚__dirname的意思就可以了，它是node.js中的全局变量，表示取当前执行文件的路径
	app.set('view engine', 'ejs');  //设置使用的模版引擎，我们使用的ejs
	```
	- 2.app.use([path], function)
	```javascript
		//用这个方法来使用中间件，因为express依赖于connect，有大量的中间件，可以通过app.use来使用；
		//path参数可以不填，默认为'/' (项目中用到的就不分别解释了，用到的时候自已查一API的中间件部分)
		app.use(express.static(path.join(__dirname, 'public'))); 
		//这一句中可能要注意一下，express.static( )是处理静态请求的，设置了public文件，
		//public下所有文件都会以静态资料文件形式返回（如样式、脚本、图片素材等文件）
		var routes = require('./routes/index');
		var users = require('./routes/users');
		app.use('/', routes);app.use('/users', users);
		//上面代码表示当用户使用/访问时，调用routes，即routes目录下的index.js文件，
		//其中.js后缀省略，用/users访问时，调用routes目录下users.js文件
		//这就是为什么，我们示例中用http://localhost:8100/访问时候，
		//修改的index.js里的文件代码可以执行（当然index.js文件中也要写对应的代码，才能是我们最终看到的效果）
	```
	- 3.app.get(name)
	```javascript
	获取名为name的项的值
	if (app.get('env') === 'development') { 
		app.use(function(err, req, res, next) { 
			res.status(err.status || 500); 
			res.render('error', { message: err.message, error: err }); 
		});
	}
　　表示如果是开发环境，处理error时会输出堆栈信息
	```
	- 4.路由文件index.js
	```javascript
	主要看下面这段代码
	router.get('/', function(req, res) { 
		res.render('index', { 
			title: '<h1>Express</h1>' ,
			users:[
					{username: 'Wilson'},
					{username: 'Wilson Zhong'}, 
					{username: 'Zhong Wei'}
			] 
		});
	});
	//这段表示，router.get表示通过get请求/时，响应后面的function处理，两个参数分别是request、response；
	//res.render表示调用模版引擎解析名字index的模板，传并传入了title和users两个对象做为参数；
	//为什么它会知道解板views目录下的index.ejs?而不是其它目录下的文件，或者后其它后缀名的文件？
	//原因就是app.js中的设置：
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');
	//而这两个参数在index.ejs中可以使用，那么加上ejs的部分，就会返回最终生成的页面展现！
	//res.send("req.host获取主机名，req.path获取请求路径名!");
	```
	- 5.获取url参数 
	```javascript
	url：http://localhost:8888/select?name=a&id=5
	http.createServer(function(request,response){ 
		var pathname = url.parse(request.url).pathname;  //pathname => select 
		   
		var arg = url.parse(request.url).query;          //arg => name=a&id=5 
		console.log("Request for " + arg ); 
		var str = querystring.parse(arg);                //str=> {name:'a',id:'5'} 
		   
		var arg1 = url.parse(request.url, true).query;   //arg1 => {name:'a',id:'5'} 
		console.log("Request for " + arg1 ); 
		   
		var name = querystring.parse(arg).name;         //name => a 
		console.log("name = "+name); 

		console.log("Request for " + pathname + " received."); 
	}).listen(8888);
	```
