title: JavaScript设计模式
date: 2014-06-01 10:24:06
tags:
	- JavaScript设计模式
---

JavaScript中国的设计模式

<!-- more -->

### 单例模式

```javascript
/* 登录弹窗
 * 惰性单例
 */

let createLoginLayer = (function () {
    let div;
    return function () {
        if (!div) {
            div = document.createElement('div');
            div.innerHTML = '我是登录浮窗';
            div.style.display = 'none';
            document.body.appendChild(div);
        }

        return div;
    }
})();

document.getElementById('loginBtn').click = function () {
    let loginLayer = createLoginLayer();
    loginLayer.style.display = 'block';
}


/*
* 通用单例
*/

let getSingle = function (fn) {
    let result;
    return function () {
        return result || (result = fn.apply(this,arguments));
    }
}

let createLoginLayer = () => {
    let div = document.createElement('div');
    div.innerHTML = 'im loginWindow';
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
}

let createSingleLoginLayer = getSingle(createLoginLayer);

document.getElementById('loginBtn').click = function () {
    let loginLayer = createSingleLoginLayer();
    loginLayer.style.display = 'block';
}

/*
*   实例 动态只增加一次点击⌚️
*
*/

let bindEvent = getSingle(function () {
    document.getElementById('div1').click = function () {
        alert(1);
    }

    return true;
});

let render = function () {
    bindEvent();
}

render();
render();
render();
```

### 迭代器模式

```javascript
/* 迭代器模式是一种相对简单的模式，可以减少逻辑分之判断，直接上代码
 *
 */

let getActiveUploadObj = () => { //IE上传控件
 try {
	 return new ActiveXObject('TXFTNActive.FTNupload');
 } catch (e) {
	 return false;
 }
};

let getFlashUploadObj = () => {  //supportFlash flash上传
 if (supportFlash()) {
	 let str = '<object type="application/x-shockwave-flash"></object>';
	 return $(str).appendTo($('body'));
 }

 return false;
}

let getFormUpladObj = () => {    //表单上传
 var str = 'input name="file" type="file" class="ui-file"/>';
 return $(str).appendTo($('body'));
}

let iteratorUploadObj = () => {
 for (let i = 0,fn; fn = arguments[i++];) {
	 let uploadObj = fn();
	 if (uploadObj !== false) {
		 return uploadObj;
	 }
 }
}

let uploadObj = iteratorUploadObj(getActiveUploadObj, getFlashUploadObj, getFormUpladObj);
```
