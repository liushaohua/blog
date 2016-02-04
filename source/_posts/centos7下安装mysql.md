title: centos7下安装mysql
date: 2015-04-12 11:13:45
tags:
	- mysql
	- Linux
---
我在我笔记本中安装了`mysql`，而我的远程服务上还没安装，身为一个小白，要多折腾一下。
<!-- more -->
由于我服务器的系统是`CentOS7`，而CentOS7的yum源中貌似没有正常安装mysql时的`mysql-sever`文件，需要去官网上下载。

```bash
  wget http://dev.mysql.com/get/mysql-community-release-el7-5.noarch.rpm
  rpm -ivh mysql-community-release-el7-5.noarch.rpm
  yum install mysql-community-server
```

## 让MySQL服务器被远程访问

```bash
	//在本机登入mysql后，更改"mysql"数据库里的"user"表里的"host"项，从"localhost"改为"%"。
	mysql>
	mysql>use mysql;
	mysql>select 'host' from user where user='root';

	//查看mysql库中的user表的host值（即可进行连接访问的主机/IP名称）
	mysql>update user set host = '%' where user ='root';

	//如果报错：ERROR 1062 (23000): Duplicate entry '%-root' for key 'PRIMARY'

	select host from user where user = 'root';
	//查看一下host是否已经有了%这个值
	
	+--------------+------+
	| host         | user |
	+--------------+------+
	| %            | root |
	| 127.0.0.1    | root |
	| ::1          | root |
	| iz25zf7cpbkz | root |
	+--------------+------+
	
	//如果有了直接执行下面的flush privileges;即可
	mysql>flush privileges;
	mysql>select host,user from user where user='root';
	mysql>quit
```

然后就可以愉快的去玩耍了