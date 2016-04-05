/**
 * 图片懒加载插件
 * @description 目前只支持window的竖向滚动, 文档/注释待修改
 * @author xieliang
 * @example
 *     1, 延迟加载
 *         imgLoad("#id img") 或者
 *         imgLoad({
 *             id: $("#id img.imgLoad")
 *         });//默认真实图片路径在 lazy-src 里, 默认为淡入
 *     2, 修改真实图片路径
 *         new imgLoad({id: "img.imgLoad", attr:"data-img-src"});
 *     3, 修改淡入效果
 *         imgLoad({id:"#id", effect:"show"});//没有淡入效果
 *     4, 自定义事件
 *         var a = imgLoad({"id":"img", event:"xieliang"});//定义事件名
 *         在需要的地方 a.load();加载全部
 *         a.load(".img.eq(3)");加载某个, 选择可以是img或者img外层对象
 *         a.load("img");//加载 img
 *         $("img").trigger("xieliang");//触发自定义事件
 *     5, 设置屏幕偏移, 支持 正，负
 *         new imgLoad({threshold:-100, id:"img"});
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(root['jQuery']);
    }
}(this, function ($) {
    var $window = $(window),
        count = 0;

    function imgLoad(config) {
        var self = this;

        if (!(self instanceof imgLoad)) {
            return new imgLoad(config);
        }

        if(!$.isPlainObject(config)){
            config = {
                id: config
            }
        }

        self.config = config = $.extend({ //默认配置
            id: '',
            attr: "lazy-src", //连接占位
            effect: "fadeIn", //效果
            event: "scroll", //事件
            threshold: 0 //偏移,可为正/负数
        }, config || {});

        config.id = $(config.id);

        self.imgLength = config.id.length;
        self.okLength = 0;

        if (self.imgLength < 1) {
            return self;
        }

        return self.init();
    }


    imgLoad.prototype.init = function() {
        var self = this,
            cache = self.cache = {},
            config = self.config,
            guid = self.guid = 'imgLoad'+ (++count);



        //debug
        // window.cache = window.cache || {};
        // window.cache[self.guid] = cache;


        //遍历所有的图片
        $.each(config.id, function(index) {
            var $that = $(this),
                id;
            if (!$that.data("imgLoad") && $that.attr(config.attr)) {
                id = count++;
                $that.data("imgLoad", id);
                cache[id] = $that;


                // console.log(this)
            } else {
                self.imgLength--;
            }
        });


        if (config.event === 'scroll') {
            $window.on("scroll." + guid + " resize." + guid, function() {
                self._scroll();
            });

            //默认触发下, 解决初始的时候屏幕不在顶部而不加载图片
            self._scroll();
        } else if (config.event) {
            config.id.one(config.event, function() {
                self._trigger($(this).data("imgLoad"));
            });
        }



        //debug
        // $window.on("scroll", function(){
        //     console.log(cache);
        // });
    }


    imgLoad.prototype.load = function(elem) {
        var self = this,
            cache = self.cache,
            key;

        if(self.okLength >= self.imgLength){
            return self;
        }

        if (elem) {
            elem = $(elem);
            $.each(elem[0].tagName === 'IMG' ? elem : elem.find("img"), function() {
                self._trigger($(this).data("imgLoad"));
            });
        } else {
            for (key in cache) {
                self._trigger(key);
            }
        }
        return self;
    }


    /**
     * 内部触发元素
     * @param  {string} key 元素的索引
     */
    imgLoad.prototype._trigger = function(key) {
        var self = this,
            config = self.config,
            cache = self.cache,
            $img,
            IMG;


        if (key && cache[key]) {
            $img = cache[key];

            // IMG = new Image();
            // IMG.onload = function(){
            //     $img.hide().attr("src", $img.attr(config.attr))[config.effect]().removeAttr(config.attr); //显示该图片
            //     $img = null;
            // }
            // IMG.onerror = function(){
            //     $img[0].src = Tools.url.static + 'res/images/noimg.png';
            // }

            // IMG.src = $img.attr(config.attr);
            // 以上代码在ie7有bug


            $("<img />").on("load", //创建个img来预加载
                function() {
                    $img.hide().attr("src", $img.attr(config.attr))[config.effect]().removeAttr(config.attr); //显示该图片
                    setTimeout(function(){
                        $img = null;
                    });
                }).on("error", function(){
                    $img[0].src = '/img/img-err.png';
                }).attr("src", $img.attr(config.attr))
            delete cache[key]; //删除缓存里的
            self.imgLength--;
        }
    }


    /**
     * 滚动触发
     */
    imgLoad.prototype._scroll = function() {
        var self = this,
            config = self.config,
            cache = self.cache,
            key,
            win_scrollTop = $window.scrollTop(),
            win_height = $window.height(),
            offset;

        for (key in cache) {
            offset = cache[key].offset();
            if (cache[key].is(":visible") && win_scrollTop + win_height >= (offset.top + config.threshold) && (offset.top + cache[key].height() >= win_scrollTop)) { //高级可见
                self._trigger(key);
            }
        }

        if (self.okLength >= self.imgLength) { //如果已加载大于等于总数
            $window.off("scroll." + self.guid + " resize." + self.guid);
        }

    }

    window.imgLoad = imgLoad;
}));