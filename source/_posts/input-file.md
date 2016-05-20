title: about-ie下模拟input file上传功能失效
date: 2012-06-13 17:14:36
tags:
	- input_file
---
Q：IE9下file提交到iframe中，load一直不触发，其他高级浏览器均无此问题
<!-- more -->

![input_file](http://images.cnitblog.com/blog2015/629343/201504/171926065898805.jpg)

解决方案：不使用js模拟 input click事件，取而代之的是把真实的input设置为要触发元素的大小，进行触发onchange
原因分析：低端IE不支持JS模拟 input file的click事件
ZXX：隐藏的form IE也也不能获取到submit成功后iframe的onload，坑撒~~~

