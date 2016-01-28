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

### async await
- 关于`异步编程`，有多种方法，利弊就不多说了
    - callback
    - 事件监听
    - 观察者
    - Promise
- ES6/7提供了终极的解决方案`async await`
- 有些特性必须要借助`polyfill/runtime`才能使用
- `并行处理` - 使用 `async/await` 来处理异步时，是串行执行的。但很多场景下我们需要并行处理，这样可以大大提高执行效率，此时可以结合 Promise.all 来处理。

**async await代码事例:**
```javascript
    let asyncReadFile = async function (){
      let f1 = await readFile(path.normalize(__dirname + '/003.js'));
      let f2 = await readFile(path.normalize(__dirname + '/003.js'));
      console.log(f1.toString());
      console.log(f2.toString());
    };
    let result = asyncReadFile();

    //并行处理
    async indexAction(){
        let p1 = this.getServiceData1();
        let p2 = this.getAPIData2();
        let [p1Data, p2Data] = await Promise.all([p1, p2]);
    }
```

### export import
- 模块之间的相互调用关系是通过 export 来规定模块对外暴露的接口，通过import来引用其它模块提供的接口。同时还为模块创造了命名空间，防止函数的命名冲突
- 定义好模块的输出以后就可以在另外一个模块通过import引用

**export代码事例:**
```javascript
     //test.js
     var name = 'Rainbow';
     var age = '24';
     export {name, age};

    //test.js
    export function getName() {
     return name;
    }
    export function getAge(){
    return age;
    }

    //test.js default 导出
    export default function getAge() {}

    // 或者写成
    function getAge() {}
    export default getAge;
```

**import代码事例:**
```javascript
    //index.js
    import {name, age} from './test.js'

    //index.js
    import * as test form './test.js';  //import * as 就完成了模块整体的导入

    //index.js
    // 导入的时候不需要花括号
    import test from './test.js';
```

### class
- Class之间可以通过extends关键字，实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多

```javascript
    class ColorPoint extends Point {

      constructor(x, y, color) {
        super(x, y); // 等同于parent.constructor(x, y)
        this.color = color;
      }

      toString() {
        return this.color + ' ' + super.toString(); // 等同于parent.toString()
      }
    }
```