title: 给你的markdown产出图片增加lazy
date: 2015-04-10 15:32:34
tags:
	- Markdown
---
Markdown 其实是一种轻量级的标记语言，使用过Markdown的人都会赞不绝口，Hexo和Ghost都支持用Markdown语法编写文章。
<!-- more -->
我的博客用的是hexo,试用Markdown语法插入一张图片很方便，只需要`![弥撒13](https://o3o97s3zl.qnssl.com/misa13.jpg?imageView2/2/w/800/q/90)`就可以了，解析后会给我们创建一个`<img src="https://o3o97s3zl.qnssl.com/misa13.jpg?imageView2/2/w/800/q/90" alt="弥撒13"`,如果我们想增加一个width或者其他的class就不支持了，要么我们就更换其他引擎，要么就修改一下源代码，为了方便起见，我选择了第二个。
```javascript
cd node_modules/hexo-renderer-marked/node_modules/marked/lib
vi marked.js 找到890行，修改下img标签这
Renderer.prototype.image = function(href, title, text) {
  var out = '<img lazy-src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

Renderer.prototype.text = function(text) {
  return text;
};
```
ok~ 搞定，如果要修改其他的语法的话也在这个JS文件中改一笔就完事了~~~
