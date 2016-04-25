title: web前端开发面试题整理
date: 2016-04-15 11:14:32
tags:
	- 面试题	
---
前端开发面试题收集整理，持续更新中

<!-- more --->

### CSS相关
- display:none和visibility:hidden的区别
- CSS中 link 和@import 的区别
- position的absolute与fixed共同点与不同点
- 介绍一下CSS的盒子模型
- CSS 选择符有哪些？哪些属性可以继承？优先级算法如何计算？ CSS3新增伪类有那些？
- 列出display的值，说明他们的作用。position的值， relative和absolute分别是相对于谁进行定位的？
- CSS3有哪些新特性？
- 为什么要初始化CSS样式
- 对BFC规范的理解？
- 解释下 CSS sprites，以及你要如何在页面或网站中使用它？

### HTML相关
- 说说你对语义化的理解？
- Doctype作用? 严格模式与混杂模式如何区分？它们有何意义?
- 你知道多少种Doctype文档类型？
- HTML与XHTML——二者有什么区别？
- 解释下浮动和它的工作原理？清除浮动的技巧？
- 浮动元素引起的问题和解决办法？
- IE 8以下版本的浏览器中的盒模型有什么不同
- html5有哪些新特性、移除了那些元素？如何处理HTML5新标签的浏览器兼容问题？如何区分 HTML 和 HTML5？
- iframe的优缺点？
- 如何实现浏览器内多个标签页之间的通信?
- webSocket如何兼容低浏览器？
- 嵌入JS应该放在什么位置？
- 说出至少一个只有ie支持的html标签

### JavaScript相关
- DOM操作——怎样添加、移除、移动、复制、创建和查找节点
- null和undefined的区别？
- new操作符具体干了什么呢?
- JSON 的了解？
- js延迟加载的方式有哪些
- 如何解决跨域问题
- documen.write和 innerHTML的区别
- .call() 和 .apply() 的区别和作用
- 哪些操作会造成内存泄漏？
- JavaScript中的作用域与变量声明提升
- 如何判断当前脚本运行在浏览器还是node环境中？
- javascript对象的几种创建方式
- JavaScript原型，原型链 ? 有什么特点？
- javascript继承的6种方法，如何避免原型链上面的对象共享
- ajax过程
- ajax 是什么?ajax 的交互模型?同步和异步的区别?如何解决跨域问题?
- 异步加载和延迟加载
- GET和POST的区别，何时使用POST？
- 哪些地方会出现css阻塞，哪些地方会出现js阻塞？
- Javascript无阻塞加载具体方式
- 闭包相关问题？
- js事件处理程序问题？
- eval是做什么的？
- 事件、IE与火狐的事件机制有什么区别？ 如何阻止冒泡？
- AMD和CMD 规范的区别？
- 如何获取UA？
- 请你谈谈Cookie的弊端
- 浏览器本地存储
- web storage和cookie的区别
- 简述在IE下mouseover和mouseenter

### Node相关
- Node.js的适用场景？
- 对Node的优点和缺点提出了自己的看法？

### 综合性
- 页面重构怎么操作？
- 网站重构的理解？
- WEB应用从服务器主动推送Data到客户端有那些方式？
- HTTP状态码
- cachecontrol
- 你遇到过比较难的技术问题是？你是如何解决的？
- 常使用的库有哪些？常用的前端开发工具？开发过什么应用或组件？
- 列举IE 与其他浏览器不一样的特性？
- 99%的网站都需要被重构是那本书上写的？
- 什么叫优雅降级和渐进增强？
- 除了前端以外还了解什么其它技术么？你最最厉害的技能是什么？
- 你常用的开发工具是什么，为什么？
- 对前端界面工程师这个职位是怎么样理解的？它的前景会怎么样？
- 你在现在的团队处于什么样的角色，起到了什么明显的作用？
- 你认为怎样才是全端工程师（Full Stack developer）？
- 介绍一个你最得意的作品吧？ #
- 项目中遇到什么问题？如何解决？
- 你的优点是什么？缺点是什么？
- 如何管理前端团队?
- 最近在学什么？能谈谈你未来3，5年给自己的规划吗？

### 逻辑判断&&输出

#### html&&css
- 写出下列代码在各个浏览器中的颜色值?
```html
background: red;
_background: green;
*background: blue;
background: black\9;
```
- 添加些css让其水平垂直居中。
```html
<div style="____________________________">
    颜海镜
</div>
```
- 如下代码，在空白处填写代码，是其点击时，前景色为白色，背景色为黑色
```html
<div onclick="_________________">颜海镜</div>
```

#### javascript
- 下面代码的输出值是？
```javascript
alert(1&&2);
```
- 写出下面代码的输出值：
```javascript
var obj = {
    a: 1,
    b: function () {console.log(this.a)}
};

var a = 2;
var objb = obj.b;

obj.b();
objb();
obj.b.call(window);
```
- 写出下列代码的输出值：
```javascript
function A() {

}
function B(a) {
    this.a = a;
}
function C(a) {
    if (a) {
        this.a = a;
    }
}

A.prototype.a = 1;
B.prototype.a = 1;
C.prototype.a = 1;

console.log(new A());
console.log(new B());
console.log(new C(2));
```
- 写出下列代码的输出值：
```javascript
var a = 1;
function b() {
    var a = 2;
    function c() {
        console.log(a);
    }

    return c;
}

b()();
```

- 书写代码，点击时从1分钟开始，每秒递减到0。
```html
<div onclick="test();">颜海镜</div>
```


### 编码类
- js对象的深度克隆
- 写一个通用的事件侦听器函数?
- js数组去重
- js操作获取和设置cookie
- 正则表达式匹配，开头为11N, 12N或1NNN，后面是-7-8个数字的电话号码。

### 未分类
- 线程与进程的区别 
- 你如何对网站的文件和资源进行优化
- 请说出三种减少页面加载时间的方法
- 你都使用哪些工具来测试代码的性能？
- 什么是 FOUC（无样式内容闪烁）？你如何来避免 FOUC？
- 你有哪些性能优化的方法？
- http状态码有那些？分别代表是什么意思？
- 一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？
- 平时如何管理你的项目？
- 说说最近最流行的一些东西吧？常去哪些网站？
- 前端安全问题？
- ie各版本和chrome可以并行下载多少个资源
- grunt， YUI compressor 和 google clojure用来进行代码压缩的用法
- Flash、Ajax各自的优缺点，在使用中如何取舍？
- 请解释一下 JavaScript 的同源策略
- 为什么要有同源限制？
- 什么是 "use strict"; ? 使用它的好处和坏处分别是什么？
