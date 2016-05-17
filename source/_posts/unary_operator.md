title: 函数自执行-一元运算符
date: 2012-6-17 10:17:52
tags:
	- 函数自执行
---

```javascript
!function () { /* code */ } ();
~function () { /* code */ } ();
-function () { /* code */ } ();
+function () { /* code */ } ();
```
叹号跟函数!function和+function 都是跟(function(){})();这个函数是一个意思，都是告诉浏览器自动运行这个匿名函数的，因为!+()这些符号的运算符是最高的，所以会先运行它们后面的函数
