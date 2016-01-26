title: ECMAScript学习笔记
date: 2016-01-26 14:13:51
tags:
    - ECMAScript
---
ECMAScript做前端的同学都不会陌生，去年中Ecma国际大会宣布正式批准ECMA-262第6版，亦即ECMAScript 2015（曾用名：ECMAScript 6、ES6）的语言规范。ES6对于ES5是进行了相当大的改进，增加了许许多多的新特性，使得JavaScript`看上去`不再那么`渣`，目前还没有一款支持全部ES6新特性的的服务代理(浏览器+服务器端)，目前我们能做到的就是把ES6代码转译成ES5的代码，小道消息说主流浏览器完全实现ES6特性大概需要一年左右时间，毕竟不是官方发出的，要是2年没支持，咱也没办法不是。

<!-- more -->

由简入深，实践运用下

### let const命令
- `let`类此于`var`，用来声明`块级作用域`变量，并且不允许重复声明
- `const`是用来定义常量，何为常量？`一棵树上吊死`，也不允许重复声明

**let代码事例:**
```javascript
    function () {
        let a = 123;
        //a 123
    }
    //a 报错
```

**const代码事例:**
```javascript
    const WIDTH = 45;
    WIDTH = 50；
    //WIDTH 45
```

