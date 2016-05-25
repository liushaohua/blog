title: JavaScript小技巧
date: 2012-01-02 16:45:54
tags:
	- JavaScript小技巧
---

大家经常看到这样的代码:
```javascript
var score = 'A',
	$btn = $('btn');
if (score == 'A') {
	$btn.html('您得到20元钱');
	...
}

if (score == 'B') {
	$btn.html('您得到10元钱');
	...
}

if (score == 'C') {
	$btn.html('您得到5元钱');
	...
}

if (score == 'D') {
	$btn.html('您得到1元钱');
	...
}
```

zxx: 这么多的`if`，好伤神，有啥解决方案呢，直接来

```javascript
var scoreObj = {
		'A': '20',
		'B': '10',
		'C': '5',
		'D': '1'
	},
	score = 'A',
	$btn = $('btn');

	$btn.html('您得到'+ scoreObj['score'] +'元钱');
```

是不是变得清爽多了，哇嘎嘎