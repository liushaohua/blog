title: 使用jQuery编写插件
date: 2012-01-13 17:26:41
tags:
	-jQuery插件
---

面试题：封装一个jQuery插件
<!-- more -->

封装一个选项卡的jQuery插件
```javascript
jQuery.fn.tabs = function (control) {
	var $element = $(this),
		$control = control;
	
	$element.on('click','[data-tab]',function () {
		var tabName = $(this).attr('data-tab');
		$element.trigger('change.tabs',tabName);
	});
	
	$element.on('change.tabs',function (e,tabName) {
		$element.find('[data-tab]').removeClass('active');
		$element.find('[data-tab="'+tabName+'"]').addClass('active');
		window.location.hash = tabName;
	});
	
	$element.on('change.tabs',function (e,tabName) {
		$control.find('[data-tab]').removeClass('active');
		$control.find('[data-tab="'+tabName+'"]').addClass('active');
	});
	
	$(window).bind('hashchange',function () {
		var tabName = window.location.hash.slice(1);
		$element.trigger('change.tabs',tabName);
	});
	
	var firstName = $element.find('[data-tab]').eq(0).attr('data-tab');
	$element.trigger('change.tabs',firstName);
	
	return this;
};

$(function () {
	$('#tabs').tabs($('#content'));
});
```