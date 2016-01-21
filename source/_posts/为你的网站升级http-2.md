title: 为你的网站升级HTTP/2
date: 2016-01-21 15:45:34
tags:
	- HTTP
	- Nginx
---
关于http/2被炒火已经有一段日子了，并且已经有许多站点争相追逐使用，去年5月终于定稿发布了，作为一个不热爱`学习`的前端狗，已经比那些热爱学习的大神们晚了近一年，是时候`折腾`一下子了，不然`老了`是真的动不了了。
早些年Nginx发布了一个`early-alpha patch`模块来对HTTP/2进行支持，从1.9.5开始`ttpv2module` 替换了 `ngxhttpspdy_module` 正式全面的对HTTP/2支持。
### SSL部署
SSL有几款是免费的，生成证书后`listen 443`即可;
### 安装/升级Nginx
如果你服务器的Nginx版本`太低`，必须要升级下
修改`/etc/yum.repos.d/nginx.repo`的nginx仓库地址
```nginx
	[nginx]
	name=nginx repo  
	baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/  
	gpgcheck=0  
	enabled=1
```
没安装Nginx的话 `yum install nginx`，已经安装了的话，就可以 `yum clean all && yum update nginx`进行升级。
### 检测Nginx版本至少要1.9.5以上
```bash
	$ nginx -v
	nginx version: nginx/1.9.9 
```
### Nginx启动
只需要修改`nginx.conf`中的配置
```nginx
	server {  
	  listen        443 ssl http2; 
	  server_name   liushaohua.cn;

	  #SSL配置
	  ssl                   on;
	  ssl_certificate       /etc/nginx/conf.d/certificate.crt;
	  ssl_certificate_key   /etc/nginx/conf.d/certificate.key;

	}
```
`listen 443 ssl http2`
### 强制https
```nginx
	if ($server_port = 80) {
		rewrite ^(.*)$ https://$host$1 permanent;
	}
```
### 重启
```nginx
	nginx -s reload
	netstat -apnt | grep 443
```
如果显示为下面这样
```nginx
	tcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN      7255/nginx: master
```
访问下你的网站，打开开发者工具，看看`Protocol`是否返回了h2,返回了的话就ok了~~











